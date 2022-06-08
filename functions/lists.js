import admin from 'firebase-admin';
import request from "request";
import {createCanvas, Image} from "canvas";
import sharp from "sharp";
import {defineString} from "firebase-functions/params";

const storageBucket = defineString('STORAGE_BUCKET');

const shouldHavePlaceholderThumbnail = recipeLength => recipeLength === 0;

const shouldHaveOneRecipeImageAsThumbnail = (oldLength, newLength) => newLength >= 1 && newLength <= 3;

const shouldHaveMultipleRecipeImagesAsThumbnail = (oldLength, newLength) => oldLength === 3 && newLength === 4;

const getThumbnailUrl = async (change, oldList, newList, userId, listId) => {
    const db = admin.firestore();
    const cachedRecipeListSnapshot = await db.collection('cache').doc('recipeList').get();
    const cachedRecipeList = cachedRecipeListSnapshot.data();

    const sortedRecipes = Object.keys(newList.recipes).sort((a, b) => {
        const createdAtA = newList.recipes[a]['addedAt'];
        const createdAtB = newList.recipes[b]['addedAt'];
        return createdAtA < createdAtB ? -1 : createdAtA > createdAtB ? 1 : 0
    });

    if (!change.before.exists) { // List created
        return cachedRecipeList[sortedRecipes[0]].thumbnail;
    }

    if (oldList.deletedAt === null && newList.deletedAt !== null) { // List deleted, remove thumbnail
        await deleteListThumbnailsFromStorage(userId, listId);
        return null;
    }

    const newLength = Object.keys(newList.recipes).length;
    const oldLength = Object.keys(oldList.recipes).length;

    if (shouldHaveOneRecipeImageAsThumbnail(oldLength, newLength)) { // 1 recipe in list
        return cachedRecipeList[sortedRecipes[0]].thumbnail;
    }

    if (shouldHavePlaceholderThumbnail(newLength)) { // No recipes in list, set placeholder
        return '/static/media/recipe.0a16478b.jpg';
    }

    if (shouldHaveMultipleRecipeImagesAsThumbnail(oldLength, newLength)) { // More than 3 recipes in list
        const thumbnailUrls = sortedRecipes.slice(0, 4).map(recipeId => cachedRecipeList[recipeId].thumbnail);

        const canvas = await createThumbnailCollage(thumbnailUrls);
        const buffer = canvas.toBuffer();

        return await uploadListThumbnailToStorage(buffer, userId, listId);
    }

    return null;
}

const updateThumbnailOnListWrite = async (change, context) => {
    const newList = change.after.data();
    const oldList = change.before.data();

    // Just updated thumbnail, don't attempt to update it again.
    if (change.before.exists && oldList.thumbnailUrl !== newList.thumbnailUrl && newList.thumbnailUrl !== undefined) {
        return null;
    }

    const userId = context.params.userId;
    const listId = context.params.listId;

    const thumbnailUrl = await getThumbnailUrl(change, oldList, newList, userId, listId);

    if (thumbnailUrl === null) {
        return null;
    }

    // Update list with thumbnail URL
    return updateListThumbnailInFireStore(userId, listId, thumbnailUrl);
};

const downloadPhoto = (uri) => {
    return new Promise((resolve, reject) => {
        let data;
        const stream = request(uri);
        stream.on("data", (chunk) => data = data ? Buffer.concat([data, chunk]) : chunk);
        stream.on("error", reject);
        stream.on("end", () => resolve(data));
    });
}

const createThumbnailCollage = async (thumbnailUrls) => {
    const canvasWidth = 326;
    const canvasHeight = 326;
    const canvas = createCanvas(canvasWidth, canvasHeight);
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "#eee";
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);

    const photoBuffers = await Promise.all(thumbnailUrls.map(async (url) => await downloadPhoto(url)));

    const coordinates = {
        0: {x: 2, y: 2},
        1: {x: 164, y: 2},
        2: {x: 2, y: 164},
        3: {x: 164, y: 164},
    }

    await Promise.all(photoBuffers.map(async (photoBuffer, index) => {
        const jpgBuffer = await sharp(photoBuffer).resize(160, 160, {fit: 'cover'})
            .jpeg({mozjpeg: true, quality: 95})
            .toBuffer();

        const img = new Image();
        img.onload = () => ctx.drawImage(img, coordinates[index].x, coordinates[index].y, 160, 160);
        img.src = jpgBuffer;
    }));

    return canvas;
}

const regenerateThumbnailForList = async (req, res) => {
    const userId = req.query.userId;
    const listId = req.query.listId;

    const db = admin.firestore();
    const listSnapshot = await db.collection('users').doc(userId).collection('lists').doc(listId).get();
    const list = listSnapshot.data();

    const listRecipeLength = Object.keys(list.recipes).length;

    if (listRecipeLength < 1) {
        res.status(200);
        return res.send();
    }

    const sortedRecipes = Object.keys(list.recipes).sort((a, b) => {
        const createdAtA = list.recipes[a]['addedAt'];
        const createdAtB = list.recipes[b]['addedAt'];
        return createdAtA < createdAtB ? -1 : createdAtA > createdAtB ? 1 : 0
    });

    const cachedRecipeListSnapshot = await db.collection('cache').doc('recipeList').get();
    const cachedRecipeList = cachedRecipeListSnapshot.data();

    if (listRecipeLength === 1) {
        // Upload first recipe thumbnail as list thumbnail
        const firstThumbnailUrl = cachedRecipeList[sortedRecipes[0]].thumbnail;
        await updateListThumbnailInFireStore(userId, listId, firstThumbnailUrl);

        res.status(200);
        return res.send();
    }

    const thumbnailUrls = sortedRecipes.slice(0, 4).map(recipeId => cachedRecipeList[recipeId].thumbnail);

    const canvas = await createThumbnailCollage(thumbnailUrls);
    const buffer = canvas.toBuffer();

    // Upload file to storage
    const publicUrl = await uploadListThumbnailToStorage(buffer, userId, listId);

    // Update list with thumbnail URL
    await updateListThumbnailInFireStore(userId, listId, publicUrl);

    res.writeHead(302, {'Location': publicUrl});
    // return res.end(buffer, 'binary');
    return res.send();
};

const updateListThumbnailInFireStore = async (userId, listId, thumbnailUrl) => {
    const db = admin.firestore();
    return db.collection('users').doc(userId).collection('lists').doc(listId).update({
        thumbnailUrl
    });
}

const deleteListThumbnailsFromStorage = async (userId, listId) => {
    const base64List = new Buffer(listId).toString('base64');
    const thumbnailsPrefix = `images/users/${userId.substring(0, 6)}/lists/${base64List.substring(0, 6)}`;
    const [files] = await admin.storage().bucket(storageBucket.value()).getFiles({prefix: thumbnailsPrefix});

    await Promise.all(files.map(async (file) => file.delete()));
}

const uploadListThumbnailToStorage = async (buffer, userId, listId) => {
    const bucket = admin.storage().bucket(storageBucket.value());
    const dateString = new Date().toISOString().substring(0, 10).replace(/-/g, '');
    const base64List = new Buffer(listId).toString('base64');
    const path = `images/users/${userId.substring(0, 6)}/lists/${base64List.substring(0, 6)}/thumbnail_${dateString}.jpg`;

    await bucket.file(path).save(buffer);

    const file = bucket.file(path);

    await file.setMetadata({contentType: 'image/jpg', modified: dateString});
    await file.makePublic();

    return bucket.file(path).publicUrl();
}

const listFunctions = {
    regenerateThumbnailForList,
    updateThumbnailOnListWrite
};

export default listFunctions;

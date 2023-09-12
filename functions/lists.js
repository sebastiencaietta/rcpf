import admin from 'firebase-admin';
import request from "request";
import {createCanvas, Image} from "canvas";
import sharp from "sharp";
import {defineString} from "firebase-functions/params";
const storageBucket = defineString('STORAGE_BUCKET');

// exports.updateThumbnailOnListCreate = async (snap, context) => {
//     console.log(snap, context);
// };

// exports.updateThumbnailOnListUpdate = async (snap, context) => {
//
//  Update if:
//      recipes length == 0 to 1 or 4 to 3
//      recipes length == 3 to 4
//
//
//
// };

// exports.deleteThumbnailOnListDelete = async (snap, context) => {
//
// };

const downloadPhoto = (uri) => {
    return new Promise((resolve, reject) => {
        let data;
        const stream = request(uri);
        stream.on("data", (chunk) => data = data ? Buffer.concat([data, chunk]) : chunk);
        stream.on("error", reject);
        stream.on("end", () => resolve(data));
    });
}

const createThumbnailCollage = async (thumbnails) => {
    const canvasWidth = 326;
    const canvasHeight = 326;
    const canvas = createCanvas(canvasWidth, canvasHeight);
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "#eee";
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);

    const photoBuffers = await Promise.all(thumbnails.map(async (url) => await downloadPhoto(url)));

    const coordinates = {
        0: {x: 2, y: 2},
        1: {x: 164, y: 2},
        2: {x: 2, y: 164},
        3: {x: 164, y: 164},
    }

    await Promise.all(photoBuffers.map(async (photoBuffer, index) => {
        const jpgBuffer = await sharp(photoBuffer).resize(160, 160, {fit: 'cover'})
            .jpeg({ mozjpeg: true, quality: 90 })
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

    console.log(userId, listId);

    const db = admin.firestore();
    const listSnapshot = await db.collection('users').doc(userId).collection('lists').doc(listId).get();
    const list = listSnapshot.data();

    const listRecipeLength = Object.keys(list.recipes).length;

    console.log(list.recipes, listRecipeLength);

    if (listRecipeLength < 1) {
        res.status(200);
        return res.send();
    }

    const dateString = new Date().toISOString().substring(0, 10).replace(/-/g, '');
    const base64List = new Buffer(listId).toString('base64');
    const path = `images/users/${userId.substring(0, 6)}/lists/${base64List.substring(0, 6)}/thumbnail_${dateString}.jpg`;

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
    const bucket = admin.storage().bucket(storageBucket.value());
    await bucket.file(path).save(buffer);

    const file =  bucket.file(path);

    await file.setMetadata({contentType: 'image/jpg', modified: dateString});
    await file.makePublic();

    const publicUrl = bucket.file(path).publicUrl();

    // Update
    await updateListThumbnailInFireStore(userId, listId, publicUrl);

    res.writeHead(302, {'Location': publicUrl });
    return res.end(buffer, 'binary');
};

const updateListThumbnailInFireStore = async (userId, listId, thumbnailUrl) => {
    const db = admin.firestore();
    return db.collection('users').doc(userId).collection('lists').doc(listId).update({
        thumbnailUrl
    });
}

const listFunctions = {
    regenerateThumbnailForList
};

export default listFunctions;

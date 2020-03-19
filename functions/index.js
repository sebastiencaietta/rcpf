const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();


////////////////////////////// ON RECIPE UPDATES //////////////////////////////

exports.updateRecipeListOnRecipeCreate = functions.region('europe-west1').firestore
    .document('recipes/{recipeId}')
    .onCreate(async (snap, context) => {
        const recipe = snap.data();
        const {recipeId} = context.params;
        const db = admin.firestore();

        const documentSnapshot = await db.collection('cache').doc('recipeList').get();
        const recipeList = documentSnapshot.exists ? documentSnapshot.data() : {};

        const newRecipeList = {
            ...recipeList,
            [recipeId]: {
                slug: recipe.slug,
                title: recipe.title,
                thumbnail: recipe.thumbnail,
                tags: recipe.tags,
                category: recipe.category,
            }
        };

        return db.collection('cache').doc('recipeList').set(newRecipeList);
    });

exports.deleteRecipeFromRecipeListOnRecipeDelete = functions.region('europe-west1').firestore
    .document('/recipes/{recipeId}')
    .onDelete(async (snap, context) => {
        const recipeId = context.params.recipeId;

        const db = admin.firestore();
        const documentSnapshot = await db.collection('cache').doc('recipeList').get();

        if (!documentSnapshot.exists) {
            return null;
        }

        const recipeList = documentSnapshot.data();
        delete recipeList[recipeId];

        return db.collection('cache').doc('recipeList').set(recipeList);
    });

//Only update the recipe list on title/thumbnail/tags/category/slug change
const shouldUpdateRecipe = (newVal, oldVal) => {
    return JSON.stringify(
        [newVal.title, newVal.thumbnail, newVal.tags, newVal.category, newVal.slug]
    ) !== JSON.stringify(
        [oldVal.title, oldVal.thumbnail, oldVal.tags, oldVal.category, oldVal.slug]
    );
};

exports.updateRecipeListOnRecipeUpdate = functions.region('europe-west1').firestore
    .document('/recipes/{recipeId}')
    .onUpdate(async (change, context) => {
        const newVal = change.after.data();
        const oldVal = change.before.data();

        if (!shouldUpdateRecipe(newVal, oldVal)) {
            return null;
        }

        const db = admin.firestore();
        const {recipeId} = context.params;

        return db.collection('cache').doc('recipeList').update({
            [recipeId + '.title']: newVal.title,
            [recipeId + '.thumbnail']: newVal.thumbnail,
            [recipeId + '.tags']: newVal.tags,
            [recipeId + '.category']: newVal.category,
            [recipeId + '.slug']: newVal.slug,
        });
    });


////////////////////////////// ON TAGS UPDATE //////////////////////////////

exports.updateRecipeListOnTagDelete = functions.region('europe-west1').firestore
    .document('/tags/{tagId}')
    .onDelete(async (snap) => {
        const tag = snap.data();

        //get recipe list and for all the recipes having this tag, remove the tag from the tags array
        const db = admin.firestore();
        const documentSnapshot = await db.collection('cache').doc('recipeList').get();

        if (!documentSnapshot.exists) {
            return null;
        }

        const recipeList = documentSnapshot.data();

        Object.keys(recipeList).forEach(recipeId => {
            const recipe = recipeList[recipeId];
            const index = recipe.tags.indexOf(tag.id);
            if (index === -1) {
                return;
            }

            const newTags = [
                ...recipe.tags.slice(0, index),
                ...recipe.tags.slice(index + 1, recipe.tags.length),
            ];

            recipeList[recipeId] = {
                ...recipeList[recipeId],
                tags: newTags,
            }
        });

        return db.collection('cache').doc('recipeList').set(recipeList);
    });

exports.regenerateRecipeListCache = functions.region('europe-west1').https.onRequest(async (req, res) => {
    const db = admin.firestore();
    const recipes = [];
    const recipesSnapshot = await db.collection('recipes').get();
    recipesSnapshot.forEach(recipe => recipes.push({...recipe.data(), id: recipe.id}));

    const recipeList = {};

    recipes.forEach(recipe => {
        recipeList[recipe.id] = {
            slug: recipe.slug,
            title: recipe.title,
            thumbnail: recipe.thumbnail,
            tags: recipe.tags,
            category: recipe.category,
        };
    });

    await db.collection('cache').doc('recipeList').set(recipeList);

    res.status(200);
    res.send();
});

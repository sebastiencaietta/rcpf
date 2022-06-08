import functions from 'firebase-functions';
import admin from 'firebase-admin';
import {dbExport} from './cron.js';
import ingredientCacheFunctions from './ingredientCache.js';
import listFunctions from './lists.js';
admin.initializeApp();


////////////////////////////// ON RECIPE UPDATES //////////////////////////////

export const updateRecipeListOnRecipeCreate = functions.region('europe-west1').firestore
    .document('recipes/{recipeId}')
    .onCreate(async (snap, context) => {
        const recipe = snap.data();
        const {recipeId} = context.params;
        const db = admin.firestore();

        return db.collection('cache').doc('recipeList').update({
            [recipeId]: {
                slug: recipe.slug,
                title: recipe.title,
                thumbnail: recipe.thumbnail || '',
                tags: recipe.tags,
                category: recipe.category,
                diets: recipe.diets || [],
                seasons: recipe.seasons || [],
                createdAt: recipe.createdAt,
            }
        });
    });

export const deleteRecipeFromRecipeListOnRecipeDelete = functions.region('europe-west1').firestore
    .document('/recipes/{recipeId}')
    .onDelete(async (snap, context) => {
        const recipeId = context.params.recipeId;

        const db = admin.firestore();
        const documentSnapshot = await db.collection('cache').doc('recipeList').get();

        if (!documentSnapshot.exists) {
            return null;
        }

        return db.collection('cache').doc('recipeList').update({
            [recipeId]: admin.firestore.FieldValue.delete()
        });
    });

//Only update the recipe list on title/thumbnail/tags/category/slug/diets/seasons change
const shouldUpdateRecipe = (newVal, oldVal) => {
    return JSON.stringify(
        [newVal.title, newVal.thumbnail, newVal.tags, newVal.category, newVal.slug, newVal.diets, newVal.seasons]
    ) !== JSON.stringify(
        [oldVal.title, oldVal.thumbnail, oldVal.tags, oldVal.category, oldVal.slug, oldVal.diets, oldVal.seasons]
    );
};

export const updateRecipeListOnRecipeUpdate = functions.region('europe-west1').firestore
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
            [recipeId + '.thumbnail']: newVal.thumbnail || '',
            [recipeId + '.tags']: newVal.tags,
            [recipeId + '.category']: newVal.category,
            [recipeId + '.slug']: newVal.slug,
            [recipeId + '.diets']: newVal.diets || [],
            [recipeId + '.seasons']: newVal.seasons || [],
        });
    });


////////////////////////////// ON TAGS UPDATE //////////////////////////////

export const updateRecipesOnTagDelete = functions.region('europe-west1').firestore
    .document('/tags/{tagId}')
    .onDelete(async (snap) => {
        const tagId = snap.id;

        //get recipes and for all the recipes having this tag, remove the tag from the tags array in the recipe collection
        const db = admin.firestore();
        const recipesSnapshot = await db.collection('recipes').get();

        const recipes = [];
        recipesSnapshot.forEach(doc => {
            recipes.push({...doc.data(), id: doc.id});
        });

        const batch = db.batch();
        recipes.forEach(recipe => {
            const index = recipe.tags.indexOf(tagId);
            if (index === -1) {
                return;
            }

            batch.update(
                db.collection('recipes').doc(recipe.id),
                {tags: admin.firestore.FieldValue.arrayRemove(tagId)}
            );
        });

        return batch.commit();
    });

export const regenerateRecipeListCache = functions.region('europe-west1').https.onRequest(async (req, res) => {
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
            diets: recipe.diets || [],
            seasons: recipe.seasons || [],
            createdAt: recipe.createdAt,
        };
    });

    await db.collection('cache').doc('recipeList').set(recipeList);

    res.status(200);
    res.send();
});

export const scheduledFirestoreExport = functions.region('europe-west1').
    pubsub.schedule('0 3 * * *')
    .timeZone('Europe/London')
    .onRun(dbExport);

export const updateIngredientListOnIngredientAdd = functions.region('europe-west1')
    .firestore
    .document('ingredients/{ingredientId}')
    .onCreate(ingredientCacheFunctions.updateIngredientListOnIngredientAdd);

export const updateIngredientListOnIngredientUpdate = functions.region('europe-west1')
    .firestore
    .document('ingredients/{ingredientId}')
    .onUpdate(ingredientCacheFunctions.updateIngredientListOnIngredientUpdate);

export const updateIngredientListOnIngredientDelete = functions.region('europe-west1')
    .firestore
    .document('ingredients/{ingredientId}')
    .onDelete(ingredientCacheFunctions.updateIngredientListOnIngredientDelete);

export const regenerateIngredientListCache = functions.region('europe-west1')
    .https
    .onRequest(ingredientCacheFunctions.regenerateIngredientListCache);

export const regenerateThumbnailForList = functions.region('europe-west1')
    .https
    .onRequest(listFunctions.regenerateThumbnailForList);

export const updateListThumbnailOnListUpdate = functions.region('europe-west1')
    .firestore
    .document('users/{userId}/lists/{listId}')
    .onWrite(listFunctions.updateThumbnailOnListWrite);

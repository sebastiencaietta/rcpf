const admin = require('firebase-admin');

exports.updateIngredientListOnIngredientAdd = async (snap, context) => {
    const ingredient = snap.data();
    const {ingredientId} = context.params;
    const db = admin.firestore();

    const {newThumbnail, id, links, ...pureIngredient} = ingredient;

    return db.collection('cache').doc('ingredientList').update({[ingredientId]: pureIngredient});
};

exports.updateIngredientListOnIngredientUpdate = async (change, context) => {
    const newVal = change.after.data();

    const db = admin.firestore();
    const {ingredientId} = context.params;

    return db.collection('cache').doc('ingredientList').update({
        [ingredientId + '.name']: newVal.name,
        [ingredientId + '.plural']: newVal.plural,
        [ingredientId + '.thumbnail']: newVal.thumbnail,
    });
};

exports.updateIngredientListOnIngredientDelete = async (snap, context) => {
    const {ingredientId} = context.params;

    const db = admin.firestore();
    const documentSnapshot = await db.collection('cache').doc('ingredientList').get();

    if (!documentSnapshot.exists) {
        return null;
    }

    return db.collection('cache').doc('ingredientList').update({
        [ingredientId]: admin.firestore.FieldValue.delete()
    });
};

exports.regenerateIngredientListCache = async (req, res) => {
    const db = admin.firestore();
    const ingredients = [];
    const ingredientsSnapshop = await db.collection('ingredients').get();
    ingredientsSnapshop.forEach(ingredient => ingredients.push({...ingredient.data(), id: ingredient.id}));

    const ingredientList = {};

    ingredients.forEach(ingredient => {
        const {id, links, newThumbnail, ...pureIngredient} = ingredient;
        ingredientList[id] = pureIngredient;
    });

    await db.collection('cache').doc('ingredientList').set(ingredientList);

    res.status(200);
    res.send();
};

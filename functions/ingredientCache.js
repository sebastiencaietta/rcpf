const admin = require('firebase-admin');

exports.updateIngredientListOnIngredientAdd = async (snap, context) => {
    const ingredient = snap.data();
    const {ingredientId} = context.params;
    const db = admin.firestore();

    const documentSnapshot = await db.collection('cache').doc('ingredientList').get();
    const ingredientList = documentSnapshot.exists ? documentSnapshot.data() : {};
    const {newThumbnail, id, links, ...pureIngredient} = ingredient;

    const newIngredientList = {
        ...ingredientList,
        [ingredientId]: pureIngredient
    };

    return db.collection('cache').doc('ingredientList').set(newIngredientList);
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

    const ingredientList = documentSnapshot.data();
    delete ingredientList[ingredientId];

    return db.collection('cache').doc('ingredientList').set(ingredientList);
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

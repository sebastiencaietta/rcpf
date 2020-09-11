import firebase from 'firebase/app';
import slugify from "slugify";

export const getIngredientList = async () => {
    const snapshot = await firebase.firestore().collection('cache').doc('ingredientList').get();
    const cachedIngredientList = snapshot.data();
    const ingredients = [];
    Object.keys(cachedIngredientList).map(id => ingredients.push({...cachedIngredientList[id], id}));
    return ingredients;
};

export const addIngredient = async (ingredient) => {
    const db = firebase.firestore();

    if (ingredient.newThumbnail) {
        const thumbnailUrl = await uploadThumbnail(ingredient, ingredient.newThumbnail);
        ingredient = {
            ...ingredient,
            thumbnail: thumbnailUrl,
            newThumbnail: '',
        };
    }

    const docRef = await db.collection('ingredients').add(ingredient);
    return {
        ...ingredient,
        id: docRef.id,
    };
};

export const updateIngredient = async (ingredient) => {
    const db = firebase.firestore();
    const {id, newThumbnail, ...pureIngredient} = ingredient;
    console.log(pureIngredient);
    if (newThumbnail) {
        const thumbnailUrl = await uploadThumbnail(ingredient, newThumbnail);
        ingredient = {
            ...ingredient,
            thumbnail: thumbnailUrl,
        };
    }
    await db.collection('ingredients').doc(id).set(pureIngredient);
    return ingredient;
};

export const deleteIngredient = async (ingredient) => {
    const db = firebase.firestore();
    await db.collection('ingredients').doc(ingredient.id).delete();
    return ingredient;
};

const uploadThumbnail = async (ingredient, thumbnail) => {
    const metadata = {
        contentType: 'image/png'
    };

    const path = slugify(ingredient.name);
    const storageRef = firebase.storage().ref(`images/ingredients/${path}/thumbnail`);
    await storageRef.put(thumbnail, metadata);
    return await storageRef.getDownloadURL();
};

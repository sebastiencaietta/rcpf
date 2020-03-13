import firebase from 'firebase/app';
import slugify from "slugify";

export const getIngredients = async () => {
    const snapshot = await firebase.firestore().collection('ingredients').get();
    const ingredients = [];

    snapshot.forEach((doc) => {
        ingredients.push({...doc.data(), id: doc.id});
    });

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

    const docRef = await db.collection("ingredients").add(ingredient);
    return {
        ...ingredient,
        id: docRef.id,
    };
};

export const updateIngredient = async (ingredient) => {
    const db = firebase.firestore();
    if (ingredient.newThumbnail) {
        const thumbnailUrl = await uploadThumbnail(ingredient, ingredient.newThumbnail);
        ingredient = {
            ...ingredient,
            thumbnail: thumbnailUrl,
            newThumbnail: '',
        };
    }
    await db.collection('ingredients').doc(ingredient.id).set(ingredient);
    return ingredient
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

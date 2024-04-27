import firebase from "firebase/app";
import slugify from "slugify";
import {FILTER_ADDED_AT} from "../global/constants/filters";

// collection => doc => subcollection => doc
// user-uuid => 'lists' => 'list-slug' => {name: '', createdAt: '', recipes: {}, options: {}, deletedAt: null}

export const createFavoritesList = async (userId) => {
    const db = firebase.firestore();
    return db.collection('users').doc(userId).collection('lists').doc('favourites').set({
        name: 'Favorites',
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        recipes: {},
        options: {
            defaultSort: FILTER_ADDED_AT
        },
        deletedAt: null,
    });
}

export const addToFavorites = (userId, recipeId) => {
    return addRecipeToList(userId, 'favourites', recipeId);
};

export const removeFromFavorites = (userId, recipeId) => {
    return removeRecipeFromList(userId, 'favourites', recipeId);
};

export const updateList = (userId, listId, listName) => {
    const db = firebase.firestore();
    return db.collection('users').doc(userId).collection('lists').doc(listId).update({
        'name': listName,
    })
};

export const removeList = (userId, listId) => {
    const db = firebase.firestore();
    return db.collection('users').doc(userId).collection('lists').doc(listId).update({
        deletedAt: firebase.firestore.FieldValue.serverTimestamp(),
    });
};

export const addRecipeToNewList = async (userId, listName, recipeId) => {
    const db = firebase.firestore();
    const slug = slugify(listName).toLowerCase();
    return db.collection('users').doc(userId).collection('lists').doc(slug).set({
        name: listName,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        recipes: {
            [recipeId]: {
                addedAt: firebase.firestore.FieldValue.serverTimestamp(),
            }
        },
        options: {
            defaultSort: FILTER_ADDED_AT
        },
        deletedAt: null,
    });
}

export const addRecipeToList = async (userId, listId, recipeId) => {
    const db = firebase.firestore();
    return db.collection('users').doc(userId).collection('lists').doc(listId).update({
        ['recipes.' + recipeId]: {
            addedAt: firebase.firestore.FieldValue.serverTimestamp(),
        },
    });
};

export const removeRecipeFromList = (userId, listId, recipeId) => {
    const db = firebase.firestore();
    return db.collection('users').doc(userId).collection('lists').doc(listId).update({
        ['recipes.' + recipeId]: firebase.firestore.FieldValue.delete(),
    });
};

export const deleteList = (userId, listId) => {
    const db = firebase.firestore();
    return db.collection('users').doc(userId).collection('lists').doc(listId).update({
        'deletedAt': firebase.firestore.FieldValue.serverTimestamp(),
    });
};

export const renameList = (userId, listId, newListName) => {
    const db = firebase.firestore();
    return db.collection('users').doc(userId).collection('lists').doc(listId).update({
        'name': newListName,
    });
}

import firebase from 'firebase/app';
import {addTagForRecipes} from "./recipes";

export const getTags = async () => {
    const snapshot = await firebase.firestore().collection("tags").get();
    const tags = [];
    snapshot.forEach((doc) => {
        tags.push({...doc.data(), id: doc.id});
    });

    return tags;
};

export const deleteTag = async (id) => {
    return firebase.firestore().collection('tags').doc(id).delete();
};

export const createTag = async (tagData) => {
    const docRef = await firebase.firestore().collection('tags').add({title: tagData.title});

    await addTagForRecipes(tagData.recipes, docRef.id);

    return {
        title: tagData.title,
        id: docRef.id,
    }
};

export const updateTag = async (tagData, recipesToAdd, recipesToDelete) => {
    const batch = firebase.firestore().batch();
    batch.update(
        firebase.firestore().collection('tags').doc(tagData.id),
        {title: tagData.title}
    );

    recipesToAdd.forEach(recipeId => {
        batch.update(
            firebase.firestore().collection('recipes').doc(recipeId),
            {tags: firebase.firestore.FieldValue.arrayUnion(tagData.id)}
        )
    });

    recipesToDelete.forEach(recipeId => {
        batch.update(
            firebase.firestore().collection('recipes').doc(recipeId),
            {tags: firebase.firestore.FieldValue.arrayRemove(tagData.id)}
        )
    });

    await batch.commit();
};

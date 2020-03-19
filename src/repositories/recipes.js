import firebase from "firebase/app";

const sortRecipesAlphabetically = (recipeList) => {
    const idBySlugMap = {};
    const sortedList = {};

    Object.keys(recipeList)
        .sort()
        .forEach((id) => {
            const {slug} = recipeList[id];
            idBySlugMap[slug] = id;
        });

    Object.keys(idBySlugMap)
        .sort()
        .forEach(slug => {
            const id = idBySlugMap[slug];
            sortedList[id] = recipeList[id];
        });

    return sortedList;
};

export const getRecipes = async () => {
    const snapshot = await firebase.firestore().collection('recipes').get();
    const recipes = [];
    snapshot.forEach((doc) => {
        recipes.push(doc.data());
    });

    return recipes;
};

export const getRecipeList = async () => {
    const snapshot = await firebase.firestore().collection('cache').doc('recipeList').get();
    const cachedRecipeList = snapshot.data();
    const sortedRecipes = sortRecipesAlphabetically(cachedRecipeList);
    return Object.keys(sortedRecipes).map(id => sortedRecipes[id]);
};


export const listenToRecipes = (onNext) => {
    return firebase.firestore().collection("recipes").onSnapshot(onNext);
};

export const getRecipeBySlug = async (slug) => {
    const docRef = firebase.firestore().collection('recipes').where('slug', "==", slug);
    const queryResults = await docRef.get();
    const matches = [];

    queryResults.forEach(docRef => matches.push({...docRef.data(), id: docRef.id}));

    return matches[0];
};

export const setRecipe = async (recipe) => {
    firebase.firestore().collection('recipes').doc(recipe.id).set(recipe)
        .then(function () {
            console.log("Document successfully written!");
        })
        .catch(function (error) {
            console.error("Error writing document: ", error);
        });
};

export const uploadRecipeThumbnail = async (path, thumbnail) => {
    const metadata = {
        contentType: 'image/jpeg'
    };

    const storageRef = firebase.storage().ref(`images/recipes/${path}/thumbnail`);
    await storageRef.put(thumbnail, metadata);

    return await storageRef.getDownloadURL();
};

export const deleteRecipe = async (slug) => {
    firebase.firestore().collection('recipes').doc(slug).delete();
};

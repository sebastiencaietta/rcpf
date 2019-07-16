import firebase from "firebase/app";

export const getRecipes = async () => {
    const snapshot = await firebase.firestore().collection("recipes").get();
    const recipes = [];
    snapshot.forEach((doc) => {
        recipes.push(doc.data());
    });

    return recipes;
};

export const listenToRecipes = (onNext) => {
    return firebase.firestore().collection("recipes").onSnapshot(onNext);
};

export const getRecipe = async (slug) => {
    const docRef = firebase.firestore().collection('recipes').doc(slug);

    const recipe = await docRef.get();

    if (recipe.exists) {
        return recipe.data();
    } else {
        console.log("No such recipe!");
    }
};

export const setRecipe = async (recipe) => {
    firebase.firestore().collection('recipes').doc(recipe.slug).set(recipe)
        .then(function () {
            console.log("Document successfully written!");
        })
        .catch(function (error) {
            console.error("Error writing document: ", error);
        });
};

export const deleteRecipe = async (slug) => {
    firebase.firestore().collection('recipes').doc(slug).delete();
};

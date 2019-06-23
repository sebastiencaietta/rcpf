import firebase from "firebase/app";

export const getRecipes = async () => {
    const snapshot = await firebase.firestore().collection("recipes").get();
    const recipes = [];
    snapshot.forEach((doc) => {
        recipes.push(doc.data());
    });

    return recipes;
};

import firebase from "firebase/app";

export const getRecipes = async () => {
    const snapshot = await firebase.firestore().collection("recipes").get();
    const recipes = [];
    snapshot.forEach((doc) => {
        recipes.push(doc.data());
    });

    return recipes;
};

export const getRecipe = async (slug) => {
    const docRef = firebase.firestore().collection('recipes').doc(slug);

    docRef.get().then(function (doc) {
        if (doc.exists) {
            console.log("Document data:", doc.data());
        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
        }
    }).catch(function (error) {
        console.log("Error getting document:", error);
    });
};

export const setRecipe = async (recipe) => {
    firebase.firestore().collection('recipes').doc(recipe.slug).set(recipe)
        .then(function() {
            console.log("Document successfully written!");
        })
        .catch(function(error) {
            console.error("Error writing document: ", error);
        });
};

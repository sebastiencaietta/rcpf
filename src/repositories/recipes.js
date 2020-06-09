import firebase from "firebase/app";

export const sortRecipeListAlphabetically = (recipeList) => {
    const sortedIds = Object.keys(recipeList).sort((a, b) => {
        const slugA = recipeList[a]['slug'];
        const slugB = recipeList[b]['slug'];
        return slugA < slugB ? -1 : slugA > slugB ? 1 : 0;
    });

    return sortedIds.map(id => ({...recipeList[id], id}))
};

export const sortRecipeArrayAlphabetically = (recipeArray) => {
    return recipeArray.sort((a, b) => {
        const slugA = a['slug'];
        const slugB = b['slug'];
        return slugA < slugB ? -1 : slugA > slugB ? 1 : 0;
    })
};

export const getRecipes = async () => {
    const snapshot = await firebase.firestore().collection('recipes').get();
    const recipes = [];
    snapshot.forEach((doc) => {
        recipes.push({...doc.data(), id: doc.id});
    });

    return recipes;
};

export const getRecipeList = async () => {
    const snapshot = await firebase.firestore().collection('cache').doc('recipeList').get();
    const cachedRecipeList = snapshot.data();
    return sortRecipeListAlphabetically(cachedRecipeList);
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

export const addRecipe = async (recipe) => {
    const docRef = await firebase.firestore().collection('recipes').add(recipe);

    return {
        ...recipe,
        id: docRef.id,
    };
};

export const updateRecipe = async (recipe) => {
    const db = firebase.firestore();
    await db.collection('recipes').doc(recipe.id).set(recipe);
    return recipe
};

export const uploadRecipeThumbnail = async (path, thumbnail) => {
    const metadata = {
        contentType: 'image/jpeg'
    };

    const dateString = new Date().toISOString().substring(0, 10).replace(/-/g, '');
    const storageRef = firebase.storage().ref(`images/recipes/${path}/thumbnail_${dateString}`);
    await storageRef.put(thumbnail, metadata);

    return await storageRef.getDownloadURL();
};

export const uploadRecipeHero = async (slug, hero) => {
    const metadata = {
        contentType: 'image/jpeg'
    };

    const dateString = new Date().toISOString().substring(0, 10).replace(/-/g, '');
    const storageRef = firebase.storage().ref(`images/recipes/${slug}/hero_${dateString}`);
    await storageRef.put(hero, metadata);

    return await storageRef.getDownloadURL();
};

export const deleteRecipe = async (id) => {
    return firebase.firestore().collection('recipes').doc(id).delete();
};

export const addTagForRecipes = async (recipeIds, tagId) => {
    const batch = firebase.firestore().batch();
    recipeIds.map(
        (recipeId) => batch.update(
            firebase.firestore().collection('recipes').doc(recipeId),
            {tags: firebase.firestore.FieldValue.arrayUnion(tagId)}
        ));
    await batch.commit();
};

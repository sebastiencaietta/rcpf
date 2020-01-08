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

export const uploadRecipeThumbnail = async (path, thumbnail) => {
    const metadata = {
        contentType: 'image/jpeg'
    };

    const storageRef = firebase.storage().ref();
    const uploadTask = storageRef.child(`images/recipes/${path}/thumbnail`).put(thumbnail, metadata);

    await uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
        function(snapshot) {
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');
            switch (snapshot.state) {
                case firebase.storage.TaskState.PAUSED: // or 'paused'
                    console.log('Upload is paused');
                    break;
                case firebase.storage.TaskState.RUNNING: // or 'running'
                    console.log('Upload is running');
                    break;
            }
        }, function(error) {
            // A full list of error codes is available at
            // https://firebase.google.com/docs/storage/web/handle-errors
            switch (error.code) {
                case 'storage/unauthorized':
                    console.log('// User doesnt have permission to access the object');
                    break;

                case 'storage/canceled':
                    console.log('// User canceled the upload');
                    break;

                case 'storage/unknown':
                    console.log('// Unknown error occurred, inspect error.serverResponse');
                    break;
            }
        }, function() {
            // Upload completed successfully, now we can get the download URL
            uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
                console.log('File available at', downloadURL);
                return downloadURL;
            });
        });

    return uploadTask.snapshot.ref.getDownloadURL();
};

export const deleteRecipe = async (slug) => {
    firebase.firestore().collection('recipes').doc(slug).delete();
};

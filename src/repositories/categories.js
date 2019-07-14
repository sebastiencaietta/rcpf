import firebase from 'firebase/app';

export const getCategories = async () => {
    const db = firebase.firestore();
    const snapshot = await db.collection("categories").get();
    const categories = [];
    snapshot.forEach((doc) => {
        categories.push({
            ...doc.data(),
            id: doc.id
        });
    });

    return categories;
};

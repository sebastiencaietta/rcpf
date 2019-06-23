import firebase from 'firebase/app';

export const getTags = async () => {
    const snapshot = await firebase.firestore().collection("tags").get();
    const tags = [];
    snapshot.forEach((doc) => {
        tags.push(doc.data());
    });

    return tags;
};
import firebase from "firebase";
import 'firebase/auth';

export const onUserUpdate = (observer) => {
    firebase.auth().onAuthStateChanged(observer)
};

export const signIn = async (email, password) => {
    return new Promise((resolve, reject) => {
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then((userCreds) => resolve(userCreds))
            .catch((reason) => reject(reason));
    });
};

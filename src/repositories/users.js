import firebase from "firebase";
import 'firebase/auth';

export const onUserUpdate = (observer) => {
    firebase.auth().onAuthStateChanged(observer)
};

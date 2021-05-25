import firebase from "firebase/app";
import 'firebase/auth';
import 'firebase/firestore';
import {ROLE_USER} from "../global/constants/roles";

export const onUserUpdate = (observer) => firebase.auth().onAuthStateChanged(observer)

export const signIn = (email, password) => {
    return firebase.auth().signInWithEmailAndPassword(email, password)
        .catch(error => Promise.reject(error));
};

export const logout = () => firebase.auth().signOut();

export const signUp = async (email, password, firstName, lastName) => {
    await firebase.auth().createUserWithEmailAndPassword(email, password);
    const user = firebase.auth().currentUser;
    await firebase.firestore().collection('users').doc(user.uid).set({email, firstName, lastName, role: ROLE_USER});
    await user.updateProfile({displayName: firstName});
    await user.sendEmailVerification();
    await firebase.auth().signOut();
    await firebase.auth().signInWithEmailAndPassword(email, password);
};

export const getUser = async (userId) => {
    const snapshot = await firebase.firestore().collection('users').doc(userId).get();
    return snapshot.data();
};

export const sendVerifyEmailAddressMail = () => firebase.auth().currentUser.sendEmailVerification();

export const verifyEmail = (oobCode, apiKey) => firebase.auth().applyActionCode(oobCode);

export const forgotPassword = (email) => firebase.auth().sendPasswordResetEmail(email);

export const resetPassword = (oobCode, password) => firebase.auth().confirmPasswordReset(oobCode, password);

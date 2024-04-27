import React, {createContext, useContext, useEffect, useState} from "react";
import {
    forgotPassword,
    getUser,
    logout,
    onUserUpdate,
    resetPassword,
    sendVerifyEmailAddressMail,
    signIn,
    signUp,
    verifyEmail
} from "../repositories/users";
import firebase from "firebase";

const authContext = createContext({user: {authStatusReported: false, user: {}, signedIn: false}});

export function ProvideAuth({children}) {
    const auth = useProvideAuth();
    return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export const useAuth = () => {
    return useContext(authContext);
};

export const listenToUserLists = (userId, onNext) => {
    return firebase.firestore().collection("users").doc(userId).collection('lists').onSnapshot(onNext);
};

function useProvideAuth() {
    const [user, setUser] = useState({authStatusReported: false, user: {}, signedIn: false});

    const userObserver = async (user) => {
        if (user && user.displayName) {
            const dbUser = await getUser(user.uid);
            const {role, lists} = dbUser;
            const {email, emailVerified, displayName, uid} = user;
            setUser({
                authStatusReported: true,
                user: {email, emailVerified, firstName: displayName || email, role, uid},
                lists,
                signedIn: true
            });
        } else {
            setUser({authStatusReported: true, user: {}, signedIn: false});
        }
    }

    useEffect(() => {
        return onUserUpdate(userObserver);
    }, []);

    useEffect(() => {
        if (user.user.uid === undefined) {
            return () => {};
        }

        const unsubscribeFromLists = listenToUserLists(user.user.uid, (querySnapshot) => {
            const lists = [];
            querySnapshot.forEach(function (docRef) {
                lists.push({...docRef.data(), id: docRef.id});
            });

            setUser((user) => ({...user, lists}));
        });

        return () => {unsubscribeFromLists()};
    }, [user.user.uid]);

    return {
        user,
        signIn,
        signUp,
        logout,
        sendVerifyEmailAddressMail,
        resetPassword,
        forgotPassword,
        getUser,
        verifyEmail
    };
}

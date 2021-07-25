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

const authContext = createContext({user: {authStatusReported: false, user: {}, signedIn: false}});

export function ProvideAuth({children}) {
    const auth = useProvideAuth();
    return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export const useAuth = () => {
    return useContext(authContext);
};

function useProvideAuth() {
    const [user, setUser] = useState({authStatusReported: false, user: {}, signedIn: false});

    const userObserver = async (user) => {
        if (user && user.displayName) {
            const dbUser = await getUser(user.uid);
            const {role} = dbUser;
            const {email, emailVerified, displayName, uid} = user;
            setUser({
                authStatusReported: true,
                user: {email, emailVerified, firstName: displayName || email, role, uid},
                signedIn: true
            });
        } else {
            setUser({authStatusReported: true, user: {}, signedIn: false});
        }
    }

    useEffect(() => {
        return onUserUpdate(userObserver);
    }, []);

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

import React from 'react';
import {signIn} from "../../repositories/users";
import SignInFormComponent from '../components/sign-in-form';
import Bugsnag from "@bugsnag/js";
import {ERROR_LOGIN_TOO_MANY_ATTEMPS, INVALID_EMAIL_PASSWORD} from "../../global/constants/errors";

const SignInForm = ({onSignUpClick, onForgottenPasswordClick}) => {
    const handleSubmitSignIn = async (email, password) => {
        try {
            await signIn(email, password);
        } catch (error) {
            Bugsnag.notify(error);

            if (error.code === "auth/user-not-found" || error.code === "auth/wrong-password") {
                throw new Error(INVALID_EMAIL_PASSWORD);
            }

            if (error.code === "auth/too-many-requests") {
                throw new Error(ERROR_LOGIN_TOO_MANY_ATTEMPS);
            }

            throw error;
        }
    }


    return <SignInFormComponent onSignIn={handleSubmitSignIn}
                                onSignUpClick={onSignUpClick}
                                onForgottenPasswordClick={onForgottenPasswordClick}/>
}

export default SignInForm;

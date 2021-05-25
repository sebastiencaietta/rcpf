import React from 'react';
import ForgottenPasswordFormComponent from "../components/forgotten-password-form";
import {forgotPassword} from "../../repositories/users";
import Bugsnag from "@bugsnag/js";

const ForgottenPasswordForm = ({onSignInClick}) => {
    const handleSubmitForgottenPassword = async (email) => {
        try {
            await forgotPassword(email);
        } catch (error) {
            Bugsnag.notify(error);
            switch (error.code) {
                case "auth/invalid-email":
                    throw new Error("L'adresse email n'est pas valide");
                case "auth/user-not-found":
                    // Do not do anything
                    break;
                default:
                    throw error;
            }
        }
    }

    return <ForgottenPasswordFormComponent onSignInClick={onSignInClick} onSubmit={handleSubmitForgottenPassword}/>
}

export default ForgottenPasswordForm;

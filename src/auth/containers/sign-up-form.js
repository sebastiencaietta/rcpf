import React from 'react';
import {signUp} from "../../repositories/users";
import SignUpFormComponent from '../components/sign-up-form';
import Bugsnag from "@bugsnag/js";

const SignUpForm = ({onSignInClick}) => {
    const handleSubmitSignUp = async (email, password, firstName, lastName) => {
        try {
            await signUp(email, password, firstName, lastName);
        } catch (error) {
            Bugsnag.notify(error);
            switch (error.code) {
                case "auth/email-already-in-use":
                    throw new Error("Cette adresse email est deja utilisée.");
                case "auth/invalid-email":
                    throw new Error("L'adresse email n'est pas valide");
                case "auth/weak-password":
                    throw new Error("Mot de passe trop faible");
                default:
                    throw error;
            }
        }
    }

    return <SignUpFormComponent onSignInClick={onSignInClick} onSignUp={handleSubmitSignUp}/>
}

export default SignUpForm;

import React, {useState} from "react";
import SignInForm from "./sign-in-form";
import SignUpForm from "./sign-up-form";
import ForgottenPasswordForm from "./forgotten-password-form";

const SignIn = () => {
    const [shownForm, setShownForm] = useState('signIn');

    const handleSignUpClick = () => {
        setShownForm('signUp');
    }

    const handleSignInClick = () => {
        setShownForm('signIn');
    }

    const handleForgottenPasswordClick = () => {
        setShownForm('forgottenPassword');
    }

    return shownForm === 'signIn'
            ? <SignInForm onForgottenPasswordClick={handleForgottenPasswordClick}
                          onSignUpClick={handleSignUpClick}
            />
            : shownForm === 'signUp' ? <SignUpForm onSignInClick={handleSignInClick}
            />
                : <ForgottenPasswordForm onSignInClick={handleSignInClick}/>

    ;
};

export default SignIn;

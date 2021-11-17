import React from 'react';
import {resetPassword} from "../../repositories/users";
import Layout from "../../layout";
import ResetPassword from "../components/reset-password";
import VerifyEmail from "../components/verify-email";
import Bugsnag from "@bugsnag/js";
import Container from "../../layout/container";

const AuthActions = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const mode = urlParams.get('mode');
    const oobCode = urlParams.get('oobCode');
    const apiKey = urlParams.get('apiKey');

    const handleResetPassword = async (password) => {
        try {
            await resetPassword(oobCode, password);
        } catch (error) {
            Bugsnag.notify(error);

            if(error.code === "auth/invalid-action-code") {
                throw new Error('Ce code a déjà été utilisé');
            }

            throw error;
        }
    }

    if (mode === 'resetPassword') {
        return <Layout>
            <Container>
                <ResetPassword onSubmit={handleResetPassword}/>
            </Container>
        </Layout>
    }

    if (mode === 'verifyEmail') {
        return <Layout>
            <Container>
                <VerifyEmail oobCode={oobCode} apiKey={apiKey}/>
            </Container>
        </Layout>
    }
};

export default AuthActions;

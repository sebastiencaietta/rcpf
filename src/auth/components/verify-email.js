import React, {useEffect, useState} from 'react';
import {verifyEmail} from "../../repositories/users";
import Layout from "../../layout";
import Typography from "@material-ui/core/Typography";
import CircularProgress from "@material-ui/core/CircularProgress";
import Bugsnag from "@bugsnag/js";
import Container from "../../layout/container";

const VerifyEmail = ({oobCode, apiKey}) => {
    const [emailVerified, setEmailVerified] = useState(false);

    useEffect(() => {
        verifyEmail(oobCode, apiKey).then(() => setEmailVerified(true)).catch(error => Bugsnag.notify(error));
    }, [oobCode, apiKey]);

    if (emailVerified) {
        return <Layout>
            <Container justifyContent="center">
                <Typography variant="body2">
                    Votre adresse email a bien été vérifiée. Vous pouvez fermer cette page et retourner a une activité normale.
                    A'ciao bon dimanche!
                </Typography>
            </Container>
        </Layout>
    }

    return <Layout>
        <Container justifyContent="center">
            <CircularProgress />
        </Container>
    </Layout>;
}

export default VerifyEmail;

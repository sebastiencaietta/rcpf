import React, {useEffect, useState} from 'react';
import {verifyEmail} from "../../repositories/users";
import Layout from "../../layout";
import Typography from "@material-ui/core/Typography";
import CircularProgress from "@material-ui/core/CircularProgress";
import {makeStyles} from "@material-ui/core/styles";
import Bugsnag from "@bugsnag/js";

const useStyles = makeStyles(() => ({
    root: {display: 'flex', height: '90vh', alignItems: 'center', justifyContent: 'center'},
}))

const VerifyEmail = ({oobCode, apiKey}) => {
    const [emailVerified, setEmailVerified] = useState(false);
    const classes = useStyles();

    useEffect(() => {
        verifyEmail(oobCode, apiKey).then(() => setEmailVerified(true)).catch(error => Bugsnag.notify(error));
    }, []);

    if (emailVerified) {
        return <Layout>
            <div style={{display: 'flex', height: '90vh', alignItems: 'center', justifyContent: 'center'}}>
                <Typography variant="body2">
                    Votre adresse email a bien été vérifiée. Vous pouvez fermer cette page et retourner a une activité normale.
                    A'ciao bon dimanche!
                </Typography>
            </div>
        </Layout>
    }

    return <Layout>
        <div className={classes.root}>
            <CircularProgress />
        </div>
    </Layout>;
}

export default VerifyEmail;

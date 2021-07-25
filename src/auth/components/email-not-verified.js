import React, {useState} from 'react';
import Typography from "@material-ui/core/Typography";
import {sendVerifyEmailAddressMail} from "../../repositories/users";
import Link from '@material-ui/core/Link';
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import {makeStyles} from "@material-ui/core";
import ErrorMessage from "../../global/components/error-message";
import Bugsnag from "@bugsnag/js";

const useStyles = makeStyles(theme => ({
    root: {position: "absolute", transform: "translateY(-50%)", top: "50%", width: "100%"},
    paper: {padding: theme.spacing(3), '&>p': {marginBottom: theme.spacing(1.5)}},
    p: {},
    email: {fontStyle: "italic"},
}));

const EmailNotVerified = ({email}) => {
    const [emailSent, setEmailSent] = useState(false);
    const [error, setError] = useState('');
    const classes = useStyles();

    const onSendEmailClick = (e) => {
        setError('');
        e.preventDefault();
        sendVerifyEmailAddressMail()
            .then(() => setEmailSent(true))
            .catch((error) => {
                Bugsnag.notify(error);
                if (error.code === 'auth/too-many-requests') {
                    setError(`Trop de requetes d'envoi de mail, veuillez patienter une minute avant de rééssayer`);
                }
            });
    };

    return <div className={classes.root}>
        <Grid container justifyContent="center" alignContent="center">
            <Grid item md={6} xs={12} sm={8}>
                <Paper className={classes.paper}>
                    <Typography variant="h5" className={classes.p}>Vérifiez votre adresse email</Typography>
                    <Typography variant="body1" className={classes.p}>
                        Un email a été envoyé a <span className={classes.email}>{email}</span> vous permettant de
                        vérifier votre adresse email.
                    </Typography>
                    <Typography variant="body1" className={classes.p}>
                        Cliquez sur le lien présent dans cet email et revenez sur cette page.
                    </Typography>
                    {
                        emailSent
                            ? <Typography variant="body2" className={classes.p}>L'email de vérification vient d'être
                                envoyé avec succès</Typography>
                            :
                            <Typography variant="body2" className={classes.p}>
                                Si vous n'avez pas reçu d'email ou le lien n'est plus valide, vous pouvez
                                <Link href="#" onClick={onSendEmailClick}> réessayer en cliquant sur ce lien</Link>
                            </Typography>
                    }
                    {
                        error
                            ? <ErrorMessage error={error}/>
                            : ''
                    }
                </Paper>
            </Grid>
        </Grid>
    </div>
};

export default EmailNotVerified;

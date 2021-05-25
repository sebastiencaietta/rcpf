import React, {useState} from 'react';
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import ErrorMessage from "../../global/components/error-message";
import Link from "@material-ui/core/Link";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles(theme => ({
    root: {position: "absolute", transform: "translateY(-50%)", top: "50%", width: "100%"},
    input: {
        marginBottom: theme.spacing(3),
    },
    paper: {
        padding: theme.spacing(3),
    },
    test: {
        marginBottom: theme.spacing(1),
        textAlign: "center",
    }
}));

const ForgottenPasswordForm = ({onSubmit, onSignInClick}) => {
    const [email, setEmail] = useState('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const classes = useStyles();

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    }

    const handleSignInClick = (event) => {
        event.preventDefault();
        onSignInClick();
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        try {
            await onSubmit(email);
            setLoading(false);
            setSuccess(true);
        } catch (error) {
            setError(error.message);
            setLoading(false);
        }
    }

    return <div className={classes.root}>
        <Grid container justify="center" alignContent="center">
            <Grid item md={6} xs={12} sm={8}>
                <Paper className={classes.paper}>
                    <Typography variant="h5">Réinitialiser mon mot de passe</Typography>
                    <Typography variant="body2">
                        Saisissez l'adresse email que vous avez utilisée pour créer votre compte
                        afin de recevoir un lien de réinitialisation de mot de passe.
                    </Typography>
                    <form noValidate autoComplete="off"
                          style={{display: 'flex', flexDirection: 'column', width: '100%', padding: "24px"}}
                          onSubmit={handleSubmit}>
                        <TextField id="email" label="Email" type="email" value={email} className={classes.input}
                                   onChange={handleEmailChange}/>

                        <Button variant="contained" color="primary" type="submit" className={classes.input}
                                disabled={loading || success}>
                            {loading ? <CircularProgress/> : 'Réinitialiser'}
                        </Button>

                        {
                            success
                            ? <Typography variant="body2">
                                Si votre adresse e-mail existe dans notre système, vous recevrez d'ici peu un lien pour
                                réinitialiser votre mot de passe.
                            </Typography>
                            : ''
                        }

                        {
                            error
                                ? <ErrorMessage error={error}/>
                                : ''
                        }
                    </form>
                </Paper>
                <Link href="#" onClick={handleSignInClick}>Retour au login</Link>
            </Grid>
        </Grid>
    </div>
}

export default ForgottenPasswordForm;

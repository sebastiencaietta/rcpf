import React, {useState} from "react";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import {makeStyles} from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";
import ErrorMessage from '../../global/components/error-message';
import Link from "@material-ui/core/Link";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles(theme => ({
    root: {position: "absolute", transform: "translateY(-50%)", top: "50%", width: "100%"},
    paper: {padding: theme.spacing(3)},
    input: {
        marginBottom: theme.spacing(3),
    },
}));

const SignInForm = ({onSignIn, onForgottenPasswordClick, onSignUpClick}) => {
    const [form, setForm] = useState({email: '', password: ''});
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const classes = useStyles();

    const handleFieldChange = (field, value) => {
        setForm({...form, [field]: value});
    }

    const onSubmitForm = async (event) => {
        event.preventDefault();
        setError(null);
        setLoading(true);
        try {
            await onSignIn(form.email, form.password);
        } catch (error) {
            setError(error.message);
            setLoading(false);
        }
    }

    const handleForgottenPasswordClick = (e) => {
        e.preventDefault();
        onForgottenPasswordClick();
    }

    const handleSignupClick = (e) => {
        e.preventDefault();
        onSignUpClick();
    }

    const ForgottenPassword = () => <Link href="#" onClick={handleForgottenPasswordClick}>
        J'ai oublié mon mot de passe
    </Link>;

    return <div className={classes.root}>
        <Grid container justify="center" alignContent="center">
            <Grid item md={6} xs={12} sm={8}>
                <Paper className={classes.paper}>
                    <Typography variant="h5">Deja enregistré?</Typography>
                    <Typography variant="body2">Identifiez-vous</Typography>
                    <form noValidate autoComplete="off"
                          style={{display: 'flex', flexDirection: 'column', width: '100%', padding: "24px"}}
                          onSubmit={onSubmitForm}>
                        <TextField id="email" label="Email" type="email" value={form.email} className={classes.input}
                                   onChange={(e) => handleFieldChange('email', e.target.value)}/>
                        <TextField id="password" label="Mot de passe" type="password" value={form.password}
                                   className={classes.input}
                                   onChange={(e) => handleFieldChange('password', e.target.value)}
                                   helperText={<ForgottenPassword/>}
                        />
                        <Button variant="contained" color="primary" type="submit" className={classes.input}
                                disabled={loading}>
                            {loading ? <CircularProgress/> : 'Login'}
                        </Button>

                        {
                            error
                                ? <ErrorMessage error={error}/>
                                : ''
                        }
                    </form>
                </Paper>
                <Link href="#" onClick={handleSignupClick}>Créer un compte</Link>
            </Grid>
        </Grid>
    </div>
}

export default SignInForm;

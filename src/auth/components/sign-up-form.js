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
    input: {marginBottom: theme.spacing(3)},
    form: {display: 'flex', flexDirection: 'column', width: '100%', padding: "24px"},
}));

const SignUpForm = ({onSignUp, onSignInClick}) => {
    const [form, setForm] = useState({
        firstName: {pristine: true, value: '', showErrors: false},
        lastName: {pristine: true, value: '', showErrors: false},
        email: {pristine: true, value: '', showErrors: false},
        password: {pristine: true, value: '', showErrors: false},
        confirmPassword: {pristine: true, value: '', showErrors: false},
        submitted: false,
        errors: {}
    });
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const classes = useStyles();

    const handleFieldChange = (field, value) => {
        const updatedForm = {...form, [field]: {...form[field], value: value, pristine: false}};
        const errors = getErrors(updatedForm);
        setForm({...updatedForm, errors});
    }

    const handleFieldBlur = (field) => {
        const updatedForm = {...form, [field]: {...form[field], pristine: false, showErrors: true}};
        const errors = getErrors(updatedForm);
        setForm({...updatedForm, errors});
    }

    const onSubmitForm = async (event) => {
        event.preventDefault();
        try {
            setLoading(true);
            await onSignUp(form.email.value, form.password.value, form.firstName.value, form.lastName.value);
        } catch (error) {
            setError(error.message);
            setLoading(false);
        }
    }

    const handleSignInClick = (e) => {
        e.preventDefault();
        onSignInClick();
    }

    const getErrors = (form) => {
        const errors = {};
        ['firstName', 'email', 'password', 'confirmPassword'].forEach((field) => {
            if (!form[field].pristine && !form[field].value) {
                errors[field] = 'Obligatoire';
            }
        });

        if (form.email.value !== '' && form.email.value.match(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/) === null) {
            errors['email'] = 'Une vraie adresse email';
        }

        if (!form.password.value !== '' && form.password.value.length < 10) {
            errors['password'] = 'Le mot de passe doit contenir plus de 10 lettres/chiffres';
        }

        if (!form.confirmPassword.pristine && form.password.value !== form.confirmPassword.value) {
            errors['confirmPassword'] = 'La confirmation de mot de passe est différente de celle préalablement saisie.'
        }

        return errors;
    };

    const canSubmitForm = () => {
        if (Object.keys(form.errors).length > 0) {
            return false;
        }

        return ['firstName', 'email', 'password', 'confirmPassword'].every(field => form[field].value !== '');
    }

    return <div className={classes.root}>
        <Grid container justifyContent="center" alignContent="center">
            <Grid item md={6} xs={12} sm={8}>
                <Paper className={classes.paper}>
                    <Typography variant="h5">Nouveau sur le site?</Typography>
                    <Typography variant="body2">Créez un compte</Typography>
                    <form noValidate autoComplete="off"
                          className={classes.form}
                          onSubmit={onSubmitForm}>
                        <TextField id="firstName" label="Prénom" type="text" value={form.firstName.value}
                                   className={classes.input}
                                   required
                                   onChange={(e) => handleFieldChange('firstName', e.target.value)}
                                   onBlur={() => handleFieldBlur('firstName')}
                                   helperText={form.firstName.showErrors && form.errors.firstName}
                                   error={form.errors.firstName !== undefined && form.firstName.showErrors}/>

                        <TextField id="lastName" label="Nom de famille" type="text" value={form.lastName.value}
                                   className={classes.input}
                                   onChange={(e) => handleFieldChange('lastName', e.target.value)}
                                   onBlur={() => handleFieldBlur('lastName')}
                                   helperText={form.lastName.showErrors && form.errors.lastName}
                                   error={form.errors.lastName !== undefined && form.lastName.showErrors}/>

                        <TextField id="email" label="Email" type="email" value={form.email.value}
                                   className={classes.input}
                                   required
                                   onChange={(e) => handleFieldChange('email', e.target.value)}
                                   onBlur={() => handleFieldBlur('email')}
                                   helperText={form.email.showErrors && form.errors.email}
                                   error={form.errors.email !== undefined && form.email.showErrors}/>

                        <TextField id="password" label="Mot de passe" type="password" value={form.password.value}
                                   className={classes.input}
                                   required
                                   onChange={(e) => handleFieldChange('password', e.target.value)}
                                   onBlur={() => handleFieldBlur('password')}
                                   helperText={form.password.showErrors && form.errors.password}
                                   error={form.errors.password !== undefined && form.password.showErrors}
                        />
                        <TextField id="confirm" label="Confirmation du mot de passe" type="password"
                                   value={form.confirmPassword.value} className={classes.input}
                                   required
                                   onChange={(e) => handleFieldChange('confirmPassword', e.target.value)}
                                   onBlur={() => handleFieldBlur('confirmPassword')}
                                   helperText={form.confirmPassword.showErrors && form.errors.confirmPassword}
                                   error={form.errors.confirmPassword !== undefined && form.confirmPassword.showErrors}/>

                        <Button variant="contained" color="primary" type="submit" className={classes.input}
                                disabled={loading || !canSubmitForm()}>
                            {loading ? <CircularProgress/> : 'Créer mon compte'}
                        </Button>
                        {
                            error
                                ? <ErrorMessage error={error}/>
                                : ''
                        }
                    </form>
                </Paper>
                <Link href="#" onClick={handleSignInClick}>J'ai déja un compte</Link>
            </Grid>
        </Grid>
    </div>
}

export default SignUpForm;

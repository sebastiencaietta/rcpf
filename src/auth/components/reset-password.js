import React, {useState} from 'react';
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import {makeStyles} from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import ErrorMessage from "../../global/components/error-message";

const useStyles = makeStyles(theme => ({
    root: {position: "absolute", transform: "translateY(-50%)", top: "50%", width: "100%"},
    paper: {padding: theme.spacing(3)},
    input: {marginBottom: theme.spacing(3)},
    form: {display: 'flex', flexDirection: 'column', width: '100%', padding: "24px"},
}));

const ResetPassword = ({onSubmit}) => {
    const [form, setForm] = useState({
        password: {pristine: true, value: '', showErrors: false},
        confirmPassword: {pristine: true, value: '', showErrors: false},
        submitted: false,
        errors: {}
    });
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
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

    const getErrors = (form) => {
        const errors = {};
        ['password', 'confirmPassword'].forEach((field) => {
            if (!form[field].pristine && !form[field].value) {
                errors[field] = 'Ce champ est obligatoire';
            }
        });

        if (!form.password.value !== '' && form.password.value.length < 10) {
            errors['password'] = 'Le mot de passe doit contenir plus de 10 lettres/chiffres';
        }

        if (!form.confirmPassword.pristine && form.password.value !== form.confirmPassword.value) {
            errors['confirmPassword'] = 'La confirmation de mot de passe est différente de celle préalablement saisie.'
        }

        return errors;
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        try {
            await onSubmit(form.password.value);
            setSuccess(true);
            setLoading(false);
        } catch (error) {
            setError(error.message);
            setLoading(false);
        }
    }

    const canSubmitForm = () => {
        if (Object.keys(form.errors).length > 0) {
            return false;
        }

        return ['password', 'confirmPassword'].every(field => form[field].value !== '');
    }

    return <div className={classes.root}>
        <Grid container justify="center" alignContent="center">
            <Grid item md={6} xs={12} sm={8}>
                <Paper className={classes.paper}>
                    <Typography variant="h5">Réinitialisation du mot de passe</Typography>

                    <form onSubmit={handleSubmit} className={classes.form}>

                        <TextField id="password" label="Nouveau mot de passe" type="password"
                                   value={form.password.value}
                                   className={classes.input}
                                   required
                                   onChange={(e) => handleFieldChange('password', e.target.value)}
                                   onBlur={() => handleFieldBlur('password')}
                                   helperText={form.password.showErrors && form.errors.password}
                                   error={form.errors.password !== undefined && form.password.showErrors}
                        />
                        <TextField id="confirm" label="Confirmation du nouveau mot de passe" type="password"
                                   value={form.confirmPassword.value}
                                   required
                                   className={classes.input}
                                   onChange={(e) => handleFieldChange('confirmPassword', e.target.value)}
                                   onBlur={() => handleFieldBlur('confirmPassword')}
                                   helperText={form.confirmPassword.showErrors && form.errors.confirmPassword}
                                   error={form.errors.confirmPassword !== undefined && form.confirmPassword.showErrors}/>

                        <Button variant="contained" color="primary" type="submit" className={classes.input}
                                disabled={loading || !canSubmitForm() || success}>
                            {loading ? <CircularProgress/> : 'Mettre a jour le mot de passe'}
                        </Button>
                        {
                            success
                                ? <Typography variant="body2">
                                    Votre mot de passe a bien été réinitialisé. Veuillez utiliser ce nouveau mot de passe lors de vos prochaines connexions.
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
            </Grid>
        </Grid>
    </div>
}

export default ResetPassword;

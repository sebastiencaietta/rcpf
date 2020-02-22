import React, {useState} from "react";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import {makeStyles} from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";
import ErrorMessage from './error-message';

const useStyles = makeStyles(theme => ({
    input: {
        marginBottom: theme.spacing(3),
    },
}));

export default function signInForm({onSubmit, loading, error}) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const classes = useStyles();

    function onSubmitForm(event) {
        event.preventDefault();
        onSubmit(email, password);
    }

    return <Grid container justify="center" alignContent="center">
        <Grid item md={6} xs={12} sm={8}>
            <form noValidate autoComplete="off" style={{display: 'flex', flexDirection: 'column', width: '100%'}}
                  onSubmit={onSubmitForm}>
                <TextField id="email" label="Email" type="email" value={email} className={classes.input}
                           onChange={(e) => setEmail(e.target.value)}/>
                <TextField id="password" label="Password" type="password" value={password} className={classes.input}
                           onChange={(e) => setPassword(e.target.value)}/>
                <Button variant="contained" color="primary" type="submit" className={classes.input} disabled={loading}>
                    {loading ? <CircularProgress/> : 'Sign in'}
                </Button>

                {
                    error
                        ? <ErrorMessage error={error} />
                        : ''
                }
            </form>
        </Grid>
    </Grid>
}

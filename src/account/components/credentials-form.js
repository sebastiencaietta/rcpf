import React from 'react';
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import {useAuth} from "../../auth/use-auth";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
    grow: {flexGrow: 1},
}));

const CredentialsForm = ({onEmailUpdate, onPasswordUpdate}) => {
    const auth = useAuth();
    const {user} = auth.user;
    const classes = useStyles();

    return <Grid container spacing={3}>
        <Grid item xs={12}>
            <Grid container spacing={1} alignItems="flex-end">
                <Grid item className={classes.grow}>
                    <TextField type="text" fullWidth value={user.firstName} disabled label="Prénom"/>
                </Grid>
                <Grid item className={classes.grow}>
                    <TextField type="text" fullWidth value={user.lastName} disabled label="Nom de famille"/>
                </Grid>
            </Grid>
        </Grid>
        <Grid item xs={12} sm={6}>
            <Grid container spacing={1} alignItems="flex-end">
                <Grid item className={classes.grow}>
                    <TextField type="email" fullWidth value={user.email} disabled label="Email"/>
                </Grid>
            </Grid>
        </Grid>
        <Grid item xs={12} sm={6}>
            <Grid container spacing={1} alignItems="flex-end">
                <Grid item className={classes.grow}>
                    <TextField type="password" fullWidth value="*************" disabled label="Mot de passe"/>
                </Grid>
            </Grid>
        </Grid>
    </Grid>
}

export default CredentialsForm;

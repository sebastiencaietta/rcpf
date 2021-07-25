import React from 'react';
import Layout from "../layout";
import Hero from "../global/components/hero";
import {Paper} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import CredentialsForm from "./components/credentials-form";
import AccountSettings from "./components/account-settings";
import {Helmet} from "react-helmet-async";

const useStyles = makeStyles(theme => ({
    paper: {padding: theme.spacing(3), margin: theme.spacing(5, 0)},
    sectionTitle: {paddingBottom: theme.spacing(2), marginBottom: theme.spacing(4), borderBottom: "1px solid " + theme.palette.grey.A100},
}));

const MyAccount = () => {
    const classes = useStyles();

    return <Layout hero={<Hero title="Mon espace personnel" titleSize="2rem" bg="./images/account-bg.jpg"/>}>
        <Helmet>
            <title>CookMate | Mon compte</title>
        </Helmet>

        <Paper className={classes.paper}>
            <Typography variant="h4" className={classes.sectionTitle}>Mon profil</Typography>
            <CredentialsForm/>
        </Paper>

        <Paper className={classes.paper}>
            <Typography variant="h4" className={classes.sectionTitle}>Paramètres</Typography>
            <AccountSettings/>
        </Paper>
    </Layout>;
}

export default MyAccount;

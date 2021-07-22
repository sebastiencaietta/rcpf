import React, {useEffect} from 'react';
import {useHistory, useLocation} from "react-router-dom";
import Layout from "../../layout";
import SignIn from "./sign-in";
import {useAuth} from "../use-auth";
import EmailNotVerified from "../components/email-not-verified";
import CircularProgress from "@material-ui/core/CircularProgress";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
    root: {position: "absolute", transform: "translateY(-50%)", top: "50%", width: "100%", textAlign: "center"},
}));

const LoginPage = () => {
    const auth = useAuth();
    let history = useHistory();
    let location = useLocation();
    const classes = useStyles();
    let {from} = location.state || {from: {pathname: "/"}};

    useEffect(() => {
       if (auth.user.authStatusReported && auth.user.signedIn && auth.user.user.firstName && auth.user.user.emailVerified) {
           history.push(from);
       }
    }, [auth]);

    if (!auth.user.authStatusReported) {
        return <Layout>
            <div className={classes.root}>
                <CircularProgress/>
            </div>
        </Layout>;
    }

    if (!auth.user.signedIn || !auth.user.user.firstName) {
        return <Layout>
            <SignIn/>
        </Layout>
    }

    if (!auth.user.user.emailVerified) {
        return <Layout>
            <EmailNotVerified email={auth.user.email}/>
        </Layout>
    }

    return <Layout>
        <div className={classes.root}>
            <CircularProgress/>
        </div>
    </Layout>;
};

export default LoginPage;

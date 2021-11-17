import React, {useEffect} from 'react';
import {useHistory, useLocation} from "react-router-dom";
import Layout from "../../layout";
import SignIn from "./sign-in";
import {useAuth} from "../use-auth";
import EmailNotVerified from "../components/email-not-verified";
import CircularProgress from "@material-ui/core/CircularProgress";
import Container from "../../layout/container";

const LoginPage = () => {
    const auth = useAuth();
    let history = useHistory();
    let location = useLocation();
    let {from} = location.state || {from: {pathname: "/"}};

    useEffect(() => {
       if (auth.user.authStatusReported && auth.user.signedIn && auth.user.user.firstName && auth.user.user.emailVerified) {
           history.push(from);
       }
    }, [history, from, auth]);

    if (!auth.user.authStatusReported) {
        return <Layout>
            <Container justifyContent="center">
                <CircularProgress/>
            </Container>
        </Layout>;
    }

    if (!auth.user.signedIn || !auth.user.user.firstName) {
        return <Layout>
            <Container justifyContent="center">
                <SignIn/>
            </Container>
        </Layout>
    }

    if (!auth.user.user.emailVerified) {
        return <Layout>
            <Container justifyContent="center">
                <EmailNotVerified email={auth.user.email}/>
            </Container>
        </Layout>
    }

    return <Layout>
        <Container justifyContent="center">
            <CircularProgress/>
        </Container>
    </Layout>;
};

export default LoginPage;

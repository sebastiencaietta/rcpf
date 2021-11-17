import React from 'react';
import CircularProgress from "@material-ui/core/CircularProgress";
import {makeStyles} from "@material-ui/core/styles";
import {useAuth} from "../../auth/use-auth";
import {Redirect, Route} from "react-router-dom";
import Layout from "../../layout";
import BlockIcon from '@material-ui/icons/Block';
import {ROLE_ADMIN} from "../constants/roles";
import Container from "../../layout/container";

const useStyles = makeStyles((theme) => ({
    denied: {fontSize: theme.typography.pxToRem(128), color: theme.palette.error.main}
}));

const RoleRestrictedPage = ({userRole, component, children, ...props}) => {
    const classes = useStyles();
    const auth = useAuth();
    const {authStatusReported, signedIn, user} = auth.user;

    const getRenderedComponent = ({location, ...props}) => {
        if (!authStatusReported) {
            return <Layout>
                <Container justifyContent="center">
                    <CircularProgress/>
                </Container>
            </Layout>;
        }

        if (!signedIn || !user.emailVerified) {
            return <Redirect
                to={{
                    pathname: "/login",
                    state: {from: location}
                }}
            />
        }

        if (user.role !== ROLE_ADMIN && user.role !== userRole) {
            return <Layout>
                <Container justifyContent="center">
                    <BlockIcon className={classes.denied}/>
                </Container>
            </Layout>;
        }

        return React.cloneElement(children, props);
    };

    return (
        <Route
            {...props}
            render={getRenderedComponent}
        />
    );

};

export default RoleRestrictedPage;

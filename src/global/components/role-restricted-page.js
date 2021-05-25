import React from 'react';
import CircularProgress from "@material-ui/core/CircularProgress";
import {makeStyles} from "@material-ui/core/styles";
import {useAuth} from "../../auth/use-auth";
import {Redirect, Route} from "react-router-dom";
import Layout from "../../layout";
import BlockIcon from '@material-ui/icons/Block';
import {ROLE_ADMIN} from "../constants/roles";

const useStyles = makeStyles((theme) => ({
    root: {position: "absolute", transform: "translateY(-50%)", top: "50%", width: "100%", textAlign: "center"},
    denied: {fontSize: theme.typography.pxToRem(128), color: theme.palette.error.main}
}));

const RoleRestrictedPage = ({userRole, component, children, ...props}) => {
    const classes = useStyles();
    const auth = useAuth();
    const {authStatusReported, signedIn, user} = auth.user;

    const getRenderedComponent = ({location, ...props}) => {
        if (!authStatusReported) {
            return <Layout>
                <div className={classes.root}>
                    <CircularProgress/>
                </div>
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
                <div className={classes.root}>
                    <BlockIcon className={classes.denied}/>
                </div>
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

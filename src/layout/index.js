import React from 'react';
import PropTypes from 'prop-types';
import {makeStyles} from '@material-ui/core/styles';
import AppBar from "./app-bar";
import Container from "@material-ui/core/Container";
import Footer from "./footer";

const useStyles = makeStyles(theme => ({
    content: {
        flexGrow: 1,
        padding: theme.spacing(3, 0),
        position: 'relative',
        display: "flex",
        flexDirection: "column",
        alignItems: "stretch",
    },
    container: {
        flexGrow: 1,
        position: 'relative',
    },
    [theme.breakpoints.up('md')]: {
        container: {display: 'flex'},
    }
}));

const Layout = (props) => {
    const classes = useStyles();

    return (
        <React.Fragment>
            <AppBar onToggleTheme={props.onToggleTheme}/>

            {props.hero ? props.hero : ''}

            <Container fixed className={classes.container}>
                <main className={classes.content}>
                    {props.children}
                </main>
            </Container>

            <Footer />
        </React.Fragment>
    );
};

Layout.propTypes = {
    hero: PropTypes.element,
};

export default Layout;

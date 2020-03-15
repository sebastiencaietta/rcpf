import React from 'react';
import PropTypes from 'prop-types';
import {makeStyles} from '@material-ui/core/styles';
import AppBar from "./app-bar";
import Container from "@material-ui/core/Container";
import Hero from '../global/components/hero';

const useStyles = makeStyles(theme => ({
    content: {
        flexGrow: 1,
        paddingTop: theme.spacing(3),
        position: 'relative',
    },
}));

const Layout = (props) => {
    const classes = useStyles();

    return (
        <React.Fragment>
            <AppBar/>

            {props.heroTitle && props.heroBg ? <Hero title={props.heroTitle} bg={props.heroBg}/> : ''}

            <Container fixed>
                <main className={classes.content}>
                    {props.children}
                </main>
            </Container>
        </React.Fragment>
    );
};

Layout.propTypes = {
    heroTitle: PropTypes.string,
    heroBg: PropTypes.string,
};

export default Layout;

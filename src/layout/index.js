import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import AppBar from "@material-ui/core/AppBar";
import Container from "@material-ui/core/Container";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import {Link} from "react-router-dom";
import Hidden from "@material-ui/core/Hidden";
import Button from "@material-ui/core/Button";
import RestaurantMenu from '@material-ui/icons/RestaurantMenu';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import useScrollTrigger from "@material-ui/core/useScrollTrigger";
import clsx from "clsx";
import AdminMenu from './admin-menu';

const useStyles = makeStyles(theme => ({
    menuLink: {
        textDecoration: 'none',
        color: theme.palette.text.primary,
    },
    desktopLinks: {
        [theme.breakpoints.up('md')]: {
            display: 'flex',
            justifyContent: 'flex-end'
        },
    },
    appBar: {
        transition: theme.transitions.create(['box-shadow', 'background-color', 'min-height'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        backgroundColor: theme.palette.background.default,
    },
    appBarShift: {
        transition: theme.transitions.create(['box-shadow', 'background-color', 'min-height'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        background: theme.palette.background.paper,
    },
    title: {
        flexGrow: 1,
    },
    toolbar: {
        ...theme.mixins.toolbar,
        transition: theme.transitions.create(['min-height'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    toolbarShift: {
        minHeight: theme.mixins.toolbar.minHeight - theme.spacing(1),
        transition: theme.transitions.create(['min-height'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    content: {
        flexGrow: 1,
        paddingTop: theme.spacing(3),
        position: 'relative',
    },
}));

export default function Layout(props) {
    const classes = useStyles();

    const trigger = useScrollTrigger({
        disableHysteresis: true,
        threshold: 82,
    });

    return (
        <React.Fragment>
            <AppBar position="fixed" className={clsx(classes.appBar, {[classes.appBarShift]: trigger})} elevation={trigger ? 4 : 0}>
                <Toolbar className={clsx(classes.toolbar, {[classes.toolbarShift]: trigger})}>
                    <Container fixed>
                        <Grid container>
                            <Grid item xs={12} md={6}>
                                <Link to="/" className={classes.menuLink}>
                                    <Typography variant="h6" noWrap className={classes.title}>Cookmate</Typography>
                                </Link>
                            </Grid>
                            <Grid item md={6}>
                                <Hidden smDown implementation="css" className={classes.desktopLinks}>
                                    <Link to="/" className={classes.menuLink}>
                                        <Button startIcon={<RestaurantMenu/>}>Recettes</Button>
                                    </Link>
                                    <Button disabled startIcon={<MenuBookIcon/>}>Menus</Button>
                                    <AdminMenu />
                                </Hidden>
                            </Grid>
                        </Grid>
                    </Container>
                </Toolbar>
            </AppBar>

            <Container fixed>
                <div className={classes.toolbar}/>
                <main className={classes.content}>
                    {props.children}
                </main>
            </Container>
        </React.Fragment>
    );
}

import React from "react";
import clsx from "clsx";
import AppBar from "@material-ui/core/AppBar/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import {Link} from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import Hidden from "@material-ui/core/Hidden";
import Button from "@material-ui/core/Button";
import AdminMenu from "./admin-menu";
import useScrollTrigger from "@material-ui/core/useScrollTrigger/useScrollTrigger";
import RestaurantMenu from '@material-ui/icons/RestaurantMenu';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import {makeStyles} from "@material-ui/core/styles";
import {PaletteTypeToggleContext} from "../index";
import TogglePaletteTypeButton from './toggle-palette-type-button';
import {PALETTE_TYPE_DARK} from "../global/theme-settings";

const useStyles = makeStyles(theme => {
    const appBarTransitionProps = ['box-shadow', 'min-height'];
    const easingIn = theme.transitions.easing.sharp;
    const easingOut = theme.transitions.easing.easeOut;
    const durationIn = theme.transitions.duration.enteringScreen;
    const durationOut = theme.transitions.duration.leavingScreen;

    return {
        title: {flexGrow: 1},
        menuLink: {
            textDecoration: 'none',
            color: theme.palette.text.primary,
        },
        desktopLinks: {
            [theme.breakpoints.up('md')]: {display: 'flex', justifyContent: 'flex-end', alignItems: 'center'},
        },
        appBar: {
            transition: theme.transitions.create(appBarTransitionProps, {easing: easingIn, duration: durationIn}),
            backgroundColor: theme.palette.type === PALETTE_TYPE_DARK ? '#212121' : theme.palette.background.paper,
        },
        appBarShift: {
            transition: theme.transitions.create(appBarTransitionProps, {easing: easingOut, duration: durationOut}),
        },
        toolbar: {
            ...theme.mixins.toolbar,
            transition: theme.transitions.create(['min-height'], {easing: easingIn, duration: durationIn}),
        },
        toolbarShift: {
            minHeight: theme.mixins.toolbar.minHeight - theme.spacing(1),
            transition: theme.transitions.create(['min-height'], {easing: easingOut, duration: durationOut}),
        },
    }
});

export default () => {
    const classes = useStyles();

    const trigger = useScrollTrigger({
        disableHysteresis: true,
        threshold: 82,
    });

    return <>
        <AppBar position="fixed" className={clsx(classes.appBar, {[classes.appBarShift]: trigger})}
                elevation={trigger ? 4 : 0}>
            <Toolbar className={clsx(classes.toolbar, {[classes.toolbarShift]: trigger})}>
                <Container fixed>
                    <Grid container>
                        <Grid item xs={12} md={6}>
                            <Link to="/" className={classes.menuLink}>
                                <Typography variant="h6" noWrap className={classes.title}>Cookmate</Typography>
                            </Link>
                        </Grid>
                        <Grid item md={6} className={classes.desktopLinks}>
                            <Hidden smDown implementation="css" className={classes.desktopLinks}>
                                <Link to="/" className={classes.menuLink}>
                                    <Button startIcon={<RestaurantMenu/>}>Recettes</Button>
                                </Link>
                                <Button disabled startIcon={<MenuBookIcon/>}>Menus</Button>
                                <AdminMenu/>
                                <PaletteTypeToggleContext.Consumer>
                                    {({onToggleTheme}) => <TogglePaletteTypeButton onToggleTheme={onToggleTheme}/>}
                                </PaletteTypeToggleContext.Consumer>
                            </Hidden>
                        </Grid>
                    </Grid>
                </Container>
            </Toolbar>
        </AppBar>

        <div className={classes.toolbar}/>
    </>
}

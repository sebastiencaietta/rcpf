import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import LeftSideDrawer from './left-side-drawer';
import RightSideDrawer from './right-side-drawer';
import AppBar from "@material-ui/core/AppBar";
import Container from "@material-ui/core/Container";
import clsx from "clsx";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from '@material-ui/icons/Menu';
import Typography from "@material-ui/core/Typography";
import FilterList from '@material-ui/icons/FilterList';

const drawerWidth = 240;
const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
    },
    appBar: {
        marginLeft: drawerWidth,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        [theme.breakpoints.up('sm')]: {
            width: `calc(100% - ${drawerWidth}px)`,
        },
    },
    appBarShift: {
        [theme.breakpoints.up('sm')]: {
            width: `calc(100% - ${drawerWidth * 2}px)`,
            marginRight: drawerWidth,
        },
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    title: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
        [theme.breakpoints.up('sm')]: {
            display: 'none',
        },
    },
    rightSideButton: {
        marginRight: theme.spacing(2),
    },
    toolbar: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        position: 'relative',
        [theme.breakpoints.up('sm')]: {
            marginRight: -drawerWidth,
        },
    },
    contentShift: {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        [theme.breakpoints.up('sm')]: {
            marginRight: 0,
        },
    },
}));

export default function Layout(props) {
    const classes = useStyles();

    const [mobileOpen, setMobileOpen] = React.useState(false);
    const [rightDrawerOpen, setRightDrawerOpen] = React.useState(false);

    function handleLeftDrawerToggle() {
        setMobileOpen(!mobileOpen);
    }

    function handleRightDrawerOpen(status) {
        if (status !== undefined) {
            setRightDrawerOpen(status);
            return;
        }

        setRightDrawerOpen(!rightDrawerOpen);
    }

    return (
        <div className={classes.root}>
            <LeftSideDrawer {...{mobileOpen, handleDrawerToggle: handleLeftDrawerToggle}}/>

            <AppBar position="fixed" className={clsx(classes.appBar, {
                [classes.appBarShift]: rightDrawerOpen,
            })}>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="Open drawer"
                        edge="start"
                        onClick={handleLeftDrawerToggle}
                        className={classes.menuButton}
                    >
                        <MenuIcon />
                    </IconButton>

                    <Typography variant="h6" noWrap className={classes.title}>
                        {props.title}
                    </Typography>

                    <IconButton
                        color="inherit"
                        aria-label="Open drawer"
                        edge="start"
                        onClick={() => handleRightDrawerOpen()}
                        className={classes.rightSideButton}
                    >
                        <FilterList />
                    </IconButton>
                </Toolbar>
            </AppBar>

            <Container fixed>
                <div className={classes.toolbar} />
                <main
                    className={clsx(classes.content, {
                        [classes.contentShift]: rightDrawerOpen,
                    })}
                >
                    {props.children}
                </main>
            </Container>

            <RightSideDrawer content={props.rightSideDrawer} isOpen={rightDrawerOpen} handleToggle={handleRightDrawerOpen}/>
        </div>
    );
}

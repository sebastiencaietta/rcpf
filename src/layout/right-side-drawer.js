import React from 'react';
import clsx from 'clsx';
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import {makeStyles} from "@material-ui/core";
import Divider from "@material-ui/core/Divider";
import Hidden from "@material-ui/core/Hidden";
import Drawer from "@material-ui/core/Drawer";

const drawerWidth = 240;
const useStyles = makeStyles(theme => ({
    drawer: {
        [theme.breakpoints.up('md')]: {
            width: '240px',
            flexShrink: 0,
        },
    },
    list: {
        width: drawerWidth,
    },
    drawerPaper: {
        width: drawerWidth,
        flexShrink: 0,
    },
    toolbar: theme.mixins.toolbar,
}));

export default function rightSideDrawer(props) {
    const classes = useStyles()

    const toggleDrawer = (open) => event => {
        if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        props.handleToggle(open);
    };

    return <nav className={clsx(classes.drawer, {[classes.drawerOpen]: props.isOpen})}>
        <Hidden mdUp implementation="js">
            <SwipeableDrawer
                anchor="right"
                open={props.isOpen}
                onClose={toggleDrawer(false)}
                onOpen={toggleDrawer(true)}
            >
                <div className={classes.list} role="presentation">
                    {props.content}
                </div>
            </SwipeableDrawer>
        </Hidden>
        <Hidden xsDown implementation="css">
            <Drawer
                classes={{
                    paper: classes.drawerPaper,
                }}
                variant="persistent"
                open={props.isOpen}
                anchor="right"
            >
                <div className={classes.toolbar}/>
                <Divider/>
                <div className={classes.list} role="presentation">
                    {props.content}
                </div>
            </Drawer>
        </Hidden>
    </nav>
}

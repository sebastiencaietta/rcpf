import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import ViewList from '@material-ui/icons/ViewList';
import RestaurantMenu from '@material-ui/icons/RestaurantMenu';
import Hidden from "@material-ui/core/Hidden";
import {Link} from "react-router-dom";
import AdminMenu from './admin-menu';

const drawerWidth = 240;
const useStyles = makeStyles(theme => ({
    drawer: {
        [theme.breakpoints.up('md')]: {
            width: drawerWidth,
            flexShrink: 0,
        },
    },
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
        width: drawerWidth,
    },
    listLinks: {
        textDecoration: 'none',
        color: theme.palette.text.primary,
    },
    nested: {
        paddingLeft: theme.spacing(4),
    },
}));

export default function LeftSideDrawer(props) {
    const classes = useStyles();

    const drawer = (
        <Drawer
            className={classes.drawer}
            variant="permanent"
            classes={{
                paper: classes.drawerPaper,
            }}
        >
            <div className={classes.toolbar}/>
            <List>
                <Link to="/" className={classes.listLinks}>
                    <ListItem button>
                        <ListItemIcon><RestaurantMenu/></ListItemIcon>
                        <ListItemText primary="Recettes"/>
                    </ListItem>
                </Link>
                <ListItem button disabled>
                    <ListItemIcon><ViewList/></ListItemIcon>
                    <ListItemText primary="Menus" secondary="Coming soon"/>
                </ListItem>
            </List>
            <Divider/>
            {<AdminMenu />}
        </Drawer>
    );

    return (
        <nav className={classes.drawer} aria-label="CookMate navigation">
            <Hidden mdUp implementation="css">
                <Drawer
                    variant="temporary"
                    anchor="left"
                    open={props.mobileOpen}
                    onClose={props.handleDrawerToggle}
                    classes={{
                        paper: classes.drawerPaper,
                    }}
                    ModalProps={{
                        keepMounted: true,
                    }}
                >
                    {drawer}
                </Drawer>
            </Hidden>
            <Hidden smDown implementation="css">
                <Drawer
                    classes={{
                        paper: classes.drawerPaper,
                    }}
                    variant="permanent"
                    open
                >
                    {drawer}
                </Drawer>
            </Hidden>
        </nav>
    );
}

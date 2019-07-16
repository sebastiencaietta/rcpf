import React, {useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import ViewList from '@material-ui/icons/ViewList';
import SettingsIcon from '@material-ui/icons/Settings';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import RestaurantMenu from '@material-ui/icons/RestaurantMenu';
import Hidden from "@material-ui/core/Hidden";
import {Link} from "react-router-dom";
import Collapse from "@material-ui/core/Collapse";

const drawerWidth = 240;
const useStyles = makeStyles(theme => ({
    drawer: {
        [theme.breakpoints.up('sm')]: {
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

export default function Layout(props) {
    const classes = useStyles();
    const [adminOpen, setAdminOpen] = useState(false);

    function handleAdminClick() {
        setAdminOpen(!adminOpen);
    }

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
                        <ListItemText primary="Recipes"/>
                    </ListItem>
                </Link>
                <ListItem button disabled>
                    <ListItemIcon><ViewList/></ListItemIcon>
                    <ListItemText primary="Menus" secondary="Coming soon"/>
                </ListItem>
            </List>
            <Divider/>
            <List>
                <ListItem button onClick={handleAdminClick}>
                    <ListItemIcon>
                        <SettingsIcon/>
                    </ListItemIcon>
                    <ListItemText primary={"Admin"}/>
                    {adminOpen ? <ExpandLess/> : <ExpandMore/>}
                </ListItem>
                <Collapse component="li" in={adminOpen} timeout="auto" unmountOnExit>
                    <List disablePadding>
                        <Link to="/admin/recipes" className={classes.listLinks}>
                            <ListItem className={classes.nested} button>
                                <ListItemIcon>
                                    <RestaurantMenu/>
                                </ListItemIcon>
                                <ListItemText primary={"Recipes"}/>
                            </ListItem>
                        </Link>
                    </List>
                </Collapse>
            </List>
        </Drawer>
    );

    return (
        <nav className={classes.drawer} aria-label="CookMate navigation">
            <Hidden smUp implementation="css">
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
            <Hidden xsDown implementation="css">
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

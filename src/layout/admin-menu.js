import React, {useState} from 'react';
import {Link} from "react-router-dom";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import SettingsIcon from "@material-ui/core/SvgIcon/SvgIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Collapse from "@material-ui/core/Collapse";
import List from "@material-ui/core/List";
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import RestaurantMenu from '@material-ui/icons/RestaurantMenu';
import {makeStyles} from "@material-ui/core";
import {connect} from "react-redux";

const useStyles = makeStyles(theme => ({
    listLinks: {
        textDecoration: 'none',
        color: theme.palette.text.primary,
    },
    nested: {
        paddingLeft: theme.spacing(4),
    },
}));

const Component = ({user}) => {
    const classes = useStyles();
    const [adminOpen, setAdminOpen] = useState(false);

    function handleAdminClick() {
        setAdminOpen(!adminOpen);
    }

    const loggedInAdminMenu = (<React.Fragment>
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
                        <ListItemIcon><RestaurantMenu/></ListItemIcon>
                        <ListItemText primary={"Recettes"}/>
                    </ListItem>
                </Link>
            </List>
        </Collapse>
    </React.Fragment>);

    const loggedOutAdminMenu = (<React.Fragment>
        <Link to="/admin" className={classes.listLinks}>
            <ListItem button onClick={handleAdminClick}>
                <ListItemIcon>
                    <SettingsIcon/>
                </ListItemIcon>
                <ListItemText primary={"Admin"}/>
            </ListItem>
        </Link>
    </React.Fragment>);

    return <List>
        {user.uid !== undefined ? loggedInAdminMenu : loggedOutAdminMenu};
    </List>;
};

const mapStateToProps = state => ({
    user: state.auth.user,
});

export default connect(mapStateToProps)(Component)

import React, {useState} from 'react';
import {Link} from "react-router-dom";
import SettingsIcon from '@material-ui/icons/Settings';
import {makeStyles} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import clsx from "clsx";
import {useAuth} from "../auth/use-auth";

const useStyles = makeStyles(theme => ({
    menuLink: {
        textDecoration: 'none',
        color: theme.palette.text.primary,
    },
    settingsIcon: {
        transition: theme.transitions.create('transform', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.standard,
        }),
        transform: 'rotate(0)',
    },
    settingsIconOpen: {
        transition: theme.transitions.create('transform', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.standard,
        }),
        transform: 'rotate(180deg)',
    }
}));

const AdminMenu = () => {
    const auth = useAuth();
    const [anchorEl, setAnchorEl] = useState(null);
    const classes = useStyles();

    const {user} = auth.user;

    if (user.uid === undefined || user.role !== 'ROLE_ADMIN') {
        return '';
    }

    function handleAdminClick(event) {
        setAnchorEl(event.currentTarget);
    }

    function handleClose() {
        setAnchorEl(null);
    }

    const settingsIconClasses = clsx(classes.settingsIcon, {[classes.settingsIconOpen]: anchorEl});

    return <React.Fragment>
        <Button onClick={handleAdminClick} startIcon={<SettingsIcon className={settingsIconClasses}/>}>
            Admin
        </Button>
        <Menu
            id="admin-menu"
            anchorEl={anchorEl}
            getContentAnchorEl={null}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
            anchorOrigin={{vertical: 'bottom', horizontal: 'left',}}
        >
            <Link to="/admin/recipes" className={classes.menuLink}>
                <MenuItem onClick={handleClose}>Recettes</MenuItem>
            </Link>
            <Link to="/admin/ingredients" className={classes.menuLink}>
                <MenuItem onClick={handleClose}>Ingredients</MenuItem>
            </Link>
            <Link to="/admin/tags" className={classes.menuLink}>
                <MenuItem onClick={handleClose}>Tags</MenuItem>
            </Link>
            <Link to="/admin/labels" className={classes.menuLink}>
                <MenuItem onClick={handleClose}>Labels</MenuItem>
            </Link>
        </Menu>
    </React.Fragment>;
};

export default AdminMenu;

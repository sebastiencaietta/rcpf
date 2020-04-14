import React, {useState} from 'react';
import {Link} from "react-router-dom";
import SettingsIcon from '@material-ui/icons/Settings';
import {makeStyles} from "@material-ui/core";
import {connect} from "react-redux";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import clsx from "clsx";

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

const Component = ({user}) => {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = useState(null);

    function handleAdminClick(event) {
        setAnchorEl(event.currentTarget);
    }

    function handleClose() {
        setAnchorEl(null);
    }

    const settingsIconClasses = clsx(classes.settingsIcon, {[classes.settingsIconOpen]: anchorEl});

    const loggedInAdminMenu = (<React.Fragment>
        <Button onClick={handleAdminClick} startIcon={<SettingsIcon className={settingsIconClasses}/>}>
            Admin
        </Button>
        <Menu
            id="simple-menu"
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
        </Menu>
    </React.Fragment>);

    const loggedOutAdminMenu = <Link to="/admin/recipes" className={classes.menuLink}>
        <Button startIcon={<SettingsIcon />}>Admin</Button>
    </Link>;

    return <React.Fragment>
        {user.uid !== undefined ? loggedInAdminMenu : loggedOutAdminMenu}
    </React.Fragment>;
};

const mapStateToProps = state => ({
    user: state.auth.user,
});

export default connect(mapStateToProps)(Component)

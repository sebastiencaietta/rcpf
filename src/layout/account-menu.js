import React, {useState} from 'react';
import {Link} from "react-router-dom";
import LinkComponent from "@material-ui/core/Link";
import {makeStyles} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import {logout} from "../repositories/users";
import Bugsnag from "@bugsnag/js";
import {useAuth} from "../auth/use-auth";

const useStyles = makeStyles(theme => ({
    menuLink: {
        textDecoration: 'none',
        color: theme.palette.text.primary,
        '&:hover': {textDecoration: 'none'},
    },
}));

const AccountMenu = () => {
    const classes = useStyles();
    const auth = useAuth();
    const {user} = auth.user;
    const [anchorEl, setAnchorEl] = useState(null);

    function handleAccountClick(event) {
        setAnchorEl(event.currentTarget);
    }

    function handleClose() {
        setAnchorEl(null);
    }

    const handleLogout = async () => {
        try {
            await logout();
        } catch (error) {
            Bugsnag.notify(error);
        }
        handleClose();
    }

    const loggedInAccountMenu = (<React.Fragment>
        <Button onClick={handleAccountClick} startIcon={<AccountCircleIcon/>}>
            {user.firstName}
        </Button>
        <Menu
            id="account-menu"
            anchorEl={anchorEl}
            getContentAnchorEl={null}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
            anchorOrigin={{vertical: 'bottom', horizontal: 'left',}}
        >
            <Link to="/my-account" className={classes.menuLink}>
                <MenuItem onClick={handleClose}>Mon compte</MenuItem>
            </Link>
            <LinkComponent className={classes.menuLink}>
                <MenuItem onClick={handleLogout}>Se déconnecter</MenuItem>
            </LinkComponent>
        </Menu>
    </React.Fragment>);

    const loggedOutAccountMenu = <Link to="/login" className={classes.menuLink}>
        <Button startIcon={<AccountCircleIcon />}>Login</Button>
    </Link>;

    return <React.Fragment>
        {user.uid && user.firstName ? loggedInAccountMenu : loggedOutAccountMenu}
    </React.Fragment>;
};

export default AccountMenu;

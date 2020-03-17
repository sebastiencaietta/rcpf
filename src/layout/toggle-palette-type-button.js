import React from "react";
import useTheme from "@material-ui/core/styles/useTheme";
import Brightness4Icon from '@material-ui/icons/Brightness4';
import Brightness7Icon from '@material-ui/icons/Brightness7';
import IconButton from "@material-ui/core/IconButton";
import {makeStyles} from "@material-ui/core/styles";
import {PALETTE_TYPE_DARK, PALETTE_TYPE_LIGHT} from "../global/theme-settings";

const useStyles = makeStyles(theme => ({
    toggleButton: {color: theme.palette.text.primary},
})) ;

const TogglePaletteTypeButton = ({onToggleTheme}) => {
    const theme = useTheme();
    const classes = useStyles();

    const handleThemeChange = () => {
        const newTheme = theme.palette.type === PALETTE_TYPE_DARK ? PALETTE_TYPE_LIGHT : PALETTE_TYPE_DARK;
        onToggleTheme(newTheme);
    };

    const icon = theme.palette.type === PALETTE_TYPE_DARK ? <Brightness7Icon /> : <Brightness4Icon />;

    return <IconButton
        aria-label="Toggle dark/light theme"
        onClick={handleThemeChange}
        color="default"
        size="small"
        className={classes.toggleButton}>
        {icon}
    </IconButton>
};

export default TogglePaletteTypeButton;

import {createMuiTheme, responsiveFontSizes} from "@material-ui/core";
import lightBlue from "@material-ui/core/colors/lightBlue";
import lime from "@material-ui/core/colors/lime";
import red from "@material-ui/core/colors/red";
import green from "@material-ui/core/colors/green";
import indigo from "@material-ui/core/colors/indigo";
import deepOrange from "@material-ui/core/colors/deepOrange";

export const PALETTE_TYPE_LIGHT = 'light';
export const PALETTE_TYPE_DARK = 'dark';

export const setPreferredPaletteType = (paletteType) => {
    if (paletteType !== PALETTE_TYPE_DARK && paletteType !== PALETTE_TYPE_LIGHT) {
        return;
    }

    window.localStorage.setItem('paletteType', paletteType);
};

export const createTheme = (paletteType) => responsiveFontSizes(
    createMuiTheme({
        palette: {
            type: paletteType,
            primary: paletteType === PALETTE_TYPE_DARK ? lightBlue : indigo,
            secondary: paletteType === PALETTE_TYPE_DARK ? lime : deepOrange,
            error: {
                main: red.A400,
            },
            success: {
                main: green.A400,
                light: green["600"],
                dark: green["200"],
            },
            background: {
                paper: paletteType === PALETTE_TYPE_DARK ? '#424242' : '#f7f7f7',
            },
        },
    })
);

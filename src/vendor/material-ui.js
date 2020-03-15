import lime from '@material-ui/core/colors/lime';
import lightBlue from '@material-ui/core/colors/lightBlue';
import red from '@material-ui/core/colors/red';
import green from '@material-ui/core/colors/green';
import { createMuiTheme } from '@material-ui/core/styles';
import {responsiveFontSizes} from "@material-ui/core";

// A custom theme for this app
const theme = createMuiTheme({
    palette: {
        type: 'dark',
        primary: lightBlue,
        secondary: lime,
        error: {
            main: red.A400,
        },
        success: {
            main: green.A400,
            light: green["600"],
            dark: green["200"],
        },
    },
});

export default responsiveFontSizes(theme);

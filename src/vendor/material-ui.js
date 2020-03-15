import indigo from '@material-ui/core/colors/indigo';
import pink from '@material-ui/core/colors/pink';
import red from '@material-ui/core/colors/red';
import green from '@material-ui/core/colors/green';
import { createMuiTheme } from '@material-ui/core/styles';

// A custom theme for this app
const theme = createMuiTheme({
    palette: {
        type: 'dark',
        primary: indigo,
        secondary: pink,
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

export default theme;

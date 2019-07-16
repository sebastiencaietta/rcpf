import indigo from '@material-ui/core/colors/indigo';
import pink from '@material-ui/core/colors/pink';
import red from '@material-ui/core/colors/red';
import { createMuiTheme } from '@material-ui/core/styles';

// A custom theme for this app
const theme = createMuiTheme({
    palette: {
        primary: indigo,
        secondary: pink,
        error: {
            main: red.A400,
        },
        background: {
            default: '#eee',
        },
    },
});

export default theme;

import React from 'react';
import {ThemeProvider} from '@material-ui/styles';
import {useThemeSwitcher} from "./use-theme-switcher";

export default function PreferredThemeProvider({children}) {
    const themeContext = useThemeSwitcher();

    return <ThemeProvider theme={themeContext.theme}>{children}</ThemeProvider>
}

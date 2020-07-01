import React, {createContext, useState} from 'react';
import {Provider} from 'react-redux';
import ReactDOM from 'react-dom';
import {Router} from 'react-router-dom'
import store, {browserHistory} from './store'
import * as serviceWorker from './serviceWorker';
import {createTheme, getPreferredPaletteType, setPreferredPaletteType} from "./global/theme-settings";
import {initFirebaseApp} from "./vendor/firebase";
import {getErrorBoundary, initBugsnapApp} from './vendor/bugsnag';
import {ThemeProvider} from '@material-ui/styles';
import CssBaseline from "@material-ui/core/CssBaseline";
import Auth from "./auth";
import Routes from './routes';

import './index.css';

initFirebaseApp();
initBugsnapApp();

const target = document.querySelector('#root');

export const PaletteTypeToggleContext = createContext({});

const ErrorBoundary = getErrorBoundary();

const App = () => {
    const [theme, setTheme] = useState(createTheme(getPreferredPaletteType()));

    const onToggleTheme = paletteType => {
        setPreferredPaletteType(paletteType);
        setTheme(createTheme(paletteType));
    };

    return <Provider store={store}>
        <ErrorBoundary>
            <PaletteTypeToggleContext.Provider value={{onToggleTheme}}>
                <ThemeProvider theme={theme}>
                    <CssBaseline/>
                    <Router history={browserHistory}>
                        <Auth/>
                        <Routes/>
                    </Router>
                </ThemeProvider>
            </PaletteTypeToggleContext.Provider>
        </ErrorBoundary>
    </Provider>
};

ReactDOM.render(
    <App/>,
    target
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();

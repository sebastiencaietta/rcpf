import React from 'react';
import ReactDOM from 'react-dom';
import {Router} from 'react-router-dom'
import * as serviceWorker from './serviceWorker';
import {initFirebaseApp} from "./vendor/firebase";
import {getErrorBoundary, initBugsnapApp} from './vendor/bugsnag';
import {ProvideAuth} from "./auth/use-auth";
import {HelmetProvider} from 'react-helmet-async';
import CssBaseline from "@material-ui/core/CssBaseline";
import Routes from './routes';
import {createBrowserHistory} from "history";
import {wrapHistory} from "oaf-react-router";

import './index.css';
import {ProviderThemeSwitcher} from "./layout/use-theme-switcher";
import PreferredThemeProvider from "./layout/theme-provider";
import {ProviderFilters} from "./recipe-list/use-filters";

initFirebaseApp();
initBugsnapApp();

const target = document.querySelector('#root');

const ErrorBoundary = getErrorBoundary();

const history = createBrowserHistory(); // or createHashHistory()
wrapHistory(history);

const App = () => {
    return <>
        <ErrorBoundary>
            <ProviderThemeSwitcher>
                <ProvideAuth>
                    <PreferredThemeProvider>
                        <HelmetProvider>
                            <CssBaseline/>
                            <Router history={history}>
                                <ProviderFilters>
                                    <Routes/>
                                </ProviderFilters>
                            </Router>
                        </HelmetProvider>
                    </PreferredThemeProvider>
                </ProvideAuth>
            </ProviderThemeSwitcher>
        </ErrorBoundary>
    </>
};

ReactDOM.render(
    <App/>,
    target
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();

import React from 'react';
import {Provider} from 'react-redux';
import ReactDOM from 'react-dom';
import {Router} from 'react-router-dom'
import store from './store'
import * as serviceWorker from './serviceWorker';
import {initFirebaseApp} from "./vendor/firebase";
import {getErrorBoundary, initBugsnapApp} from './vendor/bugsnag';
import {ProvideAuth} from "./auth/use-auth";
import CssBaseline from "@material-ui/core/CssBaseline";
import Routes from './routes';
import {createBrowserHistory} from "history";
import {wrapHistory} from "oaf-react-router";

import './index.css';
import {ProviderThemeSwitcher} from "./layout/use-theme-switcher";
import PreferredThemeProvider from "./layout/theme-provider";

initFirebaseApp();
initBugsnapApp();

const target = document.querySelector('#root');

const ErrorBoundary = getErrorBoundary();

const history = createBrowserHistory(); // or createHashHistory()
wrapHistory(history);

const App = () => {
    return <Provider store={store}>
        <ErrorBoundary>
            <ProviderThemeSwitcher>
                <ProvideAuth>
                    <PreferredThemeProvider>
                        <CssBaseline/>
                        <Router history={history}>
                            <Routes/>
                        </Router>
                    </PreferredThemeProvider>
                </ProvideAuth>
            </ProviderThemeSwitcher>
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

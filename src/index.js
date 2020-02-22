import React from 'react';
import {Provider} from 'react-redux';
import ReactDOM from 'react-dom';
import {Router} from 'react-router-dom'
import store, {browserHistory} from './store'
import * as serviceWorker from './serviceWorker';
import { initFirebaseApp } from "./vendor/firebase";
import { ThemeProvider } from '@material-ui/styles';
import CssBaseline from "@material-ui/core/CssBaseline";
import theme from './vendor/material-ui';

import './index.css';
import App from './App';

initFirebaseApp();


const target = document.querySelector('#root');
ReactDOM.render(
    <ThemeProvider theme={theme}>
        <CssBaseline />
        <Provider store={store}>
            <Router history={browserHistory}>
                <App/>
            </Router>
        </Provider>
    </ThemeProvider>,
    target
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();

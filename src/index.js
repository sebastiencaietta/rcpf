import React from 'react';
import {Provider} from 'react-redux';
import ReactDOM from 'react-dom';
import {Router} from 'react-router-dom'
import store, {history} from './store'

import 'react-widgets/dist/css/react-widgets.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

const target = document.querySelector('#root');
ReactDOM.render(
    <Provider store={store}>
        <Router history={history}>
            <App/>
        </Router>
    </Provider>,
    target,
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();

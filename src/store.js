import {createStore, compose} from 'redux';
import * as history from 'history';
import {combineReducers} from 'redux';
import filters from './recipe-list/reducers/filters';
import {reducer as formReducer} from 'redux-form';

export const browserHistory = history.createBrowserHistory();

const initialState = {};
const enhancers = [];

if (process.env.NODE_ENV === 'development') {
    const devToolsExtension = window.__REDUX_DEVTOOLS_EXTENSION__;

    if (typeof devToolsExtension === 'function') {
        enhancers.push(devToolsExtension())
    }
}

const composedEnhancers = compose(...enhancers);
const reducers = combineReducers({
        filters,
        form: formReducer,
    },
);

const store = createStore(
    reducers,
    initialState,
    composedEnhancers,
);

export default store;

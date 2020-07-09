import {createStore, compose} from 'redux';
import {combineReducers} from 'redux';
import filters from './recipe-list/reducers/filters';
import auth from './global/reducers/auth';

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
        auth,
    },
);

const store = createStore(
    reducers,
    initialState,
    composedEnhancers,
);

export default store;

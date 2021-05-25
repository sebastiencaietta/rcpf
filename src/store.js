import {createStore, compose} from 'redux';
import {combineReducers} from 'redux';
import filters from './recipe-list/reducers/filters';

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
    },
);

const store = createStore(
    reducers,
    initialState,
    composedEnhancers,
);

export default store;

import {createStore, compose} from 'redux';
import createHistory from 'history/createBrowserHistory';
import {combineReducers} from 'redux';
import categories from './recipe-list/reducers/categories';
import tags from './recipe-list/reducers/tags';
import recipes from './recipe-list/reducers/recipes';
import filters from './recipe-list/reducers/filters';

export const history = createHistory();

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
        categories,
        tags,
        recipes,
        filters,
    },
);

const store = createStore(
    reducers,
    initialState,
    composedEnhancers,
);

export default store;

import {RECIPE_RECEIVED} from '../types/current-recipe';

const initialState = null;

export default (state = initialState, action) => {
    switch (action.type) {
        case RECIPE_RECEIVED:
            return action.payload;
        default:
            return state;
    }
};

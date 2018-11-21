import {RECIPES_RECEIVED} from '../types/recipes';

const initialState = [];

export default (state = initialState, action) => {
    switch (action.type) {
        case RECIPES_RECEIVED:
            return [
                ...action.payload,
            ];
        default:
            return state;
    }
}

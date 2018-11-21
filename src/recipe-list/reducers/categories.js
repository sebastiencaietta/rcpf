import {CATEGORIES_RECEIVED} from '../types/categories'

const initialState = [];

export default (state = initialState, action) => {
    switch (action.type) {
        case CATEGORIES_RECEIVED:
            return [
                ...action.payload
            ];
        default:
            return state;
    }
};

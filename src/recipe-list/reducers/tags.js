import {TAGS_RECEIVED} from '../types/tags'

const initialState = [];

export default (state = initialState, action) => {
    switch (action.type) {
        case TAGS_RECEIVED:
            return [
                ...action.payload
            ];
        default:
            return state;
    }
};

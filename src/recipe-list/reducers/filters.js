import {UPDATE_SEARCH, RESET_FILTERS, TOGGLE_CATEGORY, TOGGLE_TAG} from '../types/filters';
import {addOrRemoveInArray} from '../../global/lodash';

const initialState = {
    tags: [],
    category: null,
    search: '',
};

export default (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_SEARCH:
            return {
                ...state,
                search: action.payload,
            };
        case TOGGLE_TAG:
            const newTags = addOrRemoveInArray(state.tags, action.payload);
            return {
                ...state,
                tags: newTags,
            };
        case TOGGLE_CATEGORY:
            return {
                ...state,
                category: action.payload,
            };
        case RESET_FILTERS: {
            return initialState;
        }
        default:
            return state;
    }
}

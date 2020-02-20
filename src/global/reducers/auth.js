import {USER_UPDATED} from "../types/auth";

const initialState = {
    loading: true,
    user: {},
};

export default (state = initialState, action) => {
    switch (action.type) {
        case USER_UPDATED:
            return {
                ...state,
                user: action.payload || {},
            };
        default:
            return state;
    }
}

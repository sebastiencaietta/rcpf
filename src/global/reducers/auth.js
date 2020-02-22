import {LOADING, SIGNIN_ERROR, USER_UPDATED} from "../types/auth";

const initialState = {
    loading: false,
    user: {},
    signinError: '',
};

export default (state = initialState, action) => {
    switch (action.type) {
        case USER_UPDATED:
            return {
                ...state,
                user: action.payload || {},
            };
        case LOADING:
            return {
                ...state,
                loading: action.payload,
            };
        case SIGNIN_ERROR:
            return {
                ...state,
                signinError: action.payload
            };
        default:
            return state;
    }
}

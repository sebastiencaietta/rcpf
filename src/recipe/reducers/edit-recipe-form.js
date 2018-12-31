import {FORM_RESPONSE_SUCCESS, FORM_SUBMITTED} from '../types/edit-recipe-form';

const initialState = {
    submitting: false,
};

export default (state = initialState, action) => {
    switch (action.type) {
        case FORM_SUBMITTED:
            return {...state, submitting: true};
        case FORM_RESPONSE_SUCCESS:
            return initialState;
        default:
            return state;
    }
}

import { SET_API_KEY, API_KEY_ERROR } from '../actions/keyAction';

const initialState = {
    apiKey: '',
    keyError: null
};

export default function keyReducer(state = initialState, action) {
    switch (action.type) {
        case SET_API_KEY:
            return { ...state, apiKey: action.payload, keyError: null };
        case API_KEY_ERROR:
            return { ...state, keyError: action.payload };
        default:
            return state;
    }
}

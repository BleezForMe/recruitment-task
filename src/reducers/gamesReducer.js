const initialState = {
    list: [],
    loading: false,
    error: null,
};

const gamesReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'FETCH_GAMES_REQUEST':
            return {
                ...state,
                loading: true,
                error: null,
            };
        case 'FETCH_GAMES_SUCCESS':
            return {
                ...state,
                list: action.payload,
                loading: false,
                error: null,
            };
        case 'FETCH_GAMES_FAILURE':
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
};

export default gamesReducer;

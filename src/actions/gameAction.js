import axios from 'axios';

const API_KEY = '9443ce6d2efd47b1887c6cd1fa92c6de';

export const fetchGames = (query) => async (dispatch) => {
    dispatch({ type: 'FETCH_GAMES_REQUEST' });

    try {
        const { data } = await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&search=${query}`);
        dispatch({ type: 'FETCH_GAMES_SUCCESS', payload: data.results });
    } catch (error) {
        dispatch({ type: 'FETCH_GAMES_FAILURE', payload: error.message });
    }
};

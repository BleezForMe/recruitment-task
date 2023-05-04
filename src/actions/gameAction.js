let API_KEY = '';

export const fetchGames = (query, page) => async (dispatch) => {
    dispatch({ type: 'FETCH_GAMES_REQUEST' });

    try {
        await new Promise(resolve => setTimeout(resolve, 1000));
        const storedApiKey = localStorage.getItem('apiKey');
        if (storedApiKey) {
            API_KEY = storedApiKey;
        }
        const response = await fetch(`https://api.rawg.io/api/games?key=${API_KEY}&page_size=10&page=${page}&search=${query}`);
        const data = await response.json();
        localStorage.setItem('pages', Math.floor(parseInt(data.count)/10));
        dispatch({ type: 'FETCH_GAMES_SUCCESS', payload: data.results });
        console.log(data)
    } catch (error) {
        await new Promise(resolve => setTimeout(resolve, 1000));
        const storedApiKey = localStorage.getItem('apiKey');
        if (storedApiKey) {
            API_KEY = storedApiKey;
        }
        dispatch({ type: 'FETCH_GAMES_FAILURE', payload: error.message });
    }
};

export const SET_API_KEY = 'SET_API_KEY';
export const API_KEY_ERROR = 'API_KEY_ERROR';

export const saveKey = (apiKey) => {
    return async (dispatch) => {
        if (!apiKey) {
            dispatch({ type: API_KEY_ERROR, payload: 'Please provide an API key' });
            localStorage.setItem('apiKey', '');
            return;
        }

        try {
            const response = await fetch(`https://api.rawg.io/api/games?key=${apiKey}`);
            const responseData = await response.json();
            if (response.status === 200) {
                dispatch({ type: SET_API_KEY, payload: apiKey });
                localStorage.setItem('apiKey', apiKey);
            } else if(response.status === 401) {
                dispatch({ type: API_KEY_ERROR, payload: 'Invalid API key' });
                localStorage.setItem('apiKey', '');
            }
        } catch (error) {
            dispatch({ type: API_KEY_ERROR, payload: 'Error verifying API key' });
            localStorage.setItem('apiKey', '');
        }
    }
}

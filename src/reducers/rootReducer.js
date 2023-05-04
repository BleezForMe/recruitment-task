import { combineReducers } from 'redux';
import gamesReducer from './gamesReducer';
import keyReducer from "./keyReducer";

const rootReducer = combineReducers({
    games: gamesReducer,
    key: keyReducer,
});

export default rootReducer;

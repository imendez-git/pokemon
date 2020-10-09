import { combineReducers } from 'redux';

import pokemonsReducer from './PokemonsReducer';

const rootReducer = combineReducers({
    pokemonsReducer,
});

export default rootReducer;
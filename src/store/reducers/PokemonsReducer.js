import {
    GET_POKEMONS_LOADING,
    GET_POKEMONS_SUCCESS,
    GET_POKEMONS_FAIL,
    GET_POKE_DATA_LOADING,
    GET_POKE_DATA_SUCCESS,
    GET_POKE_DATA_FAIL,
} from '../actions/PokemonsActions';

const initialState = {
    getAll: {
        isLoading: false,
        isSuccess: false,
        isError: false,
        message: '',
        status: '',
        data: [],
    },
    getSpecific: {
        isLoading: false,
        isSuccess: false,
        isError: false,
        message: '',
        status: '',
        data: [],
    },
};

const pokemonsReducer = (state = initialState, action) => {
    switch(action.type){
        case GET_POKEMONS_LOADING: return{
            ...state,
            getAll: {
                isLoading: true,
                isSuccess: false,
                isError: false,
                message: '',
                status: '',
                data: [],
            },
        };

        case GET_POKEMONS_SUCCESS: return{
            ...state,
            getAll: {
                isLoading: false,
                isSuccess: true,
                isError: false,
                message: action.payload.message,
                status: action.payload.status,
                data: action.payload.result,
            },
        };

        case GET_POKEMONS_FAIL: return{
            ...state,
            getAll: {
                isLoading: false,
                isSuccess: false,
                isError: true,
                message: action.payload.message,
                status: action.payload.status,
                data: action.payload.result,
            },
        };

        case GET_POKE_DATA_LOADING: return{
            ...state,
            getSpecific: {
                isLoading: true,
                isSuccess: false,
                isError: false,
                message: '',
                status: '',
                data: [],
            },
        };

        case GET_POKE_DATA_SUCCESS: return{
            ...state,
            getSpecific: {
                isLoading: false,
                isSuccess: true,
                isError: false,
                message: action.payload.message,
                status: action.payload.status,
                data: action.payload.result,
            },
        };

        case GET_POKE_DATA_FAIL: return{
            ...state,
            getSpecific: {
                isLoading: false,
                isSuccess: false,
                isError: true,
                message: action.payload.message,
                status: action.payload.status,
                data: action.payload.result,
            },
        };

        default: return state;
    };
};

export default pokemonsReducer;
import axios from 'axios';
import { 
    // success, 
    error 
} from '../../components/messages/notifications';

import {
    getAllPokemonData,
    getPokeData,
    getTypes,
} from '../../services/path';

export const GET_POKEMONS_LOADING = 'GET_POKEMONS_LOADING';
export const GET_POKEMONS_SUCCESS = 'GET_POKEMONS_SUCCESS';
export const GET_POKEMONS_FAIL = 'GET_POKEMONS_FAIL';

export const GET_POKE_DATA_LOADING = 'GET_POKE_DATA_LOADING';
export const GET_POKE_DATA_SUCCESS = 'GET_POKE_DATA_SUCCESS';
export const GET_POKE_DATA_FAIL = 'GET_POKE_DATA_FAIL';

export const GET_TYPES_LOADING = 'GET_TYPES_LOADING';
export const GET_TYPES_SUCCESS = 'GET_TYPES_SUCCESS';
export const GET_TYPES_FAIL = 'GET_TYPES_FAIL';

const getPokemonsLoading = () => ({ type: GET_POKEMONS_LOADING });
const getPokemonsSuccess = (payload) => ({ type: GET_POKEMONS_SUCCESS, payload });
const getPokemonsFail = (payload) => ({ type: GET_POKEMONS_FAIL, payload });

const getPokeDataLoading = () => ({ type: GET_POKE_DATA_LOADING });
const getPokeDataSuccess = (payload) => ({ type: GET_POKE_DATA_SUCCESS, payload });
const getPokeDataFail = (payload) => ({ type: GET_POKE_DATA_FAIL, payload });

const getTypesLoading = () => ({ type: GET_TYPES_LOADING });
const getTypesSuccess = (payload) => ({ type: GET_TYPES_SUCCESS, payload });
const getTypesFail = (payload) => ({ type: GET_TYPES_FAIL, payload });

const getAll = () => async(dispatch) => {
    getPokemonsLoading();
    try {
        let response = {};
        response = await axios.get(getAllPokemonData());
        // console.log("Response: ", response);
        const data = {
            status: '00',
            message: 'Realizado',
            result: response.data,
        };
        // success(data.message);
        await dispatch(getPokemonsSuccess(data));
        await dispatch(getTypesData());
    } catch (err) {
        error(err);
        const data = {
            status: '99',
            message: 'Error',
            result: [],
        };
        dispatch(getPokemonsFail(data));
    }
    return Promise.resolve();
}

const getSpecificData = (url) => async(dispatch) => {
    getPokeDataLoading();
    try {
        let response = {};
        response = await axios.get(getPokeData(url));
        // console.log("Response: ", response);
        const data = {
            status: '00',
            message: 'Realizado',
            result: response.data,
        };
        await dispatch(getPokeDataSuccess(data));
        return Promise.resolve(data);
    } catch (err) {
        error(err);
        const data = {
            status: '99',
            message: 'Error',
            result: [],
        };
        dispatch(getPokeDataFail(data));
        return Promise.reject(data);
    }
}

const getTypesData = () => async(dispatch) => {
    getTypesLoading();
    try {
        let response = {};
        response = await axios.get(getTypes());
        // console.log("Types: ", response);
        const data = {
            status: '00',
            message: 'Realizado',
            result: response.data,
        };
        await dispatch(getTypesSuccess(data));
        return Promise.resolve(data);
    } catch (err) {
        error(err);
        const data = {
            status: '99',
            message: 'Error',
            result: [],
        };
        dispatch(getTypesFail(data));
        return Promise.reject(data);
    }
}

export {
    getAll,
    getSpecificData,
    getTypesData,
}

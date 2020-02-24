import {
    GET_DIRECTION_LOADING,
    GET_DIRECTION,
    GET_DIRECTION_ERROR,
    GET_GEOLOCATION_LOADING,
    GET_GEOLOCATION,
    GET_GEOLOCATION_ERROR,
    GET_PLACE_LOADING,
    GET_PLACE,
    GET_PLACE_ERROR,
    GET_LATLONG_LOADING,
    GET_LATLONG,
    GET_LATLONG_ERROR
} from '../actionTypes';

const initalState = {
    loading: false,
    error: null,
    data: null
};

export const getMapCoordDirections = (state = initalState, action) => {
    switch (action.type) {
        case GET_DIRECTION_LOADING:
            return {
                ...state,
                loading: true
            };
        case GET_DIRECTION:
            return {
                ...state,
                loading: false,
                error: false,
                data: action.data
            };
        case GET_DIRECTION_ERROR:
            return {
                ...state,
                error: true
            };
        default:
            return state
    }
};

export const getReverseGeoLocation = (state = initalState, action) => {
    switch (action.type) {
        case GET_GEOLOCATION_LOADING:
            return {
                ...state,
                loading: true
            };
        case GET_GEOLOCATION:
            return {
                ...state,
                loading: false,
                error: false,
                data: action.data
            };
        case GET_GEOLOCATION_ERROR:
            return {
                ...state,
                error: true
            };
        default:
            return state
    }
};

export const getPlace = (state = initalState, action) => {
    switch (action.type) {
        case GET_PLACE_LOADING:
            return {
                ...state,
                loading: true
            };
        case GET_PLACE:
            return {
                ...state,
                loading: false,
                error: false,
                data: action.data
            };
        case GET_PLACE_ERROR:
            return {
                ...state,
                error: true
            };
        default:
            return state
    }
};

export const getLatLong = (state = initalState, action) => {
    switch (action.type) {
        case GET_LATLONG_LOADING:
            return {
                ...state,
                loading: true
            };
        case GET_LATLONG:
            return {
                ...state,
                loading: false,
                error: false,
                data: action.data
            };
        case GET_LATLONG_ERROR:
            return {
                ...state,
                error: true
            };
        default:
            return state
    }
};
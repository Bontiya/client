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
import {apiUrl} from '../urlTypes';

export const getDirections = (startLoc, destinationLoc) => async (dispatch, state) => {
    try {
        dispatch({
            type: GET_DIRECTION_LOADING
        });

        let resp = await fetch(
            `${apiUrl}/locations/routes?origin=${startLoc}&destination=${destinationLoc}`
        );

        dispatch({
            type: GET_DIRECTION,
            data: await resp.json()
        });
    } catch (error) {
        dispatch({
            type: GET_DIRECTION_ERROR,
            error: error
        });
    }
};

export const reverseGeolocation = (lat, lon) => async (dispatch, state) => {
    try {
        dispatch({
            type: GET_GEOLOCATION_LOADING
        });

        let resp = await fetch(`${apiUrl}/locations/reverse?lat=${lat}&lon=${lon}`);
        dispatch({
            type: GET_GEOLOCATION,
            data: await resp.json()
        });

    } catch (error) {
        dispatch({
            type: GET_GEOLOCATION_ERROR,
            error: error
        });
    }
};

export const searchPlace = (queryText) => async (dispatch, state) => {
    try {
        dispatch({
            type: GET_PLACE_LOADING
        });

        if (queryText.length > 3) {
            let resp = await fetch(`${apiUrl}/locations/search?q=${queryText}`);
            dispatch({
                type: GET_PLACE,
                data: await resp.json()
            });
        } else {
            dispatch({
                type: GET_PLACE,
                data: null
            });
        }
    } catch (error) {
        dispatch({
            type: GET_PLACE_ERROR,
            error: error
        })
    }
};

export const searchLatLong = (placeId) => async (dispatch, state) => {
    try {
        dispatch({
            type: GET_LATLONG_LOADING
        });

        let resp = await fetch(`${apiUrl}/locations/detail?placeid=${placeId}`);
        dispatch({
            type: GET_LATLONG,
            data: await resp.json()
        });
    } catch (error) {
        dispatch({
            type: GET_LATLONG_ERROR,
            error: error
        })
    }
};
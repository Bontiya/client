import {  combineReducers } from 'redux';
import { ISLOGIN, GENERAL_ONLOAD, ERRORS, SUCCESS, LOGOUT, MODAL } from '../actionTypes';
import event from "./eventReducer";
import { ISLOGIN, GENERAL_ONLOAD, ERRORS, SUCCESS, LOGOUT } from '../actionTypes';
import {
    getMapCoordDirections,
    getReverseGeoLocation,
    getPlace,
    getLatLong
} from "./mapsReducer";

const initalState = {
    isLogged: null,
    generalOnload: false,
    errors: null,
    success: null,
    modal: false
}
 
function general(state = initalState, action) {
    switch (action.type) {
        case ISLOGIN:
            return {
                ...state,
                generalOnload: false,
                isLogged: action.data
            }
        case GENERAL_ONLOAD:
            return {
                ...state,
                generalOnload: true
            }
        case ERRORS: 
            return {
                ...state,
                errors: action.data
            }
        case SUCCESS: 
            return {
                ...state,
                success: action.data
            }
        case LOGOUT: 
            return {
                ...state,
                isLogged: null
            }
        case MODAL:
            return {
                ...state,
                modal: action.data
            }
        default:
            return state
    }
}

export default combineReducers({
    general,
    event,
    getMapCoordDirections,
    getReverseGeoLocation,
    getPlace,
    getLatLong
})
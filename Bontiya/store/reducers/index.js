import {  combineReducers } from 'redux';
import { ISLOGIN, GENERAL_ONLOAD, ERRORS, SUCCESS, LOGOUT, MODAL } from '../actionTypes';
import event from "./eventReducer";
import member from "./memberReducer";
import {
    getMapCoordDirections,
    getReverseGeoLocation,
    getPlace,
    getLatLong,
    getCurrentLocationPos
} from "./mapsReducer";
import {
    user
} from './userReducer'

const initalState = {
    isLogged: null,
    socket: null,
    socketActive: false,
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
                isLogged: action.data,
                socket: action.socket
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
                isLogged: null,
                errors: null,
                socket: null
            }
        case 'SOCKET_ACTIVE':
            return {
                ...state,
                socketActive: action.data
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
    getLatLong,
    getCurrentLocationPos,
    user,
    member
})
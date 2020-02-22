import {  combineReducers } from 'redux';
import { ISLOGIN, GENERAL_ONLOAD, ERRORS, SUCCESS } from '../actionTypes';

const initalState = {
    isLogged: null,
    generalOnload: false,
    errors: null,
    success: null
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
        default:
            return state
    }
}

export default combineReducers({
    general
})
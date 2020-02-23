import {  combineReducers } from 'redux';
<<<<<<< HEAD
import { ISLOGIN, GENERAL_ONLOAD, ERRORS, SUCCESS, LOGOUT } from '../actionTypes';
=======
import { ISLOGIN, GENERAL_ONLOAD, ERRORS, SUCCESS } from '../actionTypes';
>>>>>>> a6f6465661b861a09c1afdf560a9861ab11cdc6f

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
<<<<<<< HEAD
        case LOGOUT: 
            return {
                ...state,
                isLogged: null
            }
=======
>>>>>>> a6f6465661b861a09c1afdf560a9861ab11cdc6f
        default:
            return state
    }
}

export default combineReducers({
    general
})
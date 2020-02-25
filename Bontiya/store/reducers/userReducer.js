import { GET_ALL_USER } from '../actionTypes'

const initialState = {
    users: null
}

export const user = (state = initialState, action ) => {
    switch ( action.type ) {
        case GET_ALL_USER : 
            return {
                ...state,
                users: action.data
            }
        default :
            return state
    }
}
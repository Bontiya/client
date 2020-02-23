import axios from 'axios';
import { ISLOGIN, GENERAL_ONLOAD, SUCCESS, ERRORS, LOGOUT } from '../actionTypes';
import { apiUrl } from '../urlTypes';
import { AsyncStorage } from 'react-native';

console.disableYellowBox = true;

export const registerAction = (form) => async dispatch => {
    try {
        dispatch({ type: GENERAL_ONLOAD })
        const { data:user } = await axios.post(`${apiUrl}/auth/register`, form)
        console.log(user)
        await AsyncStorage.setItem('name', user.name)
        await AsyncStorage.setItem('email', user.email)
        await AsyncStorage.setItem('token', user.token)

        dispatch({
            type: ISLOGIN,
            data: user
        })
    } catch ({response}) {
        dispatch({
            type: ISLOGIN,
            data: null
        })
        dispatch({
            type: ERRORS,
            data: response.data.errors
        })
    }
}

export const loginAction = (form) => async dispatch => {
    try {
        dispatch({ type: GENERAL_ONLOAD })
        const { data:user } = await axios.post(`${apiUrl}/auth/login`, form)
        console.log(user)
        await AsyncStorage.setItem('name', user.name)
        await AsyncStorage.setItem('email', user.email)
        await AsyncStorage.setItem('token', user.token)

        dispatch({
            type: ISLOGIN,
            data: user
        })
    } catch ({ response }) {
        dispatch({
            type: ISLOGIN,
            data: null
        })
        dispatch({
            type: ERRORS,
            data: response.data.errors
        })
    }
}

export const logout = () => (dispatch, state) => {
    dispatch({
        type: LOGOUT
    })
    AsyncStorage.removeItem('name')
    AsyncStorage.removeItem('email')
    AsyncStorage.removeItem('token')
}
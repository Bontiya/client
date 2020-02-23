import axios from 'axios';
import { ISLOGIN, GENERAL_ONLOAD, SUCCESS, ERRORS } from '../actionTypes';
import { apiUrl } from '../urlTypes';
import { AsyncStorage } from 'react-native';

export const registerAction = (form) => async (dispatch, state) => {
    console.log(form)
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
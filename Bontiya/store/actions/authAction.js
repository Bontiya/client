import { ISLOGIN, GENERAL_ONLOAD, SUCCESS, ERRORS } from '../actionTypes';
import { apiUrl } from '../urlTypes';
import { AsyncStorage } from 'react-native';

export const registerAction = (form) => async (dispatch, state) => {
    try {
        dispatch({ type: GENERAL_ONLOAD })
        const resJson = await fetch(`${apiUrl}/auth/register`)
        const user = await resJson.json()
        
        await AsyncStorage.setItem('name', user.name)
        await AsyncStorage.setItem('email', email.email)
        await AsyncStorage.setItem('token', user.token)

        dispatch({
            type: ISLOGIN,
            data: user
        })
    } catch (error) {
        console.log(error)
        dispatch({
            type: ISLOGIN,
            data: null
        })
        dispatch({
            type: ERRORS,
            data: error
        })
    }
}
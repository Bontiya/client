import { GET_ALL_USER, ERRORS } from '../actionTypes'
import axios from 'axios'
import { apiUrl } from '../urlTypes'
import { AsyncStorage } from 'react-native'

export const getAllUser = () => async (dispatch, state) => {
    try {
        const { data } =  await axios({
            method: 'get',
            url: `${apiUrl}/users`,
            headers: { Authorization: await AsyncStorage.getItem('token') }
        })
        dispatch({
            type: GET_ALL_USER,
            data
        })
    }
    catch ({ response }) {
        console.log('ERROR INI')
        dispatch({
            type: GET_ALL_USER,
            data: []
        })
        dispatch({
            type: ERRORS,
            data: response.data.errors
        })
    }
}
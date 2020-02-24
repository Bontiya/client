import axios from 'axios';
import io from "socket.io-client";
import { ISLOGIN, GENERAL_ONLOAD, ERRORS, LOGOUT } from '../actionTypes';
import { apiUrl } from '../urlTypes';
import { AsyncStorage } from 'react-native';
import { firebase } from '@react-native-firebase/messaging'

console.disableYellowBox = true;

export const registerAction = (form) => async dispatch => {
    try {
        dispatch({ type: GENERAL_ONLOAD })
        const { data:user } = await axios.post(`${apiUrl}/auth/register`, form)
        await AsyncStorage.setItem('_id', user._id)
        await AsyncStorage.setItem('name', user.name)
        await AsyncStorage.setItem('email', user.email)
        await AsyncStorage.setItem('token', user.token)

        await updateTokenFirebase(user.token,dispatch,user)

    } catch ({response}) {
        dispatch({
            type: ISLOGIN,
            data: null
        })
        if (response) {
            dispatch({
                type: ERRORS,
                data: response.data.errors
            })   
        }
    }
}

export const loginAction = (form) => async dispatch => {
    try {
        dispatch({ type: GENERAL_ONLOAD })
        const { data:user } = await axios.post(`${apiUrl}/auth/login`, form)
        await AsyncStorage.setItem('userId', user._id)
        await AsyncStorage.setItem('name', user.name)
        await AsyncStorage.setItem('email', user.email)
        await AsyncStorage.setItem('token', user.token)

        await updateTokenFirebase(user.token,dispatch,user)
        
    } catch (error) {
        const { response } = error

        dispatch({
            type: ISLOGIN,
            data: null
        })
        if (response) {
            dispatch({
                type: ERRORS,
                data: response.data.errors
            })   
        }
    }
}


export const checkIsLogged = () =>  (dispatch, state) => {
    Promise.all([
        AsyncStorage.getItem('userId'),
        AsyncStorage.getItem('name'),
        AsyncStorage.getItem('email'),
        AsyncStorage.getItem('token'),
        AsyncStorage.getItem('tokentokenFirebase')
    ]).then(result => {
      if ((result[0] && result[1]) && result[2]) {
            dispatch({
                type: ISLOGIN,
                data: {
                    _id: result[0],
                    name: result[1],
                    email : result[2],
                    token: result[3],
                    tokentokenFirebase: result[4]
                },
                socket: _connetSocket()
            })
      }
    })
    .catch(console.log)
}

export const _connetSocket = () => {
    const socket = io('http://localhost:3000', {
      transports: ['websocket'],
      jsonp: false
    })
    socket.on('chat message', msg => {
        console.log(msg)
    })
    return socket
}

const updateTokenFirebase = async (token,dispatch,user) => {
    try {
        const tokenFirebase = await firebase.messaging().getToken()
        await AsyncStorage.setItem('tokenFirebase', tokenFirebase)
        axios({
            method: 'post',
            url: `${apiUrl}/auth/token-firebase`,
            headers: { authorization: token },
            data: {
                tokenDeviceFirebase: tokenFirebase
            }
        })
        dispatch({
            type: ISLOGIN,
            data: {
                ...user,
                tokenFirebase,
                socket: _connetSocket()
            }
        })
    }
    catch (err) {
        console.log(err)
        const { response } = err
        dispatch({
            type: ERRORS,
            data: response.data.errors
        })
    }
}

export const logout = () => async (dispatch, state) => {
    try {
        state().general.socket.close()
        dispatch({
            type: LOGOUT
        })
        await AsyncStorage.removeItem('userId')
        await AsyncStorage.removeItem('name')
        await AsyncStorage.removeItem('email')
        await AsyncStorage.removeItem('token')   
    } catch (error) {
        console.log(error)
    }
}
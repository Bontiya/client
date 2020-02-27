import axios from 'axios';
import io from "socket.io-client";
import { ISLOGIN, GENERAL_ONLOAD, ERRORS, LOGOUT } from '../actionTypes';
import { apiUrl } from '../urlTypes';
import { AsyncStorage } from 'react-native';
import { firebase } from '@react-native-firebase/messaging'
import { getStatusInvitedPending } from "./memberAction";
import { getUpcomingEvent, getPastEvent } from "./eventAction";
import pushNotif from "../../helpers/pushNotif"
console.disableYellowBox = true;

export const registerAction = (form) => async dispatch => {
    try {
        dispatch({ type: GENERAL_ONLOAD })
        const { data:user } = await axios.post(`${apiUrl}/auth/register`, form)
        await AsyncStorage.setItem('userId', user._id)
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
        AsyncStorage.getItem('tokenFirebase')
    ]).then(result => {
      if ((result[0] && result[1]) && result[2]) {
            dispatch({
                type: ISLOGIN,
                data: {
                    _id: result[0],
                    name: result[1],
                    email : result[2],
                    token: result[3],
                    tokenDeviceFirebase: result[4]
                },
                socket: _connetSocket(dispatch, result[0])
            })
            dispatch({
                type: 'SOCKET_ACTIVE',
                data: false
            })
            dispatch(getStatusInvitedPending())
      }
    })
    .catch(console.log)
}

export const _connetSocket = (dispatch, id) => {
    const socket = io(apiUrl, {
      transports: ['websocket'],
      jsonp: false
    })
    socket.on('chat message', msg => {
        console.log(msg)
    })
    socket.on(`${id} StatusInvitedPending`, res => {
        console.log('================')
            pushNotif(`Bontiya`, `hey, someone have invited you!!`)
            dispatch(getStatusInvitedPending())
        })
        socket.on(`${id} updatedStatusEventToDone`, function(msg) {
            pushNotif('Bontiya', 'yeay!, your event have done')
            dispatch(getPastEvent())
        })
        socket.on(`${id} myAcceptedEvent`, res => {
            console.log(res)
            pushNotif('Bontiya', 'yeay!, accepted event success')
            dispatch(getUpcomingEvent())
        })
        socket.on(`${id} StatusInvitedMemberUpdated`, res => {
            pushNotif('Bontiya', `yeay!, someone have accepted your event`)
            dispatch(getUpcomingEvent())
    })
    return socket
}

const updateTokenFirebase = async (token,dispatch,user) => {
    try {
        const tokenFirebase = await firebase.messaging().getToken()
        console.log(tokenFirebase,"Token firebase")
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
            },
            socket: _connetSocket(dispatch,user._id)
        })
        dispatch({
            type: 'SOCKET_ACTIVE',
            data: false
        })
        dispatch(getStatusInvitedPending())
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
        dispatch({
            type: 'SOCKET_ACTIVE',
            data: false
        })
        await AsyncStorage.removeItem('userId')
        await AsyncStorage.removeItem('name')
        await AsyncStorage.removeItem('email')
        await AsyncStorage.removeItem('token')   
    } catch (error) {
        console.log(error)
    }
}
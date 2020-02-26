import axios from "axios";
import { event, ERRORS, GET_GOOGLE_VISIONS_RESULT, CHANGE_STATUS_KEY, MODAL } from "../actionTypes";
import { apiUrl } from '../urlTypes';
import { AsyncStorage } from 'react-native';

export const getUpcomingEvent = () => async (dispatch, state) => {
    try {
        dispatch({
            type: event.GET_UPCOMING_EVENTS_ONLOAD
        })
        const { token } = state().general.isLogged
        let { data } = await axios.get(`${apiUrl}/events?status=onGoing`, {
            headers: {
                authorization: token
            }
        })
        data = data.sort(function(a, b){
            return new Date(b.time) - new Date(a.time)
        })
        dispatch({
            type: event.GET_UPCOMING_EVENTS,
            data
        })

    } catch (error) {
        const { response } = error
        dispatch({
            type: event.GET_UPCOMING_EVENTS,
            data: []
        })
        if (response.data) {
            dispatch({
                type: ERRORS,
                data: response.data.errors
            })   
        }
    }
}

export const getPastEvent = () => async (dispatch, state) => {
    try {
        dispatch({
            type: event.GET_PAST_EVENTS_ONLOAD
        })
        const { token } = state().general.isLogged
        const { data } = await axios.get(`${apiUrl}/events?status=done`, {
            headers: {
                authorization: token
            }
        })
        dispatch({
            type: event.GET_PAST_EVENTS,
            data
        })
    } catch (error) {
        console.log(error, '<<<<<<,')
        const { response } = error
        dispatch({
            type: event.GET_PAST_EVENTS,
            data: []
        })
        if (response) {
            dispatch({
                type: ERRORS,
                data: response.data.errors
            })
        }
    }
}

export const createEvent = (event) => async (dispatch, state) => {
    try {
      const { name, location, time, key, description, locationHost } = event
      const { data } = await axios({
        method: 'post',
        url: `${apiUrl}/events`,
        data: { name, location, time, key, description, locationHost },
        headers: { Authorization: await AsyncStorage.getItem('token') }
      })
      // handle loading
      dispatch(getUpcomingEvent())
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

export const toggleModal = (payload) => (dispatch, state) => {
    dispatch({
        type: MODAL,
        data: payload
    })
}

export const inviteMember = (payload) => async (dispatch, state) => {
    try {
        const membersFirebaseToken = await getMemberTokens(payload.members)
        console.log(membersFirebaseToken)
        await axios({
            method: 'post',
            url: `${apiUrl}/events/${payload.eventId}/members`,
            data: [{
                userId: payload.userId,
                role: 'guest',
                membersFirebaseToken
            }],
            headers: { Authorization : await AsyncStorage.getItem('token') }
        })
        dispatch({
            type: event.SUCCESS_TOAST
        })
        dispatch({
            type: event.DEFAULT_SUCCESS_TOAST
        })
    } 
    catch (err) {
        console.log(err)
        console.log('eee')
        dispatch({
            type: event.ERROR_TOAST
        })
        dispatch({
            type: event.DEFAULT_ERROR_TOAST
        })
        // dispatch({
        //     type: ERRORS,
        //     data: response.data.errors
        // })
    }
}

export const googleVision = (base) => async (dispatch, state) => {
    try {
        const { token } = state().general.isLogged
        const { data } = await axios.post(`${apiUrl}/visions/detect`, {
            data: {
                baseImg: base
            },
            headers: {
                authorization: token
            }
        })
        dispatch({
            type: GET_GOOGLE_VISIONS_RESULT,
            data
        })
      } catch ({ response }) {
        console.log(response)
        dispatch({
            type: ERRORS,
            data: response.data.errors
        })
    }
}

export const changeStatusKey = (memberId) => async (dispatch, state) => {
    try {
        const { token, _id } = state().general.isLogged
        const { data } = await axios({
            method: 'patch',
            url: `${apiUrl}/events/members/${memberId}/status-key`,
            headers: {
                authorization: token
            }
        })
        dispatch({
            type: CHANGE_STATUS_KEY,
            data
        })
      } catch (err) {
        console.log(err, '*****')
        // dispatch({
        //     type: ERRORS,
        //     data: response.data.errors
        // })
    }
}

const getMemberTokens = async (members) => {
    let firebaseTokens = []
    for( let member of members ) {
        if( member.user.tokenDeviceFirebase ) firebaseTokens.push( member.user.tokenDeviceFirebase )
    }
    console.log(firebaseTokens,'FIREBASETOKENS')
    return firebaseTokens
}

export const getEventDetail = (eventId) => async (dispatch, state) => {
    console.log('------------------------')
    try {
        dispatch({
            type: event.GET_EVENT_ONLOAD
        })
        const { token } = state().general.isLogged
        const { data } = await axios.get(`${apiUrl}/events/${eventId}`, {
            headers: {
                authorization: token
            }
        })
        console.log(data, '------------------------')
        dispatch({
            type: event.GET_EVENT_DETAIL,
            data
        })

    } catch (error) {
        const { response } = error
        dispatch({
            type: event.GET_EVENT_DETAIL,
            data: {}
        })
        if (response.data) {
            dispatch({
                type: ERRORS,
                data: response.data.errors
            })   
        }
    }
}
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
        const { data } = await axios.get(`${apiUrl}/events?status=onGoing`, {
            headers: {
                authorization: token
            }
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
        if (response?.data) {
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
        const { token } = state.general.isLogged
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
        await axios({
            method: 'post',
            url: `${apiUrl}/events/${payload.eventId}/members`,
            data: [{
                userId: payload.userId,
                role: 'guest'
            }],
            headers: { Authorization : await AsyncStorage.getItem('token') }
        })
    } 
    catch ({ response }) {
  
        dispatch({
            type: ERRORS,
            data: response.data.errors
        })
        if (response?.data) {
            dispatch({
                type: ERRORS,
                data: response.data.errors
            })   
        }
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
        console.log(data, '{{{{{')
        dispatch({
            type: GET_GOOGLE_VISIONS_RESULT,
            data
        })
        console.log(data, 'XXXXXXXXXXXXXXXx')
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
        console.log(token, _id, '++++')
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
        console.log(data, '!!!!!!!!!!!!!!!!!!!!!!!!')
      } catch (err) {
        console.log(err, '*****')
        // dispatch({
        //     type: ERRORS,
        //     data: response.data.errors
        // })
    }
}

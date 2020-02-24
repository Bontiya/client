import axios from "axios";
import { event, ERRORS, MODAL } from "../actionTypes";
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

    } catch ({ response }) {
        dispatch({
            type: event.GET_UPCOMING_EVENTS,
            data: []
        })
        dispatch({
            type: ERRORS,
            data: response.data.errors
        })
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

    } catch ({ response }) {
        dispatch({
            type: event.GET_PAST_EVENTS,
            data: []
        })
        dispatch({
            type: ERRORS,
            data: response.data.errors
        })
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
    console.log(payload)
    dispatch({
        type: MODAL,
        data: payload
    })
}

export const inviteMember = (payload) => (dispatch, state) => {
    try {
        await axios({
            method: 'post',
            url: `${apiUrl}/events/${payload.eventId}/members`,
            data: {
                userId: payload.userId,
                role: 'guest'
            },
            headers: { Authorization : await AsyncStorage.getItem('token') }
        })
    } 
    catch ({ response }) {
        dispatch({
            type: ERRORS,
            data: response.data.errors
        })
    }
}
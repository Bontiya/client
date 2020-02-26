import axios from "axios";
import { apiUrl } from "../urlTypes";
import { member, ERRORS, SUCCESS } from "../actionTypes";

export const getStatusInvitedPending = () => async (dispatch, state) => {
    try {
        dispatch({
            type: member.GET_STATUS_INVITED_PENDING_ONLOAD
        })
        const { token } = state().general.isLogged
        const { data } = await axios.get(`${apiUrl}/events/members/status-invited/pending`, {
            headers: {
                authorization: token
            }
        })
        dispatch({
            type: member.GET_STATUS_INVITED_PENDING,
            data: data
        })

    } catch (error) {
        const { response } = error
        dispatch({
            type: member.GET_STATUS_INVITED_PENDING,
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

export const updateStatusInvited = (form, memberId) => async (dispatch, state) => {
    try {
        const { token } = state().general.isLogged
        await axios.patch(`${apiUrl}/events/members/${memberId}/status-invited`, form, {
            headers: {
                authorization: token
            }
        });
        dispatch(getStatusInvitedPending())
    } catch (error) {
        const { response } = error
        if (response?.data) {
            dispatch({
                type: ERRORS,
                data: response.data.errors
            })
        }   
    }
}

export const getTimeEstimation = (myLoc, eventLoc) => async (dispatch, state) =>  {
    try {
        const { data } = await axios({
            method: 'get',
            url: `${apiUrl}/locations/duration?origins=${myLoc}&destination=${eventLoc}`
        });
        dispatch({
            type: member.GET_TIME_EST,
            data: data.duration.seconds
        })
    } catch (error) {
        console.log(error, 'timeEST')
        const { response } = error
        if (response?.data) {
            dispatch({
                type: ERRORS,
                data: response.data.errors
            })
        }   
    }
}
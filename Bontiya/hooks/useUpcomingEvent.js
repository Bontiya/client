import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUpcomingEvent } from "../store/actions/eventAction";
import { event } from "../store/actionTypes";
import pushNotif from "../helpers/pushNotif";

export default function useUpcomingEvent() {
    const dispatch = useDispatch()
    const { socket, isLogged } = useSelector(state => state.general)
    socket.on(`${isLogged._id} myAcceptedEvent`, res => {
        pushNotif('Bontiya', 'yeay!, accepted event success')
        dispatch(getUpcomingEvent())
    })
    socket.on(`${isLogged._id} StatusInvitedMemberUpdated`, res => {
        pushNotif('Bontiya', 'yeay!, someone have accepted your event')
        dispatch(getUpcomingEvent())
    })
    useState(() => {
        dispatch(getUpcomingEvent())
        return () => {
            dispatch({
                type: event.GET_UPCOMING_EVENTS,
                data: []
            })
        }
    }, [])
}
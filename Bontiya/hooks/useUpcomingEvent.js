import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUpcomingEvent } from "../store/actions/eventAction";
import { event } from "../store/actionTypes";

export default function useUpcomingEvent() {
    const dispatch = useDispatch()
    const { socket, isLogged } = useSelector(state => state.general)
    socket.on(`${isLogged._id} myAcceptedEvent`, res => {
        dispatch(getUpcomingEvent())
    })
    socket.on(`${isLogged._id} StatusInvitedMemberUpdated`, res => {
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
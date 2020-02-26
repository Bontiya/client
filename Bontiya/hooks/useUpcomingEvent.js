import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUpcomingEvent } from "../store/actions/eventAction";
import { event } from "../store/actionTypes";
import pushNotif from "../helpers/pushNotif";

export default function useUpcomingEvent() {
    const dispatch = useDispatch()
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
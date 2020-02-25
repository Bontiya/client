import { useState } from "react";
import { useDispatch } from "react-redux";
import { getPastEvent } from "../store/actions/eventAction";
import { event } from "../store/actionTypes";

export default function useUpcomingEvent() {
    const dispatch = useDispatch()
    useState(() => {
        dispatch(getPastEvent())
        return () => {
            dispatch({
                type: event.GET_PAST_EVENTS,
                data: []
            })
        }
    }, [])
}
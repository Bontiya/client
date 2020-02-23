import { useState } from "react";
import { useDispatch } from "react-redux";
import { getUpcomingEvent } from "../store/actions/eventAction";

export default function useUpcomingEvent() {
    const dispatch = useDispatch()
    useState(() => {
        dispatch(getUpcomingEvent())
    }, [])
}
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getPastEvent } from "../store/actions/eventAction";

export default function useUpcomingEvent() {
    const dispatch = useDispatch()
    useState(() => {
        dispatch(getPastEvent())
    }, [])
}
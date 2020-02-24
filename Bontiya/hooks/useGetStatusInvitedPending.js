import { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { getStatusInvitedPending } from "../store/actions/memberAction";

export default function useGetStatusInvitedPending() {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getStatusInvitedPending())
    }, [])
}
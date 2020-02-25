import { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { getStatusInvitedPending } from "../store/actions/memberAction";
import { member } from "../store/actionTypes";

export default function useGetStatusInvitedPending() {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getStatusInvitedPending())
        return () => {
            dispatch({
                type: member.GET_STATUS_INVITED_PENDING,
                data: []
            })
        }
    }, [])
}
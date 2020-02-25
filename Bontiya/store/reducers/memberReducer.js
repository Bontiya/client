import { member } from "../actionTypes";
const initialState = {
    statusInvitedPending: [],
    statusInvitedPendingOnload: false
}

function memberReducer(state = initialState, action) {
    switch (action.type) {
        case member.GET_STATUS_INVITED_PENDING:
            return {
                ...state,
                statusInvitedPending: action.data,
                statusInvitedPendingOnload: false
            }
        case member.GET_STATUS_INVITED_PENDING_ONLOAD:
            return {
                ...state,
                statusInvitedPendingOnload: true
            }
        default:
            return state
    }
}

export default memberReducer
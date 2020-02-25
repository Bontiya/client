import { member } from "../actionTypes";
const initialState = {
    statusInvitedPending: [],
    statusInvitedPendingOnload: false,
    timeEstimation: 0
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
        case member.GET_TIME_EST:
            return {
                ...state,
                timeEstimation: action.data
            }
        default:
            return state
    }
}

export default memberReducer
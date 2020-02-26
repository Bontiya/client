import { event, GET_GOOGLE_VISIONS_RESULT, CHANGE_STATUS_KEY } from "../actionTypes";
const initialState = {
    upcomingEvents: [],
    pastEvents: [],
    event: null,
    upcomingEventsOnload: false,
    pastEventsOnload: false,
    eventOnload: false,
    addingEventOnload: false,
    gVisResult: '',
    isReady: false,
    eventDetail: {},
    eventDetailOnLoad: false,
    errorToast: false,
    successToast: false,
}

function eventReducer(state = initialState, action) {  
    switch (action.type) {
        case event.GET_UPCOMING_EVENTS:
            return {
                ...state,
                upcomingEvents: action.data,
                upcomingEventsOnload: false,
            }
        case event.GET_PAST_EVENTS: 
            return {
                ...state,
                pastEvent: action.data,
                pastEventsOnload: false
            }
        case event.GET_UPCOMING_EVENTS_ONLOAD:
            return {
                ...state,
                upcomingEventsOnload: true
            }
        case event.GET_PAST_EVENTS_ONLOAD:
            return {
                ...state,
                pastEventsOnload: true
            }
        case GET_GOOGLE_VISIONS_RESULT:
            return {
                ...state,
                gVisResult: action.data
            }
        case CHANGE_STATUS_KEY:
            return {
                ...state,
                isReady: true
            }
        case event.SUCCESS_TOAST:
                return {
                    ...state,
                    successToast: true,
                }
        case event.DEFAULT_SUCCESS_TOAST:
            return {
                ...state,
                successToast: false
            }
        case event.ERROR_TOAST:
            return {
                ...state,
                errorToast: true
            }
        case event.DEFAULT_ERROR_TOAST:
            return {
                ...state,
                errorToast: false
            }
        case event.GET_EVENT_DETAIL:
            return {
                ...state,
                eventDetail: action.data,
                eventOnload: false
            }
        case event.GET_EVENT_ONLOAD:
            return {
                ...state,
                eventDetailOnLoad: true
            }
        default:
            return state
    }
}

export default eventReducer

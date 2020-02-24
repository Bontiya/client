import { event } from "../actionTypes";
const initialState = {
    upcomingEvents: [],
    pastEvents: [],
    event: null,
    upcomingEventsOnload: false,
    pastEventsOnload: false,
    eventOnload: false,
    addingEventOnload: false
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
        default:
            return state
    }
}

export default eventReducer

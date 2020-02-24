import { MODAL } from '../actionTypes'

export const toggleModal = (payload) => (dispatch, state) => {
    console.log(payload)
    dispatch({
        type: MODAL,
        data: payload
    })
}
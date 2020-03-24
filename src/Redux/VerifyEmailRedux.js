
import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  verifyEmailRequest: ['params'],
  verifyEmailSuccess: ['data'],
  verifyEmailFailure: ['error'],
  clearData: null
})

export const VerifyEmailTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  data: null,
  objects: {},
  error: null,
  fetching: false
})

/* ------------- Reducers ------------- */

export const verifyEmailRequest = state => state.merge({ fetching: true, error: null, data: null })
export const verifyEmailSuccess = (state, { data }) => state.merge({ fetching: false, error: null, data })
/*
export const verifyEmailSuccess = (state, { data }) => {
  data.data.forEach(element => {
    if (element.option && element.option === 'delete') {
      let newData = Object.assign({}, state.objects)
      delete newData[element.id]
      state = state.setIn(['objects'], newData)
    } else {
      state = state.setIn(['objects', element.id], element)
    }
  })
  state = state.setIn(['fetching'], false)
  state = state.setIn(['data'], data)
  return state
}
*/

export const verifyEmailFailure = (state, { error }) => state.merge({ fetching: false, error, data: null })

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.VERIFY_EMAIL_REQUEST]: verifyEmailRequest,
  [Types.VERIFY_EMAIL_SUCCESS]: verifyEmailSuccess,
  [Types.VERIFY_EMAIL_FAILURE]: verifyEmailFailure
})

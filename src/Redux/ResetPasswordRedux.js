
import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  resetPasswordRequest: ['params'],
  resetPasswordSuccess: ['data'],
  resetPasswordFailure: ['error'],
  clearData: null
})

export const ResetPasswordTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  data: {},
  objects: {},
  error: null,
  fetching: false
})

/* ------------- Reducers ------------- */

export const resetPasswordRequest = state => state.merge({ fetching: true, error: null, data: null })

export const resetPasswordSuccess = (state, { data }) => state.merge({ fetching: true, error: null, data })

export const resetPasswordFailure = (state, { error }) => state.merge({ fetching: false, error, data: null })

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.RESET_PASSWORD_REQUEST]: resetPasswordRequest,
  [Types.RESET_PASSWORD_SUCCESS]: resetPasswordSuccess,
  [Types.RESET_PASSWORD_FAILURE]: resetPasswordFailure
})

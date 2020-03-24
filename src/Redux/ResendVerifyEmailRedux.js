
import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  resendVerifyEmailRequest: ['params'],
  resendVerifyEmailSuccess: ['data'],
  resendVerifyEmailFailure: ['error'],
  clearData: null
})

export const ResendVerifyEmailTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  data: {},
  objects: {},
  error: null,
  fetching: false
})

/* ------------- Reducers ------------- */

export const resendVerifyEmailRequest = state => state.merge({ fetching: true, error: null, data: null })

export const resendVerifyEmailSuccess = (state, { data }) => state.merge({ fetching: true, error: null, data })

export const resendVerifyEmailFailure = (state, { error }) => state.merge({ fetching: false, error, data: null })

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.RESEND_VERIFY_EMAIL_REQUEST]: resendVerifyEmailRequest,
  [Types.RESEND_VERIFY_EMAIL_SUCCESS]: resendVerifyEmailSuccess,
  [Types.RESEND_VERIFY_EMAIL_FAILURE]: resendVerifyEmailFailure
})

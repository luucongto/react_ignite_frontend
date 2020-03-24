
import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  userRequest: ['params'],
  userUpdate: ['params'],
  userSuccess: ['data'],
  userUpdateSuccess: ['data'],
  userFailure: ['error'],
  clearData: null
})

export const UserTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  data: {},
  error: null,
  fetching: false,
  fetchingUpdate: false
})

/* ------------- Reducers ------------- */

export const userRequest = state => state.merge({ fetching: true, error: null, data: {} })
export const userUpdate = state => state.merge({ fetchingUpdate: true, error: null, data: {} })
export const userUpdateSuccess = (state, { data }) => state.merge({ fetchingUpdate: false, error: null, data })
export const userSuccess = (state, { data }) => state.merge({ fetching: false, error: null, data })

export const userFailure = (state, { error }) => state.merge({ fetching: false, error, data: {} })

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.USER_REQUEST]: userRequest,
  [Types.USER_UPDATE]: userUpdate,
  [Types.USER_SUCCESS]: userSuccess,
  [Types.USER_UPDATE_SUCCESS]: userUpdateSuccess,
  [Types.USER_FAILURE]: userFailure
})

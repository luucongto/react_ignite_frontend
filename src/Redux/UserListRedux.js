
import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  userListRequest: ['params'],
  userListSuccess: ['data'],
  userListFailure: ['error'],
  clearData: null
})

export const UserListTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  data: [],
  objects: {},
  error: null,
  fetching: false
})

/* ------------- Reducers ------------- */

export const userListRequest = state => state.merge({ fetching: true, error: null })
export const userListSuccess = (state, { data }) => state.merge({ fetching: false, error: null, data })
/*
export const userListSuccess = (state, { data }) => {
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

export const userListFailure = (state, { error }) => state.merge({ fetching: false, error})

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.USER_LIST_REQUEST]: userListRequest,
  [Types.USER_LIST_SUCCESS]: userListSuccess,
  [Types.USER_LIST_FAILURE]: userListFailure
})

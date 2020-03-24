
import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  cmsModelDeleteRequest: ['params'],
  cmsModelDeleteSuccess: ['data'],
  cmsModelDeleteFailure: ['error'],
  clearData: null
})

export const CmsModelDeleteTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  data: [],
  objects: {},
  error: null,
  fetching: false
})

/* ------------- Reducers ------------- */

export const cmsModelDeleteRequest = state => state.merge({ fetching: true, error: null })
export const cmsModelDeleteSuccess = (state, { data }) => state.merge({ fetching: false, error: null, data })
/*
export const cmsModelDeleteSuccess = (state, { data }) => {
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

export const cmsModelDeleteFailure = (state, { error }) => state.merge({ fetching: false, error})

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.CMS_MODEL_DELETE_REQUEST]: cmsModelDeleteRequest,
  [Types.CMS_MODEL_DELETE_SUCCESS]: cmsModelDeleteSuccess,
  [Types.CMS_MODEL_DELETE_FAILURE]: cmsModelDeleteFailure
})

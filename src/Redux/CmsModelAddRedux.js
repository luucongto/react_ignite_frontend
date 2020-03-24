
import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  cmsModelAddRequest: ['params'],
  cmsModelAddSuccess: ['data'],
  cmsModelAddFailure: ['error'],
  clearData: null
})

export const CmsModelAddTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  data: null,
  objects: {},
  error: null,
  fetching: false
})

/* ------------- Reducers ------------- */

export const cmsModelAddRequest = state => state.merge({ fetching: true, error: null, data: null })
export const cmsModelAddSuccess = (state, { data }) => state.merge({ fetching: false, error: null, data })
/*
export const cmsModelAddSuccess = (state, { data }) => {
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

export const cmsModelAddFailure = (state, { error }) => state.merge({ fetching: false, error})

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.CMS_MODEL_ADD_REQUEST]: cmsModelAddRequest,
  [Types.CMS_MODEL_ADD_SUCCESS]: cmsModelAddSuccess,
  [Types.CMS_MODEL_ADD_FAILURE]: cmsModelAddFailure
})


import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  cmsModelUpdateRequest: ['params'],
  cmsModelUpdateSuccess: ['data'],
  cmsModelUpdateFailure: ['error'],
  clearData: null
})

export const CmsModelUpdateTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  data: null,
  objects: {},
  error: null,
  fetching: false
})

/* ------------- Reducers ------------- */

export const cmsModelUpdateRequest = state => state.merge({ fetching: true, error: null, data: null})
export const cmsModelUpdateSuccess = (state, { data }) => state.merge({ fetching: false, error: null, data })
/*
export const cmsModelUpdateSuccess = (state, { data }) => {
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

export const cmsModelUpdateFailure = (state, { error }) => state.merge({ fetching: false, error})

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.CMS_MODEL_UPDATE_REQUEST]: cmsModelUpdateRequest,
  [Types.CMS_MODEL_UPDATE_SUCCESS]: cmsModelUpdateSuccess,
  [Types.CMS_MODEL_UPDATE_FAILURE]: cmsModelUpdateFailure
})


import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  cmsModelListRequest: ['params'],
  cmsModelListSuccess: ['data'],
  cmsModelListFailure: ['error'],
  clearData: null
})

export const CmsModelListTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  data: [],
  objects: {},
  error: null,
  fetching: false
})

/* ------------- Reducers ------------- */

export const cmsModelListRequest = state => state.merge({ fetching: true, error: null })
export const cmsModelListSuccess = (state, { data }) => state.merge({ fetching: false, error: null, data })
/*
export const cmsModelListSuccess = (state, { data }) => {
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

export const cmsModelListFailure = (state, { error }) => state.merge({ fetching: false, error})

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.CMS_MODEL_LIST_REQUEST]: cmsModelListRequest,
  [Types.CMS_MODEL_LIST_SUCCESS]: cmsModelListSuccess,
  [Types.CMS_MODEL_LIST_FAILURE]: cmsModelListFailure
})

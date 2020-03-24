import { call, put } from 'redux-saga/effects'
import CmsModelUpdateActions from '../Redux/CmsModelUpdateRedux'
import LoginActions from '../Redux/LoginRedux'
export function * cmsModelUpdate (api, {params}) {
  try {
    const res = yield call(api, params)
    if (res && res.message === 'Unauthenticated.') {
      yield put(LoginActions.loginFailure())
      return
    }
    if (res.success) {
      yield put(CmsModelUpdateActions.cmsModelUpdateSuccess(res.data))
    } else {
      yield put(CmsModelUpdateActions.cmsModelUpdateFailure(res.message))
    }
  } catch (error) {
    yield put(CmsModelUpdateActions.cmsModelUpdateFailure(error.message))
  }
}

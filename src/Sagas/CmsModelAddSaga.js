import { call, put } from 'redux-saga/effects'
import CmsModelAddActions from '../Redux/CmsModelAddRedux'
import LoginActions from '../Redux/LoginRedux'
export function * cmsModelAdd (api, {params}) {
  try {
    const res = yield call(api, params)
    if (res && res.message === 'Unauthenticated.') {
      yield put(LoginActions.loginFailure())
      return
    }
    if (res.success) {
      yield put(CmsModelAddActions.cmsModelAddSuccess(res.data))
    } else {
      yield put(CmsModelAddActions.cmsModelAddFailure(res.message))
    }
  } catch (error) {
    yield put(CmsModelAddActions.cmsModelAddFailure(error.message))
  }
}

import { call, put } from 'redux-saga/effects'
import CmsModelDeleteActions from '../Redux/CmsModelDeleteRedux'
import LoginActions from '../Redux/LoginRedux'
export function * cmsModelDelete (api, {params}) {
  try {
    const res = yield call(api, params)
    if (res && res.message === 'Unauthenticated.') {
      yield put(LoginActions.loginFailure())
      return
    }
    if (res.success) {
      yield put(CmsModelDeleteActions.cmsModelDeleteSuccess(res.data))
    } else {
      yield put(CmsModelDeleteActions.cmsModelDeleteFailure(res.message))
    }
  } catch (error) {
    yield put(CmsModelDeleteActions.cmsModelDeleteFailure(error.message))
  }
}

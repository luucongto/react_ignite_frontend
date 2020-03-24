import { call, put } from 'redux-saga/effects'
import CmsModelListActions from '../Redux/CmsModelListRedux'
import LoginActions from '../Redux/LoginRedux'
export function * cmsModelList (api, {params}) {
  try {
    const res = yield call(api, params)
    if (res && res.message === 'Unauthenticated.') {
      yield put(LoginActions.loginFailure())
      return
    }
    if (res.success) {
      yield put(CmsModelListActions.cmsModelListSuccess(res.data))
    } else {
      yield put(CmsModelListActions.cmsModelListFailure(res.message))
    }
  } catch (error) {
    yield put(CmsModelListActions.cmsModelListFailure(error.message))
  }
}

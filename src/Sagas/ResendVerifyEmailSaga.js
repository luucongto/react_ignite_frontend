import { call, put } from 'redux-saga/effects'
import ResendVerifyEmailActions from '../Redux/ResendVerifyEmailRedux'
import LoginActions from '../Redux/LoginRedux'
export function * resendVerifyEmail (api, {params}) {
  try {
    const res = yield call(api, params)
    if (res && res.message === 'Unauthenticated.') {
      yield put(LoginActions.loginFailure())
      return
    }
    if (res.success) {
      yield put(ResendVerifyEmailActions.resendVerifyEmailSuccess(res))
    } else {
      yield put(ResendVerifyEmailActions.resendVerifyEmailFailure(res.message))
    }
  } catch (error) {
    yield put(ResendVerifyEmailActions.resendVerifyEmailFailure(error.message))
  }
}

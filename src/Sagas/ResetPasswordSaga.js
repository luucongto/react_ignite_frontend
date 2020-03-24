import { call, put } from 'redux-saga/effects'
import ResetPasswordActions from '../Redux/ResetPasswordRedux'
import LoginActions from '../Redux/LoginRedux'
export function * resetPassword (api, {params}) {
  try {
    const res = yield call(api, params)
    if (res && res.message === 'Unauthenticated.') {
      yield put(LoginActions.loginFailure())
      return
    }
    if (res.success) {
      yield put(ResetPasswordActions.resetPasswordSuccess(res))
    } else {
      yield put(ResetPasswordActions.resetPasswordFailure(res.message))
    }
  } catch (error) {
    yield put(ResetPasswordActions.resetPasswordFailure(error.message))
  }
}

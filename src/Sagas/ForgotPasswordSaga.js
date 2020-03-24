import { call, put } from 'redux-saga/effects'
import ForgotPasswordActions from '../Redux/ForgotPasswordRedux'
import LoginActions from '../Redux/LoginRedux'
export function * forgotPassword (api, {params}) {
  try {
    const res = yield call(api, params)
    if (res && res.message === 'Unauthenticated.') {
      yield put(LoginActions.loginFailure())
      return
    }
    if (res.success) {
      yield put(ForgotPasswordActions.forgotPasswordSuccess(res))
    } else {
      yield put(ForgotPasswordActions.forgotPasswordFailure(res.message))
    }
  } catch (error) {
    yield put(ForgotPasswordActions.forgotPasswordFailure(error.message))
  }
}

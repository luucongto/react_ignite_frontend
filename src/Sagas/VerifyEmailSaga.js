import { call, put } from 'redux-saga/effects'
import VerifyEmailActions from '../Redux/VerifyEmailRedux'
import LoginActions from '../Redux/LoginRedux'
export function * verifyEmail (api, {params}) {
  try {
    const res = yield call(api, params)
    if (res && res.message === 'Unauthenticated.') {
      yield put(LoginActions.loginFailure())
      return
    }
    if (res.success) {
      yield put(VerifyEmailActions.verifyEmailSuccess(res))
    } else {
      yield put(VerifyEmailActions.verifyEmailFailure(res.message))
    }
  } catch (error) {
    yield put(VerifyEmailActions.verifyEmailFailure(error.message))
  }
}

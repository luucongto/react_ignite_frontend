import { call, put } from 'redux-saga/effects'
import LoginActions from '../Redux/LoginRedux'
import UserActions from '../Redux/UserRedux'

export function * login (loginAPI, {params}) {
  try {
    const res = yield call(loginAPI, params)
    if (res && res.success) {
      yield put(LoginActions.loginSuccess(res.data))
      if (res.data.user) {
        yield put(UserActions.userSuccess(res.data.user))
      }
    } else {
      yield put(LoginActions.loginFailure(res.message))
    }
  } catch (error) {
    yield put(LoginActions.loginFailure(error.message))
  }
}

export function * logout (logoutAPI) {
  try {
    yield call(logoutAPI)
    yield put(LoginActions.logoutSuccess())
  } catch (error) {
    yield put(LoginActions.logoutFailure(error.message))
  }
}

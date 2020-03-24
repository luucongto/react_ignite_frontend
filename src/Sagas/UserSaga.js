import { call, put } from 'redux-saga/effects'
import UserActions from '../Redux/UserRedux'
import LoginActions from '../Redux/LoginRedux'
export function * user (api, {params}) {
  try {
    const res = yield call(api, params)
    if (res && res.message === 'Unauthenticated.') {
      yield put(LoginActions.loginFailure())
      return
    }
    if (res.success) {
      yield put(UserActions.userSuccess(res.data))
    } else {
      yield put(UserActions.userFailure(res.message))
    }
  } catch (error) {
    yield put(UserActions.userFailure(error.message))
  }
}

export function * userUpdate (api, {params}) {
  try {
    const res = yield call(api, params)
    if (res && res.message === 'Unauthenticated.') {
      yield put(LoginActions.loginFailure())
      return
    }
    if (res.success) {
      yield put(UserActions.userUpdateSuccess(res.data))
    } else {
      yield put(UserActions.userFailure(res.message))
    }
  } catch (error) {
    yield put(UserActions.userFailure(error.message))
  }
}

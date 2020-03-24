import { call, put } from 'redux-saga/effects'
import RegisterActions from '../Redux/RegisterRedux'
import LoginActions from '../Redux/LoginRedux'

export function * register (api, {params}) {
  try {
    const res = yield call(api, params)
    if (res.success) {
      yield put(RegisterActions.registerSuccess(res))
      if (res.user) {
        yield put(LoginActions.loginSuccess(res))
      }
    } else {
      yield put(RegisterActions.registerFailure(res.message))
    }
  } catch (error) {
    yield put(RegisterActions.registerFailure(error.message))
  }
}

import { call, put } from 'redux-saga/effects'
import UserListActions from '../Redux/UserListRedux'
import LoginActions from '../Redux/LoginRedux'
export function * userList (api, {params}) {
  try {
    const res = yield call(api, params)
    if (res && res.message === 'Unauthenticated.') {
      yield put(LoginActions.loginFailure())
      return
    }
    if (res.success) {
      yield put(UserListActions.userListSuccess(res.data))
    } else {
      yield put(UserListActions.userListFailure(res.message))
    }
  } catch (error) {
    yield put(UserListActions.userListFailure(error.message))
  }
}

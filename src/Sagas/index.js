import { takeLatest, all } from 'redux-saga/effects'
import api from '../Services/Api'
/* ------------- Types ------------- */
import { VerifyEmailTypes } from '../Redux/VerifyEmailRedux'
import { ForgotPasswordTypes } from '../Redux/ForgotPasswordRedux'
import { ResetPasswordTypes } from '../Redux/ResetPasswordRedux'
import { ResendVerifyEmailTypes } from '../Redux/ResendVerifyEmailRedux'
import { UserTypes } from '../Redux/UserRedux'
import { StartupTypes } from '../Redux/StartupRedux'
import { LoginTypes } from '../Redux/LoginRedux'
import { RegisterTypes } from '../Redux/RegisterRedux'
import { CmsModelListTypes } from '../Redux/CmsModelListRedux'
import { CmsModelDeleteTypes } from '../Redux/CmsModelDeleteRedux'
import { CmsModelAddTypes } from '../Redux/CmsModelAddRedux'
import { CmsModelUpdateTypes } from '../Redux/CmsModelUpdateRedux'
import { UserListTypes } from '../Redux/UserListRedux'
/* ------------- Sagas ------------- */
import { verifyEmail } from './VerifyEmailSaga'
import { forgotPassword } from './ForgotPasswordSaga'
import { resetPassword } from './ResetPasswordSaga'
import { resendVerifyEmail } from './ResendVerifyEmailSaga'
import { user, userUpdate } from './UserSaga'
import { startup } from './StartupSagas'
import { login, logout } from './LoginSagas'
import { register } from './RegisterSaga'
import { cmsModelList } from './CmsModelListSaga'
import { cmsModelDelete } from './CmsModelDeleteSaga'
import { cmsModelAdd } from './CmsModelAddSaga'
import { cmsModelUpdate } from './CmsModelUpdateSaga'
import { userList } from './UserListSaga'
/* ------------- API ------------- */

// The API we use is only used from Sagas, so we create it here and pass along
// to the sagas which need it.

/* ------------- Connect Types To Sagas ------------- */

export default function * root () {
  yield all([
    // some sagas only receive an action
    takeLatest(StartupTypes.STARTUP, startup, api),
    // tool generated sagas
    // user
    takeLatest(UserTypes.USER_UPDATE, userUpdate, api.userUpdate),
    takeLatest(UserTypes.USER_REQUEST, user, api.user),
    takeLatest(VerifyEmailTypes.VERIFY_EMAIL_REQUEST, verifyEmail, api.verifyEmail),
    takeLatest(UserListTypes.USER_LIST_REQUEST, userList, api.userList),
    takeLatest(CmsModelListTypes.CMS_MODEL_LIST_REQUEST, cmsModelList, api.cmsModelList),
    takeLatest(CmsModelDeleteTypes.CMS_MODEL_DELETE_REQUEST, cmsModelDelete, api.cmsModelDelete),
    takeLatest(CmsModelAddTypes.CMS_MODEL_ADD_REQUEST, cmsModelAdd, api.cmsModelAdd),
    takeLatest(CmsModelUpdateTypes.CMS_MODEL_UPDATE_REQUEST, cmsModelUpdate, api.cmsModelUpdate),
    // Login
    takeLatest(LoginTypes.LOGIN_REQUEST, login, api.login),
    takeLatest(LoginTypes.LOGOUT_REQUEST, logout, api.logout),

    // Register
    takeLatest(RegisterTypes.REGISTER_REQUEST, register, api.register),

    // Resend Verify Email
    takeLatest(ResendVerifyEmailTypes.RESEND_VERIFY_EMAIL_REQUEST, resendVerifyEmail, api.resendEmail),

    // Reset Password
    takeLatest(ResetPasswordTypes.RESET_PASSWORD_REQUEST, resetPassword, api.resetPassword),

    // Forgot Password
    takeLatest(ForgotPasswordTypes.FORGOT_PASSWORD_REQUEST, forgotPassword, api.forgotPassword)

  ])
}

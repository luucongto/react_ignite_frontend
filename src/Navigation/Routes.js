'use-scrict'

import Loadable from 'react-loadable'
import Loading from './Loading'
import Login from '../Containers/views/Pages/Login/Login'
import Register from '../Containers/views/Pages/Register/Register'
import DefaultLayout from '../Containers/containers/DefaultLayout/DefaultLayout'
import ResendVerifyEmail from '../Containers/views/Pages/Register/ResendVerifyEmail'
import VerifyEmail from '../Containers/views/Pages/Register/VerifyEmail'
import ResetPassword from '../Containers/views/Pages/Register/ResetPassword'
import ForgotPassword from '../Containers/views/Pages/Register/ForgotPassword'

const AsyncNextPage = Loadable({
  loader: () => import('../Routes/NextPage'),
  loading: Loading
})

const routes = [
  {
    title: 'Login',
    path: '/login',
    component: Login,
    exact: true
  },
  {
    title: 'Register',
    path: '/register',
    component: Register,
    exact: true
  },
  {
    path: '/verify',
    title: 'Verify',
    component: VerifyEmail
  },
  {
    title: 'Resend Verify Email',
    path: '/resend_email',
    component: ResendVerifyEmail
  },
  {
    title: 'Reset Password',
    path: '/reset_password',
    component: ResetPassword
  },
  {
    title: 'Forgot Password',
    path: '/forgot_password',
    component: ForgotPassword
  },
  {
    title: 'NextPage',
    path: '/next-page',
    component: AsyncNextPage,
    exact: true
  },
  {
    path: '/',
    name: 'Home',
    component: DefaultLayout
  }
]

export default routes

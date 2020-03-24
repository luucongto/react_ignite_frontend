import React from 'react'
import Loadable from 'react-loadable'
import I18n from '../I18n'
// import DefaultLayout from './containers/DefaultLayout/DefaultLayout'

function Loading () {
  return <div>Loading...</div>
}

const Dashboard = Loadable({
  loader: () => import('./views/Dashboard'),
  loading: Loading
})

const UserList = Loadable({
  loader: () => import('./views/Custom/User/UserList'),
  loading: Loading
})
// Custom

// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
const routes = [
  { path: '/dashboard', name: I18n.t('dashboard'), component: Dashboard },
  { path: '/user', name: I18n.t('user'), component: UserList }

]

export default routes

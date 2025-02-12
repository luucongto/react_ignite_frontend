import React, { Component } from 'react'
import { Redirect, Switch } from 'react-router-dom'
import { Container } from 'reactstrap'

import {
  AppAside,
  AppBreadcrumb,
  AppFooter,
  AppHeader,
  AppSidebar,
  AppSidebarFooter,
  AppSidebarForm,
  AppSidebarHeader,
  AppSidebarMinimizer,
  AppSidebarNav
} from '@coreui/react'
// sidebar nav config
import navigation from '../../_nav'
// routes config
import routes from '../../routes'
import DefaultAside from './DefaultAside'
import DefaultFooter from './DefaultFooter'
import DefaultHeader from './DefaultHeader'
import PrivateRoute from '../../../Navigation/PrivateRoute'
import {translate} from 'react-i18next'
class DefaultLayout extends Component {
  render () {
    return (
      <div className='app'>
        <AppHeader fixed>
          <DefaultHeader />
        </AppHeader>
        <div className='app-body'>
          <AppSidebar display='lg'>
            <AppSidebarHeader />
            <AppSidebarForm />
            <AppSidebarNav navConfig={navigation} {...this.props} />
            <AppSidebarFooter />
            <AppSidebarMinimizer />
          </AppSidebar>
          <main className='main'>
            <AppBreadcrumb appRoutes={routes} />
            <Container fluid>
              <Switch>
                {routes.map((route, idx) => {
                  return route.component ? (<PrivateRoute key={idx} {...route} />) : (null)
                }
                )}
                <Redirect from='/' to='/dashboard' />
              </Switch>
            </Container>
          </main>
          <AppAside fixed hidden>
            <DefaultAside />
          </AppAside>
        </div>
        <AppFooter>
          <DefaultFooter />
        </AppFooter>
      </div>
    )
  }
}

export default translate('translations')(DefaultLayout)

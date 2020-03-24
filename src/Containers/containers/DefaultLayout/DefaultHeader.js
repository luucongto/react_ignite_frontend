import React, { Component } from 'react'
import { DropdownItem, DropdownMenu, DropdownToggle, Nav, UncontrolledDropdown } from 'reactstrap'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Route } from 'react-router-dom'
import EllipsisText from 'react-ellipsis-text'
import {translate} from 'react-i18next'
import { AppNavbarBrand, AppSidebarToggler } from '@coreui/react'
import logo from '../../assets/img/brand/logo.png'
import sygnet from '../../assets/img/brand/sygnet.png'
import LoginActions from '../../../Redux/LoginRedux'
import UserRedux from '../../../Redux/UserRedux'

const propTypes = {
  children: PropTypes.node
}

const defaultProps = {}

class DefaultHeader extends Component {
  logout () {
    this.props.logout()
  }
  componentDidMount () {
    if (this.props.user && this.props.user.locale) {
      this.props.i18n.changeLanguage(this.props.user.locale)
    } else {
      this.props.userRequest()
    }
  }

  componentDidUpdate (prevProps) {
    let nextProps = this.props
    if (!nextProps.fetchingUpate && prevProps.user.username && prevProps.fetchingUpate) {
      window.location.reload()
    }
    if (!nextProps.fetching && nextProps.user.locale && prevProps.fetching) {
      nextProps.i18n.changeLanguage(nextProps.user.locale)
    }
  }
  render () {
    // eslint-disable-next-line
    const { children, ...attributes } = this.props;
    let langs = {
      'en': {
        code: 'en', icon: 'us', name: 'English'
      },
      'ja': {
        code: 'ja', icon: 'jp', name: 'Japanese'
      }}
    let language = this.props.i18n.language
    return (
      <Route render={({ history }) => (
        <React.Fragment>
          <AppSidebarToggler className='d-lg-none' display='md' mobile />
          <AppNavbarBrand
            full={{ src: logo, width: 89, height: 25, alt: 'Logo' }}
            minimized={{ src: sygnet, width: 30, height: 30, alt: 'Logo' }}
          />
          <AppSidebarToggler className='d-md-down-none' display='lg' />

          <Nav className='ml-auto mr-3' navbar>
            <UncontrolledDropdown direction='down'>
              { this.props.user && this.props.user.username
                ? <DropdownToggle nav>
                  <strong> <EllipsisText text={this.props.user.username} length={50} /> </strong>
                </DropdownToggle> : <DropdownToggle nav> {this.props.t('choose_lang')} </DropdownToggle> }
              <DropdownMenu right style={{ right: 0 }}>
                <DropdownItem onClick={() => this.logout()}><i className='fa fa-lock' /> {this.props.t('logout_title')}</DropdownItem>
                {Object.values(langs).map(lang => <DropdownItem key={lang.code} onClick={() => {
                  if (lang.code !== language) {
                    this.props.i18n.changeLanguage(lang.code)
                    this.props.userUpdateRequest({
                      locale: lang.code
                    })
                  }
                }}><div><i className={`flag-icon flag-icon-${lang.icon}`} style={{marginRight: 17}} />{lang.name}</div></DropdownItem>)
              }
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>
        </React.Fragment>
      )} />
    )
  }
}

DefaultHeader.propTypes = propTypes
DefaultHeader.defaultProps = defaultProps

const mapStateToProps = (state) => {
  return {
    user: state.user.data,
    fetchingUpate: state.user.fetchingUpdate,
    fetching: state.user.fetching
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    logout: (username, password) => dispatch(LoginActions.logoutRequest()),
    userUpdateRequest: (params) => dispatch(UserRedux.userUpdate(params)),
    userRequest: (params) => dispatch(UserRedux.userRequest(params))
  }
}

export default translate('translations')(connect(mapStateToProps, mapDispatchToProps)(DefaultHeader))

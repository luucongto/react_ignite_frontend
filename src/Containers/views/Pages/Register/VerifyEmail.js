import React, { Component } from 'react'
import { connect } from 'react-redux'
import VerifyEmailActions from '../../../../Redux/VerifyEmailRedux'
import queryString from 'query-string'
import Utils from '../../Custom/Utils'
import {translate} from 'react-i18next'
class VerifyEmail extends Component {
  constructor (props) {
    super(props)

    let params = queryString.parse(props.location.search)

    this.state = {
      email: params && params.email ? params.email : '',
      token: params && params.token ? params.token : '',
      status: 0,
      message: ''
    }
  }
  componentDidMount () {
    if (!Utils.validate(this.state.email)) {
      this.setState({status: 2, message: this.props.t('register_email_is_invalid')})
      return
    }
    if (!this.state.token.length) {
      this.setState({status: 2, message: this.props.t('verify_token_is_invalid')})
      return
    }

    if (this.state.token.length) {
      this.props.verifyEmail({email: this.state.email, token: this.state.token})
    }
  }
  componentDidUpdate (prevProps) {
    let props = this.props
    if (prevProps.error !== props.error && props.error) {
      this.setState({ status: 2, message: this.props.t(props.error) })
    }

    if (props.data) {
      this.setState({status: 1})
    }
  }
  render () {
    if (this.state.status === 1) {
      return (
        <div className='app'>
          <div>{this.props.t('your_account_has_been_activated')} <a href='/login'>{this.props.t('login')}</a></div>
        </div>
      )
    } else if (this.state.status === 2) {
      return (
        <div className='app'>
          <div>{this.props.t(this.state.message)}</div>
        </div>
      )
    }
    return (
      <div className='app'>
        <div>Loading...</div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    data: state.verifyEmail.data,
    error: state.verifyEmail.error
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    verifyEmail: (params) => dispatch(VerifyEmailActions.verifyEmailRequest(params))
  }
}

export default translate('translations')(connect(mapStateToProps, mapDispatchToProps)(VerifyEmail))

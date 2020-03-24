import React, { Component } from 'react'
import { Button, Card, CardBody, CardGroup, Col, Container, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap'
import { connect } from 'react-redux'
import Alert from 'react-s-alert'
import LoginActions from '../../../../Redux/LoginRedux'
import Utils from '../../Custom/Utils'
import {translate} from 'react-i18next'
class Login extends Component {
  constructor (props) {
    super(props)
    this.state = {
      email: '',
      password: '',
      isAuthenticated: false,
      user: null,
      token: ''
    }
    // this.logout = this.logout.bind(this)
  }

  componentDidUpdate (prevProps) {
    let props = this.props
    if (prevProps.error !== props.error && props.error) {
      Alert.error(this.props.t(props.error), {
        position: 'top-right',
        effect: 'bouncyflip'
      })
    }

    if (props.data) {
      this.props.history.push('/')
    }
  }

  _verify () {
    var errorMessages = []

    if (!this.state.email) {
      errorMessages.push(this.props.t('register_email_is_required'))
    } else if (!Utils.validate(this.state.email)) {
      errorMessages.push(this.props.t('register_email_is_invalid'))
    }

    if (!this.state.password) {
      errorMessages.push(this.props.t('register_password_is_required'))
    } else if (!Utils.validatePassword(this.state.password)) {
      errorMessages.push(this.props.t('register_password_is_invalid'))
    }

    for (var id = 0; id < errorMessages.length; id++) {
      var errorMessage = errorMessages[id]
      Alert.error(errorMessage, {
        position: 'bottom-right',
        effect: 'bouncyflip'
      })
    }

    return errorMessages.length ? 0 : 1
  }

  // logout ()  {
  //   this.setState({isAuthenticated: false, token: '', user: null})
  // }

  _login () {
    if (!this._verify()) return

    this.props.login({
      type: 'local',
      email: this.state.email,
      password: this.state.password
    })
  }

  _register () {
    this.props.history.push('/register')
  }

  render () {
    return (
      <div className='app flex-row align-items-center'>
        <Container>
          <Row className='justify-content-center'>
            <Col md='6'>
              <CardGroup>
                <Card className='p-4'>
                  <CardBody>
                    <h1>{this.props.t('login')}</h1>
                    <p className='text-muted'>{this.props.t('sign_in_to_your_account')}</p>
                    <InputGroup className='mb-3'>
                      <InputGroupAddon addonType='prepend'>
                        <InputGroupText>@</InputGroupText>
                      </InputGroupAddon>
                      <Input type='text' placeholder={this.props.t('email')} onChange={(event) => this.setState({email: event.target.value})} value={this.state.email} />
                    </InputGroup>
                    <InputGroup className='mb-4'>
                      <InputGroupAddon addonType='prepend'>
                        <InputGroupText>
                          <i className='icon-lock' />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input type='password' placeholder={this.props.t('password_title')} onChange={event => this.setState({password: event.target.value})} value={this.state.password} />
                    </InputGroup>
                    <Row className='p-3'>
                      <Button color='success' block onClick={() => this._login()}>{this.props.t('login')}</Button>
                    </Row>
                    <Row className='p-4'>
                      <div className='form-box-text'>
                        <p className='remind-txt'><a href='/forgot_password'>{this.props.t('forgot_password')}</a></p>
                        <p className='remind-txt'><span className='create-txt'>{this.props.t('dont_have_an_account')} </span> <a href='/register'>{this.props.t('create_account')}</a></p>
                        <p className='remind-txt'><span className='create-txt'>{this.props.t('havent_received_verification_email')} </span> <a href='/resend_email'>{this.props.t('resend_verification_email')}</a></p>
                      </div>
                    </Row>
                  </CardBody>
                </Card>
              </CardGroup>
            </Col>
          </Row>
        </Container>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    data: state.login.data,
    error: state.login.error
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    login: (params) => dispatch(LoginActions.loginRequest(params))
  }
}

export default translate('translations')(connect(mapStateToProps, mapDispatchToProps)(Login))

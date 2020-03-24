import React, { Component } from 'react'
import { Button, Card, CardBody, CardGroup, Col, Container, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap'
import { connect } from 'react-redux'
import Alert from 'react-s-alert'
import queryString from 'query-string'
import ResetPasswordActions from '../../../../Redux/ResetPasswordRedux'
import Utils from '../../Custom/Utils'
import {translate} from 'react-i18next'
class ResetPassword extends Component {
  constructor (props) {
    super(props)

    let params = queryString.parse(props.location.search)
    // console.log(params)

    this.state = {
      email: params && params.email ? params.email : '',
      password: '',
      new_password: '',
      repeat_new_password: ''
    }
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
      Alert.info(this.props.t('success'), {
        position: 'top-right',
        effect: 'bouncyflip'
      })
      this.props.history.push('/login')
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

    if (!this.state.new_password) {
      errorMessages.push(this.props.t('register_new_password_is_required'))
    } else if (!Utils.validatePassword(this.state.new_password)) {
      errorMessages.push(this.props.t('register_password_is_invalid'))
    }

    if (this.state.new_password.localeCompare(this.state.repeat_new_password) !== 0) {
      errorMessages.push(this.props.t('reset_new_password_and_password_not_matched'))
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
  _reset () {
    if (!this._verify()) return

    this.props.resetPassword({
      email: this.state.email,
      password: this.state.password,
      new_password: this.state.new_password
    })
  }

  render () {
    // if (!this.props.loginData || !this.props.loginData.email) {
    //   this.props.history.push('/login')
    // }

    return (
      <div className='app flex-row align-items-center'>
        <Container>
          <Row className='justify-content-center'>
            <Col md='6'>
              <CardGroup>
                <Card className='p-4'>
                  <CardBody>
                    <h1>{this.props.t('reset_password')}</h1>
                    <InputGroup className='mb-3'>
                      <InputGroupAddon addonType='prepend'>
                        <InputGroupText>@</InputGroupText>
                      </InputGroupAddon>
                      <Input type='text' placeholder={this.props.t('email')} onChange={event => {}} value={this.state.email} />
                    </InputGroup>
                    <InputGroup className='mb-4'>
                      <InputGroupAddon addonType='prepend'>
                        <InputGroupText>
                          <i className='icon-lock' />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input type='password' placeholder={this.props.t('reset_password_title')} onChange={event => this.setState({password: event.target.value})} value={this.state.password} />
                    </InputGroup>
                    <InputGroup className='mb-4'>
                      <InputGroupAddon addonType='prepend'>
                        <InputGroupText>
                          <i className='icon-lock' />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input type='password' placeholder={this.props.t('new_password_title')} onChange={event => this.setState({new_password: event.target.value})} value={this.state.new_password} />
                    </InputGroup>
                    <InputGroup className='mb-4'>
                      <InputGroupAddon addonType='prepend'>
                        <InputGroupText>
                          <i className='icon-lock' />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input type='password' placeholder={this.props.t('confirm_new_password_title')} onChange={event => this.setState({repeat_new_password: event.target.value})} value={this.state.repeat_new_password} />
                    </InputGroup>

                    <Row className='p-3'>
                      <Button color='success' block onClick={() => this._reset()}>{this.props.t('update')}</Button>
                    </Row>

                    <Row className='p-4'>
                      <div className='form-box-text'>
                        <p className='remind-txt'><span className='create-txt'>{this.props.t('already_have_an_account')} </span> <a href='/'>{this.props.t('login')}</a></p>
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
    data: state.resetPassword.data,
    error: state.resetPassword.error
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    resetPassword: (params) => dispatch(ResetPasswordActions.resetPasswordRequest(params))
  }
}

export default translate('translations')(connect(mapStateToProps, mapDispatchToProps)(ResetPassword))

import React, { Component } from 'react'
import {translate} from 'react-i18next'
import { Button, Card, CardBody, Col, Container, Input, InputGroup, InputGroupAddon, InputGroupText, Row, Modal, ModalHeader, ModalBody, Label } from 'reactstrap'
import { connect } from 'react-redux'
import Alert from 'react-s-alert'
import autoBind from 'react-autobind'
import RegisterActions from '../../../../Redux/RegisterRedux'
import Utils from '../../Custom/Utils'
import Constants from '../../Custom/Constants'

class Register extends Component {
  constructor (props) {
    super(props)
    this.state = {
      email: '',
      username: '',
      password: '',
      repeat_password: '',
      isAuthenticated: false
    }
    autoBind(this)
  }

  componentDidUpdate (prevProps) {
    let props = this.props
    if (prevProps.error !== props.error && props.error) {
      Alert.info(this.props.t(props.error), {
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

    if (this.state.username.length < Constants.REQUIRED_USERNAME_LENGTH || this.state.username.length > Constants.MAXIMUM_USERNAME_LENGTH) {
      errorMessages.push(this.props.t('profile_username_contition_least_character'))
    }

    if (!this.state.password) {
      errorMessages.push(this.props.t('register_password_is_required'))
    } else if (!Utils.validatePassword(this.state.password)) {
      errorMessages.push(this.props.t('register_password_is_invalid'))
    }

    if (!this.state.repeat_password) {
      errorMessages.push(this.props.t('register_repeat_password_is_required'))
    } else if (this.state.password.localeCompare(this.state.repeat_password) !== 0) {
      errorMessages.push(this.props.t('register_repeat_password_and_password_not_matched'))
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

  _showEthereumHint () {
    this.setState({ethereumHintModal: true})
  }
  _hideEthereumHint () {
    this.setState({ethereumHintModal: false})
  }

  _register () {
    if (!this._verify()) return
    var locale = this.props.i18n.language
    locale = locale.substring(0, 2)
    this.props.register({
      type: 'local',
      email: this.state.email,
      username: this.state.username,
      password: this.state.password,
      watchword: this.state.watchword,
      locale: locale
    })
  }

  render () {
    return (
      <div className='app flex-row align-items-center'>
        <Container>
          <Row className='justify-content-center'>
            <Col md='6'>
              <Card className='mx-4'>
                <CardBody className='p-4'>
                  <h1>{this.props.t('register')}</h1>
                  <p className='text-muted'>{this.props.t('create_account')}</p>

                  <InputGroup className='mb-3'>
                    <InputGroupAddon addonType='prepend'>
                      <InputGroupText>@</InputGroupText>
                    </InputGroupAddon>
                    <Input type='text' placeholder={this.props.t('email_address')} onChange={(event) => this.setState({email: event.target.value})} value={this.state.email} />
                  </InputGroup>

                  <InputGroup className='mb-3'>
                    <InputGroupAddon addonType='prepend'>
                      <InputGroupText>
                        <i className='icon-user' />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input type='text' placeholder={this.props.t('username_title')} onChange={(event) => this.setState({username: event.target.value})} value={this.state.username} />
                  </InputGroup>

                  <InputGroup className='mb-3'>
                    <InputGroupAddon addonType='prepend'>
                      <InputGroupText>
                        <i className='icon-lock' />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input type='password' placeholder={this.props.t('password_title')} onChange={(event) => this.setState({password: event.target.value})} value={this.state.password} />
                  </InputGroup>

                  <InputGroup className='mb-3'>
                    <InputGroupAddon addonType='prepend'>
                      <InputGroupText>
                        <i className='icon-lock' />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input type='password' placeholder={this.props.t('repeat_password_title')} onChange={(event) => this.setState({repeat_password: event.target.value})} value={this.state.repeat_password} />
                  </InputGroup>

                  <Button color='success' block onClick={() => this._register()}>{this.props.t('create_account')}</Button>

                  <Row className='mt-4 p-4'>
                    <div className='form-box-text'>
                      <p className='remind-txt'><span className='create-txt'>{this.props.t('already_have_an_account')} </span> <a href='/login'>{this.props.t('login')}</a></p>
                      <p className='remind-txt'><span className='create-txt'>{this.props.t('havent_received_verification_email')} </span> <a href='/resend_email'>{this.props.t('resend_verification_email')}</a></p>
                    </div>
                  </Row>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>

        <Modal isOpen={this.state.ethereumHintModal} toggle={this._hideEthereumHint} backdrop={false} className='modal-sm'>
          <ModalHeader toggle={this._hideEthereumHint}>{this.props.t('title_for_ethereum_hint')}</ModalHeader>
          <ModalBody>
            <Row>
              <Col md='12'>
                <Label htmlFor='name'>
                  {this.props.t('content_for_ethereum_hint')}
                </Label>
              </Col>
            </Row>
          </ModalBody>
        </Modal>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    data: state.register.data,
    error: state.register.error
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    register: (params) => dispatch(RegisterActions.registerRequest(params))
  }
}

export default translate('translations')(connect(mapStateToProps, mapDispatchToProps)(Register))

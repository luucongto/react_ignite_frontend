import React, { Component } from 'react'
import { Button, Card, CardBody, CardGroup, Col, Container, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap'
import { connect } from 'react-redux'
import Alert from 'react-s-alert'
import ForgotPasswordActions from '../../../../Redux/ForgotPasswordRedux'
import Utils from '../../Custom/Utils'
import {translate} from 'react-i18next'
class ForgotPassword extends Component {
  constructor (props) {
    super(props)
    this.state = {
      email: ''
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
      Alert.info(this.props.t('forgot_password_successful'), {
        position: 'top-right',
        effect: 'bouncyflip'
      })
    }
  }
  _verify () {
    var errorMessages = []

    if (!this.state.email) {
      errorMessages.push(this.props.t('register_email_is_required'))
    } else if (!Utils.validate(this.state.email)) {
      errorMessages.push(this.props.t('register_email_is_invalid'))
    }

    if (!this.state.watchword) {
      errorMessages.push(this.props.t('register_watchword_is_required'))
    } else if (this.state.watchword.length < 5) {
      errorMessages.push(this.props.t('register_watchword_least_5_character'))
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
  _forgot () {
    if (!this._verify()) return

    this.props.forgotPassword({email: this.state.email, watchword: this.state.watchword})
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
                    <h1>{this.props.t('forgot_password')}</h1>
                    <p className='text-muted' />
                    <InputGroup className='mb-3'>
                      <InputGroupAddon addonType='prepend'>
                        <InputGroupText>@</InputGroupText>
                      </InputGroupAddon>
                      <Input type='text' placeholder={this.props.t('email')} onChange={(event) => this.setState({email: event.target.value})} value={this.state.email} />
                    </InputGroup>

                    <InputGroup className='mb-3'>
                      <InputGroupAddon addonType='prepend'>
                        <InputGroupText><i className='icon-note' /></InputGroupText>
                      </InputGroupAddon>
                      <Input type='text' placeholder={this.props.t('profile_title_watchword')} onChange={(event) => this.setState({watchword: event.target.value})} value={this.state.watchword} />
                    </InputGroup>

                    <Row className='p-3'>
                      <Button color='success' block onClick={() => this._forgot()}>{this.props.t('tab_send')}</Button>
                    </Row>
                    <Row className='p-4'>
                      <div className='form-box-text'>
                        <p className='remind-txt'><span className='create-txt'>{this.props.t('already_have_an_account')}</span> <a href='/login'>{this.props.t('login')}</a></p>
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
    data: state.forgotPassword.data,
    error: state.forgotPassword.error
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    forgotPassword: (params) => dispatch(ForgotPasswordActions.forgotPasswordRequest(params))
  }
}

export default translate('translations')(connect(mapStateToProps, mapDispatchToProps)(ForgotPassword))

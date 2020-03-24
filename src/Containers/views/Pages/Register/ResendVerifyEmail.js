import React, { Component } from 'react'
import { Button, Card, CardBody, CardGroup, Col, Container, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap'
import { connect } from 'react-redux'
import Alert from 'react-s-alert'
import ResendVerifyEmailActions from '../../../../Redux/ResendVerifyEmailRedux'
import Utils from '../../Custom/Utils'
import {translate} from 'react-i18next'
class ResendVerifyEmail extends Component {
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
      Alert.info(this.props.t('success'), {
        position: 'top-right',
        effect: 'bouncyflip'
      })
      this.props.history.push('/login')
    }
  }
  _resend () {
    if (!this.state.email) {
      Alert.error(this.props.t('register_email_is_required'), {
        position: 'bottom-right',
        effect: 'bouncyflip'
      })
      return 0
    } else if (!Utils.validate(this.state.email)) {
      Alert.error(this.props.t('register_email_is_invalid'), {
        position: 'bottom-right',
        effect: 'bouncyflip'
      })
      return 0
    }

    this.props.resendVerifyEmail({email: this.state.email})
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
                    <h1>{this.props.t('resend_verification_email')}</h1>
                    <p className='text-muted' />
                    <InputGroup className='mb-3'>
                      <InputGroupAddon addonType='prepend'>
                        <InputGroupText>@</InputGroupText>
                      </InputGroupAddon>
                      <Input type='text' placeholder={this.props.t('email')} onChange={(event) => this.setState({email: event.target.value})} value={this.state.email} />
                    </InputGroup>
                    <Row className='p-3'>
                      <Button color='success' block onClick={() => this._resend()}>{this.props.t('resend')}</Button>
                    </Row>
                    <Row className='p-4'>
                      <div className='form-box-text'>
                        <p className='remind-txt'><span className='create-txt'>{this.props.t('already_have_an_account')} </span> <a href='/login'>{this.props.t('login')}</a></p>
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
    data: state.resendVerifyEmail.data,
    error: state.resendVerifyEmail.error,
    fetching: state.resendVerifyEmail.fetching
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    resendVerifyEmail: (params) => dispatch(ResendVerifyEmailActions.resendVerifyEmailRequest(params))
  }
}

export default translate('translations')(connect(mapStateToProps, mapDispatchToProps)(ResendVerifyEmail))

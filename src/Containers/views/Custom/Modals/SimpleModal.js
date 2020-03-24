import React from 'react'
import PropTypes from 'prop-types'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'

class SimpleModal extends React.Component {
  render () {
    return (
      <Modal isOpen={this.props.show} toggle={this.props.toggle}>
        <ModalHeader toggle={this.props.toggle}>Modal title</ModalHeader>
        <ModalBody>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </ModalBody>
        <ModalFooter>
          <Button color='primary' onClick={this.props.onClose}>Do Something</Button>{' '}
          <Button color='secondary' onClick={this.props.onClose}>Cancel</Button>
        </ModalFooter>
      </Modal>
    )
  }
}

SimpleModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  toggle: PropTypes.func.isRequired,
  show: PropTypes.bool
}

export default SimpleModal

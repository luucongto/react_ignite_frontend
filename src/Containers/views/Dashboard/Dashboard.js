import React, { Component } from 'react'
import { connect } from 'react-redux'
import {translate} from 'react-i18next'

class Dashboard extends Component {
  render () {
    return (
      <div className='animated fadeIn' />
    )
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user.data
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default translate('translations')(connect(mapStateToProps, mapDispatchToProps)(Dashboard))

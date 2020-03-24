import React, { Component } from 'react'
import {translate} from 'react-i18next'
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap'
import autoBind from 'react-autobind'

class CustomPagination extends Component {
  constructor (props) {
    super(props)
    this.state = {
      lastPage: 1
    }
    autoBind(this)
  }
  componentDidUpdate (prevProps) {
    // hack for switch tab
    let props = this.props
    if (props.currentPage === 0) {
      // console.log('componentWillReceiveProps:::currentPage: ', props.currentPage)
      this.setState({ lastPage: props.currentPage + 1 })
    }
  }
  getPage (page) {
    if (this.state.lastPage === page) {
      return
    }

    this.setState({lastPage: page}, () => {
      this.props.getPage(page - 1)
    })
  }
  _renderUI (totalPage) {
    var pages = []
    var startPage = Math.max(1, this.state.lastPage - 2)
    var endPage = Math.min(this.state.lastPage + 2, totalPage)
    // console.log(this.state.lastPage, startPage, endPage)
    for (var index = startPage; index <= endPage; index++) {
      pages.push(index)
    }
    pages = pages.map(i => {
      return (
        <PaginationItem key={i} active={i === this.state.lastPage} onClick={() => this.getPage(i)}>
          <PaginationLink tag='button'>{i}</PaginationLink>
        </PaginationItem>
      )
    })
    return (
      <Pagination>
        <PaginationItem>
          <PaginationLink previous tag='button' onClick={() => this.getPage(1)} />
        </PaginationItem>
        {
            pages.map(page => page)
        }
        <PaginationItem>
          <PaginationLink next tag='button' onClick={() => this.getPage(totalPage)} />
        </PaginationItem>
      </Pagination>
    )
  }
  render () {
    var renderUI = this._renderUI(this.props.totalPage)
    if (this.props.totalPage > 1) {
      return renderUI
    } else {

    }
    return ('')
  }
}

export default translate('translations')(CustomPagination)

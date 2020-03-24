import React from 'react'
import Alert from 'react-s-alert'
import Admin from 'react-crud-admin'
import 'react-crud-admin/css' // optional css import

class CustomAdmin extends Admin {
  nextPage () {
    if (this.state.total) {
      let numpages = Math.ceil(this.state.total / this.get_list_per_page())
      var page = Math.min(this.state.page_number + 1, numpages)
      this.setState({
        page_number: page
      }, () => {
        this.get_queryset(
          this.state.page_number,
          this.get_list_per_page(),
          this.state.queryset
        )
      })
    }
  }

  prevPage () {
    if (this.state.total) {
      var page = Math.max(this.state.page_number - 1, 1)
      this.setState({
        page_number: page
      }, () => {
        this.get_queryset(
          this.state.page_number,
          this.get_list_per_page(),
          this.state.queryset
        )
      })
    }
  }

  render_list_view () {
    return (
      <div>
        {this.render_add_button()}
        {this.render_below_add_button()}
        {this.render_search_field()}
        {this.render_below_search_field()}
        {this.render_below_filters()}
        {this.render_table()}
        {this.render_below_table()}
        {this.render_progress(this.state.loading)}
        {this.render_below_progress()}
        {this.render_pagination()}
      </div>
    )
  }
  search (term, queryset) {
    this.setState({term: term}, () => this.get_queryset(
      this.state.page_number,
      this.get_list_per_page(),
      this.state.queryset
    ))
    return queryset
  }
  render_pagination () {
    let pages = []
    if (this.state.total) {
      let numpages = Math.ceil(this.state.total / this.get_list_per_page())
      let pages_in_pagination =
        numpages < this.pages_in_pagination
          ? numpages
          : this.pages_in_pagination

      if (this.state.page_number === 1) {
        for (let i = 0; i < pages_in_pagination; i++) {
          pages.push(i + 1)
        }
      } else if (this.state.page_number === numpages) {
        for (let i = pages_in_pagination - 1; i >= 0; i--) {
          pages.push(numpages - i)
        }
      } else {
        for (let i = 0; i < pages_in_pagination && this.state.page_number + i <= numpages; i++) {
          pages.push(this.state.page_number + i)
        }
      }
      /*
		for(var i=0;i<numpages;i++)
	    {
		pages.push(i+1);

	    } */
    } else {
      return <div />
    }

    return (
      <div className='pull-right'>
        <span className='summary'>
          {this.get_list_per_page() * (this.state.page_number - 1) + 1}-
          {Math.min(
            this.get_list_per_page() * (this.state.page_number - 1) +
              this.get_list_per_page(),
            this.state.total
          )}{' '}
          of {this.state.total}{' '}
        </span>

        <nav aria-label='Page navigation'>
          <ul className='pagination'>
            <li key={'left'} className='page-item'>
              <a
                href='#'
                aria-label='Previous'
                onClick={this.prevPage.bind(this)}
                className='page-link'
              >
                <span aria-hidden='true'>&laquo;</span>
              </a>
            </li>

            {pages.map(page => {
              return (
                <li key={page} className={'page-item ' + (this.state.page_number === page ? 'active' : '')}>
                  <a
                    href='#'
                    className='page-link'
                    onClick={this.selectPage({ page })}
                  >
                    {page}
                  </a>
                </li>
              )
            })}
            <li className='page-item'>
              <a
                href='#'
                key={'right'}
                onClick={this.nextPage.bind(this)}
                aria-label='Next'
                className='page-link'
              >
                <span aria-hidden='true'>&raquo;</span>
              </a>
            </li>
          </ul>
        </nav>
      </div>
    )
  }

  handleError (next, current, successCallback) {
    if (!next.fetching && current.fetching) {
      if (next.data) {
        successCallback(next)
      } else
      if (next.error) {
        try {
          Alert.error(this.props.t(next.error), {
            position: 'bottom-right',
            effect: 'bouncyflip'
          })
        } catch (e) {
          console.log('handleError', next.error, e)
        }
      }
    }
  }

  _handle_search (event) {
    let term = event.target.value

    if (term) {
      let key = event.which || event.keyCode

      if (this.get_live_search() || key === 13) {
        let queryset = this.search(term, this.state.queryset)
        this.setState({ queryset: queryset, total: queryset.length })
      }
    } else {
      let queryset = this.get_queryset(
        this.state.page_number,
        this.get_list_per_page(),
        this.state.queryset
      )
      this.setState({
        term: '',
        queryset: queryset,
        total: queryset.length
      })
    }
  }
  get_queryset (page_number, list_per_page, queryset) {
    this.show(page_number, list_per_page, queryset)
    return queryset
  }
  get_live_search () {
    return true
  }
}

export default CustomAdmin

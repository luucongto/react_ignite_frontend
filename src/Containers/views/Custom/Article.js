import React from 'react'
import { connect } from 'react-redux'
import { translate } from 'react-i18next'
import { Row, Button } from 'reactstrap'
import Alert from 'react-s-alert'
import CmsModelListRedux from '../../../Redux/CmsModelListRedux'
import CmsModelUpdateRedux from '../../../Redux/CmsModelUpdateRedux'
import CmsModelAddRedux from '../../../Redux/CmsModelAddRedux'
import CmsModelDeleteRedux from '../../../Redux/CmsModelDeleteRedux'
import autoBind from 'react-autobind'
import Form from 'react-jsonschema-form'
import 'react-crud-admin/css' // optional css import
import Constants from './Constants'
import CustomAdmin from './CustomAdmin'

class Article extends CustomAdmin {
  constructor (props) {
    super(props)
    this.name = 'Article'
    this.name_plural = 'Articles'
    this.list_display_links = ['id']
    this.list_display = ['id', 'title' ]
    autoBind(this)
    this.get_queryset = this.get_queryset.bind(this)
  }

  onSubmit (params) {
    console.log('ONsubmit', params)
    var data = {
      model: 'Article',
      data: params.formData
    }
    this.props.cmsModelAddRequest(data)
  }
  onUpdate (params) {
    console.log('onUpdate', params)
    var data = {
      model: 'Article',
      id: params.formData.id,
      data: params.formData
    }
    this.props.cmsModelUpdateRequest(data)
  }
  get_actions () {
    var self = this
    return {
      'delete': (selected_objects) => {
        console.log('delete', selected_objects)
        self.setState({showDeleteConfirm: true})
      }
    }
  }
  delete (object) {
    console.log('delete', object)
    this.props.cmsModelDeleteRequest({
      model: 'Article',
      id: object.id
    })
  }
  get_extra_fields () {
    var self = this
    return {
      action: function (object, label) {
        return self.state.showDeleteConfirm
        ? (
          <Row style={{width: 200}}>
            <Button color='warning' onClick={() => self.setState({showDeleteConfirm: false})}>{self.props.t('cancel')} </Button>
            <Button color='danger' className={'ml-3'} onClick={() => self.delete(object)}>{self.props.t('delete')} </Button>

          </Row>
        )
        : (
          <Row style={{width: 200}}>
            <Button color='warning' onClick={() => self.setState({showDeleteConfirm: true})}>{self.props.t('delete')} </Button>
          </Row>
        )
      }
    }
  }

  search (term, queryset) {
    this.setState({term: term}, () => this.get_queryset(
      this.state.page_number,
      this.get_list_per_page(),
      this.state.queryset
    ))
    return queryset
  }

  nextPage () {
    if (this.state.total) {
      let numpages = Math.ceil(this.state.total / this.get_list_per_page())
      this.setState({
        page_number: Math.min(this.state.page_number + 1, numpages)
      })
    }
  }
  UNSAFE_componentWillReceiveProps (nextProps) {
    if (nextProps.cmsModelList.data && !nextProps.cmsModelList.fetching && this.props.cmsModelList.fetching) {
      console.log('componentWillReceiveProps', nextProps.cmsModelList)
      this.set_queryset(nextProps.cmsModelList.data.data)
      this.set_total(nextProps.cmsModelList.data.total)
    }
    this.handleError(nextProps.cmsModelAdd, this.props.cmsModelAdd, () => {
      Alert.info(this.props.t('model_create_success'), {
        position: 'bottom-right',
        effect: 'bouncyflip'
      })
      this.response_add()
    })
    this.handleError(nextProps.cmsModelUpdate, this.props.cmsModelUpdate, () => {
      Alert.info(this.props.t('model_update_success'), {
        position: 'bottom-right',
        effect: 'bouncyflip'
      })
      this.response_change()
    })

    this.handleError(nextProps.cmsModelDelete, this.props.cmsModelDelete, () => {
      Alert.info(this.props.t('model_delete_success'), {
        position: 'bottom-right',
        effect: 'bouncyflip'
      })
      this.response_change()
    })
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
  show (page_number, list_per_page, queryset) {
    this.props.cmsModelListRequest({
      model: 'Article',
      term: this.state.term,
      page: page_number,
      limit: list_per_page,
      field: 'title'
    })
  }

  get_form (object = null) {
    let schema = {
      title: this.name,
      type: 'object',
      required: ['title'],
      properties: {
        id: {
          type: 'number',
          title: 'id'
        },
        title: { type: 'string', title: this.props.t('title'), default: '' }
      }
    }
    const uiSchema = {
      id: {
        'ui:disabled': true
      },
      title: {
        'ui:disabled': true
      }

    }
    if (object) {
      uiSchema.contract_address = {'ui:disabled': true }
    }
    if (!object) {
      return <Form schema={schema} uiSchema={uiSchema} onSubmit={this.onSubmit} />
    } else {
      return <Form schema={schema} formData={object} uiSchema={uiSchema} onSubmit={this.onUpdate} />
    }
  }
    }
const mapStateToProps = (state) => {
  return {
    cmsModelList: state.cmsModelList,
    cmsModelUpdate: state.cmsModelUpdate,
    cmsModelAdd: state.cmsModelAdd,
    cmsModelDelete: state.cmsModelDelete
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    cmsModelListRequest: (params) => dispatch(CmsModelListRedux.cmsModelListRequest(params)),
    cmsModelUpdateRequest: (params) => dispatch(CmsModelUpdateRedux.cmsModelUpdateRequest(params)),
    cmsModelAddRequest: (params) => dispatch(CmsModelAddRedux.cmsModelAddRequest(params)),
    cmsModelDeleteRequest: (params) => dispatch(CmsModelDeleteRedux.cmsModelDeleteRequest(params))
  }
}

export default translate('translations')(connect(mapStateToProps, mapDispatchToProps)(Article))

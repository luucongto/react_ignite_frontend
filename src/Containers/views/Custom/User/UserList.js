import React from 'react'
import { connect } from 'react-redux'
import {translate} from 'react-i18next'
import Alert from 'react-s-alert'
import UserListRedux from '../../../../Redux/UserListRedux'
import CmsModelUpdateRedux from '../../../../Redux/CmsModelUpdateRedux'
import CmsModelAddRedux from '../../../../Redux/CmsModelAddRedux'
import autoBind from 'react-autobind'
import CustomAdmin from '../CustomAdmin'
import Form from 'react-jsonschema-form'
import 'react-crud-admin/css' // optional css import
import Utils from '../Utils'
class UserList extends CustomAdmin {
  constructor (props) {
    super(props)
    this.name = 'User'
    this.name_plural = 'Users'
    this.list_display_links = ['username']
    this.list_display = ['id', 'username', 'email']
    autoBind(this)
    this.get_queryset = this.get_queryset.bind(this)
  }
  // get_field_transforms () {
  //   return {
  //     is_active: function (content, object) {
  //       return content ? 'YES' : 'NO'
  //     }
  //   }
  // }

  onSubmit (params) {
    var data = {
      model: 'User',
      data: params.formData
    }
    this.props.cmsModelAddRequest(data)
  }
  onUpdate (params) {
    var data = {
      model: 'User',
      id: params.formData.id,
      data: params.formData
    }
    this.props.cmsModelUpdateRequest(data)
  }

  get_actions () {
    return {
      'delete': (selected_objects) => {
        console.log('delete', selected_objects)
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

  UNSAFE_componentWillReceiveProps (nextProps) {
    if (nextProps.userList.data && !nextProps.userList.fetching && this.props.userList.fetching) {
      this.set_queryset(nextProps.userList.data.data)
      this.set_total(nextProps.userList.data.total)
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
  }

  show (page_number, list_per_page, queryset) {
    this.props.userListRequest({
      term: this.state.term,
      page: page_number,
      limit: list_per_page,
      field: 'email',
      extra_fields: {
        user_type: 1
      }
    })
  }

  validate (formData, errors) {
    if (!Utils.validatePassword(formData.password)) {
      errors.password.addError(this.props.t('register_password_is_invalid'))
    }
    if (!Utils.validateUsername(formData.username)) {
      errors.username.addError(this.props.t('profile_username_contition_least_character'))
    }

    return errors
  }
  get_form (object = null) {
    let schema = {
      title: this.name,
      type: 'object',
      required: ['username', 'email' ],
      properties: {
        id: {
          type: 'number',
          title: 'id'
        },
        username: { type: 'string', title: this.props.t('user_name'), default: '' },
        email: { type: 'string', title: this.props.t('email'), default: '', format: 'email' },
        password: { type: 'string', title: this.props.t('password'), default: '' },
        user_type: { type: 'integer', title: this.props.t('user_type'), default: 0, enum: [0, 1, 9], enumNames: ['User', 'CMS', 'Admin'] }
      }
    }
    const customFormats = {
      'email': /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    }
    const uiSchema = {
      id: {
        'ui:disabled': true
      },
      'password': {
        'ui:widget': 'password'
      },
      user_type: {
        'ui:widget': 'radio'
      }

    }
    if (object) {
      // uiSchema['email'] =   {
      //   'ui:disabled': true,
      // }
    }
    if (!object) {
      return <Form schema={schema} uiSchema={uiSchema} onSubmit={this.onSubmit} customFormats={customFormats} validate={this.validate} />
    } else {
      console.log('object', object)
      return <Form schema={schema} formData={object} uiSchema={uiSchema} onSubmit={this.onUpdate} customFormats={customFormats} validate={this.validate} />
    }
  }
}

const mapStateToProps = (state) => {
  return {
    userList: state.userList,
    cmsModelUpdate: state.cmsModelUpdate,
    cmsModelAdd: state.cmsModelAdd
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    userListRequest: (params) => dispatch(UserListRedux.userListRequest(params)),
    cmsModelUpdateRequest: (params) => dispatch(CmsModelUpdateRedux.cmsModelUpdateRequest(params)),
    cmsModelAddRequest: (params) => dispatch(CmsModelAddRedux.cmsModelAddRequest(params))
  }
}

export default translate('translations')(connect(mapStateToProps, mapDispatchToProps)(UserList))

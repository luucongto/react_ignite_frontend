import apisauce from 'apisauce'
import ApiConfig from '../Config/ApiConfig'
const autoBind = require('react-autobind')
class API {
  constructor (loginToken, baseURL = ApiConfig.baseURL) {
    this.api = apisauce.create({
      // base URL is read from the "constructor"
      baseURL,
      // here are some default headers
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
        // 'Authorization': localStorage.getItem('loginToken') ? 'jwt ' + localStorage.getItem('loginToken') : ''
      },
      // 15 second timeout...
      timeout: 15000
    })
    // const naviMonitor = (response) => // console.log('hey!  listen! ', response)
    // this.api.addMonitor(naviMonitor)

    this.loginToken = loginToken

    autoBind(this)
  }

  authenticated (loginToken) {
    // console.log('loginToken', loginToken)
    this.loginToken = loginToken
    // localStorage.setItem('loginToken', loginToken)
    this.api.setHeader('Authorization', 'Bearer ' + loginToken)
  }

  handleUnauthorizedRequest (rawResponse) {
    if (rawResponse.status === 401 || rawResponse === 'Unauthorized') {
      this.authenticated('')
      return true
    }
    return false
  }

  preprocessResult (data) {
    if (this.handleUnauthorizedRequest(data)) {
      return {
        error: 1,
        message: 'Unauthenticated.'
      }
    }

    if (data.status === 500 || data === 'Internal Server Error') {
      return {
        error: 1,
        message: 'Network Error.'
      }
    }
    if (!data) {
      console.log('result Error: 1')
      return {
        error: 1,
        message: 'Network Error.'
      }
    }
    const result = data.data
    if (result === undefined) {
      console.log('result Error: 2')
      return {
        error: 1,
        message: 'error_null_response'
      }
    }
    if (result.message === 'Your email address is not verified.') {
      console.log('result Error: 3')
      return {
        error: 1,
        message: 'Unauthenticated.'
      }
    }
    if (result.data === undefined || result.message) {
      return {
        error: 1,
        message: result.message
      }
    }
    result.success = true
    return result
  }

  login (params) {
    return this.api.post('login', params).then(data => {
      const result = data.data
      if (!result) {
        return {
          error: 1,
          message: 'error_null_response'
        }
      }
      const processedData = this.preprocessResult(data)
      if (!processedData.error && processedData.data) { this.authenticated(processedData.data) }
      return processedData
    })
  }

  logout () {
    return this.api.get('logout').then(result => {
      this.authenticated('')
      return result
    })
  }

  register (params) {
    return this.api.post('register', params).then(data => {
      let result = data.data
      if (!result) {
        return {message: 'No response'}
      }
      const processedData = this.preprocessResult(data)
      if (!processedData.error && processedData.data) { this.authenticated(processedData.data) }
      return processedData
    })
  }

  resendEmail (params) {
    return this.api.post('resend_email', params).then(data => {
      return this.preprocessResult(data)
    })
  }

  verifyEmail (params) {
    return this.api.get('verify', params).then(data => {
      return this.preprocessResult(data)
    })
  }

  resetPassword (params) {
    return this.api.post('reset_password', params).then(data => {
      return this.preprocessResult(data)
    })
  }

  forgotPassword (params) {
    return this.api.post('forgot_password', params).then(data => {
      return this.preprocessResult(data)
    })
  }

  changeWatchword (params) {
    return this.api.post('change_watchword', params).then(data => {
      return this.preprocessResult(data)
    })
  }

  changePassword (params) {
    return this.api.post('change_password', params).then(data => {
      return this.preprocessResult(data)
    })
  }

  userUpdate (params) {
    return this.api.post('user_update', params).then(data => {
      return this.preprocessResult(data)
    })
  }

  user (params) {
    return this.api.get('me').then(data => {
      return this.preprocessResult(data)
    })
  }
  async userList (params) {
    var data = await this.api.get(`/admin/User`, params)
    return this.preprocessResult(data)
  }

  async cmsModelList (params) {
    var data = await this.api.get(`/admin/${params.model}`, params)
    return this.preprocessResult(data)
  }

  async cmsModelUpdate (params) {
    var data = await this.api.put(`/admin/${params.model}/${params.id}`, {data: params.data})
    return this.preprocessResult(data)
  }

  async cmsModelAdd (params) {
    var data = await this.api.post(`/admin/${params.model}`, {data: params.data})
    return this.preprocessResult(data)
  }

  async cmsModelDelete (params) {
    var data = await this.api.delete(`/admin/${params.model}`, params)
    return this.preprocessResult(data)
  }
}

let api = new API()

export default api

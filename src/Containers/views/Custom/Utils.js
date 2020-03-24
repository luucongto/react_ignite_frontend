import Constants from './Constants'
import moment from 'moment'
export default {
  bytesToSize (bytes) {
    var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB']
    if (bytes === 0) return '0 Byte'
    var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)), 10)
    return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i]
  },
  isUser (user) {
    return user && user.role === Constants.ROLE.USER
  },
  isOper (user) {
    return user && user.role === Constants.ROLE.OPR
  },
  isAdmin (user) {
    return user && user.role === Constants.ROLE.ADMIN
  },
  validate (email) {
    return this.validateEmail(email)
  },

  utcToLocal (utcDate) {
    var stillUtc = moment.utc(utcDate).toDate()
    var local = moment(stillUtc).local().format('YYYY-MM-DD HH:mm:ss')
    return local
  },
  validateEmail (email) {
    var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return re.test(String(email).toLowerCase())
  },
  stringContainChars (regexp, str) {
    for (var index = 0; index < str.length; index++) {
      if (regexp.test(str[index])) {
        return true
      }
    }
    return false
  },
  validatePassword (password) {
    return true
    // var upperRegexp = /^[A-Z]/
    // var lowerRegexp = /^[a-z]/
    // var numberRegexp = /^[0-9]/
    // var specialRegexp = /[!@#$%^&*(),.?":{}|<>]/
    // if (password.length >= Constants.REQUIRED_PASSWORD_LENGTH && this.stringContainChars(upperRegexp, password) && this.stringContainChars(lowerRegexp, password) && this.stringContainChars(numberRegexp, password) && this.stringContainChars(specialRegexp, password)) {
    //   return true
    // }
    // return false
  }
}

import React, { Component } from 'react'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/es/integration/react'
import { I18nextProvider } from 'react-i18next'

import i18n from './I18n/I18n'
import reduxStore from './Redux'
import RootContainer from './Containers/RootContainer'
// CoreUI Icons Set
import '@coreui/icons/css/coreui-icons.min.css'
// Import Flag Icons Set
import 'flag-icon-css/css/flag-icon.min.css'
// Import Font Awesome Icons Set
import 'font-awesome/css/font-awesome.min.css'
// Import Simple Line Icons Set
import 'simple-line-icons/css/simple-line-icons.css'
// Import Main styles for this application
import './Containers/scss/style.css'
import './Containers/scss/custom.css'

// import '../node_modules/@coreui/styles/scss/_dropdown-menu-right.scss';
const { persistor, store } = reduxStore()

const onBeforeLift = () => {
  // take some action before the gate lifts
}

class App extends Component {
  render () {
    return (
      <I18nextProvider i18n={i18n}>
        <Provider store={store}>
          <PersistGate
            loading={<h3>Loading...</h3>}
            onBeforeLift={onBeforeLift}
            persistor={persistor}>
            <RootContainer />
          </PersistGate>
        </Provider>
      </I18nextProvider>
    )
  }
}

export default App

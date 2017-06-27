// src/index.js
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { Router, Route, IndexRoute } from 'react-router'
import store, { history } from './store'
import registerServiceWorker from './registerServiceWorker'
import injectTapEventPlugin from 'react-tap-event-plugin'

import App from './App'
import BatchesContainer from './components/BatchesContainer'
import BatchEditor from './components/BatchEditor'
import SignUp from './users/SignUp'
import SignIn from './users/SignIn'

import './index.css'

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin()

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={App}>
        <IndexRoute component={BatchesContainer} />
        {/* <Route path="/batches/:batchId" component={BatchPage} /> */}
        <Route path="/create-batch" component={BatchEditor} />
        <Route path="/sign-in" component={SignIn} />
        <Route path="/sign-up" component={SignUp} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('root')
)

registerServiceWorker()

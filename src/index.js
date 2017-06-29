// src/index.js
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { Router, Route, IndexRoute } from 'react-router'
import store, { history } from './store'
import registerServiceWorker from './registerServiceWorker'
import injectTapEventPlugin from 'react-tap-event-plugin'

import App from './App'
import BatchesContainer from './batches/BatchesContainer'
import ShowBatch from './batches/ShowBatch'
import ShowStudent from './students/ShowStudent'
import BatchEditor from './batches/BatchEditor'
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
        <Route path="/batches/:batchId" component={ShowBatch} />
        <Route path="/batches/:batchId/students/:studentId" component={ShowStudent} />
        <Route path="/create-batch" component={BatchEditor} />
        <Route path="/sign-in" component={SignIn} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('root')
)

registerServiceWorker()

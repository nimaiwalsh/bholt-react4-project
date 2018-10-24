import React from 'react'
import { render } from 'react-dom'
import { Router } from '@reach/router'
import { Provider } from 'react-redux'
import store from './store'

import NavBar from './NavBar'
import Results from './Results'
import Details from './Details'

class App extends React.Component {

  render() {
    return (
      <div>
        <NavBar />
        <Provider store={store}>
            <Router>
              <Results path="/" />
              <Details path="/details/:id" />
            </Router>
        </Provider>
      </div>
    )
  }
}

render(<App />, document.getElementById('root'))

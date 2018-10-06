import React from 'react'
import { render } from 'react-dom'
import Pet from './Pet'

class App extends React.Component {
  render() {
    return (
      <div>
        <h1>Adopt me!</h1>
        <Pet name="Jack" animal="Dog" breed="Havanese" />
        <Pet name="Pussie" animal="Cat" breed="Simese" />
        <Pet name="Squark" animal="Bird" breed="Cockatoo" />
      </div>
    )
  }
}

render(<App />, document.getElementById('root'))

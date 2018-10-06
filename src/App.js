import React from 'react'
import { render } from 'react-dom'
import Pet from './Pet';

class App extends React.Component {
  handleTitleClick() {
    alert('you clicked the title')
  }

  render() {
    return React.createElement(
      'div',
      {},
      React.createElement('h1', { onClick: this.handleTitleClick }, [
        React.createElement(Pet, {
          name: 'Jack',
          animal: 'Dog',
          breed: 'Havanese'
        }),
        React.createElement(Pet, {
          name: 'Pusnboots',
          animal: 'Cat',
          breed: 'Siamese'
        }),
        React.createElement(Pet, {
          name: 'Oscar',
          animal: 'Bird',
          breed: 'Cackatoo'
        })
      ])
    )
  }
}

render(React.createElement(App), document.getElementById('root'))

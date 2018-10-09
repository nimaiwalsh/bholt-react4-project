import React from 'react'
import { render } from 'react-dom'
import { Router, Link } from '@reach/router'
import pf from 'petfinder-client'

import Results from './Results'
import Details from './Details'
import SearchParams from './SearchParams'

const petfinder = pf({
  key: process.env.API_KEY,
  secret: process.env.SECRET_KEY
})

class App extends React.Component {
  state = {
    cityState: 'Seattle, WA',
    animal: '',
    breed: '',
    breeds: []
  }

  handleCityStateChange = event => {
    this.setState({
      cityState: event.target.value
    })
  }

  handleAnimalChange = event => {
    //Callback function second parameter in setState ensures it runs after state is set
    this.setState(
      {
        animal: event.target.value,
        breed: ''
      },
      this.getBreeds
    )
  }

  handleBreedChange = event => {
    this.setState({ breed: event.target.value })
  }

  getBreeds() {
    if (this.state.animal) {
      //Petfinder client returns a primise based on animal selected
      petfinder.breed.list({ animal: this.state.animal }).then(data => {
        if (
          data.petfinder &&
          data.petfinder.breeds &&
          Array.isArray(data.petfinder.breeds.breed)
        ) {
          this.setState({ breeds: data.petfinder.breeds.breed })
        } else {
          this.setState({ breeds: [] })
        }
      })
    } else {
      this.setState({ breeds: [] })
    }
  }

  render() {
    return (
      <div>
        <header>
          <Link to="/">Adopt me!</Link>
        </header>
        <Router>
          <Results
            path="/"
            handleBreedChange={this.handleBreedChange}
            handleAnimalChange={this.handleAnimalChange}
            handleCityStateChange={this.handleCityStateChange}
            getBreeds={this.getBreeds}
            {...this.state}
          />
          <Details path="/details/:id" />
          <SearchParams
            path="/search-params"
            handleBreedChange={this.handleBreedChange}
            handleAnimalChange={this.handleAnimalChange}
            handleCityStateChange={this.handleCityStateChange}
            getBreeds={this.getBreeds}
            {...this.state}
          />
        </Router>
      </div>
    )
  }
}

render(<App />, document.getElementById('root'))

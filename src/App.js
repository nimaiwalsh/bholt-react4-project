import React from 'react'
import { render } from 'react-dom'
import { Router, Link } from '@reach/router'
import pf from 'petfinder-client'
import Loadable from 'react-loadable'
import { Provider } from './SearchContext'

const petfinder = pf({
  key: process.env.API_KEY,
  secret: process.env.SECRET_KEY
})

//Used for CodeSplitting
//Only Load the component when it is needed
//Code split the Details comonent
const LoadableDetails = Loadable({
  loader: () => import('./Details'),
  loading() {
    return <h1>loading split out code...</h1>
  }
})
const LoadableResults = Loadable({
  loader: () => import('./Results'),
  loading() {
    return <h1>loading split out code...</h1>
  }
})
const LoadableSearchParams = Loadable({
  loader: () => import('./SearchParams'),
  loading() {
    return <h1>loading split out code...</h1>
  }
})
class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      cityState: 'Seattle, WA',
      animal: '',
      breed: '',
      breeds: [],
      handleAnimalChange: this.handleAnimalChange,
      handleBreedChange: this.handleBreedChange,
      handleCityStateChange: this.handleCityStateChange,
      getBreeds: this.getBreeds
    }
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
          <Link to="/search-params">
            <span aria-label="search" role="img">
              🔍
            </span>
          </Link>
        </header>
        <Provider value={this.state}>
          <Router>
            <LoadableResults path="/" />
            <LoadableDetails path="/details/:id" />
            <LoadableSearchParams path="/search-params" />
          </Router>
        </Provider>
      </div>
    )
  }
}

render(<App />, document.getElementById('root'))

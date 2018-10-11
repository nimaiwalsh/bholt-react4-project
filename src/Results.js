import React from 'react'
import { Consumer } from './SearchContext'
import pf from 'petfinder-client'

import Pet from './Pet'
import SearchBox from './SearchBox'

const petfinder = pf({
  key: process.env.API_KEY,
  secret: process.env.API_SECRET
})

class Results extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      pets: []
    }
  }

  componentDidMount() {
    this.search()
  }

  search = () => {
    petfinder.pet
      .find({
        output: 'full',
        location: this.props.searchParams.cityState,
        animal: this.props.searchParams.animal,
        breed: this.props.searchParams.breed
      })
      .then(data => {
        let pets

        //API returns an Array for multipe animals and an Object for single result
        //Ensure returned data is always an Array
        if (data.petfinder.pets && data.petfinder.pets.pet) {
          if (Array.isArray(data.petfinder.pets.pet)) {
            pets = data.petfinder.pets.pet
          } else {
            pets = [data.petfinder.pets.pet]
          }
        } else {
          pets = []
        }

        this.setState({ pets })
      })
  }

  render() {
    return (
      <div className="search">
        <SearchBox search={this.search} />
        {this.state.pets.map(pet => {
          let breed

          if (Array.isArray(pet.breeds.breed)) {
            breed = pet.breeds.breed.join(', ')
          } else {
            breed = pet.breeds.breed
          }

          return (
            <Pet
              key={pet.id}
              name={pet.name}
              animal={pet.animal}
              breed={breed}
              media={pet.media}
              location={`${pet.contact.city}, ${pet.contact.state}`}
              id={pet.id}
            />
          )
        })}
      </div>
    )
  }
}

//Wrap Results component with Consumer to access Context state
//Need to be done with method below if you want to use context in 
//Lifecycle methods
export default function ResultsWithContext(props) {
  return (
    <Consumer>
      {context => <Results {...props} searchParams={context} />}
    </Consumer>
  )
}

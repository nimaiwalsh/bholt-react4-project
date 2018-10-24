import React from 'react'
import { connect } from 'react-redux';
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
        //from Redux
        location: this.props.location,
        //from ReactContext
        animal: this.props.animal,
        breed: this.props.breed
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

// Redux
// State is passed as argument (in this case destructured)
// State is assigned to prop na
const mapStateToProps = ({ location, breed, animal }) => ({
  location: location,
  breed: breed, 
  animal: animal
})

export default connect(mapStateToProps)(Results)
import React, { Component } from 'react'
import { ANIMALS } from 'petfinder-client'
import { connect } from 'react-redux'
import getBreeds from './actionCreators/getBreeds'
import changeBreed from './actionCreators/changeBreed'
import changeAnimal from './actionCreators/changeAnimal'
import changeLocation from './actionCreators/changeLocation'

//Using Consumer, pass all the data from Provider (from App) to Consumer
//Accessible in this compononent
//Wrap component with Consumer and return Component in a funtion passing context argument

class Search extends Component {
  handleFormSubmit = event => {
    event.preventDefault()
    this.props.search()
  }

  render() {
    return (
      <form onSubmit={this.handleFormSubmit}>
        <div className="search-params">
          <label htmlFor="location">
            Location
            <input
              id="location"
              value={this.props.location}
              placholder="Location"
              onChange={this.props.handleChangeLocation}
            />
          </label>
          <label htmlFor="animal">
            Animal
            <select
              id="animal"
              value={this.props.animal}
              onChange={this.props.handleChangeAnimal}
              onBlur={this.props.handleChangeAnimal}
            >
              <option />
              {ANIMALS.map(animal => (
                <option key={animal} value={animal}>
                  {animal}
                </option>
              ))}
            </select>
          </label>
          <label htmlFor="breed">
            Breed
            <select
              id="breed"
              value={this.props.breed}
              onChange={this.props.handleChangeBreed}
              onBlur={this.props.handleChangeBreed}
              disabled={this.props.breeds.length === 0}
            >
              <option />
              {this.props.breeds.map(breed => (
                <option key={breed} value={breed}>
                  {breed}
                </option>
              ))}
            </select>
          </label>
          <button>Submit</button>
        </div>
      </form>
    )
  }
}

const mapStateToProps = ({ location, animal, breed, breeds }) => ({
  location,
  animal,
  breed,
  breeds
})

const mapDispatchToProps = dispatch => ({
  handleChangeAnimal(event) {
    dispatch(changeAnimal(event.target.value))
    dispatch(getBreeds())
  },
  handleChangeBreed(event) {
    dispatch(changeBreed(event.target.value))
  },
  handleChangeLocation(event) {
    dispatch(changeLocation(event.target.value))
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Search)

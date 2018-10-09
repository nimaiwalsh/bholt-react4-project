import React, { Component } from 'react'
import { ANIMALS } from 'petfinder-client'

class SearchBox extends Component {
  
  render() {
    return (
      <div className="search-params">
        <label htmlFor="location">
          Location
          <input
            id="location"
            value={this.props.cityState}
            placholder="Location"
            onChange={this.props.handleCityStateChange}
          />
        </label>
        <label htmlFor="animal">
          Animal
          <select
            id="animal"
            value={this.props.animal}
            onChange={this.props.handleAnimalChange}
            onBlur={this.props.handleAnimalChange}
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
            onChange={this.props.handleBreedChange}
            onBlur={this.props.handleBreedChange}
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
    )
  }
}

export default SearchBox

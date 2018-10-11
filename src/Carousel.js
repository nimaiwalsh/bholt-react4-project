import React, { Component } from 'react'

class Carousel extends Component {
  state = {
    photos: [],
    active: 0
  }

  //getDerivedStateFromProps exists for only one purpose.
  //It enables a component to update its internal state as the result of changes in props
  //Invoked right before calling the render method,
  //both on the initial mount and on subsequent updates
  static getDerivedStateFromProps({ media }) {
    let photos = []

    if (media && media.photos && media.photos.photo) {
      photos = media.photos.photo.filter(photo => photo['@size'] === 'pn')
    }

    return { photos }
  }

  handleIndexClick = event => {
    this.setState({ active: parseInt(event.target.dataset.index) })
  }

  render() {
    const { photos, active } = this.state
    //Return placeholder if no photo present to avoid error
    const heroImage = photos[active] ? photos[active].value : 'http://placecorgi.com/300/300'

    return (
      <div className="carousel">
        <img src={heroImage} alt="primary animal" />
        <div className="carousel-smaller">
          {photos.map((photo, index) => (
            /* eslint-disable-next-line */
            <img
              key={photo.value}
              data-index={index}
              src={photo.value}
              className={index === active ? 'active' : ''}
              alt="animal thumbnail"
              onClick={this.handleIndexClick}
            />
          ))}
        </div>
      </div>
    )
  }
}

export default Carousel

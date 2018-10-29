import pf from 'petfinder-client'

const petfinder = pf({
  key: process.env.API_KEY,
  secret: process.env.SECRET_KEY
})

// Utilises Thunk middleware. A thunk is a function that returns a funtion.
// Normally an action creator can only return an object
export default function getBreeds() {
  // This is the thunk
  // Requires the dispatch and current state as arguments
  return function getBreedsThunk(dispatch, getState) {
    const { animal } = getState()

    if (animal) {
      //Petfinder client returns a primise based on animal selected
      petfinder.breed.list({ animal: animal }).then(data => {
        if (
          data.petfinder &&
          data.petfinder.breeds &&
          Array.isArray(data.petfinder.breeds.breed)
        ) {
          dispatch({
            type: 'SET_BREEDS',
            payload: data.petfinder.breeds.breed
          })
        } else {
          dispatch({
            type: 'SET_BREEDS',
            payload: []
          })
        }
      })
      .catch(console.error)
    } else {
      dispatch({
        type: 'SET_BREEDS',
        payload: []
      })
    }
  }
}

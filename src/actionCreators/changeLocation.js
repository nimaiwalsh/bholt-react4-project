export default function changeLocation(location) {
  return {
    type: 'SET_LOCATION',
    payload: location
  }
}

// TESTING with JEST
// expect(
//   changeLocation('Seattle, WA').toEqual({
//     type: 'SET_LOCATION',
//     payload: 'Seattle, WA'
//   })
// )

// expect(changeLocation('Seattle, WA')).toEqualSnapshot()

//Reducer is just a function (pure)
//Function takes old state, an action and returns new state
//Need default/initial state
//Must return new object or original state
export default function locationReducer(state = 'Seatle, WA', action) {
  if (action.type === 'SET_LOCATION') {
    return action.payload
  } else {
    return state
  }
}

//JEST TEST template
// test('locationReducer', () => {
//   expect(
//     locationReducer('Seattle, WA', {
//       type: 'SET_LOCATION',
//       payload: 'San Franciso, CA'
//     }).toBe('San Franciso')
//   )
// })

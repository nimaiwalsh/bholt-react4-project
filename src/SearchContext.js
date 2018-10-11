import React from 'react'

//React Context is the PORTAL to the data
//It achieves the same effect as redux
const SearchContext = React.createContext({
  cityState: 'Seattle, WA',
  animal: '',
  breed: '',
  breeds: [],
  handleAnimalChange() {},
  handleBreedChange() {},
  handleCityStateChange() {},
  getBreeds() {},
})

//Provider Component - make everything available - entrance portal to context
//Consumer Component - read from the provider - exit portal from context
export const Provider = SearchContext.Provider
export const Consumer = SearchContext.Consumer

//Any components wrapped by Provider can access any state within provider by using consumer
 
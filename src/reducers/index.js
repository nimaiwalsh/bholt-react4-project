   import { combineReducers } from 'redux'
   import animal from './animal'
   import breed from './breed'
   import breeds from './breeds'
   import location from './location'
   
   export default combineReducers({
     animal,
     breed,
     breeds,
     location
   })
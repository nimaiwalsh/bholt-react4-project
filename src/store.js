import { createStore, compose, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import reducer from './reducers'


const store = createStore(reducer, compose(
  //Apply thunk middlewar
  applyMiddleware(thunk),
  //Apply Redux DEV tools
  typeof window === 'object' &&
  typeof window.devToolsExtension !== 'undefined' 
    ? window.devToolsExtension() 
    : f => f
))

export default store

import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import BoardReducer from './BoardReducer'
import NoBombReducer from './NoBombReducer'
import MiscReducer from './MiscReducer'
import { composeWithDevTools } from 'redux-devtools-extension'

const reducer = combineReducers({
  board: BoardReducer,
  nobombLocations: NoBombReducer,
  misc: MiscReducer,
})

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)))

export default store

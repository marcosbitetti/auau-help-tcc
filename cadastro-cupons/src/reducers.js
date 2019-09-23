import { createStore, combineReducers } from 'redux'
import ACT from './actions'

const initialAppState = {
  cupons: 2,
  empresas:[
    {id:'1',destaque:true},
    {id:'0'}, // branco
    {id:'2'},{id:'3'},{id:'4'},{id:'5'},{id:'6'},{id:'7'},
  ],
  lojas:[
    {id:'1',},
    {id:'2'},{id:'3'},{id:'4'},{id:'5'},{id:'6'},{id:'7'},
  ],

  currentPage: 'home',
}

const appReducer = (state = initialAppState,action) => {
  switch (action.type) {
    case ACT.NAVIGATE:
      return {...state, currentPage:action.payload.page}
    default:
      return state
  }
}


const Reducers = combineReducers({
  appState: appReducer,
  //clickState: clickReducer,
  //otherState: otherReducer
})

const Store = createStore(Reducers);

exports.Store = Store

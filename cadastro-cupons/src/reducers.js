import { createStore, applyMiddleware, combineReducers } from 'redux'
import axios from 'axios';
import axiosMiddleware from 'redux-axios-middleware';


import ACT from './actions'

//const baseURL = 'http://192.168.0.236/'
const baseURL = 'http://e2316292.ngrok.io/'

const client = axios.create({
  baseURL: baseURL,
  //baseURL: 'https://lugaresassombrados.000webhostapp.com/wp-json/lugares-assombrados/',
  responseType: 'json',
})

const initialAppState = {
  cupons: 2,
  api: baseURL,
  empresas:[],
  lojas:[],
  loja: {},
  pdv:'',
  campanha:'',
  oab:'',
  currentPage: 'home',
}

const appReducer = (state = initialAppState,action) => {
  switch (action.type) {
    case ACT.NAVIGATE:
      return {...state, currentPage:action.payload.page}

    case ACT.GET_LOJAS:
      //console.log(action.payload)
      return {...state, lojas:[]}
    case ACT.GET_LOJAS_SUCCESS:
      //console.log(action.payload.data.data)
      let {data} = action.payload.data
      // garante visualizacao de thumb
      if (data.length%2==1) data.push( {id:0,imagem:null} )
      return {...state, lojas:data}
    case ACT.GET_LOJAS_FAIL:
      //console.log(action.payload)
      return {...state, lojas:[]}

    case ACT.GET_EMPRESAS:
      //console.log(action.payload)
      return {...state, empresas:[]}
    case ACT.GET_EMPRESAS_SUCCESS:
      //console.log(action.payload.data.data)
      return {...state, empresas:action.payload.data.data}
    case ACT.GET_EMPRESAS_FAIL:
      //console.log(action.payload)
      return {...state, empresas:[]}

    case ACT.GET_PONT_DE_VENDA:
      //console.log(action.payload)
      return {...state, pdv:'Carregando...'}
    case ACT.GET_PONT_DE_VENDA_SUCCESS:
      //console.log(action.payload.data.data)
      return {...state, pdv:action.payload.data.data}
    case ACT.GET_PONT_DE_VENDA_FAIL:
      //console.log(action.payload)
      return {...state, pdv:'Carregamento falhou!'}

    case ACT.GET_CAMPANHA:
      //console.log(action.payload)
      return {...state, campanha:'Carregando...'}
    case ACT.GET_CAMPANHA_SUCCESS:
      //console.log(action.payload.data.data)
      return {...state, campanha:action.payload.data.data}
    case ACT.GET_CAMPANHA_FAIL:
      //console.log(action.payload)
      return {...state, campanha:'Carregamento falhou!'}

    case ACT.GET_OAB:
      //console.log(action.payload)
      return {...state, oab:'Carregando...'}
    case ACT.GET_OAB_SUCCESS:
      //console.log(action.payload.data.data)
      return {...state, oab:action.payload.data.data}
    case ACT.GET_OAB_SUCCESS:
      //console.log(action.payload)
      return {...state, oab:'Carregamento falhou!'}

    case ACT.SET_LOJA:
      return {...state, loja:action.payload.loja}

    default:
      return state
  }
}


const Reducers = combineReducers({
  appState: appReducer,
  //clickState: clickReducer,
  //otherState: otherReducer
})

const Store = createStore(Reducers, applyMiddleware(axiosMiddleware(client)));

exports.Store = Store

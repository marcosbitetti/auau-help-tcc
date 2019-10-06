import React from 'react';
import { View,
      Text,
      Image,
      ActivityIndicator } from 'react-native'

import { connect, Provider } from 'react-redux'


import {Store} from './reducers'


/* expo only */
import { registerRootComponent } from 'expo';
import { activateKeepAwake } from 'expo-keep-awake';
/* /expo only */

import {colors,width,height,top} from './Styles'
import styles from './Styles'

import Home from './screens/Home'
import Empresas from './screens/Empresas'
import Lojas from './screens/Lojas'
import Avisos from './screens/Avisos'
import PdV from './screens/PdV'
import Campanha from './screens/Campanha'
import OAB from './screens/OAB'
import Loja from './screens/Loja'

if (__DEV__) {
  activateKeepAwake();
}

class Application extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      generalLoading: false,
    }
  }

  render() {
    return (
      <View style={styles.appplicationContainer}>

        <View style={{flex:1, position: 'absolute', zIndex:1, top:top, width: width, height: (height-top)}}>

        {/* carregamento generico */}
        {this.state.generalLoading &&
          <View style={[styles.loadingApplication,]}>
            <ActivityIndicator size={72} color={colors.loadingColor} />
          </View>
        }

        {this.props.page=='home' && <Home/>}
        {this.props.page=='empresas' && <Empresas/>}
        {this.props.page=='lojas' && <Lojas/>}
        {this.props.page=='avisos' && <Avisos/>}
        {this.props.page=='pdv' && <PdV/>}
        {this.props.page=='campanha' && <Campanha/>}
        {this.props.page=='oab' && <OAB/>}
        {this.props.page=='loja' && <Loja/>}
        </View>

        <Image
          style={{flex:1, position: 'absolute', zIndex:0,}}
          source={require('./assets/bg.jpg')}
        />

      </View>
    );
  }
}


//export default Application

// conecta o reduxer com o application
const mapStateToProps = store => ({
  cupons: store.appState.cupons,

  page: store.appState.currentPage,
})

const _Application = connect(mapStateToProps)(Application)

registerRootComponent( function _App() {
  return (
    <Provider store={Store}>
      <_Application/>
    </Provider>
  )
} );

import React from 'react';
import { View,
      Text,
      ActivityIndicator } from 'react-native'

import { connect, Provider } from 'react-redux'
import {Store} from './reducers'


/* expo only */
import { registerRootComponent } from 'expo';
import { activateKeepAwake } from 'expo-keep-awake';
/* /expo only */

import {colors} from './Styles'
import styles from './Styles'

import Home from './screens/Home'
import Empresas from './screens/Empresas'
import Lojas from './screens/Lojas'
import Avisos from './screens/Avisos'

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

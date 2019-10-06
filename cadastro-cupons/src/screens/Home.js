import React from 'react';
import { View,
      Text,
      ActivityIndicator,
      ScrollView } from 'react-native';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux'

import {colors} from '../Styles'
import styles from '../Styles'

import Logo from '../components/Logo'
import Card from '../components/Card'
import Cupons from '../components/Cupons'
import {navigate} from '../actions'

class Home extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
    }
  }

  render() {
    return (
      <ScrollView style={[styles.screen,]}>
        <View style={[styles.screenContent,]}>
          <Logo style={{marginBottom: 16,}}/>

          <Card
            title="Empresas"
            onPress={() => this.props.navigate('empresas') }
            />

          <Card
            title="Lojas"
            onPress={() => this.props.navigate('lojas') }
            />

          <Card
            title="Painel de Aviso"
            onPress={() => this.props.navigate('avisos') }
            />

        </View>
      </ScrollView>
    );
  }
}

// conecta o reduxer com o application
const mapStateToProps = store => ({
})

const mapDispatchToProps = dispatch => bindActionCreators( {
  navigate
}, dispatch)

export default connect(mapStateToProps,mapDispatchToProps)(Home)

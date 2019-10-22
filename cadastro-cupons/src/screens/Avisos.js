import React from 'react';
import { View,
      Text,
      ActivityIndicator,
      ScrollView ,
      FlatList,
      StyleSheet} from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux'


import {colors} from '../Styles'
import styles from '../Styles'
import {navigate} from '../actions'

import Logo from '../components/Logo'
import HeaderBack from '../components/HeaderBack'
import Card from '../components/Card'


class Avisos extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
    }
  }

  render() {
    return (
      <View style={[styles.screen,]}>
        <View style={[styles.screenContent,]}>
          <Logo style={{marginBottom: 16,}}/>

          <Card
            title="Campanhas"
            onPress={() => this.props.navigate('campanha') }
            />

          <Card
            title="Pontos de Vendas"
            onPress={() => this.props.navigate('pdv') }
            />

          <Card
            title="Comissão de proteção dos direitos dos animais (OAB)"
            onPress={() => this.props.navigate('oab') }
            />

          <HeaderBack />

        </View>
      </View>
    );
  }
}

const s2 = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    borderWidth: 1,
    borderRadius: 0,
    borderColor: colors.background2,
    padding: 2,
    width: '90%',
  },
  destaque: {
    flex: 2,
    width: '100%',
  },
  largo: {
    flex: 1,
    borderColor: 'black',
    borderWidth: 1,
    flexDirection: 'row',
  },
  medio: {
    flex: 1,
    borderColor: 'black',
    borderWidth: 1,
  }
})


// conecta o reduxer com o application
const mapStateToProps = store => ({

})

const mapDispatchToProps = dispatch => bindActionCreators( {
  navigate
}, dispatch)

export default connect(mapStateToProps,mapDispatchToProps)(Avisos)

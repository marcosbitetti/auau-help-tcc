import React from 'react';
import { View,
      Text,
      ActivityIndicator,
      ScrollView ,
      FlatList,
      StyleSheet,
      Image,
      Linking,
      TouchableOpacity} from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux'

import {colors} from '../Styles'
import styles from '../Styles'
import Logo from '../components/Logo'
import Cupons from '../components/Cupons'
import HeaderBack from '../components/HeaderBack'



class Lojas extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
    }
  }

  async componentDidMount() {
  }

  render() {
    let {loja} = this.props

    return (
      <View style={[styles.screen,]}>
        <View style={[styles.screenContent,]}>
          <Logo style={{marginBottom: 24,}}/>

          <Image
            source={{
              uri: loja.content,
              cache: 'only-if-cached',
            }}
            resizeMode={'stretch'}
            style={[{width:'100%',height:220,},{marginBottom: 24,}]}
            />

            <TouchableOpacity style={[s2.linkButton,{marginBottom: 4,}]} onPress={ () => Linking.openURL('mailto:'+loja.contato) }>
              <Text style={[s2.linkText,]}>{ loja.contato }</Text>
            </TouchableOpacity>

            <Text style={[s2.paragraph,]}>{loja.cupom}</Text>

            <Cupons total={loja.vendas}/>

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
  },
  linkButton: {

  },
  linkText: {
    color: 'red',
    fontSize: 22,
    fontWeight: '400',
    textShadowColor: 'rgba(0, 0, 0, 0.85)',
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 4
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    backgroundColor: '#fff',
    padding: 8,

    shadowColor: "#000",
    shadowOffset: {
    	width: 0,
    	height: 2,
    },
    shadowOpacity: 0.98,
    shadowRadius: 2.0,
    elevation: 4,
  }
})


// conecta o reduxer com o application
const mapStateToProps = store => ({
  loja: store.appState.loja,
  api: store.appState.api,
})

const mapDispatchToProps = dispatch => bindActionCreators( {

}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Lojas)

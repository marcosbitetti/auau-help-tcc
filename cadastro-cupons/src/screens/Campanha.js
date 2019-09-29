import React from 'react';
import { View,
      Text,
      ActivityIndicator,
      ScrollView ,
      FlatList,
      StyleSheet,
      WebView} from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux'


import {colors, width, height} from '../Styles'
import styles from '../Styles'
import {getCampanha} from '../actions'

import Logo from '../components/Logo'
import HeaderBack from '../components/HeaderBack'
import Card from '../components/Card'


class Campanha extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
    }
  }

  async componentDidMount() {
    this.props.getCampanha()
  }

  render() {
    let data = this.props.html

    return (
      <View style={[styles.screen,]}>
        <View style={[styles.screenContent,{paddingTop: 48,paddingBottom: 48}]}>

          <WebView
            source={{html:data}}
            style={[s2.container]}
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
    borderColor: colors.background2,
    padding: 2,
    width: 300,
    height: height,
  },
})


// conecta o reduxer com o application
const mapStateToProps = store => ({
  html: store.appState.campanha,
})

const mapDispatchToProps = dispatch => bindActionCreators( {
  getCampanha
}, dispatch)

export default connect(mapStateToProps,mapDispatchToProps)(Campanha)

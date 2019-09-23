import React from 'react';
import { View,
      TouchableOpacity,
      StyleSheet,
      BackHandler} from 'react-native';

import { Ionicons } from '@expo/vector-icons';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux'

import {colors} from '../Styles'
import {navigate} from '../actions'


class HeaderBack extends React.Component {

  componentDidMount() {
    this.backHandler = BackHandler.addEventListener('hardwareBackPress', () => this.props.navigate('back') )
  }

  componentWillUnmount() {
    this.backHandler.remove()
  }

  render() {
    return (
      <TouchableOpacity style={[styles.buttom,this.props.style]} onPress={ () => this.props.navigate('back') }>
        <Ionicons name="ios-arrow-round-back" size={32} color="#ee3333" />
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  buttom: {
    justifyContent: 'center',
    alignItems: 'center',
    flexGrow: 1,
    position: 'absolute',
    top: 12,
    left: 12,
    width: 32,
    height: 32,
  },

})

// conecta o reduxer com o application
const mapStateToProps = store => ({

})

const mapDispatchToProps = dispatch => bindActionCreators( {
  navigate
}, dispatch)

export default connect(mapStateToProps,mapDispatchToProps)(HeaderBack)

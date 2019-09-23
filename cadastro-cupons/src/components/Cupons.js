import React from 'react';
import { View,
      TouchableOpacity,
      StyleSheet } from 'react-native';

import { Ionicons } from '@expo/vector-icons';

import {colors} from '../Styles'
//import styles from '../Styles'

import { connect } from 'react-redux'
import {Store} from '../reducers'


class Cupons extends React.Component {

  constructor(props) {
    super(props)
  }

  render() {
    return (
      <View style={[styles.cardBase,]}>
        <View style={[styles.cardItem,styles.left]}>
          {this.props.cupons>0 && <Ionicons name="md-checkmark" size={32} color="green" />}
        </View>
        <View style={[styles.cardItem,]}>
          {this.props.cupons>1 && <Ionicons name="md-checkmark" size={32} color="green" />}
        </View>
        <View style={[styles.cardItem,]}>
          {this.props.cupons>2 && <Ionicons name="md-checkmark" size={32} color="green" />}
        </View>
        <View style={[styles.cardItem,]}>
          {this.props.cupons>3 && <Ionicons name="md-checkmark" size={32} color="green" />}
        </View>
        <View style={[styles.cardItem,]}>
          {this.props.cupons>4 && <Ionicons name="md-checkmark" size={32} color="green" />}
        </View>
        <View style={[styles.cardItem,styles.right]}>
          {this.props.cupons>5 && <Ionicons name="md-checkmark" size={32} color="green" />}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  cardBase: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  cardItem: {
    padding: 4,
    borderColor: colors.background2,
    borderWidth: 2,
    backgroundColor: colors.background3,
    width: 42,
    height: 42,
  },
  left: {
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
  right: {
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
  }
})

// conecta o reduxer com o application
const mapStateToProps = store => ({
  cupons: store.appState.cupons,
})

export default connect(mapStateToProps)(Cupons)

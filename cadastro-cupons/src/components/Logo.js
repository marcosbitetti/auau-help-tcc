import React from 'react';
import { View,
      Text,
      StyleSheet,
      Image } from 'react-native';

import {colors,logoHeight} from '../Styles'

class Logo extends React.Component {

  render() {

    return (
      <View style={[this.props.style,styles.logoContainer]}>
      <Image
        style={styles.icon}
        source={require('../assets/icon.png')}
      />
        <Text style={styles.text}>Au Au Help</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  logoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    //borderWidth: 1,
    //borderRadius: 12,
    //borderColor: colors.background2,
    padding: 2,
    width: 200,
    height:logoHeight,
    flex: 0,
    //marginTop: 8,
  },
  icon:{
    width: 42,
    height: 42,
    marginRight: 16,
  },
  text: {
    fontSize: 32,
    color: '#fb9f02',
    fontWeight: '800',
    textShadowColor: 'rgba(0, 0, 0, 0.85)',
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 8
  }
})

export default Logo

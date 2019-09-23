import React from 'react';
import { View,
      Text,
      StyleSheet } from 'react-native';

import {colors,logoHeight} from '../Styles'

class Logo extends React.Component {

  render() {

    return (
      <View style={[this.props.style,styles.logoContainer]}>
        <Text style="color:'black'">Au Au Help</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  logoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    borderWidth: 1,
    borderRadius: 12,
    borderColor: colors.background2,
    padding: 2,
    width: 200,
    height:logoHeight,
    flex: 0,
    //marginTop: 8,
  },
})

export default Logo

import React from 'react';
import { View,
      Text,
      ActivityIndicator,
      TouchableOpacity } from 'react-native';

import {colors} from '../Styles'
import styles from '../Styles'


class Card extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
    }
  }

  render() {

    return (
      <TouchableOpacity style={styles.appCard} onPress={this.props.onPress}>
        <Text style={{color:'#f5f5dc'}}>{ this.props.title }</Text>
      </TouchableOpacity>
    );
  }
}


export default Card

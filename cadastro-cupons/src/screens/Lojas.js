import React from 'react';
import { View,
      Text,
      ActivityIndicator,
      ScrollView ,
      FlatList,
      StyleSheet,
      Image} from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux'

import {colors} from '../Styles'
import styles from '../Styles'
import {getLojas} from '../actions'
import Logo from '../components/Logo'
import HeaderBack from '../components/HeaderBack'



class Lojas extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
    }
  }

  async componentDidMount() {
    this.props.getLojas()
  }

  render() {
    return (
      <View style={[styles.screen,]}>
        <View style={[styles.screenContent,]}>
          <Logo style={{marginTop: 8,}}/>

          <FlatList
            style={[styles.containerList]}
            data={this.props.lojas}
            keyExtractor={item => item.id}
            numColumns={2}
            renderItem={({item,index,separators}) => {
              return (
                <View style={[styles.listItem,]}>
                  <View
                    style={[{width:'100%',height:StyleSheet.flatten(styles.listItem).minHeight},styles.listItemImage,]} >
                    <Image
                      source={{
                        uri: this.props.api + item.imagem,
                        cache: 'only-if-cached',
                      }}
                      resizeMode={'stretch'}
                      style={[{width:'100%',height:'100%',},]}
                      />
                    </View>
                </View>
              )
            }}
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
  lojas: store.appState.lojas,
  api: store.appState.api,
})

const mapDispatchToProps = dispatch => bindActionCreators( {
  getLojas
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Lojas)

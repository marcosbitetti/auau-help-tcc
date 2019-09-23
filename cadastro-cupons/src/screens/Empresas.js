import React from 'react';
import { View,
      Text,
      ActivityIndicator,
      ScrollView ,
      FlatList,
      StyleSheet} from 'react-native';

import {colors} from '../Styles'
import styles from '../Styles'

import Logo from '../components/Logo'
import HeaderBack from '../components/HeaderBack'

import { connect } from 'react-redux'


class Empresas extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
    }
  }

  render() {
    return (
      <View style={[styles.screen,]}>
        <View style={[styles.screenContent,]}>
          <Logo style={{marginTop: 8,}}/>
          <FlatList
            style={[styles.containerList]}
            data={this.props.empresas}
            keyExtractor={item => item.id}
            numColumns={2}
            renderItem={({item,index,separators}) => {
              return (
                <View style={[styles.listItem,(index==0?styles.listItemLarge:{})]}>
                  <Text>{JSON.stringify(item)}</Text>
                </View>
              )
            }}
            />

            <HeaderBack />

          {/*<View style={[s2.container]}>

            <View style={[s2.largo,s2.destaque,]}>
              <Text>imagem</Text>
            </View>

            <View style={[s2.largo,]}>
              <View style={[s2.medio,]}>
                <Text>imagem</Text>
              </View>
              <View style={[s2.medio,]}>
                <Text>imagem</Text>
              </View>
              <View style={[s2.medio,]}>
                <Text>imagem</Text>
              </View>
            </View>

            <View style={[s2.largo,]}>
              <View style={[s2.medio,]}>
                <Text>imagem</Text>
              </View>
              <View style={[s2.medio,]}>
                <Text>imagem</Text>
              </View>
              <View style={[s2.medio,]}>
                <Text>imagem</Text>
              </View>
            </View>

          </View>*/}

        </View>
      </View>
    );
  }
}

const s2 = StyleSheet.create({
  containerList: {
    flex:1,
    backgroundColor: 'red',
  },
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
  empresas: store.appState.empresas,
})

export default connect(mapStateToProps)(Empresas)

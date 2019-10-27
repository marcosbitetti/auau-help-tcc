import React from 'react';
import { View,
      Text,
      ActivityIndicator,
      ScrollView ,
      FlatList,
      StyleSheet,
      Image,
      TouchableOpacity} from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux'

import {colors} from '../Styles'
import styles from '../Styles'
import {getLojas,navigate,setLoja} from '../actions'
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
                <TouchableOpacity
                  onPress={ () => { this.props.setLoja(item); this.props.navigate('loja') } }
                  style={[styles.listItem,]}>
                  {item.imagem!=null &&
                   <View
                    style={[{width:'100%',height:StyleSheet.flatten(styles.listItem).minHeight},styles.listItemImage,]} >
                    <Image
                      source={{
                        uri: item.content,
                        cache: 'only-if-cached',
                      }}
                      resizeMode={'stretch'}
                      style={[{width:'100%',height:'100%',},]}
                      />
                    </View>
                  }
                </TouchableOpacity>
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
  getLojas,
  setLoja,
  navigate
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Lojas)

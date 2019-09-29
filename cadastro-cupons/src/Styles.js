import { StyleSheet, Dimensions } from 'react-native';
import Constants from 'expo-constants'

let {height, width} = Dimensions.get('window')

const logoHeight = 38

const colors = {
  background1: '#f7f7f7',
  background2: '#c3c3c3',
  background3: '#aaaaaa',
  opacityMedium: 'rgba(0,0,0,0.7)',
  loadingColor: '#c3c3c3',
  borderLight: '#222222',
}

const styles = StyleSheet.create({
  appplicationContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    width: width,
    height: height,
    paddingTop: Constants.statusBarHeight,
    backgroundColor: colors.background1,
  },

  loadingApplication: {
    position: 'absolute',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: width,
    height: height,
    backgroundColor: colors.opacityMedium,
  },

  screen: {
    flex: 1,
    width: width,
    height: height,
  },
  screenContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: width,
    minHeight: height,
  },

  appCard: {
    minWidth: 200,
    width: parseInt(width*(80/100)),
    minHeight: 50,
    borderWidth: 1,
    borderRadius: 16,
    borderColor: colors.borderLight,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    marginBottom: 24,
    backgroundColor: colors.background2,
  },

  containerList: {
    flex:0,
    width: width,
    height: height - 16 - logoHeight - Constants.statusBarHeight - 8,
    marginTop: 16,
  },

  listItem: {
    alignItems: "center",
    flexBasis: 0,
    flexGrow: 1,
    margin: 4,
    padding: 20,
    width: parseInt(width/2) - 32,
    minHeight: parseInt(width/2) - 32,
  },

  listItemLarge: {
    width: width - 8,
    minWidth: width - 8,
    //backgroundColor: 'red',
    //flexGrow: 0,
    //flex: 0,
  },

  listItemImage: {
    borderWidth: 1,
    borderColor: '#999',

    shadowColor: "#000",
    shadowOffset: {
    	width: 0,
    	height: 2,
    },
    shadowOpacity: 0.98,
    shadowRadius: 2.0,
    elevation: 4,
  },


})

exports.logoHeight = logoHeight
exports.colors = colors
exports.width = width
exports.height = height
exports.top = Constants.statusBarHeight
export default styles

import { StyleSheet } from 'react-native';
import colors from '../constants/colors';

export default StyleSheet.create({
  appContainer: {
    flex: 1,
    backgroundColor: colors.appBackground
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
    position: 'absolute'
  },
  text: {
    fontSize: 24,
    color: 'white',
    fontWeight: 'bold',
    marginBottom: 20,
  },
  headerContainer: {
    justifyContent: 'center',
    alignItems: 'flex-start',
    marginTop: 50,
    marginLeft: 20,
  },
  footer: {
    position: 'absolute',
    alignSelf: 'flex-end',
    bottom: 50,
    right: 30,
    backgroundColor: colors.appBackground,
    borderRadius: 30,
    overflow: 'hidden'
  },
  addImage: {
    height: 60,
    width: 60
  }
});

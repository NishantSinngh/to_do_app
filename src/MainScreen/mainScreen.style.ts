import { StyleSheet } from 'react-native';

export default StyleSheet.create({
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
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
    marginBottom: 20,
  },
  headerContainer: {
    justifyContent:'center',
    alignItems:'flex-start',
    marginTop: 50,
    marginLeft: 20,
  },
  footer:{
    margin:20,
    alignSelf:'center',
  }
});

import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  header: {
    marginBottom: 15,
    backgroundColor: 'lightpink',
    flexDirection: 'row',
  },
  footer: {
    marginTop: 20,
    backgroundColor: 'lightpink',
    flexDirection: 'row',
    position: 'absolute',
    bottom: 0
  },
  title: {
    color: '#fff',
    fontWeight: 'bold',
    flex: 1,
    fontSize: 23,
    textAlign: 'center',
    margin: 10,
  },
  author: {
    color: '#fff',
    fontWeight: 'bold',
    flex: 1,
    fontSize: 15,
    textAlign: 'center',
    margin: 10,
  },
  gameboard: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  gameinfo: {
    backgroundColor: '#fff',
    textAlign: 'center',
    justifyContent: 'center',
    fontSize: 20,
    marginTop: 10
  },
  row: {
    marginTop: 20,
    padding: 10
  },
  flex: {
    flexDirection: "row"
  },
  button: {
    margin: 30,
    flexDirection: "row",
    backgroundColor: 'lightpink',
    width: 130,
    paddingLeft: 5,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 30,
    fontFamily: 'sans-serif-thin'
  },
  buttonText: {
    color:"#2B2B52",
    fontSize: 20
  },
  home: {
    alignItems: 'center',
    padding: 30
  },
  nameboardText: {
    fontFamily: 'sans-serif-thin',
    fontSize: 20
  }
});
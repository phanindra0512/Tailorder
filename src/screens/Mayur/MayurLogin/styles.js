import {StyleSheet, Dimensions} from 'react-native';

const ScreenHeight = Dimensions.get('window').height;
const ScreenWidth = Dimensions.get('window').width;
const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  backImage: {
    flex: 1,
    width: ScreenWidth,
    height: ScreenHeight,
    resizeMode: 'cover',
    justifyContent: 'center',
    alignItems: 'center',
    opacity: 0.8,
  },
  loginContainer: {
    width: ScreenWidth - 40,
    // height: 500,
    paddingBottom: 30,
    backgroundColor: '#F5F5F5',
    borderRadius: 15,
  },
  logo: {
    fontSize: 30,
    textAlign: 'center',
    paddingVertical: 15,
    fontFamily: 'ReggaeOne-Regular',
  },
  heading: {
    fontSize: 22,
    fontFamily: 'JosefinSans-Bold',
    paddingLeft: 20,
  },
  subHeading: {
    fontSize: 17,
    fontFamily: 'JosefinSans-Medium',
    paddingLeft: 20,
    color: '#1A1915',
  },
  inputStyle: {
    width: ScreenWidth - 100,
    alignSelf: 'center',
    marginTop: 15,
    // backgroundColor: '#888',
    fontSize: 15,
  },
  semiHeading: {
    fontSize: 14,
    fontFamily: 'JosefinSans-Medium',
    textAlign: 'right',
    paddingRight: 35,
    paddingTop: 10,
  },
  buttonStyle: {
    width: ScreenWidth - 110,
    alignSelf: 'center',
    borderRadius: 7,
    marginTop: 20,
  },
  buttonTitle: {
    backgroundColor: '#1A1915',
  },
  forgot: {
    fontSize: 14,
    fontFamily: 'JosefinSans-Medium',
  },
});
export default styles;

import React, {useState} from 'react';
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {Overlay, Button} from 'react-native-elements';
import LottieView from 'lottie-react-native';

const ScreenHeight = Dimensions.get('window').height;
const ScreenWidth = Dimensions.get('window').width;

function ErrorPopup(props) {
  const [visible, setVisible] = useState(true);

  const toggleOverlay = () => {
    setVisible(!visible);
  };

  return (
    <View>
      <Overlay
        isVisible={visible}
        overlayStyle={styles.overlay}
        backdropStyle={{
          backgroundColor: '#888',
          opacity: 0.6,
        }}>
        <LottieView
          source={require('../../assets/loginError.json')}
          style={{height: 80, width: 80}}
          autoPlay
          loop
        />
        <Text style={styles.error}>Invalid credentials</Text>
        <Text style={styles.errorText}>
          Please enter valid mobile number and password
        </Text>
        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={() => toggleOverlay()}>
          <Text style={styles.buttonText}>Okay</Text>
        </TouchableOpacity>
      </Overlay>
    </View>
  );
}

export default ErrorPopup;

const styles = StyleSheet.create({
  overlay: {
    padding: -0,
    width: ScreenWidth - 60,
    backgroundColor: '#fff',
    borderRadius: 15,
    alignItems: 'center',
  },
  error: {
    fontSize: 20,
    fontFamily: 'JosefinSans-Bold',
  },
  errorText: {
    fontSize: 14,
    textAlign: 'center',
    fontFamily: 'JosefinSans-Regular',
    color: '#888',
    paddingHorizontal: 10,
  },
  buttonContainer: {
    backgroundColor: '#000',
    height: 40,
    alignSelf: 'flex-end',
    width: 100,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 3,
    borderBottomRightRadius: 15,
  },
  buttonText: {
    fontSize: 14,
    fontFamily: 'JosefinSans-Bold',
    color: '#fff',
  },
});

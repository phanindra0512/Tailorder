import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  ImageBackground,
  Image,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native';
import {TextInput} from 'react-native-paper';
import {Button} from 'react-native-elements';
import Icon from 'react-native-vector-icons/Ionicons';
import styles from './styles';
import firestore from '@react-native-firebase/firestore';
import ErrorPopup from '../../../components/ErrorPopup';

function StyloLogin({navigation}) {
  const [isMobile, setIsMobile] = useState('');
  const [isPassword, setIsPassword] = useState('');
  const [isSecureTextEntry, setIsSecureTextEntry] = useState(true);
  const [isValue, setIsValue] = useState(0);
  const [isLoginData, setIsLoginData] = useState();
  const [isAuthFail, setIsAuthFail] = useState(false);

  const theme = {
    fonts: {regular: {fontFamily: 'JosefinSans-Medium'}},
    colors: {
      placeholder: '#000',
      text: '#1A1915',
      primary: '#1A1915',
      underlineColor: 'transparent',
    },
  };

  useEffect(() => {
    const getlinenCredentials = async () => {
      const user = await firestore().collection('styloCredentials').get();
      const data = user._docs.map((docs) => docs._data);
      setIsLoginData(data);
      console.log('Getting linen login credentials', data);
    };
    getlinenCredentials();
  }, []);

  const validateCredentials = async () => {
    if (
      isMobile == isLoginData[0].mobileNumber &&
      isPassword == isLoginData[0].password
    ) {
      console.log('matched');
      navigation.navigate('StyloHome');
    } else {
      setIsAuthFail(!isAuthFail);
      console.log('unmatched');
    }
  };
  return (
    <KeyboardAvoidingView behavior="height" enabled style={{flex: 1}}>
      <ScrollView>
        <ImageBackground
          source={require('../../../../assets/stylo/login_bd.jpg')}
          style={styles.backImage}>
          <View style={styles.loginContainer}>
            <Image
              source={require('../../../../assets/stylo/stylo_logo.png')}
              style={styles.logo}
            />
            <Text style={styles.heading}>Welcome back,</Text>
            <Text style={styles.subHeading}>Login to continue</Text>
            <TextInput
              mode="outlined"
              label="Mobile Number"
              value={isMobile}
              style={styles.inputStyle}
              keyboardType={'numeric'}
              placeholderStyle={{fontFamily: 'JosefinSans-Bold'}}
              theme={theme}
              selectionColor="#888"
              onChangeText={(isMobile) => setIsMobile(isMobile)}
            />
            <TextInput
              mode="outlined"
              label="Password"
              value={isPassword}
              style={styles.inputStyle}
              secureTextEntry={isSecureTextEntry}
              placeholderStyle={{fontFamily: 'JosefinSans-Bold'}}
              theme={theme}
              selectionColor="#888"
              onChangeText={(isPassword) => setIsPassword(isPassword)}
              right={
                <TextInput.Icon
                  name={isValue == 0 ? 'eye' : 'eye-off'}
                  size={22}
                  color="black"
                  onPress={() => {
                    setIsValue(!isValue);
                    setIsSecureTextEntry(!isSecureTextEntry);
                  }}
                />
              }
            />
            <TouchableOpacity
              onPress={() => navigation.navigate('StyloMobileNumber')}>
              <Text style={styles.semiHeading}>Forgot Password ?</Text>
            </TouchableOpacity>
            <Button
              title="Login"
              containerStyle={styles.buttonStyle}
              buttonStyle={styles.buttonTitle}
              titleStyle={{fontFamily: 'JosefinSans-Medium'}}
              disabledStyle={{backgroundColor: '#BDBCBC'}}
              disabled={!isMobile || !isPassword ? true : false}
              disabledTitleStyle={{color: '#999'}}
              onPress={() => validateCredentials()}
            />
            <View
              style={{
                flexDirection: 'row',
                alignSelf: 'center',
                paddingTop: 15,
              }}>
              <Text style={styles.forgot}>Don't have an account ? </Text>
              <TouchableOpacity
                onPress={() => navigation.navigate('StyloSignup')}>
                <Text style={styles.forgot}>Signup</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ImageBackground>
      </ScrollView>
      {/* To display Error popup when login credentials are invalid */}
      {isAuthFail ? <ErrorPopup /> : null}

    </KeyboardAvoidingView>
  );
}

export default StyloLogin;

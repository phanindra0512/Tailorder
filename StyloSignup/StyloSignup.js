import React, { useState } from 'react';
import {
	View,
	Text,
	ImageBackground,
	Image,
	TouchableOpacity,
	KeyboardAvoidingView,
	ScrollView,
	Dimensions
} from 'react-native';
import { TextInput } from 'react-native-paper';
import { Button, Overlay } from 'react-native-elements';
import Icon from 'react-native-vector-icons/Ionicons';
import styles from './styles';
import LottieView from 'lottie-react-native';

const ScreenHeight = Dimensions.get('window').height;
const ScreenWidth = Dimensions.get('window').width;

function StyloSignup({ navigation }) {
	const [ isName, setIsName ] = useState('');
	const [ isMobile, setIsMobile ] = useState('');
	const [ isStoreName, setIsStoreName ] = useState('');
	const [ isAddress, setIsAddress ] = useState('');
	const [ isPassword, setIsPassword ] = useState('');
	const [ visible, setVisible ] = useState(false);

	const theme = {
		fonts: { regular: { fontFamily: 'JosefinSans-Medium' } },
		colors: {
			placeholder: '#000',
			text: '#1A1915',
			primary: '#1A1915',
			underlineColor: 'transparent'
		}
	};
	const registerSuccess = () => {
		setVisible(true);
		setTimeout(() => {
			setVisible(false);
			navigation.replace('StyloLogin');
		}, 3000);
	};

	return (
		<KeyboardAvoidingView behavior="height" enabled style={{ flex: 1 }}>
			<ScrollView>
				<ImageBackground source={require('../../../../assets/stylo/login_bd.jpg')} style={styles.backImage}>
					<View style={styles.loginContainer}>
						<ScrollView nestedScrollEnabled={true}>
							<Image source={require('../../../../assets/stylo/stylo_logo.png')} style={styles.logo} />
							<Text style={styles.heading}>Create Account,</Text>
							<Text style={styles.subHeading}>Signup to get started</Text>
							<TextInput
								mode="outlined"
								label="Owner Name"
								value={isName}
								style={styles.inputStyle}
								placeholderStyle={{ fontFamily: 'JosefinSans-Bold' }}
								theme={theme}
								selectionColor="#888"
								onChangeText={(isName) => setIsName(isName)}
							/>
							<TextInput
								mode="outlined"
								label="Mobile Number"
								value={isMobile}
								style={styles.inputStyle}
								keyboardType={'numeric'}
								placeholderStyle={{ fontFamily: 'JosefinSans-Bold' }}
								theme={theme}
								selectionColor="#888"
								onChangeText={(isMobile) => setIsMobile(isMobile)}
							/>
							<TextInput
								mode="outlined"
								label="Store Name"
								value={isStoreName}
								style={styles.inputStyle}
								placeholderStyle={{ fontFamily: 'JosefinSans-Bold' }}
								theme={theme}
								selectionColor="#888"
								onChangeText={(isStoreName) => setIsStoreName(isStoreName)}
							/>
							<TextInput
								mode="outlined"
								label="Store Location"
								value={isAddress}
								style={styles.inputStyle}
								placeholderStyle={{ fontFamily: 'JosefinSans-Bold' }}
								theme={theme}
								selectionColor="#888"
								onChangeText={(isAddress) => setIsAddress(isAddress)}
							/>
							<TextInput
								mode="outlined"
								label="Password"
								value={isPassword}
								style={styles.inputStyle}
								placeholderStyle={{ fontFamily: 'JosefinSans-Bold' }}
								theme={theme}
								selectionColor="#888"
								onChangeText={(isPassword) => setIsPassword(isPassword)}
							/>

							<Button
								title="Signup"
								containerStyle={styles.buttonStyle}
								buttonStyle={styles.buttonTitle}
								titleStyle={{ fontFamily: 'JosefinSans-Medium' }}
								onPress={() => registerSuccess()}
							/>
						</ScrollView>
					</View>
					<Overlay
						isVisible={visible}
						backdropStyle={{ backgroundColor: '#aaaaaa', opacity: 0.9 }}
						overlayStyle={{ height: 170, width: 270, borderRadius: 15, padding: -1 }}
					>
						<View
							style={{
								height: 170,
								backgroundColor: '#fff',
								borderRadius: 15,
								alignItems: 'center',
								justifyContent: 'center'
							}}
						>
							<LottieView
								source={require('../../../../assets/success.json')}
								style={{ height: 70, width: 70 }}
								autoPlay
								loop
							/>
							<Text style={[ styles.heading, { paddingLeft: 0 } ]}>Register Successful</Text>
						</View>
					</Overlay>
				</ImageBackground>
			</ScrollView>
		</KeyboardAvoidingView>
	);
}

export default StyloSignup;

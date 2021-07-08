import React, { useRef, useEffect, useState } from 'react';
import {
	Text,
	View,
	StatusBar,
	ImageBackground,
	KeyboardAvoidingView,
	ScrollView,
	TouchableOpacity,
	Dimensions
} from 'react-native';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { TextInput, Button, ActivityIndicator as Loader } from 'react-native-paper';
import { SwipeablePanel } from 'rn-swipeable-panel';
import styles from './styles';
const ScreenHeight = Dimensions.get('window').height;
const ScreenWidth = Dimensions.get('window').width;

function MayurMobileNumber({ navigation }) {
	const [ isMobile, setIsMobile ] = useState('');

	const [ panelProps, setPanelProps ] = useState({
		fullWidth: true,
		openLarge: true,
		showCloseButton: false,
		noBar: true,
		noBackgroundOpacity: true,
		onClose: () => closePanel(),
		onPressCloseButton: () => closePanel()
		// ...or any prop you want
	});
	const [ isPanelActive, setIsPanelActive ] = useState(true);

	const openPanel = () => {
		setIsPanelActive(true);
	};

	const closePanel = () => {
		setIsPanelActive(true);
	};

	const screenWidth = Math.round(Dimensions.get('window').width);

	const theme = {
		fonts: { regular: { fontFamily: 'JosefinSans-Medium' } },
		colors: {
			placeholder: '#fff',
			text: '#fff',
			primary: '#F5F5F5',
			underlineColor: 'transparent'
		}
	};

	return (
		<KeyboardAvoidingView style={{ flex: 1 }} behavior="height">
			<ScrollView>
				<View style={styles.container}>
					<ImageBackground
						source={{
							uri:
								'https://images.unsplash.com/photo-1584184924103-e310d9dc82fc?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MXx8dGFpbG9yfGVufDB8fDB8&ixlib=rb-1.2.1&w=1000&q=80'
						}}
						style={styles.backImage}
					>
						<SwipeablePanel
							style={{ height: 250, width: screenWidth - 15, backgroundColor: '#333333' }}
							{...panelProps}
							isActive={isPanelActive}
						>
							<View style={{}}>
								<Text style={styles.title}>Hello There,</Text>
								<Text style={[ styles.title, { fontSize: 16, paddingTop: 5 } ]}>
									Enter mobile number to verify
								</Text>

								<TextInput
									mode="outlined"
									label="Mobile Number"
									value={isMobile}
									style={styles.inputStyle}
									keyboardType={'numeric'}
									placeholderStyle={{ fontFamily: 'JosefinSans-Bold' }}
									theme={theme}
									selectionColor="#fff"
									onChangeText={(isMobile) => setIsMobile(isMobile)}
								/>

								<Button
									mode="contained"
									compact={false}
									uppercase={false}
									color="#888"
									style={styles.buttonStyle}
									labelStyle={{ color: '#fff', paddingTop: 4, fontFamily: 'JosefinSans-Bold' }}
									onPress={() => navigation.navigate('MayurVerification')}
								>
									Send OTP
								</Button>
							</View>
						</SwipeablePanel>
					</ImageBackground>
				</View>
			</ScrollView>
		</KeyboardAvoidingView>
	);
}

export default MayurMobileNumber;

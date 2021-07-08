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

function SplashScreen({ navigation }) {
	const [ isMobile, setIsMobile ] = useState('');
	const [ isAnimating, setIsAnimating ] = useState(false);

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
	const [ isPanelActive, setIsPanelActive ] = useState(false);

	const openPanel = () => {
		setIsPanelActive(true);
	};

	const closePanel = () => {
		setIsPanelActive(true);
	};

	const screenWidth = Math.round(Dimensions.get('window').width);

	const closeIndicator = () => {
		setTimeout(() => {
			setIsAnimating(true);
		}, 2000);
	};
	useEffect(() => {
		const callScreen = () => {
			setTimeout(() => {
				setIsAnimating(false);
				setIsPanelActive(true);
			}, 3000);
		};
		closeIndicator();
		callScreen();
	}, []);

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
					<ImageBackground source={require('../../../assets/splash_bg.jpg')} style={styles.backImage}>
						{isAnimating ? (
							<View
								style={{
									flex: 1,
									justifyContent: 'center',
									alignSelf: 'center',
									backgroundColor: 'transparent'
								}}
							>
								<Loader
									style={{ flex: 1 }}
									color="#fff"
									animating
									size="small"
									style={{
										width: 50,
										height: 50,
										padding: 10,
										borderRadius: 10,
										backgroundColor: '#999'
									}}
								/>
							</View>
						) : (
							<SwipeablePanel
								style={{ height: 240, width: screenWidth - 15, backgroundColor: '#333333' }}
								{...panelProps}
								isActive={isPanelActive}
							>
								<View style={{}}>
									<Text style={styles.title}>Select store to continue !</Text>

									<Button
										mode="contained"
										compact={false}
										uppercase={false}
										color="#888"
										style={styles.buttonStyle}
										labelStyle={{ color: '#fff', paddingTop: 4, fontFamily: 'JosefinSans-Bold' }}
										onPress={() => navigation.navigate('MayurLogin')}
									>
										MAYUR
									</Button>

									<Button
										mode="contained"
										compact={false}
										uppercase={false}
										color="#888"
										style={styles.buttonStyle}
										labelStyle={{ color: '#fff', paddingTop: 4, fontFamily: 'JosefinSans-Bold' }}
										onPress={() => navigation.navigate('StyloLogin')}
									>
										LENIN CUT PICES
									</Button>
								</View>
							</SwipeablePanel>
						)}
					</ImageBackground>
				</View>
			</ScrollView>
		</KeyboardAvoidingView>
	);
}

export default SplashScreen;

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
import { TextInput, Button } from 'react-native-paper';
import { SwipeablePanel } from 'rn-swipeable-panel';
import { CodeField, Cursor, useBlurOnFulfill, useClearByFocusCell } from 'react-native-confirmation-code-field';
import styles from './styles';

const ScreenHeight = Dimensions.get('window').height;
const ScreenWidth = Dimensions.get('window').width;
const CELL_COUNT = 4;

function StyloVerification({ navigation }) {
	const [ isMobile, setIsMobile ] = useState('');

	const [ value, setValue ] = useState('');
	const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
	const [ props, getCellOnLayoutHandler ] = useClearByFocusCell({
		value,
		setValue
	});
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
								<Text style={styles.title}>Verification</Text>
								<Text style={[ styles.title, { fontSize: 14, paddingTop: 5 } ]}>
									We have send OTP on your number
								</Text>

								<View style={{ marginTop: 30 }}>
									<CodeField
										ref={ref}
										{...props}
										value={value}
										onChangeText={setValue}
										// autoFocus
										cellCount={CELL_COUNT}
										rootStyle={styles.codeFieldRoot}
										keyboardType="number-pad"
										textContentType="oneTimeCode"
										renderCell={({ index, symbol, isFocused }) => (
											<Text
												key={index}
												style={[ styles.cell, isFocused && styles.focusCell ]}
												onLayout={getCellOnLayoutHandler(index)}
											>
												{symbol || (isFocused ? <Cursor /> : null)}
											</Text>
										)}
									/>
								</View>
								<Button
									mode="contained"
									compact={false}
									uppercase={false}
									color="#888"
									style={styles.buttonStyle}
									labelStyle={{ color: '#fff', paddingTop: 4, fontFamily: 'JosefinSans-Bold' }}
									// onPress={() => navigation.navigate('CreateProfile')}
								>
									Verify
								</Button>
							</View>
						</SwipeablePanel>
					</ImageBackground>
				</View>
			</ScrollView>
		</KeyboardAvoidingView>
	);
}

export default StyloVerification;

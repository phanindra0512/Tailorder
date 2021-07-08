import React, { useState } from 'react';
import { View, Text, ImageBackground, Image, TouchableOpacity, KeyboardAvoidingView, ScrollView } from 'react-native';
import { TextInput } from 'react-native-paper';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/Ionicons';
import styles from './styles';
import firebase from '@react-native-firebase/app';
import database from '@react-native-firebase/database';

function MayurLogin({ navigation }) {
	const [ isMobile, setIsMobile ] = useState('');
	const [ isPassword, setIsPassword ] = useState('');
	const [ isSecureTextEntry, setIsSecureTextEntry ] = useState(true);
	const [ isValue, setIsValue ] = useState(0);

	const theme = {
		fonts: { regular: { fontFamily: 'JosefinSans-Medium' } },
		colors: {
			placeholder: '#000',
			text: '#1A1915',
			primary: '#1A1915',
			underlineColor: 'transparent'
		}
	};

	const create = () => {
		const reference = database().ref('/users/321');
		database()
			.ref(`/users/${isMobile}`)
			.set({
				advance: '500',
				advanceProof:
					'file:///data/user/0/com.tailorder/cache/rn_image_picker_lib_temp_e094984a-420b-44df-9309-73e964a28cf7.jpg',
				city: 'Eluru',
				custId: 'A501',
				custName: 'Sai phanindra',
				instructions: 'No instructions',
				mobile: '9505876290',
				paymentMode: 'online',
				paymentStatus: 'pending'
			})
			.then((data) => console.log('Data set.', data));
	};

	const read = () => {
		database().ref('/users/085').once('value').then((snapshot) => {
			console.log('User data: ', snapshot.val());
		});
	};

	return (
		<KeyboardAvoidingView behavior="height" enabled style={{ flex: 1 }}>
			<ScrollView>
				<ImageBackground source={require('../../../../assets/mayur/login_bg.jpg')} style={styles.backImage}>
					<View style={styles.loginContainer}>
						<Text style={styles.logo}>Mayur tailors</Text>

						<Text style={styles.heading}>Welcome back,</Text>
						<Text style={styles.subHeading}>Login to continue</Text>
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
							label="Password"
							value={isPassword}
							style={styles.inputStyle}
							secureTextEntry={isSecureTextEntry}
							placeholderStyle={{ fontFamily: 'JosefinSans-Bold' }}
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
						<TouchableOpacity onPress={() => navigation.navigate('MayurMobileNumber')}>
							<Text style={styles.semiHeading}>Forgot Password ?</Text>
						</TouchableOpacity>
						<Button
							title="Login"
							containerStyle={styles.buttonStyle}
							buttonStyle={styles.buttonTitle}
							titleStyle={{ fontFamily: 'JosefinSans-Medium' }}
							// onPress={create}
							onPress={() => navigation.navigate('MayurHome')}
						/>
						<View style={{ flexDirection: 'row', alignSelf: 'center', paddingTop: 15 }}>
							<Text style={styles.forgot}>Don't have an account ? </Text>
							<TouchableOpacity onPress={() => navigation.navigate('MayurSignup')}>
								<Text style={styles.forgot}>Signup</Text>
							</TouchableOpacity>
						</View>
					</View>
				</ImageBackground>
			</ScrollView>
		</KeyboardAvoidingView>
	);
}

export default MayurLogin;

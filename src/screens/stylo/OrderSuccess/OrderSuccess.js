import React, { useRef, useState, useEffect } from 'react';
import {
	View,
	Text,
	Image,
	Dimensions,
	ScrollView,
	Alert,
	Platform,
	PermissionsAndroid,
	TouchableNativeFeedback,
	ToastAndroid
} from 'react-native';
import LottieView from 'lottie-react-native';
import { Button } from 'react-native-elements';
import { Divider } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import ViewShot from 'react-native-view-shot';
import CameraRoll from '@react-native-community/cameraroll';
import Share from 'react-native-share';

import styles from './styles';

const ScreenHeight = Dimensions.get('window').height;
const ScreenWidth = Dimensions.get('window').width;

const orderItems = [
	{
		itemName: 'Shirts',
		qty: 2,
		price: 250,
		total: 500
	},
	{
		itemName: 'Pants',
		qty: 2,
		price: 350,
		total: 700
	},
	{
		itemName: 'Suit',
		qty: 1,
		price: 1250,
		total: 1250
	}
];

function OrderSuccess({ navigation, route }) {
	const [ isShot, setIsShot ] = useState(false);

	const [ isData, setIsData ] = useState(route.params.orderPlaced);

	console.log('getting from state========>', isData);

	const viewShotRef = useRef();

	// get permission on android

	const getPermissionAndroid = async () => {
		if (Platform.OS === 'android') {
			try {
				const granted = await PermissionsAndroid.request(
					PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
					{
						title: 'Image Download Permission',
						message: 'Your permission is required to save images to your device',
						buttonNegative: 'Cancel',
						buttonPositive: 'OK'
					}
				);
				// If CAMERA Permission is granted
				return granted === PermissionsAndroid.RESULTS.GRANTED;
			} catch (err) {
				console.warn(err);
				return false;
			}
		} else return true;
	};

	const hadleDownload = async () => {
		getPermissionAndroid();
		try {
			// react-native-view-shot caputures component
			await viewShotRef.current.capture().then((uri) => {
				console.log('do something with ', uri);
				const image = CameraRoll.save(uri, 'photo');
				ToastAndroid.show('Saved succesfully', ToastAndroid.SHORT);
				customShare(uri);
			});

			// cameraroll saves image
		} catch (error) {
			console.log('error', error);
		}
	};

	const customShare = async (shareImg) => {
		const shareOptions = {
			message: 'this is share message',
			url: shareImg
		};
		try {
			const shareResp = await Share.open(shareOptions);
			setIsShot(true);
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<View style={{ flex: 1, backgroundColor: '#fff' }}>
			<ScrollView>
				<View style={styles.container}>
					<View style={{ height: 170, backgroundColor: '#3AAB58', justifyContent: 'center' }}>
						{/* <TouchableNativeFeedback
							useForeground={true}
							background={TouchableNativeFeedback.Ripple('#ccc', true)}
							onPress={() =>
								isShot ? navigation.navigate('StyloHome') : alert('Please save and share bill')}
						>
							<View style={styles.iconContainer}>
								<MaterialCommunityIcons name="keyboard-backspace" size={35} color="#fff" />
							</View>
						</TouchableNativeFeedback> */}
						<View style={styles.successBlock}>
							<Text style={styles.success}>Order Successful</Text>
							<LottieView
								source={require('../../../../assets/order.json')}
								style={{ width: 55, height: 55 }}
								loop
								autoPlay
							/>
						</View>
					</View>

					<ViewShot
						ref={viewShotRef}
						style={{ backgroundColor: '#fff' }}
						options={{ format: 'jpg', quality: 1 }}
					>
						<View
							style={{
								backgroundColor: '#fff',
								elevation: 3,
								borderRadius: 10,
								marginHorizontal: 15,
								marginTop: -30,
								paddingTop: 30,
								marginBottom: 10
							}}
						>
							<Image source={require('../../../../assets/stylo/stylo_logo.png')} style={styles.logo} />
							<Text style={[ styles.address, { paddingHorizontal: 10, lineHeight: 20 } ]}>
								Chintha chettu center,RRPeta,Eluru-534002
							</Text>
							<Text style={styles.address}>Mobile : 9949544127</Text>
							<View style={styles.dotted} />

							<View style={styles.detailsBlock}>
								<View>
									<Text style={styles.heading}>{isData.custName}</Text>
									<Text style={styles.subheading}>Customer ID : {isData.custId}</Text>
									<Text style={[ styles.miniText, { paddingLeft: 0, paddingTop: 5 } ]}>
										Delivery Date : {isData.deliveryDate}
									</Text>
								</View>
								<View>
									<View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 5 }}>
										<Feather name="calendar" size={14} color="#707070" />
										<Text style={styles.miniText}>{isData.bookingDate}</Text>
									</View>

									<View style={{ flexDirection: 'row', alignItems: 'center' }}>
										<Feather name="phone" size={14} color="#707070" />
										<Text style={styles.miniText}>{isData.mobile}</Text>
									</View>
								</View>
							</View>

							<View
								style={{ height: 40, backgroundColor: '#F5F5F5', flexDirection: 'row', marginTop: 15 }}
							>
								<View style={[ styles.headingBlock, { flex: 1.5 } ]}>
									<Text style={[ styles.heading, { fontSize: 16 } ]}>Item Name</Text>
								</View>
								<View style={styles.headingBlock}>
									<Text style={[ styles.heading, { fontSize: 16 } ]}>Qty</Text>
								</View>
								<View style={styles.headingBlock}>
									<Text style={[ styles.heading, { fontSize: 16 } ]}>Price</Text>
								</View>
								<View style={styles.headingBlock}>
									<Text style={[ styles.heading, { fontSize: 16 } ]}>Total</Text>
								</View>
							</View>
							{isData.itemDetails.map((item, index) => {
								return (
									<View key={index} style={{ height: 40, flexDirection: 'row' }}>
										<View
											style={[
												styles.headingBlock,
												{ flex: 1.5, alignItems: 'flex-start', paddingLeft: 20 }
											]}
										>
											<Text style={styles.items}>{item.name}</Text>
										</View>
										<View style={styles.headingBlock}>
											<Text style={styles.items}>{item.quantity}</Text>
										</View>
										<View style={styles.headingBlock}>
											<Text style={styles.items}>{item.price}</Text>
										</View>
										<View style={styles.headingBlock}>
											<Text style={styles.items}>
												{'\u20B9'} {item.price * item.quantity}
											</Text>
										</View>
									</View>
								);
							})}
							<Divider />
							<View style={{ height: 40, flexDirection: 'row' }}>
								<View style={{ flex: 1, justifyContent: 'center', paddingLeft: 20 }}>
									<Text style={styles.items}>Total Amount</Text>
								</View>
								<View
									style={{
										flex: 1,
										justifyContent: 'center',
										alignItems: 'flex-end',
										paddingRight: 15
									}}
								>
									<Text style={[ styles.items, { fontSize: 21 } ]}>
										{'\u20B9'} {route.params.totalAmt}
									</Text>
								</View>
							</View>

							{isData.advancePayment ? (
								<View style={{ height: 40, flexDirection: 'row' }}>
									<View style={{ flex: 1, justifyContent: 'center', paddingLeft: 20 }}>
										<Text style={styles.items}>Advance</Text>
									</View>
									<View
										style={{
											flex: 1,
											justifyContent: 'center',
											alignItems: 'flex-end',
											paddingRight: 15
										}}
									>
										<Text style={[ styles.items, { fontSize: 18 } ]}>
											-{'\u20B9'} {isData.advance || 0}
										</Text>
									</View>
								</View>
							) : (
								<View style={{ height: 40, flexDirection: 'row' }}>
									<View style={{ flex: 1, justifyContent: 'center', paddingLeft: 20 }}>
										<Text style={styles.items}>Total Pay</Text>
									</View>
									<View
										style={{
											flex: 1,
											justifyContent: 'center',
											alignItems: 'flex-end',
											paddingRight: 15
										}}
									>
										<Text style={[ styles.items, { fontSize: 18 } ]}>
											-{'\u20B9'} {route.params.totalAmt}
										</Text>
									</View>
								</View>
							)}

							<Divider style={{ width: 150, alignSelf: 'flex-end' }} />
							<View style={{ height: 40, flexDirection: 'row' }}>
								<View style={{ flex: 1, justifyContent: 'center', paddingLeft: 20 }}>
									<Text style={styles.items}>Balance</Text>
								</View>
								<View
									style={{
										flex: 1,
										justifyContent: 'center',
										alignItems: 'flex-end',
										paddingRight: 15
									}}
								>
									<Text style={[ styles.items, { fontSize: 22 } ]}>
										{'\u20B9'} {isData.advance == '' ? 0 : route.params.totalAmt - isData.advance}
									</Text>
								</View>
							</View>
							{/* <Divider /> */}

							<View
								style={{
									flexDirection: 'row',
									alignItems: 'center',
									justifyContent: 'center',
									marginTop: 20
								}}
							>
								<View style={styles.dashed} />
								<FontAwesome5 name="praying-hands" color="#888" style={{ marginLeft: 5 }} />
								<FontAwesome5 name="praying-hands" color="#888" style={{ marginHorizontal: 5 }} />
								<FontAwesome5 name="praying-hands" color="#888" style={{ marginRight: 5 }} />
								<View style={styles.dashed} />
							</View>
							<Text style={styles.visit}>Thank You . Visit Us Again</Text>
						</View>
					</ViewShot>
				</View>
			</ScrollView>
			<View
				style={{
					flexDirection: 'row',
					justifyContent: 'space-around',
					marginBottom: 10
				}}
			>
				<Button
					title="Save & Share"
					containerStyle={styles.buttonStyle}
					buttonStyle={styles.buttonTitle}
					titleStyle={{ fontFamily: 'JosefinSans-Medium' }}
					onPress={hadleDownload}
				/>

				<Button
					title="Go Home"
					disabled={isShot ? false : true}
					containerStyle={styles.buttonStyle}
					buttonStyle={styles.buttonTitle}
					titleStyle={{ fontFamily: 'JosefinSans-Medium' }}
					onPress={() => navigation.navigate('StyloHome')}
				/>
			</View>
		</View>

		// <View style={{ flex: 1, backgroundColor: '#fff' }}>
		// 	<View style={styles.triangleCorner1} />
		// 	<View style={{ position: 'absolute', top: 150, alignSelf: 'center' }}>
		// 		<Image
		// 			source={require('../../../../assets/splash_bg.jpg')}
		// 			style={{ width: 100, height: 100, borderRadius: 100 }}
		// 		/>
		// 	</View>
		// </View>
	);
}

export default OrderSuccess;

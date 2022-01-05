import React, { useState, useEffect } from 'react';
import {
	View,
	Text,
	TextInput,
	Dimensions,
	TouchableOpacity,
	Image,
	KeyboardAvoidingView,
	ScrollView,
	PermissionsAndroid
} from 'react-native';
import { Divider, RadioButton, FAB } from 'react-native-paper';
import { Overlay, Button } from 'react-native-elements';
import { SwipeablePanel } from 'rn-swipeable-panel';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import AntDesign from 'react-native-vector-icons/AntDesign';
import DirectSms from 'react-native-direct-sms';
import moment from 'moment';
import styles from './styles';

const ScreenWidth = Dimensions.get('window').width;
const ScreenHeight = Dimensions.get('window').height;

import firebase from '@react-native-firebase/app';
import database from '@react-native-firebase/database';
import firestore from '@react-native-firebase/firestore';

var firebaseConfig = {
	apiKey: 'AIzaSyASozcbLmnkDDFV6gMgRvyDHWW17o1oQPA',
	authDomain: 'tailorder.firebaseapp.com',
	databaseURL: 'https://tailorder-default-rtdb.firebaseio.com',
	projectId: 'tailorder',
	storageBucket: 'tailorder.appspot.com',
	messagingSenderId: '301247191940',
	appId: '1:301247191940:web:11198bd748bfb848091bd1',
	measurementId: 'G-7344Y5FSB6'
};

firebase.initializeApp(firebaseConfig);

function CustomerDetails({ navigation, route }) {
	const [ orderItems, setOrderItems ] = useState([]);

	const [ isCustId, setIsCustId ] = useState('');
	const [ isCustName, setIsCustName ] = useState('');
	const [ isCustMobile, setIsCustMobile ] = useState('');
	const [ isCity, setIsCity ] = useState('');
	const [ isInstructions, setIsInstructions ] = useState('');

	const [ isAdvance, setIsAdvance ] = useState('');
	const [ checked, setChecked ] = useState('');
	const [ photocam, setPhotoCam ] = useState('');

	const [ totalPayMode, setTotalPay ] = useState('');
	const [ totalPayProof, setTotalPayProof ] = useState('');

	const [ isTotal, setIsTotal ] = useState('');
	const [ isPay, setIsPay ] = useState('');
	const [ isCharges, setIsCharges ] = useState(100);

	const orderDetails = {
		itemDetails: route.params.selectedItems,
		mesurmentDetails: route.params.measurmentsImages,
		clothesDetails: route.params.clothesImages,
		bookingDate: route.params.bookingDate,
		deliveryDate: route.params.deliveryDate,
		custId: isCustId,
		custName: isCustName,
		mobile: isCustMobile,
		city: isCity,
		instructions: isInstructions,
		advancePayment: isPay == 'Advance' ? true : false,
		advance: isAdvance,
		advancePaymentMode: checked,
		advanceProof: photocam,
		fullPayment: isPay == 'FullPayment' ? true : false,
		fullPaymentMode: totalPayMode,
		fullPaymentProof: totalPayProof,
		paymentStatus: isPay == 'FullPayment' ? 'PAID' : 'PENDING',
		totalAmount: isTotal,
		orderStatus: 'PLACED'
	};

	const createOrder = {
		custId: isCustId,
		custName: isCustName,
		mobile: isCustMobile,
		city: isCity,
		instructions: isInstructions,
		advance: isAdvance,
		paymentMode: checked,
		advanceProof: photocam,
		paymentStatus: isTotal + isCharges - isAdvance == 0 ? 'paid' : 'pending'
	};

	const storeData = () => {
		firestore()
			.collection('MyOrders')
			.doc(isCustId)
			.set({
				orderDetails
			})
			.then(async () => {
				console.log(' data added');

				try {
					const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.SEND_SMS, {
						title: 'App Sms Permission',
						message: 'App needs access to your inbox' + 'so you can send messages in background.',
						buttonNeutral: 'Ask Me Later',
						buttonNegative: 'Cancel',
						buttonPositive: 'OK'
					});
					if (granted === PermissionsAndroid.RESULTS.GRANTED) {
						DirectSms.sendDirectSms(
							isCustMobile,
							`Hi ${isCustName} ! Your order is placed successful with an order id ${isCustId}.\nFor any queries please contact \nRaju: 9505876290 , \nphanindra : 9949544127`
						);
					} else {
						console.log('SMS permission denied');
					}
				} catch (err) {
					console.warn(err);
				}
			});
	};

	useEffect(() => {
		const totalPrice = () => {
			let prices = 0;
			// console.log("totalPrice", cartItems)
			orderDetails.itemDetails.map((item) => {
				prices += (item.price || 0) * (item.quantity || 0);
			});

			setIsTotal(prices);
			console.log('amt=======>', prices);
		};
		totalPrice();
	}, []);

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
		setIsPanelActive(!isPanelActive);
	};

	const closePanel = () => {
		setIsPanelActive(false);
	};

	const handleChooseCamera = () => {
		const options = {
			title: 'Select Image',
			takePhotoButtonTitle: 'Take pic',
			storageOptions: {
				skipBackup: true,
				path: 'images'
			}
		};
		launchCamera(options, (response) => {
			console.log('img', response.uri);
			if (response.didCancel) {
				console.log('User cancelled image picker');
			} else if (response.error) {
				console.log('ImagePicker Error: ', response.error);
			} else if (response.customButton) {
				console.log('User tapped custom button: ', response.customButton);
			} else {
				// const source = response.uri;
				// console.log('upload pic------------->', source);
				let source = { uri: response.uri };
				// console.log(source);
				setPhotoCam(source.uri);
			}
		});
	};

	const handleChooseCamera2 = () => {
		const options = {
			title: 'Select Image',
			takePhotoButtonTitle: 'Take pic',
			storageOptions: {
				skipBackup: true,
				path: 'images'
			}
		};
		launchCamera(options, (response) => {
			console.log('img', response.uri);
			if (response.didCancel) {
				console.log('User cancelled image picker');
			} else if (response.error) {
				console.log('ImagePicker Error: ', response.error);
			} else if (response.customButton) {
				console.log('User tapped custom button: ', response.customButton);
			} else {
				// const source = response.uri;
				// console.log('upload pic------------->', source);
				let source = { uri: response.uri };
				// console.log(source);
				setTotalPayProof(source.uri);
			}
		});
	};

	return (
		<View style={styles.container}>
			<KeyboardAvoidingView behavior="height" enabled style={{ flex: 1 }}>
				<ScrollView>
					<Text style={styles.heading}>Add Customer Details</Text>
					<Divider style={{ marginBottom: 20 }} />
					<TextInput
						style={styles.fieldsStyles}
						placeholderTextColor="grey"
						placeholder="Customer Id"
						placeholderTextColor="#727272"
						underlineColor="grey"
						value={isCustId}
						onChangeText={(isCustId) => {
							setIsCustId(isCustId);
						}}
					/>
					<TextInput
						style={styles.fieldsStyles}
						placeholderTextColor="grey"
						placeholder="Customer Name"
						placeholderTextColor="#727272"
						underlineColor="grey"
						value={isCustName}
						onChangeText={(isCustName) => {
							setIsCustName(isCustName);
						}}
					/>
					<TextInput
						style={styles.fieldsStyles}
						placeholderTextColor="grey"
						placeholder="Mobile Number"
						keyboardType="number-pad"
						placeholderTextColor="#727272"
						underlineColor="grey"
						value={isCustMobile}
						onChangeText={(isCustMobile) => {
							setIsCustMobile(isCustMobile);
						}}
					/>
					<TextInput
						style={styles.fieldsStyles}
						placeholderTextColor="grey"
						placeholder="Alternate Mobile Number (optional)"
						keyboardType="number-pad"
						placeholderTextColor="#727272"
						underlineColor="grey"
					/>
					<TextInput
						style={styles.fieldsStyles}
						placeholderTextColor="grey"
						placeholder="City"
						placeholderTextColor="#727272"
						underlineColor="grey"
						value={isCity}
						onChangeText={(isCity) => {
							setIsCity(isCity);
						}}
					/>
					<TextInput
						style={[ styles.fieldsStyles, { height: 130, textAlignVertical: 'top' } ]}
						placeholderTextColor="grey"
						placeholder="Stiching Instructions (optional)"
						placeholderTextColor="#727272"
						underlineColor="grey"
						numberOfLines={4}
						multiline
						value={isInstructions}
						onChangeText={(isInstructions) => {
							setIsInstructions(isInstructions);
						}}
					/>

					<View style={{ flexDirection: 'row', paddingLeft: 30, marginBottom: 20 }}>
						<View style={{ flexDirection: 'row', alignItems: 'center' }}>
							<RadioButton
								value="first"
								color="#242424"
								status={isPay === 'Advance' ? 'checked' : 'unchecked'}
								onPress={() => setIsPay('Advance')}
							/>
							<Text style={styles.paymentType}>Advance</Text>
						</View>
						<View style={{ flexDirection: 'row', alignItems: 'center', paddingLeft: 30 }}>
							<RadioButton
								value="FullPayment"
								color="#242424"
								status={isPay === 'FullPayment' ? 'checked' : 'unchecked'}
								onPress={() => setIsPay('FullPayment')}
							/>
							<Text style={styles.paymentType}>Full Payment</Text>
						</View>
					</View>

					{isPay == 'Advance' ? (
						<View>
							<TextInput
								style={styles.fieldsStyles}
								placeholderTextColor="grey"
								placeholder="Advance Amount"
								keyboardType="number-pad"
								placeholderTextColor="#727272"
								underlineColor="grey"
								value={isAdvance}
								onChangeText={(isAdvance) => {
									setIsAdvance(isAdvance);
								}}
							/>
							<View>
								<Text style={[ styles.subheading, { paddingLeft: 20, paddingTop: 5 } ]}>
									Payment type :
								</Text>

								<View style={{ flexDirection: 'row', paddingLeft: 30, marginTop: 10 }}>
									<View style={{ flexDirection: 'row', alignItems: 'center' }}>
										<RadioButton
											value="first"
											color="#242424"
											status={checked === 'online' ? 'checked' : 'unchecked'}
											onPress={() => setChecked('online')}
										/>
										<Text style={styles.paymentType}>Online</Text>
									</View>
									<View style={{ flexDirection: 'row', alignItems: 'center', paddingLeft: 30 }}>
										<RadioButton
											value="offline"
											color="#242424"
											status={checked === 'offline' ? 'checked' : 'unchecked'}
											onPress={() => setChecked('offline')}
										/>
										<Text style={styles.paymentType}>Offline</Text>
									</View>
								</View>

								<Text style={[ styles.subheading, { paddingLeft: 20, paddingTop: 20 } ]}>
									Payment Proof
								</Text>
								<Text style={[ styles.miniheading, { paddingLeft: 20, color: '#ccc' } ]}>
									Take shot on payment screen (or) Payment Bill
								</Text>

								<View>
									{photocam == '' ? (
										<View style={styles.uploadBlock}>
											<AntDesign name="upload" size={30} />
											<Text style={[ styles.miniheading, { paddingTop: 10 } ]}>Upload Proof</Text>
										</View>
									) : (
										<Image source={{ uri: photocam }} style={styles.proofImg} />
									)}
									<FAB
										style={styles.fab}
										// disabled={isItems.length !== 0 ? false : true}
										color="#fff"
										icon="plus"
										onPress={handleChooseCamera}
									/>
								</View>
							</View>
						</View>
					) : null}

					{isPay == 'FullPayment' ? (
						<View>
							<TextInput
								style={styles.fieldsStyles}
								placeholderTextColor="grey"
								placeholder="Total Amount"
								keyboardType="number-pad"
								placeholderTextColor="#727272"
								underlineColor="grey"
								editable={false}
								value={isTotal.toString()}
							/>
							<View>
								<Text style={[ styles.subheading, { paddingLeft: 20, paddingTop: 5 } ]}>
									Payment type :
								</Text>

								<View style={{ flexDirection: 'row', paddingLeft: 30, marginTop: 10 }}>
									<View style={{ flexDirection: 'row', alignItems: 'center' }}>
										<RadioButton
											value="first"
											color="#242424"
											status={totalPayMode === 'online' ? 'checked' : 'unchecked'}
											onPress={() => setTotalPay('online')}
										/>
										<Text style={styles.paymentType}>Online</Text>
									</View>
									<View style={{ flexDirection: 'row', alignItems: 'center', paddingLeft: 30 }}>
										<RadioButton
											value="offline"
											color="#242424"
											status={totalPayMode === 'offline' ? 'checked' : 'unchecked'}
											onPress={() => setTotalPay('offline')}
										/>
										<Text style={styles.paymentType}>Offline</Text>
									</View>
								</View>

								<Text style={[ styles.subheading, { paddingLeft: 20, paddingTop: 20 } ]}>
									Payment Proof
								</Text>
								<Text style={[ styles.miniheading, { paddingLeft: 20, color: '#ccc' } ]}>
									Take shot on payment screen (or) Payment Bill
								</Text>

								<View>
									{totalPayProof == '' ? (
										<View style={styles.uploadBlock}>
											<AntDesign name="upload" size={30} />
											<Text style={[ styles.miniheading, { paddingTop: 10 } ]}>Upload Proof</Text>
										</View>
									) : (
										<Image source={{ uri: totalPayProof }} style={styles.proofImg} />
									)}
									<FAB
										style={styles.fab}
										// disabled={isItems.length !== 0 ? false : true}
										color="#fff"
										icon="plus"
										onPress={handleChooseCamera2}
									/>
								</View>
							</View>
						</View>
					) : null}

					<Button
						title="Continue"
						containerStyle={styles.buttonStyle}
						buttonStyle={styles.buttonTitle}
						disabled={!isCustId || !isCustName || !isCustMobile || !isCity || !isAdvance || !checked || !photocam ? true : false}
						titleStyle={{ fontFamily: 'JosefinSans-Medium' }}
						onPress={() => {
							openPanel();
							console.log('my order', orderDetails);
						}}
						// onPress={() => console.log('my order', orderDetails)}
					/>
				</ScrollView>
			</KeyboardAvoidingView>

			<SwipeablePanel
				style={{ height: 500, width: ScreenWidth - 15, backgroundColor: '#333333' }}
				{...panelProps}
				isActive={isPanelActive}
			>
				<Text style={styles.summary}>Order Summary</Text>
				<Divider style={{ borderBottomWidth: 1, borderBottomColor: '#ccc' }} />
				<Text style={styles.orderId}>
					Customer ID : <Text style={[ styles.orderId, { fontSize: 20 } ]}>{orderDetails.custId}</Text>
				</Text>
				<Text style={[ styles.selected, { paddingBottom: 10 } ]}>Item Details :</Text>

				{orderDetails.itemDetails.map((item, index) => {
					return (
						<View key={index} style={styles.itemBlock}>
							<Text style={styles.selected}>
								No of {item.name} x {item.quantity}
							</Text>
							<Text style={[ styles.selected, { paddingRight: 10 } ]}>
								{'\u20B9'} {item.quantity * item.price}
							</Text>
						</View>
					);
				})}

				<View style={styles.itemBlock}>
					<Text style={[ styles.selected, { fontSize: 18, color: '#ccc' } ]}>
						Total {orderDetails.itemDetails.length} Items
					</Text>
					{/* <Text style={[ styles.selected, { paddingRight: 10, fontSize: 20, color: '#ccc' } ]}>
						{'\u20B9'} {isTotal}
					</Text> */}
				</View>

				<Divider style={{ borderBottomWidth: 1, borderBottomColor: 'gray' }} />

				<View style={styles.itemBlock}>
					<Text style={[ styles.selected, { fontSize: 18, color: '#ccc' } ]}>Total Amount</Text>
					<Text style={[ styles.selected, { paddingRight: 10, fontSize: 20, color: '#ccc' } ]}>
						{'\u20B9'} {isTotal}
					</Text>
				</View>

				{isPay == 'FullPayment' ? (
					<View style={[ styles.itemBlock, { paddingBottom: 10, paddingTop: 0 } ]}>
						<Text style={[ styles.selected, { fontSize: 14 } ]}>Total Pay</Text>
						<Text style={[ styles.selected, { paddingRight: 10, fontSize: 14 } ]}>
							- {'\u20B9'} {isTotal}
						</Text>
					</View>
				) : (
					<View style={[ styles.itemBlock, { paddingBottom: 10, paddingTop: 0 } ]}>
						<Text style={[ styles.selected, { fontSize: 14 } ]}>Advance Pay</Text>
						<Text style={[ styles.selected, { paddingRight: 10, fontSize: 14 } ]}>
							- {'\u20B9'} {orderDetails.advance || 0}
						</Text>
					</View>
				)}

				<Divider style={{ borderBottomWidth: 1, borderBottomColor: 'gray' }} />

				<View style={styles.itemBlock}>
					<Text style={[ styles.selected, { fontSize: 18, color: '#ccc' } ]}>Amount Payable</Text>
					<Text style={[ styles.selected, { paddingRight: 10, fontSize: 20, color: '#ccc' } ]}>
						{'\u20B9'} {isPay == 'FullPayment' ? 0 : isTotal - orderDetails.advance}
					</Text>
				</View>

				<Text style={[ styles.selected, { fontSize: 13, color: '#ccc', paddingLeft: 25, paddingTop: 10 } ]}>
					Booking on {orderDetails.bookingDate}
				</Text>
				<Text style={[ styles.selected, { fontSize: 13, color: '#ccc', paddingLeft: 25, paddingTop: 10 } ]}>
					Delivery on {orderDetails.deliveryDate}
				</Text>

				<Button
					title="Proceed"
					containerStyle={styles.buttonStyle}
					buttonStyle={[ styles.buttonTitle, { backgroundColor: '#888' } ]}
					titleStyle={{ fontFamily: 'JosefinSans-Medium' }}
					onPress={() => {
						storeData();
						openPanel();
						navigation.navigate('OrderSuccess', { orderPlaced: orderDetails, totalAmt: isTotal });
					}}
					// onPress={storeData}
				/>
			</SwipeablePanel>
		</View>
	);
}

export default CustomerDetails;

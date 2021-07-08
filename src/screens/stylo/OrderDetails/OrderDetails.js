import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native';
import { Divider, RadioButton, FAB, ActivityIndicator } from 'react-native-paper';
import { Button, Overlay } from 'react-native-elements';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Octicons from 'react-native-vector-icons/Octicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import StepIndicator from 'react-native-step-indicator';
import firestore from '@react-native-firebase/firestore';
import pendingImage from '../../../../assets/stylo/pendingPayment.jpg';
import styles from './styles';
import CustomHeader from '../../../components/CustomHeader';
import LottieView from 'lottie-react-native';

const PENDING_IMAGE = Image.resolveAssetSource(pendingImage).uri;

const labels = [ 'PLACED', 'CUTTING', 'STICHING', 'READY', 'DELIVERY' ];

const customStyles = {
	stepIndicatorSize: 25,
	currentStepIndicatorSize: 30,
	separatorStrokeWidth: 2,
	currentStepStrokeWidth: 3,
	stepStrokeCurrentColor: '#242424',
	stepStrokeWidth: 3,
	stepStrokeFinishedColor: '#242424',
	stepStrokeUnFinishedColor: '#aaaaaa',
	separatorFinishedColor: '#242424',
	separatorUnFinishedColor: '#aaaaaa',
	stepIndicatorFinishedColor: '#242424',
	stepIndicatorUnFinishedColor: '#ffffff',
	stepIndicatorCurrentColor: '#ffffff',
	stepIndicatorLabelFontSize: 12,
	currentStepIndicatorLabelFontSize: 13,
	stepIndicatorLabelCurrentColor: '#242424',
	stepIndicatorLabelFinishedColor: '#ffffff',
	stepIndicatorLabelUnFinishedColor: '#aaaaaa',
	labelColor: '#999999',
	labelSize: 11,
	currentStepLabelColor: '#242424',
	labelFontFamily: 'JosefinSans-Medium'
};

function OrderDetails({ route, navigation }) {
	const [ isLoader, setLoader ] = useState(false);

	const [ checked, setChecked ] = React.useState('');
	const [ photocam, setPhotoCam ] = useState('');
	const [ visible, setVisible ] = useState(false);
	const [ isDelivery, setisDelivery ] = useState(false);
	const [ isImage, setIsImage ] = useState();
	const [ isStatus, setStatus ] = useState();

	const [ isOrderDetail, setOrderDetail ] = useState([]);
	const [ isItemDetail, setItemDetail ] = useState([]);
	const [ isClothDetail, setClothDetail ] = useState([]);
	const [ isMeasurDetail, setMeasurDetail ] = useState([]);

	useEffect(() => {
		console.log('id', route.params.orderId);

		const getData = async () => {
			setLoader(true);

			const user = await firestore().collection('MyOrders').doc(route.params.orderId).get();

			console.log('order data---->', user._data.orderDetails);
			setOrderDetail(user._data.orderDetails);

			console.log('item details---->', user._data.orderDetails.itemDetails);
			setItemDetail(user._data.orderDetails.itemDetails);

			console.log('mesurment Details ---->', user._data.orderDetails.mesurmentDetails);
			setMeasurDetail(user._data.orderDetails.mesurmentDetails);

			console.log('clothes Details---->', user._data.orderDetails.clothesDetails);
			setClothDetail(user._data.orderDetails.clothesDetails);

			showStatus(user._data.orderDetails.orderStatus);
			console.log('status', user._data.orderDetails.orderStatus);
			setLoader(false);
		};

		const showStatus = (status) => {
			console.log('get', status);
			if (status == 'PLACED') {
				setStatus(1);
			} else if (status == 'CUTTING') {
				setStatus(2);
			} else if (status == 'STICHING') {
				setStatus(3);
			} else if (status == 'READY') {
				setStatus(4);
			} else if (status == 'DELIVERY') {
				setStatus(5);
			}
		};

		getData();
	}, []);

	const completePayment = async () => {
		const user = await firestore()
			.collection('MyOrders')
			.doc(isOrderDetail.custId)
			.update({
				'orderDetails.orderStatus': 'DELIVERIED',
				'orderDetails.balanacePayMode': checked,
				'orderDetails.balanacePayProof': photocam,
				'orderDetails.paymentStatus': 'PAID'
			})
			.then(() => {
				console.log('updated succesfully');
				registerSuccess();
			});
	};

	const deliveryOrder = async () => {
		const user = await firestore()
			.collection('MyOrders')
			.doc(isOrderDetail.custId)
			.update({
				'orderDetails.orderStatus': 'DELIVERIED'
			})
			.then(() => {
				console.log('updated succesfully');
				registerSuccess();
			});
	};

	const registerSuccess = () => {
		setisDelivery(true);
		setTimeout(() => {
			setisDelivery(false);
			navigation.goBack();
		}, 3000);
	};

	const toggleOverlay = (imgUrl) => {
		setIsImage(imgUrl);
		setVisible(!visible);
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
	return (
		<View style={styles.container}>
			<CustomHeader title="Order Detail" />

			{isLoader ? (
				<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
					<ActivityIndicator
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
				<View style={{ flex: 1 }}>
					<ScrollView>
						<View style={styles.statusContainer}>
							<Text style={[ styles.heading, { padding: 10 } ]}>Order Status</Text>
							<StepIndicator customStyles={customStyles} currentPosition={isStatus} labels={labels} />

							<View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 15 }}>
								<Text style={styles.subheading}>Booking : {isOrderDetail.bookingDate}</Text>
								<Text style={styles.subheading}>Delivery : {isOrderDetail.deliveryDate}</Text>
							</View>
						</View>

						<Text style={[ styles.heading, { paddingLeft: 15, paddingBottom: 10 } ]}>Order Summary</Text>
						<Divider />

						<View style={styles.detailBlock}>
							<Text style={styles.heading}>{isOrderDetail.custName}</Text>
							<Text style={styles.subheading}>Order Id : {isOrderDetail.custId}</Text>
						</View>

						<View style={{ flexDirection: 'row', marginLeft: 15, paddingTop: 3 }}>
							<View style={{ flexDirection: 'row', alignItems: 'center' }}>
								<EvilIcons name="location" size={17} />
								<Text style={styles.miniheading}>{isOrderDetail.city}</Text>
							</View>
							<View style={{ flexDirection: 'row', alignItems: 'center' }}>
								<Ionicons name="call-outline" size={12} style={{ paddingLeft: 10, paddingTop: 2 }} />
								<Text style={styles.miniheading}>{isOrderDetail.mobile}</Text>
							</View>
						</View>

						<Text style={[ styles.subheading, { padding: 15 } ]}>ITEMS ORDERED</Text>
						<Divider style={{ marginBottom: 10, marginTop: -5 }} />
						{isItemDetail.map((item, index) => {
							return (
								<View key={index} style={styles.itemBlock}>
									<View style={{ flexDirection: 'row' }}>
										<Octicons
											name="primitive-square"
											size={18}
											color="#03C04A"
											style={{ paddingTop: 4 }}
										/>
										<View style={{ paddingLeft: 15 }}>
											<Text style={styles.heading}>{item.name}</Text>
											<Text style={styles.heading}>
												{item.quantity} x {'\u20B9'} {item.price}
											</Text>
										</View>
									</View>
									<Text style={styles.heading}>
										{'\u20B9'} {item.quantity * item.price}
									</Text>
								</View>
							);
						})}
						<Divider style={{ marginBottom: 5 }} />

						<View style={styles.amountBlock}>
							<Text style={styles.heading}>Total Amount</Text>
							<Text style={styles.heading}>
								{'\u20B9'} {isOrderDetail.totalAmount}
							</Text>
						</View>

						{isOrderDetail.advancePayment ? (
							<View style={styles.amountBlock}>
								<Text style={styles.subheading}>Advance</Text>
								<Text style={styles.subheading}>
									_{'\u20B9'} {isOrderDetail.advance || 0}
								</Text>
							</View>
						) : (
							<View style={styles.amountBlock}>
								<Text style={styles.subheading}>Total Paid</Text>
								<Text style={styles.subheading}>
									_{'\u20B9'} {isOrderDetail.totalAmount}
								</Text>
							</View>
						)}

						<Divider style={{ marginVertical: 5 }} />

						<View style={styles.amountBlock}>
							<Text style={styles.heading}>Balance</Text>
							<Text style={styles.heading}>
								{'\u20B9'}{' '}
								{isOrderDetail.advancePayment ? isOrderDetail.totalAmount - isOrderDetail.advance : 0}
							</Text>
						</View>

						<Text style={[ styles.subheading, { paddingLeft: 15, paddingTop: 30 } ]}>ITEM IMAGES</Text>
						<Divider style={{ marginTop: 8 }} />

						<Text style={styles.imageTitle}>Clothes Images</Text>

						<View style={{ flexDirection: 'row', marginLeft: 20, marginTop: 10 }}>
							{isClothDetail.map((item, index) => {
								return (
									<TouchableOpacity key={index} onPress={() => toggleOverlay(item.images)}>
										<Image
											source={{
												uri: item.images
											}}
											style={{ height: 60, width: 60, borderRadius: 10, marginRight: 15 }}
										/>
									</TouchableOpacity>
								);
							})}
						</View>

						<Text style={styles.imageTitle}>Measurment Images</Text>
						<View style={{ flexDirection: 'row', marginLeft: 20, marginTop: 10 }}>
							{isMeasurDetail.map((item, index) => {
								return (
									<TouchableOpacity key={index} onPress={() => toggleOverlay(item.images)}>
										<Image
											source={{
												uri: item.images
											}}
											style={{ height: 60, width: 60, borderRadius: 10, marginRight: 15 }}
										/>
									</TouchableOpacity>
								);
							})}
						</View>

						<Text style={[ styles.subheading, { paddingLeft: 15, paddingTop: 30 } ]}>
							STICHING INSTRUCTIONS
						</Text>
						<Divider style={{ marginTop: 8 }} />
						{isOrderDetail.instructions == '' ? (
							<Text
								style={{
									textAlign: 'center',
									paddingTop: 10,
									fontFamily: 'JosefinSans-Medium',
									color: '#ccc',
									lineHeight: 20
								}}
							>
								No Instructions
							</Text>
						) : (
							<Text
								style={{
									paddingLeft: 15,
									paddingTop: 10,
									fontFamily: 'JosefinSans-Medium',
									color: '#242424',
									lineHeight: 20
								}}
							>
								{isOrderDetail.instructions}
							</Text>
						)}

						<View style={{ flexDirection: 'row', paddingTop: 20, justifyContent: 'space-between' }}>
							<Text style={[ styles.subheading, { paddingLeft: 15 } ]}>PAYMENT DETAILS</Text>
							<Text
								style={[
									styles.subheading,
									{
										paddingRight: 20,
										color: isOrderDetail.paymentStatus == 'PENDING' ? 'red' : 'green'
									}
								]}
							>
								{isOrderDetail.paymentStatus}
							</Text>
						</View>
						<Divider style={{ marginTop: 8 }} />

						{isOrderDetail.fullPayment ? null : (
							<View>
								<Text style={[ styles.subheading, { paddingLeft: 20, paddingTop: 5 } ]}>
									Advance Payment Type : {isOrderDetail.advancePaymentMode}
								</Text>

								<Text style={[ styles.subheading, { paddingLeft: 20, paddingTop: 5 } ]}>
									Advance Proof :{' '}
								</Text>

								<TouchableOpacity onPress={() => toggleOverlay(isOrderDetail.advanceProof)}>
									<Image
										source={{
											uri: isOrderDetail.advanceProof
										}}
										style={{
											height: 100,
											width: 100,
											borderRadius: 10,
											marginLeft: 20,
											marginTop: 15
										}}
									/>
								</TouchableOpacity>

								<Divider style={{ marginTop: 8 }} />
							</View>
						)}

						{isOrderDetail.orderStatus == 'DELIVERIED' && isOrderDetail.advancePayment == true ? (
							<View>
								<Text style={[ styles.subheading, { paddingLeft: 20, paddingTop: 5 } ]}>
									Balance Payment Type : {isOrderDetail.balanacePayMode}
								</Text>

								<Text style={[ styles.subheading, { paddingLeft: 20, paddingTop: 5 } ]}>
									Balance Proof :
								</Text>

								<TouchableOpacity onPress={() => toggleOverlay(isOrderDetail.balanacePayProof)}>
									<Image
										source={{
											uri: isOrderDetail.balanacePayProof
										}}
										style={{
											height: 100,
											width: 100,
											borderRadius: 10,
											marginLeft: 20,
											marginTop: 15
										}}
									/>
								</TouchableOpacity>

								<Divider style={{ marginTop: 8 }} />
							</View>
						) : null}

						{/* --------------- */}

						{isOrderDetail.paymentStatus == 'PENDING' && isOrderDetail.orderStatus == 'DELIVERY' ? (
							<View>
								<View style={{ flexDirection: 'row', alignItems: 'center', paddingTop: 20 }}>
									<Text style={[ styles.subheading, { paddingLeft: 20 } ]}>BALANCE AMOUNT :</Text>
									<Text
										style={[ styles.subheading, { paddingLeft: 10, fontSize: 18, color: '#000' } ]}
									>
										{isOrderDetail.totalAmount - isOrderDetail.advance}
									</Text>
								</View>
								<Text style={[ styles.subheading, { paddingLeft: 20, paddingTop: 10 } ]}>
									Balance payment type :
								</Text>

								<View style={{ flexDirection: 'row', paddingLeft: 30, marginTop: 10 }}>
									<View style={{ flexDirection: 'row', alignItems: 'center' }}>
										<RadioButton
											value="first"
											color="#242424"
											status={checked === 'online' ? 'checked' : 'unchecked'}
											onPress={() => setChecked('online')}
										/>
										<Text style={styles.heading}>Online</Text>
									</View>
									<View style={{ flexDirection: 'row', alignItems: 'center', paddingLeft: 30 }}>
										<RadioButton
											value="offline"
											color="#242424"
											status={checked === 'offline' ? 'checked' : 'unchecked'}
											onPress={() => setChecked('offline')}
										/>
										<Text style={styles.heading}>Offline</Text>
									</View>
								</View>

								<Text style={[ styles.subheading, { paddingLeft: 20 } ]}>SUBMIT PAYMENT PROOF</Text>
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

								<Button
									title="Delivery Order"
									disabled={photocam != '' ? false : true}
									containerStyle={styles.buttonStyle}
									buttonStyle={styles.buttonTitle}
									titleStyle={{ fontFamily: 'JosefinSans-Medium' }}
									onPress={completePayment}
								/>
							</View>
						) : null}

						{isOrderDetail.fullPayment ? (
							<View>
								<Text style={[ styles.subheading, { paddingLeft: 20, paddingTop: 10 } ]}>
									Payment Proof :
								</Text>
								<TouchableOpacity
									onPress={() => toggleOverlay(isOrderDetail.fullPaymentProof || PENDING_IMAGE)}
								>
									<Image
										source={{
											uri: isOrderDetail.fullPaymentProof || PENDING_IMAGE
										}}
										style={styles.proofImg}
									/>
								</TouchableOpacity>

								{isOrderDetail.orderStatus == 'DELIVERIED' ? null : (
									<Button
										title="Delivery Order"
										containerStyle={styles.buttonStyle}
										buttonStyle={styles.buttonTitle}
										titleStyle={{ fontFamily: 'JosefinSans-Medium' }}
										onPress={deliveryOrder}
									/>
								)}
							</View>
						) : null}
					</ScrollView>

					<Overlay isVisible={visible} overlayStyle={styles.overlay} onBackdropPress={() => setVisible(true)}>
						<Image
							source={{
								uri: isImage
							}}
							style={{
								flex: 1,
								height: null,
								width: null,
								borderRadius: 15,
								opacity: 0.8
							}}
						/>
						<View style={{ position: 'absolute', top: 20, right: 20 }}>
							<AntDesign name="close" size={25} onPress={() => toggleOverlay('')} />
						</View>
					</Overlay>

					<Overlay
						isVisible={isDelivery}
						backdropStyle={{ backgroundColor: '#242424', opacity: 0.9 }}
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
							<Text style={[ styles.heading, { paddingLeft: 0 } ]}>Deliveried Successful</Text>
						</View>
					</Overlay>
				</View>
			)}
		</View>
	);
}

export default OrderDetails;

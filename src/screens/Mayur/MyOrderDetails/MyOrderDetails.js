import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity, Dimensions } from 'react-native';
import { Divider, RadioButton, FAB } from 'react-native-paper';
import { Button, Overlay } from 'react-native-elements';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Octicons from 'react-native-vector-icons/Octicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import StepIndicator from 'react-native-step-indicator';
import firestore from '@react-native-firebase/firestore';

import styles from './styles';
import CustomHeader from '../../../components/CustomHeader';
const ScreenWidth = Dimensions.get('window').width;

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

const statusNames = [
	{
		name: 'PLACED',
		id: 1
	},
	{
		name: 'CUTTING',
		id: 2
	},
	{
		name: 'STICHING',
		id: 3
	},
	{
		name: 'READY',
		id: 4
	},
	{
		name: 'DELIVERY',
		id: 5
	}
];

function MyOrderDetails({ route }) {
	const [ isLoader, setLoader ] = useState(false);

	const [ checked, setChecked ] = React.useState('');
	const [ photocam, setPhotoCam ] = useState('');
	const [ visible, setVisible ] = useState(false);
	const [ statusVisible, setStatusVisible ] = useState(false);
	const [ isImage, setIsImage ] = useState();
	const [ statusPos, setStatusPos ] = useState(1);

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
			if (status == 'PLACED') {
				setStatusPos(1);
			} else if (status == 'CUTTING') {
				setStatusPos(2);
			} else if (status == 'STICHING') {
				setStatusPos(3);
			} else if (status == 'READY') {
				setStatusPos(4);
			} else if (status == 'DELIVERY') {
				setStatusPos(5);
			}
		};

		getData();
	}, []);

	const toggleOverlay = (imgUrl) => {
		setIsImage(imgUrl);
		setVisible(!visible);
	};

	const toggleStatusOverlay = () => {
		// setIsImage(imgUrl);
		setStatusVisible(!statusVisible);
	};

	const updateStateVal = async (statusName) => {
		console.log('name', statusName);

		const user = await firestore()
			.collection('MyOrders')
			.doc(route.params.orderId)
			.update({
				'orderDetails.orderStatus': statusName
			})
			.then(() => {
				console.log('updated succesfully');
			});
	};

	const changeStatus = (statusName) => {
		if (statusName == 'PLACED') {
			setStatusPos(1);
			toggleStatusOverlay();
		} else if (statusName == 'CUTTING') {
			setStatusPos(2);
			toggleStatusOverlay();
		} else if (statusName == 'STICHING') {
			setStatusPos(3);
			toggleStatusOverlay();
		} else if (statusName == 'READY') {
			setStatusPos(4);
			toggleStatusOverlay();
		} else if (statusName == 'DELIVERY') {
			setStatusPos(5);
			toggleStatusOverlay();
		}
	};

	return (
		<View style={styles.container}>
			<CustomHeader title="Order Detail" />
			<ScrollView>
				<View style={styles.statusContainer}>
					<Text style={[ styles.heading, { padding: 10 } ]}>Order Status</Text>
					<StepIndicator customStyles={customStyles} currentPosition={statusPos} labels={labels} />

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

				{/* ----------item details ----------- */}

				<Text style={[ styles.subheading, { padding: 15 } ]}>ITEMS ORDERED</Text>
				<Divider style={{ marginBottom: 10, marginTop: -5 }} />

				{isItemDetail.map((item, index) => {
					return (
						<View key={index} style={styles.itemBlock}>
							<View style={{ flexDirection: 'row' }}>
								<Octicons name="primitive-square" size={18} color="#03C04A" style={{ paddingTop: 4 }} />
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
					<Text style={styles.heading}>Grand Total</Text>
					<Text style={styles.heading}>
						{'\u20B9'}{' '}
						{isOrderDetail.advancePayment ? isOrderDetail.totalAmount - isOrderDetail.advance : 0}
					</Text>
				</View>

				{/* ------------item images------------- */}

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

				<Text style={[ styles.subheading, { paddingLeft: 15, paddingTop: 30 } ]}>STICHING INSTRUCTIONS</Text>
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

				{/* -------------PAYMENT DEATILS------------------ */}

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

				{/* -----------Checking for payment status------------ */}

				{isOrderDetail.paymentStatus == 'PAID' ? (
					<View>
						<View>
							<Text style={[ styles.subheading, { paddingLeft: 20, paddingTop: 5 } ]}>
								Payment Type : {isOrderDetail.fullPaymentMode}
							</Text>

							<Text style={[ styles.subheading, { paddingLeft: 20, paddingTop: 5 } ]}>
								Payment Proof :{' '}
							</Text>
						</View>

						<View>
							<TouchableOpacity onPress={() => toggleOverlay(isOrderDetail.fullPaymentProof)}>
								<Image
									source={{
										uri: isOrderDetail.fullPaymentProof
									}}
									style={styles.proofImg}
								/>
							</TouchableOpacity>
						</View>
					</View>
				) : (
					<View>
						<View>
							<Text style={[ styles.subheading, { paddingLeft: 20, paddingTop: 5 } ]}>
								Advance Payment Type : {isOrderDetail.advancePaymentMode}
							</Text>

							<Text style={[ styles.subheading, { paddingLeft: 20, paddingTop: 5 } ]}>
								Advance Proof :
							</Text>
						</View>

						<View>
							<TouchableOpacity onPress={() => toggleOverlay(isOrderDetail.advanceProof)}>
								<Image
									source={{
										uri: isOrderDetail.advanceProof
									}}
									style={styles.proofImg}
								/>
							</TouchableOpacity>
						</View>
					</View>
				)}

				{isOrderDetail.paymentStatus == 'DELIVERY' ? null : (
					<Button
						title="Change Order Status"
						containerStyle={styles.buttonStyle}
						buttonStyle={styles.buttonTitle}
						titleStyle={{ fontFamily: 'JosefinSans-Medium' }}
						onPress={toggleStatusOverlay}
					/>
				)}
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
				isVisible={statusVisible}
				overlayStyle={styles.statusOverlay}
				onBackdropPress={() => setStatusVisible(!statusVisible)}
			>
				<Text style={styles.statusHeading}>Change Your Order Status</Text>
				<Divider style={{ marginBottom: 10 }} />

				{statusNames.map((status, index) => {
					return (
						<TouchableOpacity
							onPress={() => {
								changeStatus(status.name);
								updateStateVal(status.name);
							}}
							key={index}
							style={statusPos == status.id ? styles.statusButton : styles.statusButton2}
						>
							<Text style={statusPos == status.id ? styles.statusTitle : styles.statusTitle2}>
								{status.name}
							</Text>
						</TouchableOpacity>
					);
				})}
			</Overlay>
		</View>
	);
}

export default MyOrderDetails;

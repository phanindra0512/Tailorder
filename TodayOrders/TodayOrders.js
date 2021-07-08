import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Divider, ActivityIndicator } from 'react-native-paper';
import Feather from 'react-native-vector-icons/Feather';
import styles from './styles';
import CustomHeader from '../../../components/CustomHeader';
import firestore from '@react-native-firebase/firestore';
import moment from 'moment';

function TodayOrders({ navigation }) {
	const [ isLoader, setLoader ] = useState(false);
	const [ isMyOrders, setMyOrders ] = useState([]);

	useEffect(() => {
		const todayOrders = async () => {
			setLoader(true);
			const user = await firestore().collection('MyOrders').get();
			const data = user._docs.map((docs) => docs._data);

			const currentDate = moment(new Date()).format('ll');

			const dateByData = data.filter((d) => {
				return d.orderDetails.bookingDate == currentDate;
			});
			console.log(dateByData);

			setMyOrders(dateByData);
			setLoader(false);
		};
		todayOrders();
	}, []);
	return (
		<View style={styles.container}>
			<CustomHeader title="Orders" />
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
						<View>
							<Text style={styles.today}>Today Orders : {isMyOrders.length}</Text>

							{isMyOrders.map((orderItem, index) => {
								return (
									<View key={index} style={{ marginBottom: 20 }}>
										<View style={styles.orderContainer}>
											<View style={styles.detailBlock}>
												<View>
													<Text numberOfLines={1} style={[ styles.heading, { width: 170 } ]}>
														{orderItem.orderDetails.custName}
													</Text>
													<Text style={styles.subheading}>
														Order Id : {orderItem.orderDetails.custId}
													</Text>
												</View>
												<View>
													<Text
														style={[
															styles.subheading,
															{ color: '#242424', fontSize: 17 }
														]}
													>
														{'\u20B9'} {orderItem.orderDetails.totalAmount}
													</Text>
												</View>
											</View>
											<Text style={styles.miniText}>ITEMS</Text>
											<View style={{ flexDirection: 'row', paddingLeft: 13 }}>
												{orderItem.orderDetails.itemDetails.map((item, index) => {
													return (
														<Text
															key={index}
															style={[
																styles.miniText,
																{ color: '#242424', paddingLeft: 2 }
															]}
														>
															{item.quantity} x {item.name} ,
														</Text>
													);
												})}
											</View>

											<View style={{ flexDirection: 'row', paddingVertical: 10 }}>
												<View style={styles.statusBlock}>
													<Text style={styles.caption}>Order Date</Text>
													<Text style={[ styles.caption, { color: '#242424' } ]}>
														{orderItem.orderDetails.bookingDate}
													</Text>
												</View>
												<View style={styles.statusBlock}>
													<Text style={styles.caption}>Delivery Date</Text>
													<Text style={[ styles.caption, { color: '#242424' } ]}>
														{orderItem.orderDetails.deliveryDate}
													</Text>
												</View>
												<View style={[ styles.statusBlock, { borderRightWidth: 0 } ]}>
													<Text style={styles.caption}>Status</Text>
													<Text style={styles.caption}>
														{orderItem.orderDetails.orderStatus}
													</Text>
												</View>
											</View>
										</View>
										<TouchableOpacity
											activeOpacity={0.6}
											onPress={() =>
												navigation.navigate('OrderDetails', {
													paymentStatus: 'Not Paid',
													orderId: orderItem.orderDetails.custId
												})}
											style={styles.viewDetails}
										>
											<Text style={[ styles.subheading, { color: '#fff' } ]}>View Details</Text>
										</TouchableOpacity>
									</View>
								);
							})}

							{isMyOrders.length == 0 && (
								<View style={{ height: 250, alignItems: 'center', justifyContent: 'center' }}>
									<Text style={styles.noOrders}>No orders Today</Text>
								</View>
							)}
						</View>
					</ScrollView>
				</View>
			)}
		</View>
	);
}

export default TodayOrders;

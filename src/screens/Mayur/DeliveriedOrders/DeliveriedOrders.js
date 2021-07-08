import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Searchbar, Divider, ActivityIndicator } from 'react-native-paper';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import CalendarPicker from 'react-native-calendar-picker';
import moment from 'moment';
import firestore from '@react-native-firebase/firestore';

import styles from './styles';
import CustomHeader from '../../../components/CustomHeader';

const myOrders = [
	{
		custName: 'U.Sai Phanindra',
		OrderId: 'A501',
		total: 1200,
		items: [
			{
				itemName: 'Shirts',
				itemCount: 2
			},
			{
				itemName: 'Pants',
				itemCount: 2
			},
			{
				itemName: 'Suit',
				itemCount: 1
			}
		],
		orderDate: '24/04/2021',
		deliveryDate: '30/04/2021',
		orderStatus: 'PLACED'
	},
	{
		custName: 'T.Himavants',
		OrderId: 'A502',
		total: 1500,
		items: [
			{
				itemName: 'Shirts',
				itemCount: 1
			},

			{
				itemName: 'Suit',
				itemCount: 1
			}
		],
		orderDate: '25/04/2021',
		deliveryDate: '31/04/2021',
		orderStatus: 'PLACED'
	},
	{
		custName: 'D.sai',
		OrderId: 'A503',
		total: 1350,
		items: [
			{
				itemName: 'Shirts',
				itemCount: 2
			},
			{
				itemName: 'Pants',
				itemCount: 2
			}
		],
		orderDate: '27/04/2021',
		deliveryDate: '30/04/2021',
		orderStatus: 'PLACED'
	},
	{
		custName: 'D.sai',
		OrderId: 'A503',
		total: 1350,
		items: [
			{
				itemName: 'Shirts',
				itemCount: 2
			},
			{
				itemName: 'Pants',
				itemCount: 2
			}
		],
		orderDate: '27/04/2021',
		deliveryDate: '30/04/2021',
		orderStatus: 'PLACED'
	},
	{
		custName: 'D.sai',
		OrderId: 'A503',
		total: 1350,
		items: [
			{
				itemName: 'Shirts',
				itemCount: 2
			},
			{
				itemName: 'Pants',
				itemCount: 2
			}
		],
		orderDate: '27/04/2021',
		deliveryDate: '30/04/2021',
		orderStatus: 'PLACED'
	}
];
function DeliveriedOrders({ navigation }) {
	const [ isLoader, setLoader ] = useState(false);

	const [ searchQuery, setSearchQuery ] = useState('');
	const [ isDateSelect, setIsDateSelect ] = useState();
	const [ isShow, setIsShow ] = useState(false);
	const [ dateVis, setIsDateVis ] = useState(false);

	const [ isOrders, setIsOrders ] = useState([]);
	const [ isSearchOrders, setIsSearchOrders ] = useState([]);

	useEffect(() => {
		const todayOrders = async () => {
			setLoader(true);

			const user = await firestore().collection('MyOrders').get();

			//here i m getting data will be in separate obj and id's will be separate obj,
			// we will combine that using assign method below
			const data = user._docs.map((docs) => docs._data);
			const orders = data.reverse();
			const orderByStatus = orders.filter((d) => {
				return d.orderDetails.orderStatus == 'DELIVERY';
			});
			console.log(orderByStatus.length);
			setIsOrders(orderByStatus);
			setIsSearchOrders(orderByStatus);
			// console.log('view orders ---->', data);
			setLoader(false);
		};
		todayOrders();
	}, []);

	const onChangeSearch = (text) => {
		setIsSearchOrders(isOrders.filter((i) => i.orderDetails.custId.toLowerCase().includes(text.toLowerCase())));
	};

	const onDateChange = (selected) => {
		const currentDate = moment(selected).format('ll');
		setIsDateSelect(selected);
		const dateByData = isOrders.filter((i) => {
			return i.orderDetails.bookingDate == currentDate;
		});
		console.log(dateByData);
		setIsSearchOrders(dateByData);
		setTimeout(() => {
			setIsShow(false);
		}, 1000);
		setIsDateVis(true);
	};

	return (
		<View style={styles.container}>
			<CustomHeader title="Deliveried Orders" />
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
					<ScrollView style={{ flex: 1 }}>
						<View>
							<Searchbar
								placeholder="Search By Order ID"
								placeholderTextColor="#8F9BB3"
								onChangeText={(text) => {
									onChangeSearch(text);
									setSearchQuery(text);
								}}
								// value={searchQuery}
								icon={() => <Feather name="search" size={20} color="#C5CEE0" />}
								inputStyle={{ fontSize: 16, color: '#242424', fontFamily: 'JosefinSans-Medium' }}
								style={styles.searchStyle}
							/>

							<TouchableOpacity
								activeOpacity={0.7}
								onPress={() => setIsShow(!isShow)}
								style={styles.filterBlock}
							>
								<FontAwesome5 name="sort-amount-down-alt" size={16} color="#505050" />
								<Text style={styles.caption}>Sort By Date</Text>
							</TouchableOpacity>

							{isShow ? (
								<View style={{ marginBottom: 20 }}>
									<CalendarPicker
										onDateChange={onDateChange}
										previousTitleStyle={{ fontFamily: 'JosefinSans-Medium', color: '#707070' }}
										nextTitleStyle={{ fontFamily: 'JosefinSans-Medium', color: '#707070' }}
										textStyle={{ fontFamily: 'JosefinSans-Medium' }}
									/>
								</View>
							) : null}

							{dateVis ? (
								<View
									style={{
										flexDirection: 'row',
										alignItems: 'center',
										justifyContent: 'space-between',
										paddingHorizontal: 20,
										paddingBottom: 15
									}}
								>
									<Text style={[ styles.heading, { fontSize: 18 } ]}>
										Orders in{moment(isDateSelect).format('ll')}
									</Text>
									<TouchableOpacity
										onPress={() => {
											setIsDateVis(false);
											setIsSearchOrders(isOrders);
										}}
									>
										<Text style={[ styles.subheading, { color: '#2E8BFA' } ]}>View All</Text>
									</TouchableOpacity>
								</View>
							) : null}

							{isSearchOrders.map((orderItem, index) => {
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
												navigation.navigate('MyOrderDetails', {
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

							{isSearchOrders.length == 0 && (
								<View style={{ height: 200, alignItems: 'center', justifyContent: 'center' }}>
									<Text style={styles.caption}>No Orders Found . . .</Text>
								</View>
							)}
						</View>
					</ScrollView>
				</View>
			)}
		</View>
	);
}

export default DeliveriedOrders;

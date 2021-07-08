import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Searchbar, Divider } from 'react-native-paper';
import Feather from 'react-native-vector-icons/Feather';
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

function CheckStatus({ navigation }) {
	const [ searchQuery, setSearchQuery ] = useState('');

	const [ isOrders, setIsOrders ] = useState([]);
	const [ isSearchOrders, setIsSearchOrders ] = useState([]);

	useEffect(() => {
		const todayOrders = async () => {
			const user = await firestore().collection('MyOrders').get();

			//here i m getting data will be in separate obj and id's will be separate obj,
			// we will combine that using assign method below
			const data = user._docs.map((docs) => docs._data);
			setIsOrders(data);
			setIsSearchOrders(data);
			console.log('view orders ---->', data);
		};
		todayOrders();
	}, []);

	const onChangeSearch = (text) => {
		setIsSearchOrders(isOrders.filter((i) => i.orderDetails.custId.toLowerCase().includes(text.toLowerCase())));
	};

	return (
		<View style={styles.container}>
			<CustomHeader title="Check Status" />
			<ScrollView>
				<Searchbar
					placeholder="Search By Order ID"
					placeholderTextColor="#8F9BB3"
					onChangeText={(text) => {
						onChangeSearch(text);
						setSearchQuery(text);
					}}
					autoFocus={true}
					// value={searchQuery}
					icon={() => <Feather name="search" size={20} color="#C5CEE0" />}
					inputStyle={{ fontSize: 16, color: '#242424', fontFamily: 'JosefinSans-Medium' }}
					style={styles.searchStyle}
				/>

				{searchQuery != '' ? (
					<View>
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
												<Text style={[ styles.subheading, { color: '#242424', fontSize: 17 } ]}>
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
												<Text style={styles.caption}>{orderItem.orderDetails.orderStatus}</Text>
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
					</View>
				) : null}

				{isSearchOrders.length == 0 && (
					<View style={{ height: 200, alignItems: 'center', justifyContent: 'center' }}>
						<Text style={styles.caption}>Order ID not found . . .</Text>
					</View>
				)}
			</ScrollView>
		</View>
	);
}

export default CheckStatus;

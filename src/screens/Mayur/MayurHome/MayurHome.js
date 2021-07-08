import React from 'react';
import { View, Text, Dimensions, Image, FlatList, TouchableOpacity, ScrollView } from 'react-native';
import styles from './styles';
import { Header } from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';
import Feather from 'react-native-vector-icons/Feather';

const ScreenWidth = Dimensions.get('window').width;

const ScreenHeight = Dimensions.get('window').height;

const categories = [
	{
		catImage: require('../../../../assets/mayur/viewOrders.jpg'),
		catname: 'View Orders'
	},
	{
		catImage: require('../../../../assets/mayur/processing.jpg'),
		catname: 'Processing Orders'
	},
	{
		catImage: require('../../../../assets/mayur/completed.png'),
		catname: 'Completed Orders'
	},
	{
		catImage: require('../../../../assets/mayur/deliveried.jpg'),
		catname: 'Deliveried'
	},
	{
		catImage: require('../../../../assets/mayur/deliveried.jpg'),
		catname: 'Completed Payments'
	},
	{
		catImage: require('../../../../assets/mayur/checkStatus.jpg'),
		catname: 'Check Status'
	}
];

function MayurHome({ navigation }) {
	const numColumns = 2;

	const changeScreen = (name) => {
		if (name === 'View Orders') {
			navigation.navigate('MyOrders');
		} else if (name === 'Processing Orders') {
			navigation.navigate('ProcessingOrders');
		} else if (name === 'Completed Orders') {
			navigation.navigate('CompletedOrders');
		} else if (name === 'Deliveried') {
			navigation.navigate('DeliveriedOrders');
		} else if (name === 'Completed Payments') {
			navigation.navigate('PaymentComplete');
		} else if (name === 'Check Status') {
			navigation.navigate('CheckStatusMayur');
		}
	};

	const renderItems = ({ item, index }) => {
		return (
			<TouchableOpacity
				onPress={() => changeScreen(item.catname)}
				style={[ styles.catBlock, { width: ScreenWidth / numColumns - 50 } ]}
			>
				<Image
					source={item.catImage}
					style={{ width: 80, height: 80, borderRadius: 100, alignSelf: 'center', marginTop: 10 }}
				/>

				<Text numberOfLines={2} style={styles.catName}>
					{item.catname}
				</Text>
			</TouchableOpacity>
		);
	};

	return (
		<ScrollView style={{ flex: 1, backgroundColor: '#fff' }}>
			<View style={styles.container}>
				<View
					style={{
						transform: [ { scaleX: 2 } ],
						borderBottomStartRadius: 200,
						borderBottomEndRadius: 200,
						overflow: 'hidden'
					}}
				>
					<Header
						ViewComponent={LinearGradient}
						barStyle="light-content"
						statusBarProps={{ backgroundColor: '#888' }}
						containerStyle={{
							opacity: 0.9,
							height: 200,
							width: ScreenWidth,
							transform: [ { scaleX: 0.5 } ]
						}}
						linearGradientProps={{
							colors: [ '#090909', '#656664' ],
							start: { x: 0, y: 0.3 },
							end: { x: 1, y: 0.2 }
						}}
						centerComponent={() => (
							<View style={{}}>
								<Text
									style={{
										fontSize: 35,
										color: '#fff',
										fontFamily: 'JosefinSans-Bold'
									}}
								>
									MA<Text style={{ color: 'red', fontSize: 45 }}>Y</Text>
									<Text>UR</Text>
								</Text>
								<Text
									style={{
										fontSize: 20,
										color: '#ccc',
										fontFamily: 'Satisfy-Regular',
										marginTop: -10,
										textAlign: 'right'
									}}
								>
									tailors
								</Text>
							</View>
						)}
					/>
				</View>

				<View style={styles.imgBlock}>
					<Image
						source={require('../../../../assets/splash_bg.jpg')}
						style={{ width: 70, height: 70, borderRadius: 100 }}
					/>
				</View>

				<Text style={styles.categories}>Categories</Text>
				<FlatList
					data={categories}
					keyExtractor={(item, index) => index.toString()}
					style={{ width: ScreenWidth - 40, alignSelf: 'center', marginTop: 30, marginBottom: 50 }}
					renderItem={renderItems}
					numColumns={numColumns}
					scrollEnabled={false}
					columnWrapperStyle={{
						justifyContent: 'space-between',
						marginBottom: 20
					}}
				/>
			</View>
		</ScrollView>
	);
}

export default MayurHome;

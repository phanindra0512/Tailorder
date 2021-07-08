import React from 'react';
import {
	View,
	Text,
	Image,
	Dimensions,
	TouchableNativeFeedback,
	ScrollView,
	TouchableOpacity,
	FlatList
} from 'react-native';
import { Header } from 'react-native-elements';

import styles from './styles';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const ScreenHeight = Dimensions.get('window').height;
const ScreenWidth = Dimensions.get('window').width;

const categories = [
	{
		catImage: require('../../../../assets/stylo/createOrder.jpg'),
		catname: 'Create Order'
	},
	{
		catImage: require('../../../../assets/stylo/todayOrders.jpg'),
		catname: 'Today Orders'
	},
	{
		catImage: require('../../../../assets/stylo/viewOrders.jpg'),
		catname: 'View Orders'
	},
	{
		catImage: require('../../../../assets/stylo/finishedOrders.jpg'),
		catname: 'RFD Orders'
	},
	{
		catImage: require('../../../../assets/stylo/checkStatus.jpg'),
		catname: 'Delivery Orders'
	},
	{
		catImage: require('../../../../assets/stylo/checkStatus.jpg'),
		catname: 'Check Status'
	}
];

const popularCustomers = [
	{
		name: 'Satayanarayana',
		id: 'A1001',
		image: 'https://crispmultimedia.in/wp-content/uploads/2019/07/img-9.jpg',
		totalOrders: 10
	},
	{
		name: 'Ram charan',
		id: 'B1200',
		image: 'https://mdbootstrap.com/img/Photos/Avatars/img%20(3).jpg',
		totalOrders: 8
	},
	{
		name: 'Satayanarayana',
		id: 'A1250',
		image:
			'https://cdn.shortpixel.ai/client/q_glossy,ret_img/https://hivietnamtravel.com/wp-content/uploads/2019/11/main-qimg-db023590d672cd0780dadc73b9166596-c.jpg',
		totalOrders: 6
	},
	{
		name: 'Satayanarayana',
		id: 'B1150',
		image: 'https://i.pinimg.com/originals/ed/98/65/ed9865262c3a6130aadf41d2fe4997bf.jpg',
		totalOrders: 4
	},
	{
		name: 'Satayanarayana',
		id: 'B1232',
		image: 'https://i.pinimg.com/originals/7c/4a/f3/7c4af379d678a3d0e1e7a9ff33debdb9.jpg',
		totalOrders: 7
	},
	{
		name: 'Satayanarayana',
		id: 'A3214',
		image:
			'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRERQEf_eQ8XXiaq92rQPsmo-yJWDEcDPLUjGs0oamE2uvYYgKmol2UrVBtNAgwRHVSHQY&usqp=CAU',
		totalOrders: 7
	}
];

const couroselData = [
	{
		productImage: 'https://i.pinimg.com/564x/93/14/70/9314705c866491c51cf95056b78d0519.jpg',
		description:
			'By far the most common and popular fabric for T-shirts, cotton is a fluffy, natural vegetable fiber obtained from the seedpod of the cotton plant. The fiber is most often spun into yarn or thread and used to make the soft, breathable fabric everyone knows and loves'
	},
	{
		productImage: 'https://i.pinimg.com/564x/81/8b/56/818b565d4bc7cc7ce2ded6f5aef07f11.jpg',
		description:
			'By far the most common and popular fabric for T-shirts, cotton is a fluffy, natural vegetable fiber obtained from the seedpod of the cotton plant. The fiber is most often spun into yarn or thread and used to make the soft, breathable fabric everyone knows and loves'
	},
	{
		productImage: 'https://i.pinimg.com/564x/13/c4/01/13c401cf21678778921c74035ead1dcc.jpg',
		description:
			'By far the most common and popular fabric for T-shirts, cotton is a fluffy, natural vegetable fiber obtained from the seedpod of the cotton plant. The fiber is most often spun into yarn or thread and used to make the soft, breathable fabric everyone knows and loves'
	},
	{
		productImage: 'https://i.pinimg.com/564x/36/d1/0a/36d10ac3d95e707efe67d92dfcf99383.jpg',
		description:
			'By far the most common and popular fabric for T-shirts, cotton is a fluffy, natural vegetable fiber obtained from the seedpod of the cotton plant. The fiber is most often spun into yarn or thread and used to make the soft, breathable fabric everyone knows and loves'
	},
	{
		productImage: 'https://i.pinimg.com/564x/c0/a9/f6/c0a9f6bc51509630333618114a84e707.jpg',
		description:
			'By far the most common and popular fabric for T-shirts, cotton is a fluffy, natural vegetable fiber obtained from the seedpod of the cotton plant. The fiber is most often spun into yarn or thread and used to make the soft, breathable fabric everyone knows and loves'
	},
	{
		productImage: 'https://i.pinimg.com/564x/a0/87/3b/a0873b314c0837ac5e001e13c00cac70.jpg',
		description:
			'By far the most common and popular fabric for T-shirts, cotton is a fluffy, natural vegetable fiber obtained from the seedpod of the cotton plant. The fiber is most often spun into yarn or thread and used to make the soft, breathable fabric everyone knows and loves'
	}
];
function StyloHome({ navigation }) {
	const numColumns = 2;

	const changeScreen = (name) => {
		if (name === 'Create Order') {
			navigation.navigate('CreateOrder');
		} else if (name === 'Today Orders') {
			navigation.navigate('TodayOrders');
		} else if (name === 'View Orders') {
			navigation.navigate('ViewOrders');
		} else if (name === 'RFD Orders') {
			navigation.navigate('FinishedOrders');
		} else if (name === 'Check Status') {
			navigation.navigate('CheckStatus');
		} else if (name === 'Delivery Orders') {
			navigation.navigate('CompletedPayments');
		}
	};

	const renderItems = ({ item, index }) => {
		return (
			<TouchableOpacity
				activeOpacity={0.8}
				onPress={() => changeScreen(item.catname)}
				style={styles.catContainer}
			>
				<Image source={item.catImage} style={styles.catImage} />
				<View>
					<Text numberOfLines={2} style={styles.catName}>
						{item.catname}
					</Text>
				</View>
			</TouchableOpacity>
		);
	};
	return (
		<View>
			<ScrollView>
				<View style={styles.mainContainer}>
					<Header
						barStyle="light-content"
						statusBarProps={{ backgroundColor: '#888' }}
						containerStyle={{ backgroundColor: '#1A1915', opacity: 0.9, height: 50, elevation: 0 }}
					/>
					<View style={styles.contentBlock}>
						<View style={styles.imageBlock}>
							<Image
								source={{
									uri:
										'https://media.skilldeer.com/550x450/deefba6051f2bec93ce15a843a4f14ca3d86f612.png'
								}}
								style={styles.profilePic}
							/>
							<TouchableNativeFeedback
								useForeground={true}
								background={TouchableNativeFeedback.Ripple('#fff', true)}
								onPress={() => navigation.navigate('CheckStatus')}
							>
								<View style={styles.iconContainer}>
									<Ionicons name="search" size={25} color="#fff" />
								</View>
							</TouchableNativeFeedback>
						</View>
						<Text style={styles.welcome}>Welcome Stylo !</Text>
						<Text style={styles.quote}>Tailoring your clothes makes all the difference</Text>
					</View>

					<Image
						source={{ uri: 'https://unicoderbd.com/theme/html/axeman/assets/images/logo/1.png' }}
						style={{ width: 80, height: 80, alignSelf: 'center' }}
					/>
					<Text style={styles.category}>Categories</Text>

					<FlatList
						data={categories}
						style={{ width: ScreenWidth - 50, alignSelf: 'center' }}
						renderItem={renderItems}
						numColumns={numColumns}
						columnWrapperStyle={{
							justifyContent: 'space-between'
							// marginHorizontal: 10
						}}
					/>

					<Text style={styles.category}>Popular Customers</Text>

					<View style={{ flexDirection: 'row' }}>
						<ScrollView
							horizontal={true}
							contentContainerStyle={{ paddingRight: 20 }}
							showsHorizontalScrollIndicator={false}
						>
							{popularCustomers.map((customer, index) => {
								return (
									<View key={index} style={styles.mainBlock}>
										<View style={styles.customerDetails}>
											<Image
												source={{
													uri: customer.image
												}}
												style={styles.custImage}
											/>
											<Text numberOfLines={1} style={styles.custName}>
												{customer.name}
											</Text>
											<View style={styles.detailBlock}>
												{/* <FontAwesome5 name="id-badge" size={13} color="#888" /> */}
												<Text style={styles.subText}>ID : {customer.id}</Text>
											</View>
											<View style={styles.detailBlock}>
												<FontAwesome5 name="shopping-basket" size={11} color="#888" />
												<Text style={styles.subText}>{customer.totalOrders} orders</Text>
											</View>
										</View>
									</View>
								);
							})}
						</ScrollView>
					</View>

					<Text style={styles.category}>Popular Clothes</Text>

					<View style={{ flexDirection: 'row', marginBottom: 100 }}>
						<ScrollView
							horizontal={true}
							contentContainerStyle={{ paddingRight: 20 }}
							showsHorizontalScrollIndicator={false}
						>
							{couroselData.map((item, index) => {
								return (
									<View key={index} style={styles.cardBlock}>
										<View style={{ flex: 2 }}>
											<Image
												source={{
													uri: item.productImage
												}}
												style={styles.imgStyle}
											/>
										</View>
										<View style={styles.contentContainer}>
											<Text numberOfLines={3} style={styles.content}>
												{item.description}
											</Text>
										</View>
									</View>
								);
							})}
						</ScrollView>
					</View>
				</View>
			</ScrollView>
		</View>
	);
}

export default StyloHome;

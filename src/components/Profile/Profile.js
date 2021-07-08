import React from 'react';
import { View, Text, Image, ScrollView } from 'react-native';
import { Input } from 'react-native-elements';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';
import DirectSms from 'react-native-direct-sms';

import CustomHeader from '../CustomHeader';
import styles from './styles';

function Profile() {
	const myData = {
		name: 'Raju',
		mobile: 9949544127,
		storeName: 'Mayur Tailors',
		storeAddress: 'Chintha chettu center,RRPeta,Eluru'
	};

	return (
		<View style={styles.container}>
			<CustomHeader title="Profile" />
			<ScrollView>
				<View>
					<View style={styles.triangleCorner1} />
					<View style={styles.profilePic}>
						<Image
							source={require('../../../assets/splash_bg.jpg')}
							style={{ width: 100, height: 100, borderRadius: 100 }}
						/>
					</View>
				</View>

				<View style={{ width: 300, alignSelf: 'center', marginTop: 25 }}>
					<Input
						value={myData.name}
						label="Name"
						leftIcon={<FontAwesome name="user" size={20} color="#242424" />}
						inputContainerStyle={{}}
						inputStyle={{ fontFamily: 'JosefinSans-Medium', fontSize: 16, paddingLeft: 10 }}
						disabled={true}
						style={{ color: '#18191A' }}
						labelStyle={{
							fontSize: 15,
							color: '#242424',
							fontFamily: 'JosefinSans-Medium',
							fontWeight: 'normal'
						}}
					/>
				</View>

				<View style={{ width: 300, alignSelf: 'center', marginTop: -10 }}>
					<Input
						value={myData.mobile.toString()}
						label="Mobile Number"
						leftIcon={<FontAwesome name="phone" size={20} color="#242424" />}
						inputContainerStyle={{}}
						inputStyle={{ fontFamily: 'JosefinSans-Medium', fontSize: 16, paddingLeft: 10 }}
						disabled={true}
						style={{ color: '#18191A' }}
						labelStyle={{
							fontSize: 15,
							color: '#242424',
							fontFamily: 'JosefinSans-Medium',
							fontWeight: 'normal'
						}}
					/>
				</View>

				<View style={{ width: 300, alignSelf: 'center', marginTop: -10 }}>
					<Input
						value={myData.storeName}
						label="Store Name"
						leftIcon={<FontAwesome5 name="store" size={17} color="#242424" />}
						inputContainerStyle={{}}
						inputStyle={{ fontFamily: 'JosefinSans-Medium', fontSize: 16, paddingLeft: 10 }}
						disabled={true}
						style={{ color: '#18191A' }}
						labelStyle={{
							fontSize: 15,
							color: '#242424',
							fontFamily: 'JosefinSans-Medium',
							fontWeight: 'normal'
						}}
					/>
				</View>

				<View style={{ width: 300, alignSelf: 'center', marginTop: -10 }}>
					<Input
						value={myData.storeAddress}
						label="Store Address"
						leftIcon={<Ionicons name="location" size={22} color="#242424" />}
						inputContainerStyle={{}}
						inputStyle={{ fontFamily: 'JosefinSans-Medium', fontSize: 16, paddingLeft: 10 }}
						disabled={true}
						style={{ color: '#18191A' }}
						multiline={true}
						labelStyle={{
							fontSize: 15,
							color: '#242424',
							fontFamily: 'JosefinSans-Medium',
							fontWeight: 'normal'
						}}
					/>
				</View>
			</ScrollView>
		</View>
	);
}

export default Profile;

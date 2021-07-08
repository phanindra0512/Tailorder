import * as React from 'react';
import { View, Image, Text, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { Header } from 'react-native-elements';
import { NavigationContainer, useNavigation, DrawerActions } from '@react-navigation/native';
function CustomHeader(props) {
	const navigation = useNavigation();
	return (
		<View>
			<View style={{ elevation: 10 }}>
				<Header
					barStyle="light-content"
					statusBarProps={{ backgroundColor: '#888' }}
					leftComponent={() => (
						<TouchableOpacity
							onPress={() => navigation.goBack()}
							style={{
								width: 30,
								height: 30,
								borderRadius: 50,
								alignItems: 'center',
								justifyContent: 'center'
							}}
						>
							<Ionicons name="md-arrow-back-outline" size={30} color="#fff" />
						</TouchableOpacity>
					)}
					containerStyle={{
						backgroundColor: '#252525',
						height: 80,
						elevation: 2,
						borderBottomWidth: 1,
						borderBottomColor: '#242424'
					}}
					centerComponent={() => (
						<Text style={{ fontSize: 20, color: '#fff', fontFamily: 'JosefinSans-Light' }}>
							{props.title}
						</Text>
					)}
				/>
			</View>
		</View>
	);
}
export default CustomHeader;

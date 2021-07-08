import React from 'react';
import { View, Text, TouchableOpacity, Image, TouchableNativeFeedback } from 'react-native';
import { Header } from 'react-native-elements';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import { NavigationContainer, useNavigation, DrawerActions } from '@react-navigation/native';

function DashboardHeader(props) {
	const navigation = useNavigation();
	return (
		<View>
			<Header
				barStyle="light-content"
				statusBarProps={{ backgroundColor: '#383838' }}
				placement="center"
				leftComponent={() => (
					<TouchableNativeFeedback
						useForeground={true}
						background={TouchableNativeFeedback.Ripple('#ccc', true)}
						// onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
					>
						<View
							style={{
								width: 40,
								height: 40,
								borderRadius: 100,
								alignItems: 'center',
								justifyContent: 'center'
							}}
						>
							<Image
								source={require('../../assets/appIcon.jpeg')}
								style={{ width: 40, height: 40, borderRadius: 50 }}
							/>
						</View>
					</TouchableNativeFeedback>
				)}
				containerStyle={{ backgroundColor: '#181818', height: 80 }}
				centerComponent={() => (
					<View style={{ flex: 1.5, alignItems: 'center', justifyContent: 'center' }}>
						<Text style={{ fontSize: 20, color: '#fff', fontFamily: 'JosefinSans-Bold' }}>MAYUR</Text>
					</View>
				)}
				// rightComponent={() => (
				// 	// <TouchableOpacity onPress={() => navigation.dispatch(DrawerActions.openDrawer())} >
				// 	<TouchableNativeFeedback
				// 		useForeground={true}
				// 		background={TouchableNativeFeedback.Ripple('#ccc', true)}
				// 	>
				// 		<View
				// 			style={{
				// 				width: 40,
				// 				height: 40,
				// 				borderRadius: 100,
				// 				alignItems: 'center',
				// 				justifyContent: 'center'
				// 			}}
				// 		>
				// 			<Ionicons name="search" size={22} color="#fff" />
				// 		</View>
				// 	</TouchableNativeFeedback>
				// )}
			/>
		</View>
	);
}

export default DashboardHeader;

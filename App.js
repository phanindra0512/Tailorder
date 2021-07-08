import React from 'react';
import { View, Text, LogBox, Image } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import SplashScreen from './src/screens/SplashScreen';

LogBox.ignoreAllLogs();
// ------------------STYLO SCREENS-------------------------

import StyloLogin from './src/screens/stylo/StyloLogin';
import StyloSignup from './src/screens/stylo/StyloSignup';
import StyloMobileNumber from './src/screens/stylo/StyloMobileNumber';
import StyloVerification from './src/screens/stylo/StyloVerification';
import StyloHome from './src/screens/stylo/StyloHome';
import CreateOrder from './src/screens/stylo/CreateOrder';
import CustomerDetails from './src/screens/stylo/CustomerDetails';
import OrderSuccess from './src/screens/stylo/OrderSuccess';
import ViewOrders from './src/screens/stylo/ViewOrders';
import TodayOrders from './src/screens/stylo/TodayOrders';
import FinishedOrders from './src/screens/stylo/FinishedOrders';
import CompletedPayments from './src/screens/stylo/CompletedPayments';
import CheckStatus from './src/screens/stylo/CheckStatus';
import OrderDetails from './src/screens/stylo/OrderDetails';
import Remainders from './src/screens/stylo/Remainders';
import Designs from './src/screens/stylo/Designs';

// ------------------MAYUR SCREENS-------------------------

import MayurLogin from './src/screens/Mayur/MayurLogin';
import MayurSignup from './src/screens/Mayur/MayurSignup';
import MayurMobileNumber from './src/screens/Mayur/MayurMobileNumber';
import MayurVerification from './src/screens/Mayur/MayurVerification';
import MayurHome from './src/screens/Mayur/MayurHome';
import MyOrders from './src/screens/Mayur/MyOrders';
import ProcessingOrders from './src/screens/Mayur/ProcessingOrders';
import CompletedOrders from './src/screens/Mayur/CompletedOrders';
import DeliveriedOrders from './src/screens/Mayur/DeliveriedOrders';
import PaymentComplete from './src/screens/Mayur/PaymentComplete';
import CheckStatusMayur from './src/screens/Mayur/CheckStatusMayur';
import MyOrderDetails from './src/screens/Mayur/MyOrderDetails';
import Profile from './src/components/Profile';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const headerStyleComponent = {
	headerTitleAlign: 'center',
	headerTintColor: '#fff',
	headerTitleStyle: {
		fontFamily: 'JosefinSans-Light',
		fontSize: 20
	},
	headerStyle: {
		backgroundColor: '#252525'
	}
};

// function TabView() {
// 	return (
// 		<Tab.Navigator tabBar={(props) => <CustomTab {...props} />}>
// 			<Tab.Screen name="Home" component={StyloHome} initialParams={{ icon: 'home-outline' }} />
// 			<Tab.Screen name="Designs" component={Designs} initialParams={{ icon: 'logo-designernews' }} />
// 			<Tab.Screen name="Remainders" component={Remainders} initialParams={{ icon: 'notifications-outline' }} />
// 			<Tab.Screen name="Profile" component={Profile} initialParams={{ icon: 'person-outline' }} />
// 		</Tab.Navigator>
// 	);
// }

const getRandomColor = function() {
	var letters = '0123456789ABCDEF'.split('');
	var color = '#';
	for (var i = 0; i < 6; i++) {
		color += letters[Math.floor(Math.random() * 16)];
	}
	return color;
};

function TabView() {
	return (
		<Tab.Navigator
			tabBarOptions={{
				showLabel: false,
				style: {
					position: 'absolute',
					left: 5,
					right: 5,
					bottom: 0,
					backgroundColor: getRandomColor(),
					borderTopRightRadius: 30,
					borderTopLeftRadius: 30,
					height: 60,
					elevation: 2
				}
			}}
		>
			<Tab.Screen
				name="StyloHome"
				component={StyloHome}
				options={{
					tabBarIcon: ({ focused }) => (
						<View style={{ alignItems: 'center', justifyContent: 'center' }}>
							<Image
								source={require('./assets/mayur/home.png')}
								style={{ width: 17, height: 17, tintColor: focused ? '#fff' : '#888' }}
							/>
							<Text
								style={{
									color: focused ? '#fff' : '#888',
									fontSize: 10,
									paddingTop: 5,
									fontFamily: 'JosefinSans-Medium'
								}}
							>
								HOME
							</Text>
						</View>
					)
				}}
			/>
			<Tab.Screen
				name="Designs"
				component={Designs}
				options={{
					tabBarIcon: ({ focused }) => (
						<View style={{ alignItems: 'center', justifyContent: 'center' }}>
							<Image
								source={require('./assets/mayur/designs.png')}
								style={{ width: 20, height: 20, tintColor: focused ? '#fff' : '#888' }}
							/>
							<Text
								style={{
									color: focused ? '#fff' : '#888',
									fontSize: 10,
									paddingTop: 5,
									fontFamily: 'JosefinSans-Medium'
								}}
							>
								Designs
							</Text>
						</View>
					)
				}}
			/>

			<Tab.Screen
				name="Remainders"
				component={Remainders}
				options={{
					tabBarIcon: ({ focused }) => (
						<View style={{ alignItems: 'center', justifyContent: 'center' }}>
							<Image
								source={require('./assets/mayur/remainder.png')}
								style={{ width: 20, height: 20, tintColor: focused ? '#fff' : '#888' }}
							/>
							<Text
								style={{
									color: focused ? '#fff' : '#888',
									fontSize: 10,
									paddingTop: 5,
									fontFamily: 'JosefinSans-Medium'
								}}
							>
								Remainders
							</Text>
						</View>
					)
				}}
			/>

			<Tab.Screen
				name="Profile"
				component={Profile}
				options={{
					tabBarIcon: ({ focused }) => (
						<View style={{ alignItems: 'center', justifyContent: 'center' }}>
							<Image
								source={require('./assets/mayur/profile.png')}
								style={{ width: 20, height: 20, tintColor: focused ? '#fff' : '#888' }}
							/>
							<Text
								style={{
									color: focused ? '#fff' : '#888',
									fontSize: 10,
									paddingTop: 5,
									fontFamily: 'JosefinSans-Medium'
								}}
							>
								Profile
							</Text>
						</View>
					)
				}}
			/>
		</Tab.Navigator>
	);
}

function MyTabs() {
	return (
		<Tab.Navigator
			tabBarOptions={{
				showLabel: false,
				style: {
					position: 'absolute',
					left: 5,
					right: 5,
					bottom: 0,
					backgroundColor: '#242424',
					borderRadius: 10,
					height: 60,
					elevation: 2
				}
			}}
		>
			<Tab.Screen
				name="MayurHome"
				component={MayurHome}
				options={{
					tabBarIcon: ({ focused }) => (
						<View style={{ alignItems: 'center', justifyContent: 'center' }}>
							<Image
								source={require('./assets/mayur/home.png')}
								style={{ width: 17, height: 17, tintColor: focused ? '#fff' : '#888' }}
							/>
							<Text
								style={{
									color: focused ? '#fff' : '#888',
									fontSize: 10,
									paddingTop: 5,
									fontFamily: 'JosefinSans-Medium'
								}}
							>
								HOME
							</Text>
						</View>
					)
				}}
			/>
			<Tab.Screen
				name="CheckStatusMayur"
				component={CheckStatusMayur}
				options={{
					tabBarIcon: ({ focused }) => (
						<View style={{ alignItems: 'center', justifyContent: 'center' }}>
							<Image
								source={require('./assets/mayur/quiz.png')}
								style={{ width: 20, height: 20, tintColor: focused ? '#fff' : '#888' }}
							/>
							<Text
								style={{
									color: focused ? '#fff' : '#888',
									fontSize: 10,
									paddingTop: 5,
									fontFamily: 'JosefinSans-Medium'
								}}
							>
								SEARCH
							</Text>
						</View>
					)
				}}
			/>

			<Tab.Screen
				name="MayurProfile"
				component={Profile}
				options={{
					tabBarIcon: ({ focused }) => (
						<View style={{ alignItems: 'center', justifyContent: 'center' }}>
							<Image
								source={require('./assets/mayur/profile.png')}
								style={{ width: 20, height: 20, tintColor: focused ? '#fff' : '#888' }}
							/>
							<Text
								style={{
									color: focused ? '#fff' : '#888',
									fontSize: 10,
									paddingTop: 5,
									fontFamily: 'JosefinSans-Medium'
								}}
							>
								PROFILE
							</Text>
						</View>
					)
				}}
			/>
		</Tab.Navigator>
	);
}

function App() {
	return (
		<NavigationContainer>
			<Stack.Navigator>
				<Stack.Screen name="SplashScreen" component={SplashScreen} options={{ headerShown: false }} />
				<Stack.Screen name="StyloLogin" component={StyloLogin} options={{ headerShown: false }} />
				<Stack.Screen name="StyloSignup" component={StyloSignup} options={{ headerShown: false }} />
				<Stack.Screen name="StyloMobileNumber" component={StyloMobileNumber} options={{ headerShown: false }} />
				<Stack.Screen name="StyloVerification" component={StyloVerification} options={{ headerShown: false }} />
				<Stack.Screen name="StyloHome" component={TabView} options={{ headerShown: false }} />
				<Stack.Screen name="CreateOrder" component={CreateOrder} options={headerStyleComponent} />
				<Stack.Screen name="CustomerDetails" component={CustomerDetails} options={headerStyleComponent} />
				<Stack.Screen name="OrderSuccess" component={OrderSuccess} options={{ headerShown: false }} />
				<Stack.Screen name="ViewOrders" component={ViewOrders} options={{ headerShown: false }} />
				<Stack.Screen name="TodayOrders" component={TodayOrders} options={{ headerShown: false }} />
				<Stack.Screen name="FinishedOrders" component={FinishedOrders} options={{ headerShown: false }} />
				<Stack.Screen name="CompletedPayments" component={CompletedPayments} options={{ headerShown: false }} />
				<Stack.Screen name="CheckStatus" component={CheckStatus} options={{ headerShown: false }} />
				<Stack.Screen name="OrderDetails" component={OrderDetails} options={{ headerShown: false }} />

				<Stack.Screen name="MayurLogin" component={MayurLogin} options={{ headerShown: false }} />
				<Stack.Screen name="MayurSignup" component={MayurSignup} options={{ headerShown: false }} />
				<Stack.Screen name="MayurMobileNumber" component={MayurMobileNumber} options={{ headerShown: false }} />
				<Stack.Screen name="MayurVerification" component={MayurVerification} options={{ headerShown: false }} />
				<Stack.Screen name="MayurHome" component={MyTabs} options={{ headerShown: false }} />
				<Stack.Screen name="MyOrders" component={MyOrders} options={{ headerShown: false }} />
				<Stack.Screen name="ProcessingOrders" component={ProcessingOrders} options={{ headerShown: false }} />
				<Stack.Screen name="CompletedOrders" component={CompletedOrders} options={{ headerShown: false }} />
				<Stack.Screen name="DeliveriedOrders" component={DeliveriedOrders} options={{ headerShown: false }} />
				<Stack.Screen name="PaymentComplete" component={PaymentComplete} options={{ headerShown: false }} />
				<Stack.Screen name="CheckStatusMayur" component={CheckStatusMayur} options={{ headerShown: false }} />

				<Stack.Screen name="MyOrderDetails" component={MyOrderDetails} options={{ headerShown: false }} />
			</Stack.Navigator>
		</NavigationContainer>
	);
}

export default App;

import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

function CustomTab({ state, navigation }) {
	const { routes } = state;
	const [ selected, setSelected ] = useState('StyloHome');
	const [ selectedColor, setSelectedColor ] = useState('red');

	const renderColor = (currentTab) => (currentTab === selected ? '#fff' : 'gray');

	const handleTab = (activeTab, index) => {
		if (state.index !== index) {
			setSelected(activeTab);
			navigation.navigate(activeTab);
		}
	};
	const getRandomColor = function() {
		var letters = '0123456789ABCDEF'.split('');
		var color = '#';
		for (var i = 0; i < 6; i++) {
			color += letters[Math.floor(Math.random() * 16)];
		}
		return color;
	};
	return (
		<View style={styles.container}>
			<View style={[ styles.conatiner1, { backgroundColor: getRandomColor() } ]}>
				{routes.map((route, index) => (
					<Tab
						tab={route}
						icon={route.params.icon}
						color={renderColor(route.name)}
						onPress={() => handleTab(route.name, index)}
						key={route.key}
					/>
				))}
			</View>
		</View>
	);
}

export default CustomTab;

function Tab({ color, background, tab, onPress, icon }) {
	return (
		<TouchableOpacity style={styles.tabStyle} onPress={onPress}>
			{icon && <Ionicons name={icon} size={17} color={color} />}
			<Text style={{ color, fontSize: 12, fontFamily: 'JosefinSans-Medium' }}>{tab.name}</Text>
		</TouchableOpacity>
	);
}
const styles = StyleSheet.create({
	container: {
		position: 'absolute',
		bottom: 0,
		left: 5,
		right: 5,
		borderTopRightRadius: 30,
		borderTopLeftRadius: 30,
		elevation: 3
	},
	conatiner1: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		borderTopRightRadius: 30,
		borderTopLeftRadius: 30
		// height: 50
	},
	tabStyle: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		paddingVertical: 8
	}
});

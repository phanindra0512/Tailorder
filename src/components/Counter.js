import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TouchableNativeFeedback } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';

function Counter(props) {
	const [ isValue, setIsValue ] = useState(0);
	const [ isName, setName ] = useState(props.itemName);
	const [ isImage, setImage ] = useState(props.itemImage);
	const [ isPrice, setPrice ] = useState(props.itemPrice);

	const increValue = () => {
		setIsValue(isValue + 1);
		props.onChange(isName, isValue + 1, isImage, isPrice);
	};

	const decreValue = () => {
		if (isValue - 1 > 0) {
			props.onChange(isName, isValue - 1, isImage, isPrice);
			setIsValue(isValue - 1);
		}
	};

	return (
		<View style={styles.counterContainer}>
			<TouchableNativeFeedback
				useForeground={true}
				background={TouchableNativeFeedback.Ripple('#ccc', true)}
				onPress={decreValue}
			>
				<View style={styles.iconBlock}>
					<AntDesign name="minussquare" size={26} />
				</View>
			</TouchableNativeFeedback>
			<Text style={styles.count}>{isValue}</Text>

			<TouchableNativeFeedback
				useForeground={true}
				background={TouchableNativeFeedback.Ripple('#ccc', true)}
				onPress={increValue}
			>
				<View style={styles.iconBlock}>
					<AntDesign name="plussquare" size={26} />
				</View>
			</TouchableNativeFeedback>
		</View>
	);
}

export default Counter;

const styles = StyleSheet.create({
	count: {
		fontSize: 16,
		fontFamily: 'JosefinSans-Medium'
	},
	counterContainer: {
		width: 120,
		height: 45,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center'
	},
	iconBlock: {
		width: 40,
		height: 40,
		borderRadius: 50,
		alignItems: 'center',
		justifyContent: 'center'
	}
});

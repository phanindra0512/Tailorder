import React from 'react';
import { View, Text } from 'react-native';
import styles from './styles';
import CustomHeader from '../../../components/CustomHeader';
function Designs() {
	return (
		<View style={styles.container}>
			<CustomHeader title="Designs" />

			<Text>Designs</Text>
		</View>
	);
}

export default Designs;

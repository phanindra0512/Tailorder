import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Searchbar, Divider } from 'react-native-paper';
import Feather from 'react-native-vector-icons/Feather';
import styles from './styles';
import CustomHeader from '../../../components/CustomHeader';

function Remainders() {
	return (
		<View style={styles.container}>
			<CustomHeader title="Remainders" />

			<Text>Remainders</Text>
		</View>
	);
}
export default Remainders;

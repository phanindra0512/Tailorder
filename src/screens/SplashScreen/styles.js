import { StyleSheet, Dimensions } from 'react-native';

const ScreenHeight = Dimensions.get('window').height;
const ScreenWidth = Dimensions.get('window').width;
const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#ccc'
	},
	backImage: {
		flex: 1,
		width: ScreenWidth,
		height: ScreenHeight,
		resizeMode: 'cover',
		justifyContent: 'center',
		opacity: 0.8
	},
	title: {
		fontSize: 21,
		paddingLeft: 20,
		paddingTop: 20,
		color: '#fff',
		fontFamily: 'JosefinSans-Bold'
	},

	buttonStyle: {
		width: 280,
		height: 45,
		alignSelf: 'center',
		marginTop: 30,
		borderRadius: 13
	}
});

export default styles;

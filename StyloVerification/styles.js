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
	inputStyle: {
		width: 280,
		height: 45,
		alignSelf: 'center',
		marginTop: 15,
		backgroundColor: '#333333',
		fontSize: 15
	},
	buttonStyle: {
		width: 280,
		height: 45,
		alignSelf: 'center',
		marginTop: 30,
		borderRadius: 13
	},
	codeFieldRoot: {
		width: 260,
		alignSelf: 'center'
	},
	cell: {
		width: 45,
		height: 45,
		lineHeight: 38,
		fontSize: 24,
		fontFamily: 'JosefinSans-Bold',
		borderWidth: 2,
		backgroundColor: '#333333',
		borderColor: '#fff',
		borderRadius: 50,
		textAlign: 'center',
		color: '#fff',
		paddingTop: 3,
		elevation: 10
	},
	focusCell: {
		borderColor: '#D6D7D8'
	}
});

export default styles;

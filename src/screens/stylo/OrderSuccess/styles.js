import { StyleSheet, Dimensions } from 'react-native';

const ScreenHeight = Dimensions.get('window').height;
const ScreenWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff'
	},
	iconContainer: {
		width: 45,
		height: 45,
		borderRadius: 100,
		alignItems: 'center',
		justifyContent: 'center',
		marginLeft: 10,
		marginTop: 10
	},
	success: {
		fontSize: 22,
		color: '#fff',
		fontFamily: 'JosefinSans-Medium'
	},
	successBlock: {
		flexDirection: 'row',
		alignItems: 'center',
		// justifyContent: 'space-between',
		marginHorizontal: 15
	},
	logo: {
		width: 220,
		height: 80,
		alignSelf: 'center'
	},
	address: {
		fontSize: 13,
		color: '#A9A9A9',
		textAlign: 'center',
		fontFamily: 'JosefinSans-Medium',
		letterSpacing: 2
	},
	dotted: {
		borderStyle: 'dashed',
		borderRadius: 1,
		borderWidth: 1,
		borderColor: '#ccc',
		marginTop: 10
	},
	dashed: {
		borderBottomWidth: 1,
		borderBottomColor: '#ccc',
		width: 150
	},
	heading: {
		fontSize: 22,
		color: '#707070',
		fontFamily: 'JosefinSans-Medium'
	},
	subheading: {
		fontSize: 15,
		color: '#707070',
		fontFamily: 'JosefinSans-Medium'
	},
	miniText: {
		fontSize: 13,
		color: '#707070',
		fontFamily: 'JosefinSans-Medium',
		paddingLeft: 5
	},
	detailsBlock: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		paddingHorizontal: 15,
		marginTop: 2
	},
	items: {
		fontSize: 16,
		color: '#242424',
		fontFamily: 'JosefinSans-Medium'
	},
	headingBlock: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center'
	},
	visit: {
		fontSize: 15,
		color: '#707070',
		fontFamily: 'JosefinSans-Medium',
		textAlign: 'center',
		paddingTop: 20,
		paddingBottom: 30
	},
	buttonStyle: {
		width: (ScreenWidth - 40) / 2,
		alignSelf: 'center',
		borderRadius: 7,
		marginTop: 20
	},
	buttonTitle: {
		backgroundColor: '#1A1915'
	}

	// triangleCorner1: {
	// 	width: ScreenWidth,
	// 	height: 250,
	// 	backgroundColor: 'transparent',
	// 	borderStyle: 'solid',
	// 	borderRightWidth: ScreenWidth,
	// 	borderTopWidth: 100,
	// 	borderRightColor: 'green',
	// 	borderTopColor: 'transparent',
	// 	transform: [ { rotate: '180deg' } ]
	// }
});
export default styles;

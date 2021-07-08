import { StyleSheet, Dimensions } from 'react-native';

const ScreenHeight = Dimensions.get('window').height;
const ScreenWidth = Dimensions.get('window').width;
const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff'
	},
	today: {
		fontSize: 20,
		color: '#242424',
		fontFamily: 'JosefinSans-Medium',
		paddingLeft: 20,
		paddingVertical: 15
	},
	orderContainer: {
		// height: 200,
		backgroundColor: '#F5F5F5',
		marginHorizontal: 20,
		borderRadius: 10,
		borderBottomRightRadius: 0
	},
	heading: {
		fontSize: 20,
		color: '#707070',
		fontFamily: 'JosefinSans-Medium'
	},
	subheading: {
		fontSize: 14,
		color: '#707070',
		fontFamily: 'JosefinSans-Medium'
	},
	detailBlock: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		marginHorizontal: 15,
		marginTop: 8,
		borderBottomWidth: 1,
		borderBottomColor: '#ccc',
		paddingBottom: 5
	},
	miniText: {
		fontSize: 13,
		color: '#707070',
		fontFamily: 'JosefinSans-Medium',
		paddingLeft: 15,
		paddingTop: 5
	},
	caption: {
		fontSize: 13,
		color: '#707070',
		fontFamily: 'JosefinSans-Medium'
	},
	statusBlock: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		borderRightWidth: 1,
		borderRightColor: '#ccc'
	},
	viewDetails: {
		height: 30,
		width: 120,
		alignSelf: 'flex-end',
		marginRight: 20,
		backgroundColor: '#242424',
		borderBottomLeftRadius: 10,
		borderBottomRightRadius: 10,
		alignItems: 'center',
		justifyContent: 'center'
	},
	noOrders: {
		fontSize: 13,
		color: '#707070',
		fontFamily: 'JosefinSans-Medium'
	}
});
export default styles;

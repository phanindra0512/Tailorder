import { StyleSheet, Dimensions } from 'react-native';

const ScreenHeight = Dimensions.get('window').height;
const ScreenWidth = Dimensions.get('window').width;
const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff'
	},
	heading: {
		fontSize: 18,
		color: '#242424',
		paddingLeft: 20,
		paddingTop: 20,
		paddingBottom: 15,
		fontFamily: 'JosefinSans-Regular'
	},

	fieldsStyles: {
		marginHorizontal: 30,
		height: 50,
		borderWidth: 1,
		borderRadius: 10,
		backgroundColor: '#f7f7f7',
		borderColor: '#E8E8E8',
		paddingLeft: 20,
		marginBottom: 25,
		fontSize: 16,
		fontFamily: 'JosefinSans-Regular'
	},
	buttonStyle: {
		width: ScreenWidth - 50,
		alignSelf: 'center',
		borderRadius: 7,
		marginVertical: 20
	},
	buttonTitle: {
		backgroundColor: '#1A1915'
	},
	generateBlock: {
		width: ScreenWidth - 50,
		alignSelf: 'center',
		justifyContent: 'space-between',
		flexDirection: 'row',
		alignItems: 'flex-end'
	},
	buttonBlock: {
		backgroundColor: '#242424',
		width: 100,
		height: 35,
		borderRadius: 10,
		alignItems: 'center',
		justifyContent: 'center',
		marginBottom: 6
	},
	caption: {
		width: ScreenWidth - 50,
		fontFamily: 'JosefinSans-Regular',
		color: '#ccc',
		alignSelf: 'center',
		marginTop: 5,
		marginBottom: 25,
		paddingLeft: 5
	},
	summary: {
		fontSize: 20,
		color: '#f5f5f5',
		fontFamily: 'JosefinSans-Regular',
		textAlign: 'center',
		paddingVertical: 15
	},
	orderId: {
		fontSize: 15,
		fontFamily: 'JosefinSans-Regular',
		color: '#fff',
		paddingVertical: 10,
		paddingRight: 15,
		textAlign: 'right'
	},
	selected: {
		fontSize: 17,
		fontFamily: 'JosefinSans-Regular',
		color: '#888',
		paddingLeft: 15
	},
	itemBlock: {
		flexDirection: 'row',
		padding: 10,
		justifyContent: 'space-between'
	},
	paymentType: {
		fontSize: 17,
		color: '#242424',
		fontFamily: 'JosefinSans-Medium'
	},
	subheading: {
		fontSize: 14,
		color: '#707070',
		fontFamily: 'JosefinSans-Medium'
	},
	miniheading: {
		fontSize: 12,
		color: '#707070',
		fontFamily: 'JosefinSans-Medium',
		paddingLeft: 3
	},
	uploadBlock: {
		width: 140,
		height: 140,
		backgroundColor: '#F5F5F5',
		borderRadius: 10,
		alignSelf: 'center',
		alignItems: 'center',
		justifyContent: 'center',
		borderWidth: 1,
		borderColor: '#888',
		borderStyle: 'dashed',
		marginTop: 15,
		marginBottom: 30
	},
	fab: {
		width: 40,
		height: 40,
		alignSelf: 'center',
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: '#242424',
		position: 'absolute',
		top: 135
	},
	proofImg: {
		width: 140,
		height: 140,
		borderRadius: 10,
		marginTop: 15,
		marginBottom: 30,
		alignSelf: 'center'
	}
});
export default styles;

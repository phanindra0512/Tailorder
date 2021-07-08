import { StyleSheet, Dimensions } from 'react-native';

const ScreenHeight = Dimensions.get('window').height;
const ScreenWidth = Dimensions.get('window').width;
const styles = StyleSheet.create({
	mainContainer: {
		flex: 1,
		backgroundColor: '#fff'
	},
	contentBlock: {
		width: ScreenWidth,
		backgroundColor: '#1A1915',
		opacity: 0.9,
		marginTop: -0.5,
		paddingBottom: 5
	},
	imageBlock: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		paddingHorizontal: 20,
		paddingTop: 5
	},
	welcome: {
		fontSize: 35,
		paddingLeft: 20,
		paddingTop: 10,
		fontFamily: 'Satisfy-Regular',
		color: '#fff'
	},
	quote: {
		fontSize: 14,
		paddingLeft: 20,
		fontFamily: 'Satisfy-Regular',
		color: '#fff'
	},
	profilePic: {
		width: 55,
		height: 55,
		borderRadius: 50
	},
	category: {
		fontSize: 18,
		fontFamily: 'JosefinSans-Bold',
		paddingVertical: 15,
		paddingLeft: 20
	},
	iconContainer: {
		width: 45,
		height: 45,
		borderRadius: 50,
		alignItems: 'center',
		justifyContent: 'center'
	},
	catContainer: {
		width: 150,
		height: 100,
		backgroundColor: '#242424',
		borderRadius: 20,
		opacity: 0.9,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		paddingRight: 5,
		marginBottom: 15,
		elevation: 5
	},
	catName: {
		fontSize: 16,
		fontFamily: 'JosefinSans-Medium',
		color: '#fff',
		width: 70,
		textAlign: 'center',
		lineHeight: 20
	},
	catImage: {
		width: 60,
		height: 100,
		borderTopRightRadius: 50,
		borderBottomRightRadius: 50,
		borderTopLeftRadius: 20,
		borderBottomLeftRadius: 20,
		opacity: 0.8
	},
	mainBlock: {
		width: 120,
		height: 150,
		backgroundColor: '#242424',
		marginLeft: 20,
		marginBottom: 20,
		borderRadius: 20,
		elevation: 3
	},
	customerDetails: {
		position: 'absolute',
		height: 130,
		bottom: 0,
		left: 0,
		right: 0,
		backgroundColor: '#fff',
		borderTopRightRadius: 20,
		borderTopLeftRadius: 20,
		borderRadius: 10
	},
	custImage: {
		width: 50,
		height: 50,
		alignSelf: 'center',
		marginTop: 10,
		borderRadius: 50
	},
	custName: {
		fontSize: 15,
		fontFamily: 'JosefinSans-Medium',
		color: '#242424',
		width: 100,
		paddingLeft: 10
	},
	subText: {
		fontSize: 12,
		paddingLeft: 5,
		color: '#888',
		fontFamily: 'JosefinSans-Medium'
	},
	detailBlock: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		paddingTop: 2
	},
	cardBlock: {
		height: 170,
		width: 300,
		alignSelf: 'center',
		borderRadius: 20,
		marginLeft: 20
	},
	imgStyle: {
		width: null,
		height: null,
		flex: 2,
		borderTopLeftRadius: 20,
		borderTopRightRadius: 20
	},
	contentContainer: {
		flex: 1,
		backgroundColor: '#242424',
		borderBottomLeftRadius: 20,
		borderBottomRightRadius: 20
	},
	content: {
		padding: 10,
		paddingTop: 3,
		fontSize: 10,
		fontFamily: 'JosefinSans-Medium',
		lineHeight: 15,
		color: '#fff'
	}
});
export default styles;

import { StyleSheet, Dimensions } from 'react-native';

const ScreenHeight = Dimensions.get('window').height;
const ScreenWidth = Dimensions.get('window').width;
const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff'
	},
	statusContainer: {
		height: 150,
		marginHorizontal: 15,
		backgroundColor: '#F5F5F5',
		borderRadius: 15,
		marginTop: 20,
		marginBottom: 15
	},
	heading: {
		fontSize: 17,
		color: '#242424',
		fontFamily: 'JosefinSans-Medium'
	},
	detailBlock: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		marginHorizontal: 15,
		marginTop: 8
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
	itemBlock: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'flex-end',
		marginHorizontal: 20,
		marginBottom: 15
	},
	amountBlock: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		paddingHorizontal: 20,
		paddingBottom: 5
	},
	buttonStyle: {
		width: ScreenWidth - 50,
		alignSelf: 'center',
		borderRadius: 15,
		marginVertical: 20
	},
	buttonTitle: {
		backgroundColor: '#242424'
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
	},
	overlay: {
		width: ScreenWidth - 60,
		height: 300,
		backgroundColor: '#fff',
		borderRadius: 15,
		padding: -1
	},
	imageTitle: {
		fontSize: 13,
		color: '#ccc',
		paddingLeft: 20,
		paddingTop: 10,
		fontFamily: 'JosefinSans-Medium'
	},
	statusHeading: {
		fontSize: 20,
		color: '#242424',
		paddingLeft: 20,
		paddingTop: 20,
		paddingBottom: 15,
		fontFamily: 'JosefinSans-Medium'
	},
	buttonTitle1: {
		fontFamily: 'JosefinSans-Medium'
	},
	statusButton: {
		backgroundColor: '#242424',
		alignItems: 'center',
		justifyContent: 'center',
		paddingVertical: 10,
		marginHorizontal: 20,
		borderRadius: 10,
		marginBottom: 10
	},
	statusTitle: {
		fontFamily: 'JosefinSans-Medium',
		color: '#fff'
	},
	statusOverlay: {
		width: ScreenWidth - 60,
		backgroundColor: '#fff',
		borderRadius: 15,
		padding: -1,
		paddingBottom: 10
	},
	statusButton2: {
		alignItems: 'center',
		justifyContent: 'center',
		paddingVertical: 10,
		marginHorizontal: 20,
		borderRadius: 10,
		marginBottom: 10,
		borderWidth: 1,
		borderColor: '#242424'
	},
	statusTitle2: {
		fontFamily: 'JosefinSans-Medium',
		color: '#242424'
	}
});

export default styles;

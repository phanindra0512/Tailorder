import { StyleSheet, Dimensions } from 'react-native';

const ScreenHeight = Dimensions.get('window').height;
const ScreenWidth = Dimensions.get('window').width;
const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff'
	},
	overlay: {
		width: ScreenWidth - 60,
		// height: 300,
		backgroundColor: '#fff',
		borderRadius: 20
	},
	title: {
		fontSize: 18,
		fontFamily: 'JosefinSans-Bold',
		textAlign: 'center',
		paddingTop: 5,
		paddingBottom: 10
	},
	iconContainer: {
		flex: 1,
		alignItems: 'center'
	},
	iconBlock: {
		width: 70,
		height: 70,
		backgroundColor: '#f5f5f5',
		borderRadius: 10,
		alignItems: 'center',
		justifyContent: 'center',
		elevation: 2
	},
	catName: {
		fontFamily: 'JosefinSans-Regular',
		fontSize: 15,
		paddingVertical: 3,
		textAlign: 'center'
	},
	fab: {
		width: 50,
		height: 50,
		alignSelf: 'center',
		alignItems: 'center',
		justifyContent: 'center',
		marginTop: 20,
		backgroundColor: '#242424'
	},
	close: {
		position: 'absolute',
		top: 15,
		right: 15
	},
	itemBlock: {
		height: 80,
		alignItems: 'center',
		justifyContent: 'space-between',
		flexDirection: 'row',
		paddingHorizontal: 20,
		marginBottom: 15
	},
	camBlock: {
		height: 150,
		backgroundColor: '#F5F5F5',
		opacity: 0.65,
		marginHorizontal: 20,
		borderRadius: 10,
		borderWidth: 1,
		borderColor: '#888',
		borderStyle: 'dashed',
		alignItems: 'center',
		justifyContent: 'center',
		marginVertical: 15
	},
	uploadImg: {
		height: 150,
		width: ScreenWidth - 20,
		alignSelf: 'center',
		marginVertical: 15,
		borderRadius: 10
	},
	booking: {
		fontSize: 15,
		fontFamily: 'JosefinSans-Bold',
		color: '#888',
		paddingVertical: 10,
		textAlign: 'center'
	},
	buttonBlock: {
		width: 150,
		height: 40,
		backgroundColor: '#242424',
		borderRadius: 10,
		alignItems: 'center',
		justifyContent: 'center'
	},
	select: {
		fontSize: 15,
		fontFamily: 'JosefinSans-Bold',
		color: '#fff'
	},
	buttonStyle: {
		width: ScreenWidth - 50,
		alignSelf: 'center',
		borderRadius: 7,
		marginVertical: 20
	},
	buttonTitle: {
		backgroundColor: '#1A1915'
	}
});
export default styles;

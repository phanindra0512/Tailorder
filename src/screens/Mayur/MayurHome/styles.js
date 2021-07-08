import { StyleSheet, Dimensions } from 'react-native';

const ScreenHeight = Dimensions.get('window').height;
const ScreenWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff'
	},
	imgBlock: {
		width: 80,
		height: 80,
		borderRadius: 100,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
		position: 'absolute',
		right: 20,
		top: 150
	},
	categories: {
		fontSize: 18,
		fontFamily: 'JosefinSans-Bold',
		paddingLeft: 30,
		paddingTop: 30
	},
	catBlock: {
		height: 150,
		backgroundColor: '#656664',
		// borderTopRightRadius: 100,
		// borderTopLeftRadius: 100,
		borderRadius: 20,
		elevation: 3,
		alignItems: 'center'
	},
	catName: {
		fontSize: 16,
		fontFamily: 'JosefinSans-Medium',
		textAlign: 'center',
		color: '#fff',
		width: 110,
		marginTop: 10,
		lineHeight: 18
	}
});

export default styles;

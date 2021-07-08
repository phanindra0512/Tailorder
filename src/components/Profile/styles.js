import { StyleSheet, Dimensions } from 'react-native';

const ScreenHeight = Dimensions.get('window').height;
const ScreenWidth = Dimensions.get('window').width;
const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff'
	},
	triangleCorner1: {
		width: ScreenWidth,
		height: 200,
		backgroundColor: 'transparent',
		borderStyle: 'solid',
		borderRightWidth: ScreenWidth,
		borderTopWidth: 100,
		borderRightColor: '#242424',
		borderTopColor: 'transparent',
		transform: [ { rotate: '180deg' } ]
	},
	profilePic: {
		position: 'absolute',
		top: 100,
		alignSelf: 'center',
		borderWidth: 5,
		borderColor: '#fff',
		borderRadius: 100
	}
});
export default styles;

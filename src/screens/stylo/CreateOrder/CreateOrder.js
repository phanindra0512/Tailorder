import React, { useState, useEffect } from 'react';
import {
	View,
	Text,
	Image,
	TouchableOpacity,
	FlatList,
	PermissionsAndroid,
	Dimensions,
	Platform,
	ScrollView
} from 'react-native';
import { Overlay, Button } from 'react-native-elements';
import { FAB, Divider } from 'react-native-paper';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import DateTimePicker from '@react-native-community/datetimepicker';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';

import moment from 'moment';

import Counter from '../../../components/Counter';
import styles from './styles';

const ScreenHeight = Dimensions.get('window').height;
const ScreenWidth = Dimensions.get('window').width;

function CreateOrder({ navigation }) {
	const [ visible, setVisible ] = useState(false);

	const [ isItems, setItems ] = useState([]);
	const [ selectedItems, setSelectedItems ] = useState([]);
	const [ isUploadMeasurments, setUploadMeasurments ] = useState([]);
	const [ isUploadClothes, setUploadClothes ] = useState([]);
	const [ isBookingDate, setIsBookingDate ] = useState();
	const [ isDeliveryDate, setIsDeliveryDate ] = useState();

	const toggleOverlay = () => {
		setVisible(!visible);
	};

	useEffect(() => {
		setVisible(true);
	}, []);

	const remove = () => {
		const removeDupItems = Object.values(
			selectedItems.reduce((acc, cur) => Object.assign(acc, { [cur.name]: cur }), {})
		);
		const removeDupMeasurments = Object.values(
			isUploadMeasurments.reduce((acc, cur) => Object.assign(acc, { [cur.name]: cur }), {})
		);
		const removeDupClothes = Object.values(
			isUploadClothes.reduce((acc, cur) => Object.assign(acc, { [cur.name]: cur }), {})
		);

		console.log('removed items', removeDupItems.length);
		console.log('removed measurments', removeDupMeasurments);
		console.log('removed clothes', removeDupClothes);

		if (removeDupItems.length == 0) {
			alert('please add quantity of items');
		} else if (isUploadMeasurments.length < isItems.length) {
			alert('Please upload all item measurments');
		} else if (isUploadClothes.length < isItems.length) {
			alert('Please upload all item clothes');
		} else if (!isBookingDate) {
			alert('please select booking date');
		} else if (!isDeliveryDate) {
			alert('please select delivery date');
		} else {
			navigation.navigate('CustomerDetails', {
				selectedItems: removeDupItems,
				measurmentsImages: isUploadMeasurments,
				clothesImages: isUploadClothes,
				bookingDate: isBookingDate,
				deliveryDate: isDeliveryDate
			});
		}
	};

	return (
		<ScrollView>
			<View style={styles.container}>
				<Text style={[ styles.title, { textAlign: 'left', paddingLeft: 20, paddingTop: 20 } ]}>
					Selected Items :
				</Text>
				<Divider style={{ marginBottom: 20, marginTop: 10 }} />

				{isItems.length == 0 ? (
					<View style={{ height: 50, alignItems: 'center', justifyContent: 'center' }}>
						<Text style={{ fontSize: 15, fontFamily: 'JosefinSans-Regular', color: '#ccc' }}>
							No items selected
						</Text>
					</View>
				) : (
					<View>
						{isItems.map((item, index) => {
							return (
								<View key={index} style={styles.itemBlock}>
									<View style={{ flexDirection: 'row', alignItems: 'center' }}>
										<View style={styles.iconBlock}>
											<Image source={item.image} style={{ width: 45, height: 45 }} />
										</View>
										<View>
											<Text style={[ styles.catName, { paddingLeft: 20, fontSize: 19 } ]}>
												{item.name}
											</Text>
											<Text style={[ styles.catName, { paddingLeft: 10, fontSize: 13 } ]}>
												{' '}
												{'\u20B9'} {item.price}
											</Text>
										</View>
									</View>
									<Counter
										itemName={item.name}
										itemImage={item.image}
										itemPrice={item.price}
										onChange={(name, quantity, image, price) => {
											selectedItems.push({ name, quantity, image, price });
											console.log('added', selectedItems);
										}}
									/>
								</View>
							);
						})}
					</View>
				)}

				<Text style={[ styles.title, { textAlign: 'left', paddingLeft: 20, paddingTop: 20 } ]}>
					Upload Measurments :
				</Text>
				<Divider style={{ marginBottom: 20, marginTop: 10 }} />

				{isItems.length == 0 ? (
					<View style={{ height: 50, alignItems: 'center', justifyContent: 'center' }}>
						<Text style={{ fontSize: 15, fontFamily: 'JosefinSans-Regular', color: '#ccc' }}>
							No items selected
						</Text>
					</View>
				) : (
					<View>
						{isItems.map((item, index) => {
							return (
								<View key={index}>
									<UploadImages
										name={item.name}
										onChange={(name, images) => {
											isUploadMeasurments.push({ name, images });
											console.log('images upload', isUploadMeasurments);
										}}
									/>
								</View>
							);
						})}
					</View>
				)}

				<Text style={[ styles.title, { textAlign: 'left', paddingLeft: 20, paddingTop: 20 } ]}>
					Upload Clothes :
				</Text>
				<Divider style={{ marginBottom: 20, marginTop: 10 }} />

				{isItems.length == 0 ? (
					<View style={{ height: 50, alignItems: 'center', justifyContent: 'center' }}>
						<Text style={{ fontSize: 15, fontFamily: 'JosefinSans-Regular', color: '#ccc' }}>
							No items selected
						</Text>
					</View>
				) : (
					<View>
						{isItems.map((item, index) => {
							return (
								<View key={index}>
									<UploadClothes
										name={item.name}
										onChange={(name, images) => {
											isUploadClothes.push({ name, images });
											console.log('clothes upload', isUploadClothes);
										}}
									/>
								</View>
							);
						})}
					</View>
				)}

				<View
					style={{
						flexDirection: 'row',
						alignItems: 'center',
						justifyContent: 'space-between',
						margin: 20
					}}
				>
					<SelectDate title="Booking Date" onChange={(bookingDate) => setIsBookingDate(bookingDate)} />
					<SelectDate title="Delivery Date" onChange={(bookingDate) => setIsDeliveryDate(bookingDate)} />
				</View>

				<Button
					title="Continue"
					disabled={isItems.length == 0 ? true : false}
					containerStyle={styles.buttonStyle}
					buttonStyle={styles.buttonTitle}
					titleStyle={{ fontFamily: 'JosefinSans-Medium' }}
					// onPress={() => navigation.navigate('CustomerDetails')}
					onPress={remove}
				/>

				{/* This is for select items overlay */}

				<Overlay isVisible={visible} overlayStyle={styles.overlay} onBackdropPress={() => setVisible(true)}>
					<Text style={styles.title}>Select Items</Text>
					<TouchableOpacity
						onPress={() => {
							toggleOverlay();
							navigation.goBack();
						}}
						style={styles.close}
					>
						<MaterialIcons name="close" size={30} color="#888" />
					</TouchableOpacity>

					<View style={{ marginTop: 20, flexDirection: 'row', justifyContent: 'space-around' }}>
						<ItemCat
							name="Shirt"
							image={require('../../../../assets/stylo/shirt.png')}
							price={300}
							onChange={(name, image, price) => {
								if (name != null) {
									isItems.push({ name, image, price });
									// console.log(isItems);
								} else {
									isItems
										.filter((x) => x.name === 'Shirt')
										.forEach((x) => isItems.splice(isItems.indexOf(x), 1));
									// console.log(isItems);
								}
							}}
						/>
						<ItemCat
							name="Pant"
							image={require('../../../../assets/stylo/pant.png')}
							price={400}
							onChange={(name, image, price) => {
								if (name != null) {
									isItems.push({ name, image, price });
									// console.log(isItems);
								} else {
									isItems
										.filter((x) => x.name === 'Pant')
										.forEach((x) => isItems.splice(isItems.indexOf(x), 1));
									// console.log(isItems);
								}
							}}
						/>
						<ItemCat
							name="Suit"
							image={require('../../../../assets/stylo/suit.png')}
							price={1300}
							onChange={(name, image, price) => {
								if (name != null) {
									isItems.push({ name, image, price });
									// console.log(isItems);
								} else {
									isItems
										.filter((x) => x.name === 'Suit')
										.forEach((x) => isItems.splice(isItems.indexOf(x), 1));
									// console.log(isItems);
								}
							}}
						/>
					</View>
					<View style={{ marginTop: 20, flexDirection: 'row', justifyContent: 'space-around' }}>
						<ItemCat
							name="Safari"
							image={require('../../../../assets/stylo/safari.png')}
							price={800}
							onChange={(name, image, price) => {
								if (name != null) {
									isItems.push({ name, image, price });
									// console.log(isItems);
								} else {
									isItems
										.filter((x) => x.name === 'Safari')
										.forEach((x) => isItems.splice(isItems.indexOf(x), 1));
									// console.log(isItems);
								}
							}}
						/>
						<ItemCat
							name="Sherwani"
							image={require('../../../../assets/stylo/sherwani.png')}
							price={1200}
							onChange={(name, image, price) => {
								if (name != null) {
									isItems.push({ name, image, price });
									// console.log(isItems);
								} else {
									isItems
										.filter((x) => x.name === 'Sherwani')
										.forEach((x) => isItems.splice(isItems.indexOf(x), 1));
									// console.log(isItems);
								}
							}}
						/>
						<ItemCat
							name="Waistcoat"
							image={require('../../../../assets/stylo/waistcoat.png')}
							price={1000}
							onChange={(name, image, price) => {
								if (name != null) {
									isItems.push({ name, image, price });
									// console.log(isItems);
								} else {
									isItems
										.filter((x) => x.name === 'Waistcoat')
										.forEach((x) => isItems.splice(isItems.indexOf(x), 1));
									// console.log(isItems);
								}
							}}
						/>
					</View>

					<FAB
						style={styles.fab}
						// disabled={isItems.length !== 0 ? false : true}
						small
						color="#fff"
						icon="arrow-right"
						onPress={toggleOverlay}
						// onPress={() => console.log('cart', isItems)}
					/>
				</Overlay>
			</View>
		</ScrollView>
	);
}

export default CreateOrder;

// -----------------This is for category item in overlay-------------

function ItemCat(props) {
	const [ isSelect, setIsSelect ] = useState(false);

	const increValue = () => {
		if (isSelect != true) {
			props.onChange(props.name, props.image, props.price);
		} else {
			props.onChange();
		}
	};

	return (
		<TouchableOpacity
			activeOpacity={0.8}
			onPress={() => {
				setIsSelect(!isSelect);
				increValue();
			}}
		>
			<View
				style={[
					styles.iconBlock,
					{
						borderWidth: 1,
						borderColor: '#f5f5f5',
						borderBottomWidth: 5,
						borderBottomColor: isSelect ? '#242424' : '#f5f5f5'
					}
				]}
			>
				<Image source={props.image} style={{ width: 45, height: 45 }} />
			</View>
			<Text style={styles.catName}>{props.name}</Text>
		</TouchableOpacity>
	);
}

// -------------This is for upload mesurments-------------

function UploadImages(props) {
	const [ photocam, setPhotoCam ] = useState('');

	const options = {
		title: 'Select Image',
		takePhotoButtonTitle: 'Take pic',
		saveToPhotos: true,
		includeBase64: true,
		storageOptions: {
			skipBackup: true,
			path: 'images'
		}
	};

	const requestCameraPermission = async () => {
		if (Platform.OS === 'android') {
			try {
				const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CAMERA, {
					title: 'Camera Permission',
					message: 'App needs camera permission'
				});
				// If CAMERA Permission is granted
				return granted === PermissionsAndroid.RESULTS.GRANTED;
			} catch (err) {
				console.warn(err);
				return false;
			}
		} else return true;
	};

	const requestExternalWritePermission = async () => {
		if (Platform.OS === 'android') {
			try {
				const granted = await PermissionsAndroid.request(
					PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
					{
						title: 'External Storage Write Permission',
						message: 'App needs write permission'
					}
				);
				// If WRITE_EXTERNAL_STORAGE Permission is granted
				return granted === PermissionsAndroid.RESULTS.GRANTED;
			} catch (err) {
				console.warn(err);
				alert('Write permission err', err);
			}
			return false;
		} else return true;
	};

	const captureImage = async () => {
		let isCameraPermitted = await requestCameraPermission();
		let isStoragePermitted = await requestExternalWritePermission();
		if (isCameraPermitted && isStoragePermitted) {
			launchCamera(options, (response) => {
				// console.log('Response = ', response);

				if (response.didCancel) {
					alert('User cancelled camera picker');
					return;
				} else if (response.errorCode == 'camera_unavailable') {
					alert('Camera not available on device');
					return;
				} else if (response.errorCode == 'permission') {
					alert('Permission not satisfied');
					return;
				} else if (response.errorCode == 'others') {
					alert(response.errorMessage);
					return;
				}
				// console.log('uri -> ', response.uri);
				setPhotoCam(response.uri);
				props.onChange(props.name, response.uri);
			});
		}
	};

	return (
		<View>
			<View
				style={{
					flexDirection: 'row',
					justifyContent: 'space-between',
					paddingRight: 20
				}}
			>
				<Text style={[ styles.catName, { textAlign: 'left', paddingLeft: 20 } ]}>{props.name} measurments</Text>
				<TouchableOpacity onPress={captureImage}>
					<Text style={[ styles.catName, { color: '#2E8BFA' } ]}>Upload</Text>
				</TouchableOpacity>
			</View>

			{photocam == '' ? (
				<View style={styles.camBlock}>
					<Image
						source={require('../../../../assets/stylo/measurments.png')}
						style={{ width: 80, height: 80 }}
					/>
					<Text style={styles.catName}>Click upload to {props.name} measurments</Text>
				</View>
			) : (
				<Image source={{ uri: photocam }} style={styles.uploadImg} />
			)}
		</View>
	);
}

// --------------------This is for uploading clothes images -------------

function UploadClothes(props) {
	const [ photocam, setPhotoCam ] = useState('');

	const handleChooseCamera = () => {
		const options = {
			title: 'Select Image',
			takePhotoButtonTitle: 'Take pic',
			//chooseFromLibraryButtonTitle: 'Select from Gallary',
			// customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
			storageOptions: {
				skipBackup: true,
				path: 'images'
			}
		};
		launchCamera(options, (response) => {
			// console.log('img', response.uri);
			if (response.didCancel) {
				console.log('User cancelled image picker');
			} else if (response.error) {
				console.log('ImagePicker Error: ', response.error);
			} else if (response.customButton) {
				console.log('User tapped custom button: ', response.customButton);
			} else {
				// const source = response.uri;
				// console.log('upload pic------------->', source);
				let source = { uri: response.uri };
				// console.log(source);
				setPhotoCam(source.uri);
				props.onChange(props.name, source.uri);
			}
		});
	};
	return (
		<View>
			<View
				style={{
					flexDirection: 'row',
					justifyContent: 'space-between',
					paddingRight: 20
				}}
			>
				<Text style={[ styles.catName, { textAlign: 'left', paddingLeft: 20 } ]}>{props.name} Clothes</Text>
				<TouchableOpacity onPress={handleChooseCamera}>
					<Text style={[ styles.catName, { color: '#2E8BFA' } ]}>Upload</Text>
				</TouchableOpacity>
			</View>

			{photocam == '' ? (
				<View style={styles.camBlock}>
					<Image source={require('../../../../assets/stylo/clothes.png')} style={{ width: 80, height: 80 }} />
					<Text style={styles.catName}>Click here to upload {props.name} clothes</Text>
				</View>
			) : (
				<Image source={{ uri: photocam }} style={styles.uploadImg} />
			)}
		</View>
	);
}

// -----------------This is for selecting date--------------------

function SelectDate(props) {
	const [ isDate, setDate ] = useState(new Date());
	const [ mode, setMode ] = useState('date');
	const [ show, setShow ] = useState(false);

	const selecting = (event, selectedDate) => {
		const currentDate = selectedDate || new Date();
		setShow(false);
		setDate(currentDate);
		props.onChange(moment(currentDate).format('ll'));
		console.log('phani', currentDate);
	};

	const showDatepicker = () => {
		setShow(true);
		setMode('date');
	};

	return (
		<View>
			<Text style={styles.booking}>{props.title}</Text>
			<TouchableOpacity activeOpacity={0.7} onPress={showDatepicker} style={styles.buttonBlock}>
				<Text style={styles.select}>Select</Text>
			</TouchableOpacity>

			<Text style={[ styles.booking, { color: '#242424' } ]}>{moment(isDate).format('ll')}</Text>

			{show && (
				<DateTimePicker
					testID="dateTimePicker"
					value={isDate}
					// maximumDate={new Date(2300, 10, 20)}
					minimumDate={new Date()}
					mode={mode}
					display="default"
					onChange={selecting}
				/>
			)}
		</View>
	);
}

import React from 'react';
import firestore from '@react-native-firebase/firestore';
import firebase from '@react-native-firebase/app';

const firebaseConfig = {
	apiKey: 'AIzaSyASozcbLmnkDDFV6gMgRvyDHWW17o1oQPA',
	authDomain: 'tailorder.firebaseapp.com',
	databaseURL: 'https://tailorder-default-rtdb.firebaseio.com',
	projectId: 'tailorder',
	storageBucket: 'tailorder.appspot.com',
	messagingSenderId: '301247191940',
	appId: '1:301247191940:web:11198bd748bfb848091bd1',
	measurementId: 'G-7344Y5FSB6'
};

if (!firebase.apps.length) {
	firebase.initializeApp(firebaseConfig);
} else {
	firebase.app(); // if already initialized, use that one
}

export default () => {
	return { firebase, firestore };
};

import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyBlB_AZsX5mhvKKyzebVpY18kEMJQ6xUB4",
    authDomain: "inventory-manager-f97b8.firebaseapp.com",
    databaseURL: "https://inventory-manager-f97b8.firebaseio.com",
    projectId: "inventory-manager-f97b8",
    storageBucket: "inventory-manager-f97b8.appspot.com",
    messagingSenderId: "810131282976",
    appId: "1:810131282976:web:a301eb23d2f6efdc"
};

firebase.initializeApp(firebaseConfig);
firebase.firestore()//.settings({ timestampsInSnapshots: true });

const database = firebase.firestore()

export { firebase, database as default };
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

const secondaryFirebaseConfig = {
    apiKey: "AIzaSyBlB_AZsX5mhvKKyzebVpY18kEMJQ6xUB4",
    authDomain: "inventory-manager-f97b8.firebaseapp.com",
    databaseURL: "https://inventory-manager-f97b8.firebaseio.com",
    projectId: "inventory-manager-f97b8",
    storageBucket: "inventory-manager-f97b8.appspot.com",
    messagingSenderId: "810131282976",
    appId: "1:810131282976:web:5b9735c34a1d1650"
  };

firebase.initializeApp(firebaseConfig);
const secondaryApp = firebase.initializeApp(secondaryFirebaseConfig, "Secondary");
// firebase.firestore().settings({ timestampsInSnapshots: true });


const database = firebase.firestore()

export { firebase, secondaryApp, database as default };
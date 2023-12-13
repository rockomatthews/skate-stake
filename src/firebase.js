// Import the functions you need from the SDKs you need
import firebase from "firebase/app";
import 'firebase/firestore';
import 'firebase/auth';

// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBYUsbBy6LTRx_5hDPJ7dA1idFT_h_GZHU",
  authDomain: "skate-stake.firebaseapp.com",
  databaseURL: "https://skate-stake-default-rtdb.firebaseio.com",
  projectId: "skate-stake",
  storageBucket: "skate-stake.appspot.com",
  messagingSenderId: "470259801734",
  appId: "1:470259801734:web:9f4dd00b1d164f0240fb07",
  measurementId: "G-07R91LQ6R3"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export default firebase;
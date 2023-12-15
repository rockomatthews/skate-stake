import { initializeApp } from 'firebase/app';
// import { getAnalytics } from "firebase/analytics";
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
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
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };
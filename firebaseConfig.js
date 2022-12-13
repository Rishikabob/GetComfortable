import { initializeApp } from 'firebase/app';
import { getAnalytics } from "firebase/analytics";

// Optionally import the services that you want to use
import {firebaseAuth} from "firebase/auth";
import {firebaseDatabase} from "firebase/database";
// import {...} from "firebase/firestore";
// import {...} from "firebase/functions";
// import {...} from "firebase/storage";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBoqjtlni6uTYZAcOFaWryjs7vl3Ivo-64",
    authDomain: "get-comfortable.firebaseapp.com",
    projectId: "get-comfortable",
    storageBucket: "get-comfortable.appspot.com",
    messagingSenderId: "106556367296",
    appId: "1:106556367296:web:35dc33bbb83e1d24862825",
    measurementId: "G-E5DMHT8G2L"
  };

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
// For more information on how to access Firebase in your project,
// see the Firebase documentation: https://firebase.google.com/docs/web/setup#access-firebase

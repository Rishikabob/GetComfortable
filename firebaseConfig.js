import { initializeApp } from 'firebase/app';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import Constants from 'expo-constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {getAuth} from "firebase/auth";
import {getDatabase} from "firebase/database";



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
const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage),
  });
  
const db = getDatabase();
export {auth, db};

import { StyleSheet, Text, View, Image } from 'react-native'
import React , {useEffect, useRef, useState} from 'react'

import { onAuthStateChanged } from 'firebase/auth';
import { useNavigation } from '@react-navigation/core';
import { ref, get, set, update } from 'firebase/database';
import {db, auth} from "../firebaseConfig"

import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import { setupNotifications } from '../hooks/setupNotifications';





const SplashScreen = (props) => {
  const [expoPushToken, setExpoPushToken] = useState('');

  
  //0 second delay
  const timeout = 0
  const navigation = useNavigation()
  //logic to determine user type and redirect user goes here.
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      
      //TODO: change to redirect based on user type in future also need to change login screen section if this is changed. 
        if (user){
          //register device to user
            setupNotifications().then(token => {
            setExpoPushToken(token)
            console.log("SPLASH TOKEN "+token)
            //set token in user's node
            const dbRef = ref(db, "users/" + user.uid);
            if(token != null) {
              update(dbRef,{token: token})
          }
            get(dbRef).then((snapshot) => {
              const snapshotData = snapshot.val();
              if (snapshotData.accountType === "admin") {
                navigation.replace("AdminHomeScreens", { screen: "AdminHome" });
              } else if (snapshotData.accountType === "mentor") {
                navigation.replace("MentorHomeScreens", {
                  screen: "MentorHome",
                });
              } else if (snapshotData.accountType === "user") {
                navigation.replace("UserHomeScreens", { screen: "UserHome" });
              }
            });
          });
        }
        else {
          setTimeout (() => {
            navigation.replace("AuthScreens", {screen: "Login"})
          }, timeout);
        }
    })
    return unsubscribe
}, [])

  return (
    <View style={styles.container}>
      <Image source={require('../assets/images/logo_white.png')} style={styles.image}/>
    </View>
  )
}

export default SplashScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white'
},
image: {
  resizeMode: 'stretch',
        width:330,
        height:245,
},  
})
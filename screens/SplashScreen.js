import { StyleSheet, Text, View, Image } from 'react-native'
import React , {useEffect} from 'react'

import { onAuthStateChanged } from 'firebase/auth';
import { useNavigation } from '@react-navigation/core';
import { ref, get } from 'firebase/database';
import {db, auth} from "../firebaseConfig"


const SplashScreen = () => {
  //0 second delay
  const timeout = 0
  const navigation = useNavigation()
  //logic to determine user type and redirect user goes here.
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      //TODO: change to redirect based on user type in future also need to change login screen section if this is changed. 
        if (user)
            setTimeout (() => {
              console.log(user.uid)
                    const dbRef = ref(db, 'users/' + user.uid)
                    get(dbRef).then(snapshot => {
                        const snapshotData = snapshot.val()
                        if (snapshotData.accountType === "admin") {
                            navigation.replace("AdminHomeScreens", {screen: "AdminHome"})
                            
                        }
                        else if (snapshotData.accountType === "mentor") {
                            navigation.replace("MentorHomeScreens", {screen: "MentorHome"})
                            
                        }
                        else if (snapshotData.accountType === "user") {
                            navigation.replace("UserHomeScreens", {screen: "UserHome"})
                            
                    }
                })
            }, timeout);
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
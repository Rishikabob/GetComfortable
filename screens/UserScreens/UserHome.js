import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { auth } from '../../firebaseConfig'
import { useNavigation } from '@react-navigation/core';
import AdminTopBar from '../../componenets/AdminComponents/AdminTopBar';
import AdminCalendar from '../../componenets/AdminComponents/AdminCalendar';
import Constants from 'expo-constants';



const UserHome = () => {

    const navigation = useNavigation()

    const handleSignOut = () => {
        auth.signOut()
        .then(() => {
          navigation.replace("AuthScreens", {screen: "Login"})
        })
        .catch(error => alert(error.message))
    }

  return (
    <View style={styles.container}>
      <View style={styles.statusBar}/>
      <AdminTopBar/>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>
            User Home
        </Text>
        <Text style={styles.subHeaderText}>
            Email: {auth.currentUser?.email}
      </Text>
      </View>
      <AdminCalendar/>
    </View>
  )
}

export default UserHome

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
      flex: 1,
      alignItems: 'center',
  },
  button: {
      backgroundColor: "blue",
      width: '60%',
      padding: 15,
      borderRadius: 10,
      alignItems: 'center',
      marginTop: 40,

  },
  buttonText: {
      color: "white",
      fontWeight: '700',
      fontSize: 16,

  },
  statusBar: {
    backgroundColor: '#white',
    height: Constants.statusBarHeight
  },
  headerContainer: {
    marginVertical: 15,
  },
  headerText: {
    fontSize: 14,
    fontWeight: '700',
  },
  subHeaderText: {
    fontSize: 34,
    fontWeight: '700',
  },
  calenderContainer: {
    width: "95%",
    backgroundColor: "white",
    shadowColor: '#171717',
    shadowOffset: {width: 0, height: 5},
    shadowOpacity: 0.25,
    shadowRadius: 3,
    borderRadius:10,
    
  }
})
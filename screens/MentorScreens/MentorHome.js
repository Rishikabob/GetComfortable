import { StatusBar, StyleSheet, Text, TouchableOpacity, View,  } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { auth } from '../../firebaseConfig'
import Constants from 'expo-constants'
import AdminCalendar from '../../componenets/AdminComponents/AdminCalendar'
import AdminTopBar from '../../componenets/AdminComponents/AdminTopBar'
const MentorHome = () => {
    const navigation = useNavigation()
  return (
    <View style={styles.container}>
      <View style={styles.statusBar}/>
      <AdminTopBar/>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>
            Mentor Home
        </Text>
        <Text style={styles.subHeaderText}>
            Welcome {auth.currentUser?.displayName}
      </Text>
      </View>
      <AdminCalendar/>
    </View>
  )
}

export default MentorHome

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
        paddingLeft: 30,
        alignSelf: 'flex-start',
        marginVertical: 15,
      },
      headerText: {
        fontSize: 14,
        fontWeight: '700',
      },
      subHeaderText: {
        fontSize: 22,
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
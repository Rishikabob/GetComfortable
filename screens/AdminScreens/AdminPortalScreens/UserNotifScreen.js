import { StyleSheet, Text, View, ScrollView, Alert, TouchableOpacity } from 'react-native'
import React, {useState, useEffect}from 'react'
import { db } from '../../../firebaseConfig'
import {ref, onValue, get, set, remove} from "firebase/database";
import AdminNotifListItem from '../../../componenets/AdminComponents/AdminNotifListItem';


const UserNotifScreen = () => {
    const [notifications, setNotifications] = useState([])

    const handleDeleteAll = () => {
        Alert.alert(
            'Clear All Notifications',
            "Are you sure you want to delete ALL NOTIFICATIONS?",
            [
              {
                text: "Delete",
                onPress: () => {

                  const dbRef = ref(db, 'userNotifications/');
                  remove(dbRef);
                },
              },
              {
                text: "Cancel",
                onPress: () => console.log("No Pressed"),
                style: "cancel",
              },
            ],
            { cancelable: false }
          );
    }
    
    const userNotifRef = ref(db,'userNotifications/')
    //fetch and read data from database
    useEffect(() => {
      return onValue(userNotifRef, (snapshot) => {
        let data = snapshot.val() || {};
        let notifications = { ...data };
        setNotifications(notifications);
      });
    }, []);  
    const notifKey = Object.keys(notifications).reverse()
return (
    <View style={styles.container}>
        <TouchableOpacity style={styles.clearButton} onPress = {handleDeleteAll}>
            <Text style={styles.clearText}>
                Clear All Notifications
            </Text>
        </TouchableOpacity>
    <ScrollView style={styles.scrollViewContaienr}
    contentContainerStyle={styles.contentContainerStyle}>
      <View>
      {notifKey.length>0 ? (
        notifKey.map(key => (
        <AdminNotifListItem
        key={key}
        id={key}
        notifItem={notifications[key]}
        reference='userNotifications'
        />
      ))
      ) : (<Text style = {styles.emptyDataText}>No Notifications</Text>)}
      </View>
    </ScrollView>
    
    </View>
  )

}

export default UserNotifScreen

const styles = StyleSheet.create({
    emptyDataText: {
        fontWeight: '700',
        fontSize: 24,
        alignSelf: 'center',
        justifyContent: 'center',
        marginTop:100,
    },  
  container: {
    //backgroundColor: 'white',
    flex: 1,
  },
  scrollViewContaienr: {
    //backgroundColor: 'white',
    paddingTop: 12,
  },
  contentContainerStyle: {
    paddingHorizontal: 20,
    paddingVertical: 5,
  },
  clearButton: {
    alignSelf: 'center',
    alignItems: 'center',
    backgroundColor: '#fc4e4e',
    marginTop: 20,
    padding: 10,
    borderRadius: 10,
  },
  clearText: {
    fontWeight: '700',
    color: 'white',
  },
});
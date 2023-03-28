import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, FlatList, TouchableOpacity, ScrollView } from 'react-native';
import NotifListItem from '../../componenets/NotifListItem';
import { db } from '../../firebaseConfig';
import {ref, onValue, get, set, remove} from "firebase/database";


const NotificationView = () => {
  const [view, setView] = useState('global');
  const [notifications, setNotifications] = useState([])


  const handleViewChange = (newView) => {
    setView(newView);
  };




  useEffect(() => {
    let dbref = null
    if (view === 'global') {
      dbref = ref(db,'globalNotifications/')
      console.log('View is global');
      return onValue(dbref, (snapshot) => {
        let data = snapshot.val() || {};
        let notifications = { ...data };
        setNotifications(notifications);
      });
    } else if (view === 'mentor') {
      dbref = ref(db,'mentorNotifications/')
      console.log('View is mentor');
      return onValue(dbref, (snapshot) => {
        let data = snapshot.val() || {};
        let notifications = { ...data };
        setNotifications(notifications);
      });
    } else if (view === 'user') {
      console.log('View is user');
      dbref = ref(db,'userNotifications/')
      return onValue(dbref, (snapshot) => {
        let data = snapshot.val() || {};
        let notifications = { ...data };
        setNotifications(notifications);
      });
     
    }
    
  }, [view]);



  const notifKey = Object.keys(notifications).reverse()
  return (
    <View>
      <Text style={styles.viewTitle}>Select notification group</Text>
      <TouchableOpacity style={view === 'global' ? styles.selectedButton: styles.button}
      onPress={() => handleViewChange('global')}
      >
        <Text style={view==='global'? styles.selectedButtonText: styles.buttonText}> Global Notifications </Text>
      </TouchableOpacity>
      <TouchableOpacity style={view === 'mentor' ? styles.selectedButton: styles.button}
      onPress={() => handleViewChange('mentor')}
      >
        <Text style={view==='mentor'? styles.selectedButtonText: styles.buttonText}> Mentor Notifications </Text>
      </TouchableOpacity>
      <TouchableOpacity style={view === 'user' ? styles.selectedButton: styles.button}
      onPress={() => handleViewChange('user')}
      >
        <Text style={view==='user'? styles.selectedButtonText: styles.buttonText}> User Notifications </Text>
      </TouchableOpacity>

      
    <View style = {styles.notifContainer}>
      <Text style={styles.viewTitle}>
        {view === 'global'
          ? 'Global Notifications'
          : view === 'mentor'
          ? 'Mentor Notifications'
          : 'User Notifications'}
      </Text>
    <ScrollView style={styles.scrollViewContaienr}
    contentContainerStyle={styles.contentContainerStyle}>
      <View>
      {notifKey.length>0 ? (
        notifKey.map((key) => (
          <NotifListItem
            key={key}
            id={key}
            notifItem={notifications[key]}
          />
        ))
      ) : (
        <Text style={styles.emptyText}>No notifications to display</Text>
      )}
      </View>
    </ScrollView>
      
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  emptyText: {
    fontSize: 20,
    textAlign: 'center',
    marginVertical: 20,
    fontWeight: 'bold',

  },
  notifContainer: {
    backgroundColor: 'white',
    padding: 10,
    margin: 10,
    borderRadius: 10,
  },
  scrollViewContaienr: {
    backgroundColor: '#F2F2F2',
    paddingTop: 12,
    borderRadius: 10,
  },
  contentContainerStyle: {
    paddingHorizontal: 20,
    paddingVertical: 5,

  },
  button: {
    backgroundColor: 'white',
    padding: 15,
    margin: 5,
    borderRadius: 10,
    alignItems: 'center',
  },
  selectedButton: {
    backgroundColor: '#00645F',
    padding: 15,
    margin: 5,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: 'black',
    fontSize: 16,
  },
  selectedButtonText: {
    color: 'white',
    fontSize: 16,
  },
  viewTitle: {
    paddingLeft: 20,
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 5,
  },
});
export default NotificationView

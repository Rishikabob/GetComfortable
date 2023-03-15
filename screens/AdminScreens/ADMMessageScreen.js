import { StyleSheet, Text, View, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native'
import React from 'react'
import AdminTopBar from '../../componenets/AdminComponents/AdminTopBar'
import Constants from 'expo-constants';
import CustomListItem from '../../componenets/CustomListItem';
import { Feather } from '@expo/vector-icons'; 
import AddChatScreen from '../MessageScreens/AddChatScreen';
import { useNavigation } from '@react-navigation/core';
import { async } from '@firebase/util';
import { getAuth, onAuthStateChanged, createUserWithEmailAndPassword,} from 'firebase/auth';
import {db, auth} from "../../firebaseConfig"
import { ref, get, set, onValue, update } from 'firebase/database';
import { useState } from 'react';
import { useEffect } from 'react';
import {Chat, ChannelList, MenuPointHorizontal, Delete} from 'stream-chat-expo'; // Or stream-chat-expo
import { chatApiKey, chatUserId } from '../../chat_config/chatConfig';
import { useAppContext } from '../../AppContext';
import { Ionicons } from '@expo/vector-icons';
import { RectButton , GestureHandlerRootView} from 'react-native-gesture-handler';
import Swipeable from 'react-native-gesture-handler/Swipeable';
const ChannelScreen = props => {
  return null;
}

const ADMMessageScreen = (props) => {

  const { setChannel } = useAppContext();
  const { navigation } = props;
  const auth = getAuth()
  const fbUser = auth.currentUser;
  const userName = fbUser.displayName
  const userID = userName.replace(/ /g,"_") + '_' + fbUser.uid

  const filters = {
    members: {
      '$in': [userID]
    },
  };
  const sort = {
    last_message_at: -1,
  };

  return (
    <View style={styles.container}>
      <View style={styles.statusBar}/>
      <AdminTopBar/>
      <View style={styles.header}>
      <View style={styles.fillerContainer}>

      </View>
        <Text style={styles.headerText}>Messages</Text>
        <TouchableOpacity style={styles.iconContainer} onPress={() => navigation.navigate('NewChatModal')}>
          <Ionicons style={styles.icon} name="create-outline" size={30} color="black" />
        </TouchableOpacity>
        
      </View>
      <ChannelList
      onSelect={(channel) => {
        
        setChannel(channel);
        navigation.navigate('ChannelScreen');
      }}
      filters={filters}
      sort={sort}
    />


      
    </View>
  )
}

export default ADMMessageScreen

const styles = StyleSheet.create({
  newChatContainer: {
    backgroundColor: 'white',
    alignItems: 'flex-end'
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    // borderBottomColor: 'gray',
    // borderBottomWidth: 1,
    // borderTopWidth: 1,
  },
  headerText: {
    alignSelf: 'center',
    //width:'33%',
    fontSize: 24,
    fontWeight: '700',
    //backgroundColor: 'blue',
  }, 
  fillerContainer: {
    width: 50,
    //backgroundColor: 'red',
  } ,
  iconContainer: {
    //backgroundColor: 'green',

  },
  icon: {
    padding: 10,

  },
  container: {
      flex: 1,
  },
  statusBar: {
    backgroundColor: 'white',
    height: Constants.statusBarHeight
  },
  leftSwipeableButton: {
    paddingLeft: 16,
    paddingRight: 8,
    paddingVertical: 20,
  },
  rightSwipeableButton: {
    paddingLeft: 8,
    paddingRight: 16,
    paddingVertical: 20,
  },
  swipeableContainer: {
    height: 1000,
    alignItems: 'center',
    flexDirection: 'row',
  },
})

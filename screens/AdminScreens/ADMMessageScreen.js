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
import {Chat, ChannelList} from 'stream-chat-expo'; // Or stream-chat-expo
import { chatApiKey, chatUserId } from '../../chat_config/chatConfig';
import { useAppContext } from '../../AppContext';
const ChannelScreen = props => {
  return null;
}

const ADMMessageScreen = (props) => {
  // const { setChannel } = useAppContext();

  // const filters = {
  //   members: {
  //     '$in': [chatUserId]
  //   },
  // };
  // const sort = {
  //   last_message_at: -1,
  // };

  // return (
  //   <View style={styles.container}>
  //     <View style={styles.statusBar}/>
  //     <AdminTopBar/>
  //     <ChannelList
  //     onSelect={(channel) => {
  //       const { navigation } = props;
  //       setChannel(channel);
  //       navigation.navigate('ChannelScreen');
  //     }}
  //     filters={filters}
  //     sort={sort}
  //   />
  //   </View>
  // )
}

export default ADMMessageScreen

const styles = StyleSheet.create({
  newChatContainer: {
    backgroundColor: 'white',
    alignItems: 'flex-end'
  },
  iconContainer: {
    padding: 10,
    marginRight:15
  },
  container: {
      flex: 1,
  },
  statusBar: {
    backgroundColor: 'white',
    height: Constants.statusBarHeight
  },
})

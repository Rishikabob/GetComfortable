import {Animated, StyleSheet, Text, View, TouchableOpacity,Pressable } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/core';
import { Ionicons } from '@expo/vector-icons'; 
import { LinearGradient } from 'expo-linear-gradient';
import SettingItems from '../../componenets/SettingItems';
import { auth } from '../../firebaseConfig';
import { StreamChat } from 'stream-chat';
import { chatApiKey} from '../../chat_config/chatConfig'
import { getAuth } from 'firebase/auth';
import { ref, update } from 'firebase/database';
import { db } from '../../firebaseConfig';



const UserSettings = () => {
  const navigation = useNavigation()

  const handleSignOut = async () => {
    const chatClient = StreamChat.getInstance(chatApiKey);

      await chatClient.disconnectUser();
      //unlink notif token from user
      const auth = getAuth()
      const user = auth.currentUser
      const dbRef = ref(db, "users/" + user.uid);
      update(dbRef,{token: ''})

      auth.signOut()
      .then(() => {
        navigation.pop(2)
        navigation.replace("AuthScreens", {screen: "Login"}
        )
      })
      .catch(error => alert(error.message))
  }

    const settingOptions=[
      {title:'Edit Name', subTitle: null, icon: 'pencil-outline', onPress: () => {}},
      {title:'Change Password', subTitle: null, icon: 'lock-closed-outline', onPress: () => {}},
      {title:'Sign Out', subTitle: null, icon: 'exit-outline', onPress: handleSignOut},
    ];

  return (
    <SettingItems settingOptions = {settingOptions}/>
  )
}

export default UserSettings

const styles = StyleSheet.create({
  container: {
    flex:1,
    alignItems: 'center',
    justifyContent: 'center',
  },
})
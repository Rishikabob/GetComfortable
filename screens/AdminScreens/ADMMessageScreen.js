import { StyleSheet, Text, View, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native'
import React from 'react'
import AdminTopBar from '../../componenets/AdminComponents/AdminTopBar'
import Constants from 'expo-constants';
import CustomListItem from '../../componenets/CustomListItem';
import { Feather } from '@expo/vector-icons'; 
import AddChatScreen from '../MessageScreens/AddChatScreen';
import { useNavigation } from '@react-navigation/core';




const ADMMessageScreen = () => {
  const navigation = useNavigation()
  return (
    <View style={styles.container}>
      <View style={styles.statusBar}/>
      <AdminTopBar/>
      <View style={styles.newChatContainer}>
        <View style={styles.iconContainer}>
          <TouchableOpacity onPress={() => navigation.navigate(AddChatScreen)}>
          <Feather name="edit" size={26} color="black" />
          </TouchableOpacity>
          
        </View>
        
      </View>
      <SafeAreaView>
        <ScrollView>
          <CustomListItem/>
        </ScrollView>
      </SafeAreaView>
        
    </View>
  )
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

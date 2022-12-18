import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/core';

const AdminTopBar = () => {
      const navigation = useNavigation()
  return (
    <View style = {styles.topBarContainer}>
        <TouchableOpacity onPress={() => 
        navigation.navigate("AdminHome", {screen: "AdminHomeScreen"})}>
            <Ionicons name="home" size={40} color="#00645F"/>
        </TouchableOpacity>
        <TouchableOpacity>
            <Ionicons name="search" size={40} color="#00645F"/>
        </TouchableOpacity>
        <TouchableOpacity>
            <Ionicons name="notifications" size={40} color="#00645F"/>
        </TouchableOpacity>
        <TouchableOpacity>
            <Ionicons name="md-person-circle" size={40} color="#00645F"/>
        </TouchableOpacity>
      </View>
  )
}

export default AdminTopBar

const styles = StyleSheet.create({
    topBarContainer: {
        alignSelf: 'stretch',
        height: 52,
        flexDirection: 'row', // row
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'space-between', // center, space-around
        paddingLeft: 10,
        paddingRight: 10,
        shadowColor: '#171717',
        shadowOffset: {width: 0, height: 6},
        shadowOpacity: 0.10,
        shadowRadius: 3,
      },
})
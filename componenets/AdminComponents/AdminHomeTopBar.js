import { StyleSheet, Text,TouchableOpacity, View } from 'react-native'
import React, { useRef } from 'react'
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/core';
import UserModal from '../../screens/Settings/UserSettings';


const AdminHomeTopBar = () => {
    const navigation = useNavigation()
    
  return (
      <View style = {styles.topBarContainer}>
        <View style={styles.iconsLeftContainer}>
        <TouchableOpacity onPress={() => 
        navigation.openDrawer()}>
            <Ionicons name="ios-menu" size={37} color="#00645F"/>
        </TouchableOpacity>
        </View>
        <View style={styles.iconsRightContainer}>
        <TouchableOpacity>
            <Ionicons name="notifications" size={37} color="#00645F"/>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => 
            
            navigation.navigate('User Settings')}>
            <Ionicons name="md-person-circle" size={37} color="#00645F"/>
        </TouchableOpacity>
        </View>
      </View>
  )
}

export default AdminHomeTopBar

const styles = StyleSheet.create({
    iconsLeftContainer: {
        //backgroundColor:'blue',
    },
    iconsRightContainer: {
        //backgroundColor:'red',
        flexDirection:'row',
        justifyContent: 'space-between',
        width:'30%',
        paddingRight:10
    },
    topBarContainer: {
        alignSelf: 'stretch',
        height: 47,
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
        elevation: 3
      },
})
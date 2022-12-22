import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ManageUsers from '../../screens/AdminScreens/AdminPortalScreens/ManageUsers';
const ManageUsersNavigator = () => {
    
const ManageUsersStack = createNativeStackNavigator()

  return (
    <ManageUsersStack.Navigator>
        <ManageUsersStack.Screen options={{headerShown: false}} name = "ManageUsers" component={ManageUsers}/>
    </ManageUsersStack.Navigator>

  )
}

export default ManageUsersNavigator

const styles = StyleSheet.create({})
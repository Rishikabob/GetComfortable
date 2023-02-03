import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ManageUsers from '../../screens/AdminScreens/AdminPortalScreens/ManageUsers';
import AddUserModal from '../../screens/AdminScreens/AdminPortalScreens/AddUserModal';
const ManageUsersNavigator = () => {
    
const ManageUsersStack = createNativeStackNavigator()

  return (
    <ManageUsersStack.Navigator>
        <ManageUsersStack.Screen options={{headerShown: false}} name = "ManageUsers" component={ManageUsers}/>
        <ManageUsersStack.Group  screenOptions={{ presentation:'modal', headerTintColor: '#00645F'}}>
          <ManageUsersStack.Screen options={{title: 'Create an Account'}} name = "Add User"  component={AddUserModal} />
        </ManageUsersStack.Group>
    </ManageUsersStack.Navigator>

  )
}

export default ManageUsersNavigator

const styles = StyleSheet.create({})
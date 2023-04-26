import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ManageUsers from '../../screens/AdminScreens/AdminPortalScreens/ManageUsers';
import AddUserModal from '../../screens/AdminScreens/AdminPortalScreens/AddUserModal';
import ViewUsersScreen from '../../screens/AdminScreens/AdminPortalScreens/ViewUsersScreen';
import ViewMentorsScreen from '../../screens/AdminScreens/AdminPortalScreens/ViewMentorsScreen';
import ViewAdminsScreen from '../../screens/AdminScreens/AdminPortalScreens/ViewAdminsScreen';
import ReactivateUserScreen from '../../screens/AdminScreens/AdminPortalScreens/ReactivateUserScreen';
import DeactivateUserScreen from '../../screens/AdminScreens/AdminPortalScreens/DeactivateUserScreen';
const ManageUsersNavigator = () => {
    
const ManageUsersStack = createNativeStackNavigator()

  return (
    <ManageUsersStack.Navigator>
        <ManageUsersStack.Screen options={{headerShown: false}} name = "ManageUsers" component={ManageUsers}/>
        <ManageUsersStack.Group  screenOptions={{ presentation:'modal', headerTintColor: '#00645F'}}>
          <ManageUsersStack.Screen options={{title: 'Create an Account'}} name = "Add User"  component={AddUserModal} />
          <ManageUsersStack.Screen options={{title: 'All Parent Users'}} name = "ViewUsers"  component={ViewUsersScreen} />
          <ManageUsersStack.Screen options={{title: 'All Mentors'}} name = "ViewMentors"  component={ViewMentorsScreen} />
          <ManageUsersStack.Screen options={{title: 'All Admins'}} name = "ViewAdmins"  component={ViewAdminsScreen} />
          <ManageUsersStack.Screen options={{title: 'Reactivate User'}} name = "ReactivateUser"  component={ReactivateUserScreen} />
          <ManageUsersStack.Screen options={{title: 'Deactivate User'}} name = "DeactivateUser"  component={DeactivateUserScreen} />
        </ManageUsersStack.Group>
    </ManageUsersStack.Navigator>

  )
}

export default ManageUsersNavigator

const styles = StyleSheet.create({})
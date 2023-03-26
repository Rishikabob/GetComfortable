import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ManageNotifications from '../../screens/AdminScreens/AdminPortalScreens/ManageNotifications';
import NewNotifScreen from '../../screens/AdminScreens/AdminPortalScreens/NewNotifScreen';
import GlobalNotifScreen from '../../screens/AdminScreens/AdminPortalScreens/GlobalNotifScreen';
import MentorNotifScreen from '../../screens/AdminScreens/AdminPortalScreens/MentorNotifScreen';
import UserNotifScreen from '../../screens/AdminScreens/AdminPortalScreens/UserNotifScreen';

const ManageNotificationsNavigator = () => {
    const ManageNotificationsStack = createNativeStackNavigator()
  return (
    <ManageNotificationsStack.Navigator>
        <ManageNotificationsStack.Screen options={{headerShown: false}}name = "ManageNotifications" component={ManageNotifications}/>
        <ManageNotificationsStack.Screen options={{headerTintColor: '#00645F'}} name = "New Notification" component={NewNotifScreen}/>
        <ManageNotificationsStack.Screen options={{headerTintColor: '#00645F'}} name = "Global Notifications" component={GlobalNotifScreen}/>
        <ManageNotificationsStack.Screen options={{headerTintColor: '#00645F'}} name = "Mentor Notifications" component={MentorNotifScreen}/>
        <ManageNotificationsStack.Screen options={{headerTintColor: '#00645F'}} name = "User Notifications" component={UserNotifScreen}/>
    </ManageNotificationsStack.Navigator>
  )
}

export default ManageNotificationsNavigator

const styles = StyleSheet.create({})
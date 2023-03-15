import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ManageCalendar from '../../screens/AdminScreens/AdminPortalScreens/ManageCalendar';
import GlobalEvents from '../../screens/AdminScreens/AdminPortalScreens/GlobalEvents';
import MentorEvents from '../../screens/AdminScreens/AdminPortalScreens/MentorEvents';
import UserEvents from '../../screens/AdminScreens/AdminPortalScreens/UserEvents';
import EditGlobalEvents from '../../screens/AdminScreens/AdminPortalScreens/EditGlobalEvents';

const ManageCalendarNavigator = () => {
    const ManageCalendarStack = createNativeStackNavigator()

  return (
    <ManageCalendarStack.Navigator>
        <ManageCalendarStack.Screen options={{headerShown: false}} name = "Manage Calendar" component={ManageCalendar}/>
        <ManageCalendarStack.Screen options={{headerShown: true, headerTintColor: '#00645F'}} name = "Manage Global Events" component={GlobalEvents}/>
        <ManageCalendarStack.Screen options={{headerShown: true, headerTintColor: '#00645F'}} name = "Manage Mentor Events" component={MentorEvents}/>
        <ManageCalendarStack.Screen options={{headerShown: true, headerTintColor: '#00645F'}} name = "Manage User Events" component={UserEvents}/>
        <ManageCalendarStack.Group  screenOptions={{ presentation:'modal', headerTintColor: '#00645F'}}>
          <ManageCalendarStack.Screen options={{title: 'Add Global Event'}} name = "Edit Global Event"  component={EditGlobalEvents} />
        </ManageCalendarStack.Group>
    </ManageCalendarStack.Navigator>
  )
}

export default ManageCalendarNavigator

const styles = StyleSheet.create({})
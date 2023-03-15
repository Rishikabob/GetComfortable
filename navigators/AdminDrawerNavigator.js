import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { createDrawerNavigator, DrawerItem, DrawerItemList, DrawerContentScrollView } from '@react-navigation/drawer'
import AdminTabsNavigator from './AdminTabsNavigator'
import AdminHome from '../screens/AdminScreens/AdminHome'
import Constants from 'expo-constants';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/core';
import ManageUsersNavigator from './drawerStacks/ManageUsersNavigator'
import ManageFormsNavigator from './drawerStacks/ManageFormsNavigator'
import ManageCalendarNavigator from './drawerStacks/ManageCalendarNavigator'




const AdminDrawerNavigator = () => {
 
    const AdminDrawer = createDrawerNavigator()
    

  
  return (
    
   
    <AdminDrawer.Navigator drawerContent={props => <DrawerView {...props}/>} screenOptions={() => ({
      drawerActiveBackgroundColor: '#00645F',
      drawerActiveTintColor:'#FFFFFF',
      drawerInactiveTintColor: '#333',
      headerShown: false,
      //swipeEdgeWidth: 0,   
      drawerLabelStyle: {
        fontSize: 16.7,
        fontWeight: '700', 
        paddingVertical: 10,
        marginLeft: -20,
      }
  })}>
      <AdminDrawer.Screen options={{
      drawerIcon: ({color}) => (
        <Ionicons name="home-outline" size={22} color={color} />
      ),
      title: 'Home',
    }}name ="AdminBottomTabs" component={AdminTabsNavigator}/> 
      <AdminDrawer.Screen options={{
      drawerIcon: ({color}) => (
        <Ionicons name="notifications-outline" size={22} color={color} />
      ),
      headerShown: true,
      headerTitleAlign: 'center',
      title: 'Notifications',
      headerTintColor: '#00645F',
    }}name ="CreateNewNotifScreens" component={ManageUsersNavigator}/> 
    <AdminDrawer.Screen options={{
      drawerIcon: ({color}) => (
        <Ionicons name="person-outline" size={22} color={color} />
      ),
      headerShown: true,
      headerTitleAlign: 'center',
      title: 'Users',
      headerTintColor: '#00645F',
    }}name ="ManageUsersScreens" component={ManageUsersNavigator}/>  
    <AdminDrawer.Screen options={{
      drawerIcon: ({color}) => (
        <Ionicons name="clipboard-outline" size={22} color={color} />
      ),
      headerShown: true,
      headerTitleAlign: 'center',
      title: 'Forms',
      headerTintColor: '#00645F',
    }}name ="ManageFormsScreens" component={ManageFormsNavigator}/>  
    <AdminDrawer.Screen options={{
      drawerIcon: ({color}) => (
        <Ionicons name="calendar-outline" size={22} color={color} />
      ),
      headerShown: true,
      headerTitleAlign: 'center',
      title: 'Calendars',
      headerTintColor: '#00645F',
    }}name ="UpdateCalendarScreens" component={ManageCalendarNavigator}/>  
    <AdminDrawer.Screen options={{
      drawerIcon: ({color}) => (
        <Ionicons name="newspaper-outline" size={22} color={color} />
      ),
      headerShown: true,
      headerTitleAlign: 'center',
      title: 'Reports',
      headerTintColor: '#00645F',
    }}name ="ManageReportsScreens" component={ManageUsersNavigator}/>   
      
    </AdminDrawer.Navigator>
    
  )
}
function DrawerView(props) {
  const navigation = useNavigation()
  return (
    
    <View {...props}>
    <View style={styles.statusBar}/>
    <View style={styles.headerContainer}>
      <Text style={styles.headerText}>
        Admin Portal
      </Text>
    </View>
    <View style = {styles.listContainer}>
      <DrawerItemList {...props} style={{height: 409}}/>
    </View>
    </View>
    
   
  )
}
export default AdminDrawerNavigator

const styles = StyleSheet.create({
  container: {
    flex:1,
  },
  statusBar: {
    backgroundColor: '#BDDFDE',
    height: Constants.statusBarHeight
  },
  headerContainer: {
    height: 90,
    backgroundColor: '#BDDFDE',
    alignItems: 'center',
    justifyContent: 'center'

  },
  headerText: {
    color: '#00645F',
    fontWeight: '700',
    fontSize: 30,
  },
  optionsContainer:{
    flex: 1,
    flexDirection: 'column',
    justifyContent:'space-evenly',
  },
  optionsTouchable: {
    alignSelf: 'stretch',
    flexDirection:'row',
    alignItems: 'center',
    justifyContent:'space-between',
    paddingVertical: 30,
    paddingHorizontal: 10,
    marginHorizontal:5,
    backgroundColor:'white',
    borderRadius:10,
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0.10,
    shadowRadius: 10,
  },
  optionsText: {
    fontWeight: '700',
    fontSize: 17,
  },
  listContainer: {
    paddingTop: 15,
  },
})
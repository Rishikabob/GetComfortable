import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer'
import AdminTabsNavigator from './AdminTabsNavigator'
import AdminHome from '../screens/AdminScreens/AdminHome'
import Constants from 'expo-constants';
import { Ionicons } from '@expo/vector-icons';


const AdminDrawerNavigator = () => {
    const AdminDrawer = createDrawerNavigator()
  return (
    <AdminDrawer.Navigator drawerContent={props => <DrawerView {...props}/>} screenOptions={() => ({
      headerShown: false,
      swipeEdgeWidth: 0,
      
  })}>
      <AdminDrawer.Screen name ="AdminBottomTabs" component={AdminTabsNavigator}/> 
      <AdminDrawer.Screen name ="AdminHomeScreen" component={AdminHome}/> 
    </AdminDrawer.Navigator> 
  )
}
function DrawerView() {
  return (
    
    <View style={styles.container}>
      <View style={styles.statusBar}/>
      <View style={styles.headerContainer}>
          <Text style={styles.headerText}>
              Admin Portal
          </Text>
      </View>
      <View style={styles.optionsContainer}>
        <TouchableOpacity style={styles.optionsTouchable}>
          <Text style={styles.optionsText}>
            Create New Notification
          </Text>
          <Ionicons name="md-caret-forward-outline" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.optionsTouchable}>
          <Text style={styles.optionsText}>
            Manage Users
          </Text>
          <Ionicons name="md-caret-forward-outline" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.optionsTouchable}>
          <Text style={styles.optionsText}>
            Manage Forms
          </Text>
          <Ionicons name="md-caret-forward-outline" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.optionsTouchable}>
          <Text style={styles.optionsText}>
            Update Calender
          </Text>
          <Ionicons name="md-caret-forward-outline" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.optionsTouchable}>
          <Text style={styles.optionsText}>
            Manage Reports
          </Text>
          <Ionicons name="md-caret-forward-outline" size={24} color="black" />
          
        </TouchableOpacity>
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
    height:"10%",
    backgroundColor: '#BDDFDE',
    alignItems: 'center',
    justifyContent: 'center'

  },
  headerText: {
    color: '#00645F',
    fontWeight: '700',
    fontSize: 24,
    paddingBottom:0,
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
})
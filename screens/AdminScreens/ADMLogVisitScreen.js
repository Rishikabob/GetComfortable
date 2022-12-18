import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import AdminTopBar from '../../componenets/AdminTopBar'
import Constants from 'expo-constants';


const ADMLogVisitScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.statusBar}/>
      <AdminTopBar/>
      <Text>ADMLogVisitScreen</Text>
    </View>
  )
}

export default ADMLogVisitScreen

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
      flex: 1,
      alignItems: 'center',
  },
  statusBar: {
    backgroundColor: '#white',
    height: Constants.statusBarHeight
  },
})

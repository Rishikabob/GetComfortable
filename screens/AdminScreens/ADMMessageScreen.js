import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import AdminTopBar from '../../componenets/AdminComponents/AdminTopBar'
import Constants from 'expo-constants';


const ADMMessageScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.statusBar}/>
      <AdminTopBar/>
      <Text>ADMMessageScreen</Text>
    </View>
  )
}

export default ADMMessageScreen

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

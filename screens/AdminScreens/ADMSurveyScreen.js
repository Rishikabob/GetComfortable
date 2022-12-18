import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import AdminTopBar from '../../componenets/AdminTopBar'
import Constants from 'expo-constants';


const ADMSurveyScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.statusBar}/>
      <AdminTopBar/>
      <Text>ADMSurveyScreen</Text>
    </View>
  )
}

export default ADMSurveyScreen

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
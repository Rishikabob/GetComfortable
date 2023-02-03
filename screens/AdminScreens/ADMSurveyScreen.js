import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import WebView from 'react-native-webview'
import AdminTopBar from '../../componenets/AdminComponents/AdminTopBar'
import Constants from 'expo-constants';


const ADMSurveyScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.statusBar}/>
      <AdminTopBar/>
      <Text>ADMSurveyScreen</Text>
      {/* <SafeAreaView style={{flex: 1}}>
       <WebView style={styles.webViewContainer} originWhitelist={['*']} source={{ uri: 'https://form.jotform.com/230333726370147' }} />
      </SafeAreaView> */}
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
  webViewContainer: {
    width: 400,
    height: 200
  },
})
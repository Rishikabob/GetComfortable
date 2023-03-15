import { StyleSheet, Text, View, Dimensions, KeyboardAvoidingView } from 'react-native'
import React from 'react'
import AdminTopBar from '../../componenets/AdminComponents/AdminTopBar'
import Constants from 'expo-constants';
import WebView from 'react-native-webview';



const ADMLogVisitScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.statusBar}/>
      <AdminTopBar/>
      
      <KeyboardAvoidingView
      style={styles.webViewContainer}
      behavior="padding"
      enabled={Platform.OS === "android"}
    >
        
              <WebView source={{ uri: 'https://form.jotform.com/222266105904147'}} />
              </KeyboardAvoidingView>
            
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
  webViewContainer: {
    borderWidth:5,
    
    borderColor: '#00645F',
    width: Dimensions.get('window').width,
    height: (Dimensions.get('window').height)- 150,
},
})

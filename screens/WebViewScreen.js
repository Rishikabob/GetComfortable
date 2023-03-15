import { StyleSheet, Text, View, Dimensions, KeyboardAvoidingView } from 'react-native'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import WebView from 'react-native-webview';



const WebViewScreen = ({ route, navigation }) => {
    const { title, link } = route.params;


    

    //change header options
    useLayoutEffect(() => {
        navigation.setOptions({
            title: title,
        })
    },[])

        return (
            
            <View style={styles.container}>
                <KeyboardAvoidingView
      style={styles.container}
      behavior="padding"
      enabled={Platform.OS === "android"}
    >
 <WebView source={{ uri: link}} onError={(syntheticEvent) => {
                const { nativeEvent } = syntheticEvent;
                console.warn('WebView error: ', nativeEvent);
                    }}/>
</KeyboardAvoidingView>
        
              
            </View>
          )
  
}

export default WebViewScreen

const styles = StyleSheet.create({
    
    container: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height- 150,
    },
})
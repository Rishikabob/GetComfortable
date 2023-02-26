import { StyleSheet, Text, TextInput, TouchableOpacity, View, KeyboardAvoidingView } from 'react-native'
import React, { useEffect, useState } from 'react';
import { Ionicons } from '@expo/vector-icons'; 
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
//import * as Linking from 'expo-linking';
//import {ref, set, push} from "firebase/database"
//import {db} from "../../../firebaseConfig"

const ForgotPassScreen = () => {

  const [email,setEmail] = useState('Enter email address')

  return (
    <KeyboardAwareScrollView style={styles.container}>
      <View style={styles.innerContainer}>
        <TextInput placeholder="Enter email"  placeholderTextColor="gray" style={styles.textInput} 
        onChangeText = {text => setEmail(text)}
        />
        
        <TouchableOpacity style={styles.submitButtonContainer}>
           {/*</View>onPress= {()=> handleCreateSurvey() }> */}
          <Text style={styles.buttonText}>
            Send Reset Link
          </Text>
       </TouchableOpacity>
      </View>
    </KeyboardAwareScrollView>
    
  )
}



export default ForgotPassScreen

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width:28,
    height:28,
    borderRadius:10,
    opacity:0.8,
    backgroundColor: '#FF3434',
},
textInput: {
  height: 40,
  borderColor: '#000000',
  borderWidth: 1,
  borderRadius: 7,
  marginBottom: 20,
  color: 'black',
  fontSize: 16,
  paddingHorizontal: 15,
  fontWeight:'500',
},
innerContainer: {
  padding: 24,
  flex: 1,
  justifyContent: 'space-around',
},
submitButtonContainer: {
  marginTop: 25,
  alignSelf: 'center',
  alignItems: 'center',
  padding:10,
  backgroundColor: '#00645F',
  width: '80%',
  borderRadius: 5,
  zIndex: -5,
},
buttonText: {
  color: 'white',
  fontWeight: '600',
  fontSize: 20,
},
linkContainer: {
  marginVertical: -10,
  padding: 10,

  width: '40%',
},
linkText: {
  color: 'blue',
  fontWeight: '700',
},
})
import { StyleSheet, Text, TextInput, TouchableOpacity, View, KeyboardAvoidingView } from 'react-native'
import React, { useEffect, useState } from 'react';
import { Ionicons } from '@expo/vector-icons'; 
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import * as Linking from 'expo-linking';
import {ref, set, push} from "firebase/database"
import {db} from "../../../firebaseConfig"


const ChangePassScreen = ({}) => {
  const [oldPassword,setOldPassword] = useState('')
  const [subNewPassword,setNewPassword] = useState('')

return (
    <KeyboardAwareScrollView style={styles.container}>
      <View style={styles.innerContainer}>
        <TextInput placeholder="Enter Current Password"  placeholderTextColor="gray" style={styles.textInput} 
        onChangeText = {text => setTitle(text)}/>
        <TextInput placeholder="Enter New Password"  placeholderTextColor="gray" style={styles.textInput} 
        onChangeText = {text => setSubTitle(text)}/>
        <TextInput placeholder="Re-enter New Password"  placeholderTextColor="gray" style={styles.textInput} 
        onChangeText = {text => setSubTitle(text)}/>
        {/* add a comparison between new password inputs to ensure they're the same */}
        
        {/* <TouchableOpacity style={styles.submitButtonContainer} onPress= {()=> handleCreateSurvey() }>
          <Text style={styles.buttonText}>
            Create Survey
          </Text>
        </TouchableOpacity> */}
      </View>
    </KeyboardAwareScrollView>
    
  )
}

export default ChangePassScreen

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
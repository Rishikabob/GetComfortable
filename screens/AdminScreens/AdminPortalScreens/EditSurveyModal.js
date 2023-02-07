import { StyleSheet, Text, TextInput, TouchableOpacity, View, KeyboardAvoidingView } from 'react-native'
import React, { useEffect, useState } from 'react';
import { Ionicons } from '@expo/vector-icons'; 
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import * as Linking from 'expo-linking';
import {ref, set, push} from "firebase/database"
import {db} from "../../../firebaseConfig"


const EditSurveyModal = ({navigation}) => {

  const [title,setTitle] = useState('')
  const [subTitle,setSubTitle] = useState('')
  const [link,setLink] = useState('')
  const [icon,setIcon] = useState('')

  useEffect(() => {
    navigation.setOptions({headerRight: () => (
        <TouchableOpacity style={styles.iconContainer}onPress={() => {navigation.goBack()}}>
            <Ionicons name="ios-close" size={24} color='white' />
        </TouchableOpacity>
        
        )})
}, [navigation])
const handleOpenWithLinking = () =>{
  Linking.openURL("https://ionic.io/ionicons");
}

const handleCreateSurvey = () => {
  var titleValid = false
  var subTitleValid = false
  var linkValid = false
  var iconValid = false
  console.log(title)
  console.log(subTitle)
  console.log(link)
  console.log(icon)
  writeData(title,subTitle,link,icon)
}
function writeData(title, subTitle, link, icon) {
  const dbref = ref(db, "surveys/")
  push(dbref, {
    title: title,
    subTitle: subTitle,
    link: link,
    icon: icon 
  })
}

  return (
    <KeyboardAwareScrollView style={styles.container}>
      <View style={styles.innerContainer}>
        <TextInput placeholder="Title"  placeholderTextColor="gray" style={styles.textInput} 
        onChangeText = {text => setTitle(text)}
        />
        <TextInput placeholder="SubTitle"  placeholderTextColor="gray" style={styles.textInput} 
        onChangeText = {text => setSubTitle(text)}/>
        <TextInput placeholder="Survey Link"  placeholderTextColor="gray" style={styles.textInput} 
        onChangeText = {text => setLink(text)}/>
        <TextInput placeholder="Icon"  placeholderTextColor="gray" style={styles.textInput} 
        onChangeText = {text => setIcon(text)}/>
        <TouchableOpacity style={styles.linkContainer}>
          <Text style={styles.linkText} onPress={() => handleOpenWithLinking()}>Link to icons</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.submitButtonContainer} onPress= {()=> handleCreateSurvey() }>
          <Text style={styles.buttonText}>
            Create Survey
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAwareScrollView>
    
  )
}

export default EditSurveyModal

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
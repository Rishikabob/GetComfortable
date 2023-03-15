import { TextInput, KeyboardAvoidingView, StyleSheet, Pressable,Text, TouchableOpacity, View, Picker } from 'react-native'
import React, { useEffect, useState } from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/core';
import { Ionicons } from '@expo/vector-icons'; 
import { useTogglePasswordVisibility } from '../../../hooks/useTogglePasswordVisibility';
import { LinearGradient } from 'expo-linear-gradient';
import { ScrollView } from 'react-native-gesture-handler';
import {ref, set, push, update} from "firebase/database"
import {db, auth} from "../../../firebaseConfig"
import {getAuth} from "firebase/auth"
import DropDownPicker from 'react-native-dropdown-picker';



const AddUserModal = () => {
    const { passwordVisibility, rightIcon, handlePasswordVisibility } =
    useTogglePasswordVisibility();
    const [email, setEmail] = useState('')
    const [emailError, setEmailError] = useState("")
    const [name, setName] = useState('')
    const [nameError, setNameError] = useState('')
    const navigation = useNavigation()
    const currentAuth = getAuth()
    const [accountError, setAccountError] = useState('')

    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [accountType, setAccountType] = useState([
             {label: 'User', value: 'user'},                  
             {label: 'Mentor', value: 'mentor'},
             {label: 'Admin', value: 'admin'},
               ]);


    useEffect(() => {
        navigation.setOptions({headerRight: () => (
            <TouchableOpacity style={styles.iconContainer}onPress={() => {navigation.goBack()}}>
                <Ionicons name="ios-close" size={24} color='white' />
            </TouchableOpacity>
            
            )})
    }, [navigation])

    const createUser = () => {
      var emailValid = false;
      var nameValid = false;
      var accountValid = false;
      console.log("Create User clicked")
      console.log(name)
      console.log(email)
      console.log(value)
      //email check
      const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
           if (reg.test(email) === true){
              setEmailError("");
              emailValid = true
           }
           else{
            setEmailError("Not a valid email");
           }
      //name check
      if (name.length == 0) {
        setNameError("Name is required")
      } else {
        setNameError("")
        nameValid = true
      }
      //account type check
      if (value == null) {
        setAccountError("Must select an account type")
      } else {
        setAccountError("")
        accountValid = true
      }
      //TODO: Actually do this in DB
      //create account in DB once all info is valid
      if (emailValid && nameValid && accountValid) {
        writeData(name,email,value)
        
        setEmail('')
        setName('')
      }
  }
  function writeData(name, email, accountType) {
    const dbRef = ref(db,'invitedUsers/')
    push(dbRef, {
      email: email,
      name: name,
      accountType: accountType})
      .then(() => alert("Account Created With: " + "\n Name: " + name + "\n Email: " + email + "\n Account Type: " + accountType))
      .catch((error) => alert("Error while creating account. Please make sure you are connected to a network."))

    //add email to public view list 
    //const userListRef = update(ref(db, accountType), email)
    
  }

  return (
    <View style={styles.container}>
        <KeyboardAvoidingView style={styles.KAVcontainer}
    collapsable={Platform.select({ios: 'true', android: null})}
    behavior='padding'
    keyboardVerticalOffset={Platform.select({ios: null, android: -500})}>

        
      <View style={styles.formInputsContainer}>
      <View style={styles.linearGradientInput}
        >
        <TextInput placeholder='Type Name' placeholderTextColor="gray"
        value={name}
        onChangeText = {text => setName(text)} 
        style={styles.input} 
        />
        </View>
        {nameError.length > 0 &&
                  <Text style={styles.errorText}>{nameError}</Text>
                }
      <View
        style={styles.linearGradientInput}
        >
        <TextInput placeholder='Type Email' placeholderTextColor="gray"
        value={email}
        onChangeText = {text => setEmail(text)} 
        style={styles.input} 
        />
        </View>
        {emailError.length > 0 &&
                  <Text style={styles.errorText}>{emailError}</Text>
                }
       
        <View style={styles.dropDownContainer}>
          <Text style={styles.formText}>
            Account Type
          </Text>
        <DropDownPicker
        open={open}
        value={value}
        items={accountType}
        setOpen={setOpen}
        setValue={setValue}
        setItems={setAccountType}
        zIndex={3000}
        zIndexInverse={1000}
        />
        </View>
        {accountError.length > 0 &&
                  <Text style={styles.errorText}>{accountError}</Text>
                }
       
      </View>
      <TouchableOpacity style={styles.button} onPress={createUser}>
        <Text style={styles.buttonText}>
            Create Account
        </Text>
      </TouchableOpacity>
      </KeyboardAvoidingView>
    </View>
  )
}

export default AddUserModal

const styles = StyleSheet.create({
    iconContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        width:28,
        height:28,
        borderRadius:10,
        opacity:0.8,
        backgroundColor: '#FF3434',
    },
    formText: {
      padding:10,
      fontSize: 16,

    },
    errorText: {
      paddingTop: 5,
      color: 'red',
      zIndex: -5,

    },
    dropDownContainer: {
      marginTop:5,
      marginBottom:15,
    },
    KAVcontainer: {
        
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        
        backgroundColor: 'white'
    },
    container: {
        backgroundColor: 'white',
        flex: 1,
    },
    formInputsContainer: {
        width: "80%",
    },
    input: {
        width: '80%',
        color: 'black',
        fontSize: 16,
        paddingHorizontal: 15,
        paddingTop: 10,
        paddingBottom: 10,
        fontWeight:'500',
        
     },  
     linearGradientInput: {
       borderWidth:1,
       borderRadius: 7,
        borderColor: 'black',
        marginTop: 10,
        flexDirection: 'row',
        alignItems: 'center',
    },
    button: {
        marginTop: 25,
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
})
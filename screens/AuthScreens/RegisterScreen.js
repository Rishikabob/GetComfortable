import { StyleSheet, Text, TouchableOpacity, View, Pressable, Alert, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { TextInput } from 'react-native-gesture-handler'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useTogglePasswordVisibility } from '../../hooks/useTogglePasswordVisibility';
import {db, auth} from "../../firebaseConfig"

import { getAuth, onAuthStateChanged, createUserWithEmailAndPassword, updateProfile} from 'firebase/auth';
import { ref, get, set } from 'firebase/database';
import { async } from '@firebase/util';
import { chatApiKey} from '../../chat_config/chatConfig';
import { StreamChat } from 'stream-chat';



const RegisterScreen = (navigation) => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [nameError, setNameError] = useState('')
    const [emailError, setEmailError] = useState("")
    const [passwordError, setPasswordError] = useState("")
    const [confirmPasswordError, setConfirmPasswordError] = useState("")
    let accountType = ''
    const [isLoading, setIsLoading] = useState(false)

    

    const { passwordVisibility, rightIcon, handlePasswordVisibility } =
    useTogglePasswordVisibility();

    //This will be called once the register button is pressed 
    const handleRegister = () => {
        //Before we check if email exists in db, we want to ensure that all the fields are not empty and are correct.
        setIsLoading(true)
        var nameValid = false
        var emailValid = false 
        var passwordValid = false
        var confirmPasswordValid = false 

        //check name
        if (name.length == 0) {
            setNameError("Name is required")
            setIsLoading(false)
        } else {
            setNameError("")
            nameValid = true
          }
        
        //check email
        const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
           if (reg.test(email) === true){
              setEmailError("");
              emailValid = true
           }
           else{
            setEmailError("Not a valid email");
            setIsLoading(false)
           }
        
        // check password
        

        if (password.length >= 8) {
            setPasswordError("");
            passwordValid = true
        } else  {
            setPasswordError("Password must be at least 8 characters long.")
            setIsLoading(false)
        } 
        
        //check confirm pass
        if (password === confirmPassword) {
            setConfirmPasswordError("");
            confirmPasswordValid = true
        } else {
            setConfirmPasswordError("Passwords do not match")
            setIsLoading(false)
        }

        // if all are valid, continue
        if (emailValid && nameValid && passwordValid && confirmPasswordValid) {
            //console.log(name,email, password, confirmPassword)
            // function defined below to check if email is in the invitedUsers List.
            // .then() is used to ensure that checkEmailExists ran AND returned something. Without this,
            // checkEmailExists will sometimes return undefined since it is not waiting for the DB get function
            // to finish. 
            checkEmailExists(email).then(result => {
                // If email is in invitedUsers then, create an account with that email, 
                // set account type to the correct one and then navigate to the correct
                // navigation stack
                if (result) {
                    console.log("Registering : " +  name + " with email: " + email + " and Account Type: " + accountType)
                    const auth = getAuth()
                    //create account
                    createUserWithEmailAndPassword(auth, email, password)
                    //on successfully completion, add user info to Database and 
                    //redirect user to correct set of screens based on account type
                    .then((userCredential) => {
                        const user = userCredential.user;
                        console.log("Created account with EMAIL: ");
                        console.log(user.email);
                        //TODO delete the node where this email is in the invitedUsers list after log in but before redirect. 
                        


                        //then add user to user node in db.

                        
                        writeData(user.uid,name,email,accountType)
                        
                        //direct user to correct stack
                        //TODO: mentor and user are undefined for now. 
                        // if (user &&  accountType === 'user') {
                        //     navigation.replace("UserHomeScreens", {screen: "UserHome"})
                        // } else if (user && accountType === 'mentor') {
                        //     navigation.replace("MentorHomeScreens", {screen: "MentorHome"})
                        // } else if (user && accountType === 'admin') {
                        //     navigation.replace("AdminHomeScreens", {screen: "AdminHome"})
                        // }
                        updateProfile(user, {displayName: name})
                        
                        

                        setTimeout(() => {
                            setIsLoading(false)
                        },2600)
                    })
                }
                // else throw alert saying email not found. 
                else {
                    Alert.alert("Email not found. Please contact your school Admin.")
                    setIsLoading(false)
                }
               
        })
        }
        
    }
    // Function to check if the email given is in the invitedUsers List.
    function checkEmailExists(email) {
        let emailExists = false ;
        //Database reference. This references to the desired db directory 
        const dbRef = ref(db,'invitedUsers/')
        // firebase get. Return is needed before the get in this situation since we want the function call to wait on
        // the get response.
        // .then grabs the snapshot. which is an object with key value pairs
        return get(dbRef).then(snapshot => {
            //for each, iterates through each object and gets each child through childSnapshot
            snapshot.forEach(childSnapshot => {
                // get the actual value of the object using .val() and set to variable
                const childData = childSnapshot.val();
                //since childData is an object. we can still refer to the key value pairs using childData.email, childData.accountType, etc.
                // refer to realtime database console to see how it is stored. 
                // simple check to see if given email matches email in db
                if (childData.email.toLowerCase() === email.toLowerCase()) {
                    //console.log('Match Found! Given: ' + email + ' Actual: ' + childData.email)
                    // once match is found we get the account type and set to accountType variable defined Above . This is the same way we got the email
                    accountType = childData.accountType
                    emailExists = true
                    return emailExists
                    
                }
                
            })
            return emailExists
        }).catch(error => {
            Alert.alert("Could not check email. Please make sure you are connected to a network.")
            console.error(error)
            setIsLoading(false)
            return false;
        })
    }

    function writeData(uid, name, email, accountType) {
        const dbRef = ref(db,'users/' + uid)
        set(dbRef, {
          email: email,
          name: name,
          accountType: accountType

        }).then(() => {
            console.log("data set in db")
        }).catch((error) => {Alert.alert("Error while creating account. Please make sure you are connected to a network.")
        setIsLoading(false)})
      }
    

  return (
    <KeyboardAwareScrollView style={styles.container}>
        <View style={{alignItems: 'center'}}>

        <View style={styles.headerContainer}>
            <Text style={styles.headerText}> Your email must be added by an Administrator before creating a new account. {"\n"}{"\n"}
            Please contact your Administrator for further instructions on creating an account.  
            </Text>
        </View>
        <View style={styles.formOuterContainer}>

        
        <View style={styles.formContainer}>

        <Text style={styles.textInputHeader}>Full Name </Text>
        {nameError.length > 0 &&
                  <Text style={styles.errorText}>{nameError}</Text>
                }
            <View style={{...styles.inputContainer, borderColor: nameError.length > 0 ? 'red' : '#0F6E69'  }}>
                <TextInput style ={styles.textInput} placeholder='Enter Name'
                onChangeText = {text => setName(text)} />
            </View>
        </View>
        <View style={styles.formContainer}>
        <Text style={styles.textInputHeader}>Email</Text>
        {emailError.length > 0 &&
                  <Text style={styles.errorText}>{emailError}</Text>
                }
            <View style={{...styles.inputContainer, borderColor: emailError.length > 0 ? 'red' : '#0F6E69'  }}>
                <TextInput style ={styles.textInput} placeholder='Enter Email'
                value={email}
                onChangeText = {text => setEmail(text)} 
                />
            </View>
        </View>
        <View style={styles.formContainer}>
        <Text style={styles.textInputHeader}>Password</Text>
        {passwordError.length > 0 &&
                  <Text style={styles.errorText}>{passwordError}</Text>
                }
        <View style={{...styles.inputContainer, borderColor: passwordError.length > 0 ? 'red' : '#0F6E69'  }}>
                <TextInput style ={styles.textInput} placeholder='Enter Password'
                name="password"
                value={password}
                onChangeText = {text => setPassword(text)} 
                autoCapitalize="none"
                autoCorrect={false}
                textContentType="password"
                secureTextEntry={passwordVisibility}
                enablesReturnKeyAutomatically
                />
                <Pressable padding={10} onPress={handlePasswordVisibility}>
                    <MaterialCommunityIcons name={rightIcon} size={22} color="black" />
                </Pressable>
            </View>
        </View>     
        <View style={styles.formContainer}>
            <Text style={styles.textInputHeader}>Confirm Password</Text>
            {confirmPasswordError.length > 0 &&
                  <Text style={styles.errorText}>{confirmPasswordError}</Text>
                }
            <View style={{...styles.inputContainer, borderColor: confirmPasswordError.length > 0 ? 'red' : '#0F6E69'  }}>
                <TextInput style ={styles.textInput} placeholder='Re-Enter Password'
                name="confirmPassword"
                value={confirmPassword}
                onChangeText = {text => setConfirmPassword(text)} 
                autoCapitalize="none"
                autoCorrect={false}
                textContentType="password"
                secureTextEntry={passwordVisibility}
                enablesReturnKeyAutomatically
                />
                <Pressable padding={10} onPress={handlePasswordVisibility}>
                    <MaterialCommunityIcons name={rightIcon} size={22} color="black" />
                </Pressable>
            </View>
        </View> 


        <TouchableOpacity style={styles.registerButtonContainer} onPress= {handleRegister} disabled={isLoading}>
        {!isLoading && <Text
        style={styles.registerButtonText}>
            Register
        </Text>}
        {isLoading && <ActivityIndicator style={{padding:4}}size={'small'} color="white"/>}
        </TouchableOpacity>


        </View>
        </View>
    </KeyboardAwareScrollView>
  )
}

export default RegisterScreen

const styles = StyleSheet.create({
    container: {
        
        flex:1,
        
    },
    headerContainer: {
    width: '100%',
    backgroundColor: '#0F6E69',

    },  
    headerText: {
        marginVertical: 15,
        paddingHorizontal: 20,
        textAlign: 'center',
        fontWeight:"700",
        color: 'white',
        fontSize: 15,
    },
    formContainer: {
        marginTop: 10,
    },
    formOuterContainer: {
        width: '70%'
    },
    inputContainer: {
        justifyContent: 'space-between',
        //borderColor: '#0F6E69',
        borderBottomWidth:2.5,
        flexDirection: 'row',
        
    },  
    textInputHeader: {
        paddingBottom: 5,
        color: '#6EB1AF',
        fontWeight: '700',
        fontSize: 12,
        
    },
    textInput : {
        width: "85%",
        fontSize: 14,
        paddingHorizontal: 15,
        paddingVertical: 10,
    },
    registerButtonContainer: {
        margin: 20,
        backgroundColor: "#0F6E69",
        padding: 20,
        width: '80%',
        borderRadius: 10,
        alignItems: 'center', 
    },
    registerButtonText: {
        color: "white",
        fontWeight: '700',
        fontSize: 18,
    },
    errorText: {
        color: 'red',
        fontSize: 12,
      },

})
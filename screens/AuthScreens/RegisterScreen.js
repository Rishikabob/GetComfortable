import { StyleSheet, Text, TouchableOpacity, View, Pressable } from 'react-native'
import React, { useEffect, useState } from 'react'
import { TextInput } from 'react-native-gesture-handler'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useTogglePasswordVisibility } from '../../hooks/useTogglePasswordVisibility';
import {db, auth} from "../../firebaseConfig"

import { getAuth, onAuthStateChanged, createUserWithEmailAndPassword,} from 'firebase/auth';
import { ref, child, get, orderByChild, equalTo } from 'firebase/database';


const RegisterScreen = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const { passwordVisibility, rightIcon, handlePasswordVisibility } =
    useTogglePasswordVisibility();

    //handle register

    const handleRegister = () => {
        //error check email to confirm it is in valid format
        //TODO

        //check if email is in DB under invited users
        const dbRef = ref(db)
        //const invitedUsersRef = ref(db, 'invitedUsers/')
        const invitedUsersRef = query(ref(db, 'invitedUsers/'), orderByChild('email') , equalTo('BOB@GMAIL.COM'));
        const surveyListRef = ref(db,'surveys/')
    //fetch and read data from database
    useEffect(() => {
      return onValue(invitedUsersRef,(snapshot) => {
        let data = snapshot.val() || {};
        console.log(data)
        // let surveys = {...data};
        // setSurveys(surveys)
      });
    }, [])  
        // get(child(dbRef, `invitedUsers/`)).then((snapshot) => {
        //     if (snapshot.exists()) {
        //       console.log(snapshot.val());
        //     } else {
        //       console.log("No data available");
        //     }
        //   }).catch((error) => {
        //     console.error(error);
        //   });


        console.log(name,email, password, confirmPassword)
        //gets current auth token
        const auth = getAuth()
        //created account
        // createUserWithEmailAndPassword(auth, email, password)
        // //on successfully completion, add user info to Database and redirect user to correct set of screens based on account type
        // .then((userCredential) => {
        //     const user = userCredential.user;
        //     console.log("Created In with EMAIL: ");
        //     console.log(user.email);
        // })
        
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
        <Text style={styles.textInputHeader}>Full Name</Text>
            <View style={styles.inputContainer}>
                <TextInput style ={styles.textInput} placeholder='Enter Name'
                onChangeText = {text => setName(text)} />
            </View>
        </View>
        <View style={styles.formContainer}>
        <Text style={styles.textInputHeader}>Email</Text>
            <View style={styles.inputContainer}>
                <TextInput style ={styles.textInput} placeholder='Enter Email'
                value={email}
                onChangeText = {text => setEmail(text)} 
                />
            </View>
        </View>
        <View style={styles.formContainer}>
        <Text style={styles.textInputHeader}>Password</Text>
            <View style={styles.inputContainer}>
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
            <View style={styles.inputContainer}>
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
        <TouchableOpacity style={styles.registerButtonContainer} onPress= {handleRegister}>
            <Text style={styles.registerButtonText}>Register</Text>
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
        borderColor: '#0F6E69',
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

})
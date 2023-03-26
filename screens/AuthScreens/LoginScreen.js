import { ActivityIndicator, TextInput, Image, Pressable, KeyboardAvoidingView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useTogglePasswordVisibility } from '../../hooks/useTogglePasswordVisibility';
import { onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigation } from '@react-navigation/core';
import { useHeaderHeight } from '@react-navigation/elements'
import Constants from 'expo-constants';
import { ref, get, update } from 'firebase/database';
import {db, auth} from "../../firebaseConfig"
import { registerIndieID } from 'native-notify';
import axios from 'axios';
import registerNNPushToken from 'native-notify';
import { setupNotifications } from '../../hooks/setupNotifications';


  
//TODO
// Find a way to make password entry more secure.

const LoginScreen = (props) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const { expoPushToken } = props.route.params;


    const height = useHeaderHeight()
    // eye button for password entry
    const { passwordVisibility, rightIcon, handlePasswordVisibility } =
    useTogglePasswordVisibility();
    
    const navigation = useNavigation()
    
    //listener to check if user is logged in.
    //this works for both registration and log in
    //unsubscribe is used to stop listener.
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, user => {
            
            
            //logic to determine user type and redirect user goes here.
            setTimeout(() => {
                if (user) {
   
                    setupNotifications().then(token => {
                        console.log("Login TOKEN "+token)
                        //set token in user's node
                        const dbRef = ref(db, "users/" + user.uid);
                        //set token in user's node
                        update(dbRef,{token: token})
                        get(dbRef).then((snapshot) => {
                          const snapshotData = snapshot.val();
                          if (snapshotData.accountType === "admin") {
                            navigation.replace("AdminHomeScreens", {
                              screen: "AdminHome",
                            });
                            setIsLoading(false);
                          } else if (snapshotData.accountType === "mentor") {
                            navigation.replace("MentorHomeScreens", {
                              screen: "MentorHome",
                            });
                            setIsLoading(false);
                          } else if (snapshotData.accountType === "user") {
                            navigation.replace("UserHomeScreens", {
                              screen: "UserHome",
                            });
                            setIsLoading(false);
                          }
                        });
                    })

                }
            }, 2500)
            
        })
        return unsubscribe
    }, [])

    

    
    //handles login
    const handleLogin = () => {
        setIsLoading(true)
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            console.log("Logged In with EMAIL: ");
            console.log(user.email);
            
        })
        .catch((error) => {
            setIsLoading(false)
            if (error.code === 'auth/wrong-password') {
                alert('Password is incorrect');
                } else if (error.code === 'auth/network-request-failed') {
                 alert('Please connect to a network to Login');
                } else if (error.code === 'auth/user-not-found') {
                    alert('User doesnt exit. Please contact School Admin');
                } else if (error.code === 'auth/invalid-email') {
                 alert('Invalid E-mail!');
                 // email wrong format
                }
        })
       
        
    }
//Renders the Page
  return (
    <KeyboardAvoidingView
    style={styles.container}
    collapsable={Platform.select({ios: 'true', android: null})}
    behavior="padding"
    keyboardVerticalOffset={Platform.select({ios: 0, android: -500})}
    > 
    <View style={styles.statusBar}/>
    <View style={styles.imageContainer}>
        <Image
            style={styles.logo}
            source={require('../../assets/images/logo_white.png')}
        />

        
    </View>
    <View style={styles.headerContainer}>
    <Text style={styles.headerText}>
    Login
    </Text>
    <Text style={styles.subText}>
    Use your credentials provided by the school to log into 
your account
    </Text>
    </View>
    <View style={styles.inputContainer}>
        <LinearGradient
        colors={['#0F6E69','#6EB1AF']}
        start={{x: 0, y: 0.5}}
        end={{x: 1, y: 0.5}}
        style={styles.linearGradientInput}
        >
        <TextInput placeholder='Type Email'
        placeholderTextColor={'rgba(255, 255, 255, 0.5)'}
        value={email}
        onChangeText = {text => setEmail(text)} 
        style={styles.input} 
        />
        </LinearGradient>
        <LinearGradient
        colors={['#0F6E69','#6EB1AF']}
        start={{x: 0, y: 0.5}}
        end={{x: 1, y: 0.5}}
        style={styles.linearGradientInput}
        >
        <TextInput placeholder='Type Password'
        name="password"
        placeholderTextColor={'rgba(255, 255, 255, 0.5)'}
        value={password}
        onChangeText = {text => setPassword(text)} 
        style={styles.input}
        autoCapitalize="none"
        autoCorrect={false}
        textContentType="password"
        secureTextEntry={passwordVisibility}
        enablesReturnKeyAutomatically
        />
        <Pressable padding={20} onPress={handlePasswordVisibility}>
          <MaterialCommunityIcons name={rightIcon} size={22} color="white" />
        </Pressable>
        </LinearGradient>

    </View>

    <View style={styles.forgotPassContainer}>
        <TouchableOpacity style={styles.forgotPass} onPress={() => 
        navigation.navigate("Forgot Password")
        } >
            <Text style={styles.forgotPassText}>
                Forgot Password?
            </Text>
        </TouchableOpacity>
    </View>

    <View style={styles.buttonContainer}>
        <TouchableOpacity
            onPress={handleLogin}
            style={styles.button}
            disabled={isLoading}
        >
    <LinearGradient
        colors={['#0F6E69','#6EB1AF']}
        start={{x: 0, y: 0.5}}
        end={{x: 1, y: 0.5}}
        style={styles.linearGradientButton}
        >
        {!isLoading && <Text
        style={styles.buttonText}>
            Login
        </Text>}
        {isLoading && <ActivityIndicator style={{padding:4}}size={'small'} color="white"/>}
    </LinearGradient>
        </TouchableOpacity>

    </View>
    <View>
        <Text style={styles.registerText}>
            Need to complete account registration?
        </Text>
        <TouchableOpacity style={styles.registerButton} onPress={() => 
        navigation.navigate("RegisterScreen")}>
            <Text style={styles.registerButtonText}>
                Complete Registration
            </Text>
        </TouchableOpacity>
    </View>

    </KeyboardAvoidingView>

  )
}

export default LoginScreen
//Stylye sheet. This can be here or there can be a global style sheet. May need to transition this into a global one

const styles = StyleSheet.create({
    container: {
        
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white'
    },
    statusBar: {
        backgroundColor: '#white',
        height: Constants.statusBarHeight
      },
    inputContainer: {
        width: '80%'
    },
    input: {
       width: '80%',
       color: 'white',
       fontSize: 14,
       paddingHorizontal: 15,
        paddingVertical: 20,
       
    },
    buttonContainer: {
        marginTop: 10,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    button: {
       
        width: '110%',
        padding: 15,
        borderRadius: 8,
        alignItems: 'center'
        
    },
    buttonText: {
       
        color: 'white',
        fontWeight: '700',
        fontSize: 20,
    },
    linearGradientInput: {
        
        borderRadius: 8,
        marginTop: 20,
        flexDirection: 'row',
        alignItems: 'center',
    },
    linearGradientButton: {
        Height: 70,
        paddingHorizontal: 15,
        paddingVertical: 20,
        borderRadius: 8,
        marginTop: 0,
        marginBottom: 0,
        width: '80%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerContainer: {
    paddingHorizontal: 30,
    },
    headerText: {
        // fontFamily: 'Montserrat',
        fontWeight: '700',
        fontSize: 27,
    },
    subText: {
        paddingTop: 20,
        fontWeight: '700',
        fontSize: 12,
        opacity: 0.6
    },
    imageContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        
    },

    logo: {
        resizeMode: 'stretch',
        width:290,
        height:205,
        marginTop: Constants.statusBarHeight -225
    },

    forgotPassContainer: {
        paddingTop: 5
    },

    forgotPass: {
        paddingTop: 0
    },

    forgotPassText: {
        opacity: 0.6,
        color:'blue',
        fontWeight: '700',
        textDecorationLine: 'underline',
    },
    registerText: {
        padding: 5,
        alignSelf: 'center',
        fontWeight: '700',
    },

    registerButton: {
        backgroundColor: '#0059FF',
        
        padding: 20,
        borderRadius: 10,
        width: '50%',
        alignSelf: 'center'    
    },
    registerButtonText: {
        color: "white",
        fontWeight: "700",
    },


})
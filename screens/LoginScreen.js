import { TextInput, Image, Pressable, KeyboardAvoidingView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useTogglePasswordVisibility } from './hooks/useTogglePasswordVisibility';
import {auth} from "../firebaseConfig"
import { onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigation } from '@react-navigation/core';
  


const LoginScreen = () => {
    const { passwordVisibility, rightIcon, handlePasswordVisibility } =
    useTogglePasswordVisibility();
    
    const navigation = useNavigation()

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, user => {
            if (user)
                navigation.replace("Home")
        })
        return unsubscribe
    }, [])

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    
    const handleLogin = () => {
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            console.log("Logged In with EMAIL: ");
            console.log(user.email);
        })
        .catch((error) => {
            console.log(error)
        })
       
        
    }

  return (
    <KeyboardAvoidingView
    style={styles.container}
    behavior="padding"
    >
    <View style={styles.imageContainer}>
        <Image
            style={styles.logo}
            source={require('../assets/images/logo_white.png')}
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
        <Pressable onPress={handlePasswordVisibility}>
          <MaterialCommunityIcons name={rightIcon} size={22} color="white" />
        </Pressable>
        </LinearGradient>

    </View>

    <View style={styles.forgotPassContainer}>
        <TouchableOpacity style={styles.forgotPass}>
            <Text style={styles.forgotPassText}>
                Forgot Password?
            </Text>
        </TouchableOpacity>
    </View>

    <View style={styles.buttonContainer}>
        <TouchableOpacity
            onPress={handleLogin}
            style={styles.button}
        >
    <LinearGradient
        colors={['#0F6E69','#6EB1AF']}
        start={{x: 0, y: 0.5}}
        end={{x: 1, y: 0.5}}
        style={styles.linearGradientButton}
        >
        <Text
        style={styles.buttonText}>
            Login
        </Text>
    </LinearGradient>
        </TouchableOpacity>

    </View>

    </KeyboardAvoidingView>

  )
}

export default LoginScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white'
    },
    inputContainer: {
        width: '80%'
    },
    input: {
       width: '90%',
       color: 'white',
       fontSize: 14,
       
    },
    buttonContainer: {
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
     
        paddingHorizontal: 15,
        paddingVertical: 20,
        borderRadius: 8,
        marginTop: 40,
        flexDirection: 'row',
        alignItems: 'center',
    },
    linearGradientButton: {
        paddingHorizontal: 15,
        paddingVertical: 20,
        borderRadius: 8,
        marginTop: 20,
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
        marginTop: -150
    },

    forgotPassContainer: {
        
    },

    forgotPass: {
        paddingTop: 15
    },

    forgotPassText: {
        opacity: 0.4,
        color:'light-blue',
        fontWeight: '700',
        textDecorationLine: 'underline',
    },

})
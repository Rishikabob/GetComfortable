import { TextInput, KeyboardAvoidingView, StyleSheet, Pressable,Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/core';
import { Ionicons } from '@expo/vector-icons'; 
import { useTogglePasswordVisibility } from '../../../hooks/useTogglePasswordVisibility';
import { LinearGradient } from 'expo-linear-gradient';
import { ScrollView } from 'react-native-gesture-handler';

const AddUserModal = () => {
    const { passwordVisibility, rightIcon, handlePasswordVisibility } =
    useTogglePasswordVisibility();

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [accountType, setAccountType] = useState('')
    const [name, setName] = useState('')

    const navigation = useNavigation()

    useEffect(() => {
        navigation.setOptions({headerRight: () => (
            <TouchableOpacity style={styles.iconContainer}onPress={() => {navigation.goBack()}}>
                <Ionicons name="ios-close" size={24} color='white' />
            </TouchableOpacity>
            
            )})
    }, [navigation])
  return (
    <ScrollView style={styles.container}>
        <KeyboardAvoidingView style={styles.KAVcontainer}
    collapsable={Platform.select({ios: 'true', android: null})}
    behavior='padding'
    keyboardVerticalOffset={Platform.select({ios: null, android: -500})}>

        
      <View style={styles.formInputsContainer}>
      <View style={styles.linearGradientInput}
        >
        <TextInput placeholder='Type Name'
        value={name}
        onChangeText = {text => setName(text)} 
        style={styles.input} 
        />
        </View>
      <View
        style={styles.linearGradientInput}
        >
        <TextInput placeholder='Type Email'
        value={email}
        onChangeText = {text => setEmail(text)} 
        style={styles.input} 
        />
        </View>
        <View
        style={styles.linearGradientInput}
        >
        <TextInput placeholder='Account Type'
        value={accountType}
        onChangeText = {text => setAccountType(text)} 
        style={styles.input} 
        />
        </View>
        <View
        style={styles.linearGradientInput}
        >
        <TextInput placeholder='Type Password'
        name="password"
        value={password}
        onChangeText = {text => setPassword(text)} 
        style={styles.input}
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
        <View
        style={styles.linearGradientInput}
        >
        <TextInput placeholder='Confirm Password'
        name="password"
        value={confirmPassword}
        onChangeText = {text => setConfirmPassword(text)} 
        style={styles.input}
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
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>
            Create Account
        </Text>
      </TouchableOpacity>
      </KeyboardAvoidingView>
    </ScrollView>
  )
}

export default AddUserModal

const styles = StyleSheet.create({
    iconContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        width:28,
        height:28,
        borderRadius:14,
        opacity:0.8,
        backgroundColor: '#FF3434',
    },
    KAVcontainer: {
        
        flex: 1,
        justifyContent: 'center',
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
        borderBottomWidth:2,
        borderColor: 'lightgray',
        marginTop: 15,
        flexDirection: 'row',
        alignItems: 'center',
    },
    button: {
        marginTop: 25,
        alignItems: 'center',
        padding:10,
        backgroundColor: '#00645F',
        width: '80%',
        borderRadius: 5
    },
    buttonText: {
        color: 'white',
        fontWeight: '600',
        fontSize: 20,
    },
})
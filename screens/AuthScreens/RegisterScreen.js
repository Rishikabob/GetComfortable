import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { TextInput } from 'react-native-gesture-handler'

const RegisterScreen = () => {
  return (
    <View style={styles.container}>
        <View style={styles.headerContainer}>
            <Text style={styles.headerText}> Your email must be added by an Administrator before creating a new account. {"\n"}{"\n"}
            Please contact your Administrator for futher instructions on creating an account.  
            </Text>
        </View>

        <View style={styles.formContainer}>
            <View style={styles.inputContainer}>
                <Text style={styles.textInputHeader}>Full Name</Text>
                <TextInput style ={styles.textInput} placeholder='Enter Name'/>
            </View>
        </View>
        <View style={styles.formContainer}>
            <View style={styles.inputContainer}>
                <Text style={styles.textInputHeader}>Email</Text>
                <TextInput style ={styles.textInput} placeholder='Enter Email'/>
            </View>
        </View>
        <View style={styles.formContainer}>
            <View style={styles.inputContainer}>
                <Text style={styles.textInputHeader}>Password</Text>
                <TextInput style ={styles.textInput} placeholder='Enter Password'/>
            </View>
        </View>     
        <View style={styles.formContainer}>
            <View style={styles.inputContainer}>
                <Text style={styles.textInputHeader}>Confirm Password</Text>
                <TextInput style ={styles.textInput} placeholder='Re-Enter Password'/>
            </View>
        </View>                


    </View>
  )
}

export default RegisterScreen

const styles = StyleSheet.create({
    container: {
        
        flex:1,
        alignItems: 'center'
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
        width: "70%",
        
    },
    inputContainer: {
     
        paddingVertical: 5,
        marginTop: 10,
        borderColor: '#0F6E69',
        borderBottomWidth:2.5,
    },  
    textInputHeader: {
        color: '#6EB1AF',
        fontWeight: '700',
        fontSize: 12,
        
    },
    textInput : {

    },
})
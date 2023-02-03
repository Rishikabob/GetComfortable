import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import ForgotPassScreen from '../screens/AuthScreens/ForgotPassScreen'
import LoginScreen from '../screens/AuthScreens/LoginScreen'
import RegisterScreen from '../screens/AuthScreens/RegisterScreen'

const Stack = createNativeStackNavigator()

function AuthNavigator() {
    return (
        <Stack.Navigator>
            <Stack.Screen options={{headerShown: false}} name="Login" component={LoginScreen} />
            <Stack.Screen options={{
      headerShown: true,
      headerTitleAlign: 'center',
      title: 'Forgot Password',
      headerTintColor: '#00645F',
    }} name="Forgot Password" component={ForgotPassScreen}  />

<Stack.Screen options={{
      headerShown: true,
      headerTitleAlign: 'center',
      title: 'Register a new Account',
      headerTintColor: '#00645F',
    }} name="RegisterScreen" component={RegisterScreen}  />
        </Stack.Navigator>
    );
}

export default AuthNavigator

const styles = StyleSheet.create({})
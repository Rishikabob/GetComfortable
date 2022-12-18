import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import {ForgotPassScreen, LoginScreen} from '../screens/AuthScreens'

const Stack = createNativeStackNavigator()

function AuthNavigator() {
    return (
        <Stack.Navigator>
            <Stack.Screen options={{headerShown: false}} name="Login" component={LoginScreen} />
            <Stack.Screen name="Forgot Password" component={ForgotPassScreen} />
        </Stack.Navigator>
    );
}

export default AuthNavigator

const styles = StyleSheet.create({})
import {Animated, StyleSheet, Text, View, TouchableOpacity,Pressable } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/core';
import { Ionicons } from '@expo/vector-icons'; 
import { LinearGradient } from 'expo-linear-gradient';


const UserModalTEST = () => {
    const navigation = useNavigation()

  return (
    
      <View style={styles.container}>
          <Text style={{ fontSize: 30 }}>This is a modal Page 2!</Text>
          <TouchableOpacity onPress={() => {navigation.pop(2)}}>
            <Text>
              Exit Stack
            </Text>
          </TouchableOpacity>
      </View>

  )
}

export default UserModalTEST

const styles = StyleSheet.create({
  container: {
    flex:1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  
})
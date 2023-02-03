import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react';
import { Ionicons } from '@expo/vector-icons'; 


const EditSurveyModal = ({navigation}) => {
  useEffect(() => {
    navigation.setOptions({headerRight: () => (
        <TouchableOpacity style={styles.iconContainer}onPress={() => {navigation.goBack()}}>
            <Ionicons name="ios-close" size={24} color='white' />
        </TouchableOpacity>
        
        )})
}, [navigation])

  return (
    <View>
      <Text>EditSurveyModal</Text>
    </View>
  )
}

export default EditSurveyModal

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
})
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useLayoutEffect } from 'react'
import { Ionicons } from '@expo/vector-icons';

const SurveyFormsScreen = ({navigation}) => {

    useLayoutEffect (() => {
        navigation.setOptions({
            title: "Survey Forms",
            headerBackTitle: "Back",
            headerRight: () => 
            <TouchableOpacity onPress={() => {navigation.navigate('EditSurvey')}}>
                <Ionicons name="pencil" size={24} color="black" />
                <Text style={styles.headerIconFont}>Edit</Text>
            </TouchableOpacity>
            
        });
    }, [])

  return (
    <View>
      <Text>SurveyFormsScreen</Text>
    </View>
  )
}

export default SurveyFormsScreen

const styles = StyleSheet.create({
    headerIconFont: {
        fontSize: 12,
    }
})
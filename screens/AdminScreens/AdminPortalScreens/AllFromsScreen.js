import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useLayoutEffect } from 'react'
import { Ionicons } from '@expo/vector-icons';

const AllFromsScreen = ({navigation}) => {
    useLayoutEffect (() => {
        navigation.setOptions({
            title: "All Froms and Resoruces",
            headerBackTitle: "Back",
            headerRight: () => 
            <TouchableOpacity>
                <Ionicons name="pencil" size={24} color="black" />
                <Text style={styles.headerIconFont}>Edit</Text>
            </TouchableOpacity>
            
        });
    }, [])

  return (
    <View>
        
      <Text>AllFromsScreen</Text>
    </View>
  )
}

export default AllFromsScreen

const styles = StyleSheet.create({
    headerIconFont: {
        fontSize: 12,
    }
})
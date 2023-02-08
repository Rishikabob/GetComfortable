import { StyleSheet, Text, Touchable, View, TouchableOpacity } from 'react-native'
import React, { useLayoutEffect } from 'react'
import { Ionicons } from '@expo/vector-icons';


const ResourcesScreen = ({navigation}) => {

    //change header options
    useLayoutEffect(() => {
        navigation.setOptions({
            title: 'Resources',
            headerBackTitle: 'Back',
            headerRight: () => 
            <TouchableOpacity onPress={() => {navigation.navigate('EditResource')}}>
                <Ionicons name="pencil" size={24} color="black" />
                <Text style={styles.headerIconText}>Edit</Text>
            </TouchableOpacity>
        })
    },[])

  return (
    <View>
      <Text>ResourcesScreen</Text>
    </View>
  )
}

export default ResourcesScreen

const styles = StyleSheet.create({
    headerIconText: {
        fontSize: 12,
    },

})

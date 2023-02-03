import { StyleSheet, Text, View } from 'react-native'
import React, { useLayoutEffect } from 'react'
import { Button, Input } from 'react-native-elements'

const AddChatScreen = ({navigation}) => {
  

    useLayoutEffect (() => {
        navigation.setOptions({
            title: "Add a new Chat",
            headerBackTitle: "Chats",
        });
    }, [])

  return (
    <View style = {styles.container}>
      <Input
    />
    </View>
  )
}

export default AddChatScreen

const styles = StyleSheet.create({
    container : {

    }, 
})
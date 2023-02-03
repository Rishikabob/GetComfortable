import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import {ListItem, Avatar} from "react-native-elements"

const CustomListItem = ({id, chatName, enterChat}) => {
  return (
    <ListItem>
        <Avatar rounded title="MD" />

        <ListItem.Content>
            <ListItem.Title style={{fontWeight: '800'}}> 
                Test Chat
            </ListItem.Title>
            <ListItem.Subtitle numberOfLines={1}  ellipsizeMode='tail'>
                This is a test subtitle 
            </ListItem.Subtitle>
        </ListItem.Content>
    </ListItem>
  )
}

export default CustomListItem

const styles = StyleSheet.create({})
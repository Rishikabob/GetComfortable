import {
  StyleSheet,View,Text,TouchableOpacity
} from 'react-native';
import React from 'react'
import {} from 'react-native-gesture-handler'
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/core';
import { ref, remove } from 'firebase/database';
import { db } from '../../firebaseConfig';
import { Alert } from 'react-native';



const FormListItem = ({surveyItem: {title, subTitle, icon, link}, id, reference  }) => {
  const navigation = useNavigation()
  const handleDelete = () => {
    Alert.alert(
      'Remove: ' + title,
      'Are you sure you want to delete this item?',
      [
        { text: 'Delete', onPress: () => {
          console.log(id)
          console.log(reference)
          const dbRef = ref(db,reference+"/" + id)
          remove(dbRef)} },
        {
          text: 'Cancel',
          onPress: () => console.log('No Pressed'),
          style: 'cancel',
        },
      ],
      { cancelable: false }
    )
      
    

    
  }

  return (
    <TouchableOpacity style={styles.formItem} delayPressIn={5} delayPressOut={5} delayLongPress={5} 
    onPress={() => {
      /* 1. Navigate to the webView route with params */
      navigation.navigate('WebView', {
        title: title,
        link: link
      });
    }}
    >
      <Ionicons name={icon} size={40} color="black" />
      <View style={styles.textContainer}>
        <Text style={styles.titleText}>{title}</Text>
        <Text style={styles.subtitleText}>{subTitle}</Text>
      </View>
      <TouchableOpacity style={styles.formItem} delayPressIn={5} delayPressOut={5} delayLongPress={5} onPress= {handleDelete}>
        <Ionicons name='trash' size={40} color="black" 
        
        />
      </TouchableOpacity>
      
    </TouchableOpacity>
  )
}

export default FormListItem

const styles = StyleSheet.create({
  formItem: {
    paddingHorizontal: 15,
    paddingVertical: 15,
    backgroundColor: "#F5F5F5",
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginVertical: 10,
    alignItems: 'center',
    borderRadius: 10,
  },
  textContainer: {
    alignItems: 'center',
    flexDirection: 'column',
    maxWidth: '70%',
  },
  titleText: {
    padding: 5,
    fontSize: 16,
    fontWeight: '700',
  },
  subtitleText: {
    color: 'gray',
    padding: 5,
    fontSize: 12,
    textAlign: 'center',
  },
})
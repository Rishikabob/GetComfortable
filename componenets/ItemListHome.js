import {
    StyleSheet,View,Text,TouchableOpacity
  } from 'react-native';
  import React from 'react'
  import {} from 'react-native-gesture-handler'
  import { Ionicons } from '@expo/vector-icons';
  import { useNavigation } from '@react-navigation/core';

  
  
  const ItemListHome = ({surveyItem: {title, subTitle, icon, link}, id}) => {
    const navigation = useNavigation()

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
        <TouchableOpacity>
          <Ionicons name='chevron-forward' size={30} color="black" />
        </TouchableOpacity>
        
      </TouchableOpacity>
    )
  }
  
  export default ItemListHome
  
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
      maxWidth: '75%',
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
import { Alert, FlatList, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View, Keyboard } from 'react-native'
import React, { useEffect, useState } from 'react'
import { chatApiKey } from '../../chat_config/chatConfig'
import { StreamChat } from 'stream-chat';
import { useAppContext } from '../../AppContext';
import { getAuth} from 'firebase/auth';
import { useNavigation } from '@react-navigation/core';




const NewChatModal = () => {
  const navigation = useNavigation()

  const auth = getAuth()
  const fbUser = auth.currentUser;
  const userName = fbUser.displayName
  const userID = userName.replace(/ /g,"_") + '_' + fbUser.uid

  const { setChannel } = useAppContext();


  const [userData, setUserData] = useState([])

  const [query, setQuery] = useState('')

  const chatClient = StreamChat.getInstance(chatApiKey);


  const search = async () => {
    Keyboard.dismiss
    try {
      
      const response =  await chatClient.queryUsers({ name: { $autocomplete: query } });
      setUserData(response.users)
      console.log(response.users)
      if(response.users.length === 0) {
        Alert.alert("No Results Found")
      }
    }
    catch (error) {
      Alert.alert("Search invalid. Please try again")
    }
    
}
  


  return (
    <View style={styles.container}>
      <View style = {styles.searchContainer}>
      <View style={styles.textContainer}>
                <TextInput style ={styles.textInput} placeholder='Enter name to search'
                placeholderTextColor="#bdbdbd" 
                onChangeText = {text => setQuery(text)} />
      </View>
      <TouchableOpacity style={styles.searchButton} onPress= {search} accessible={false}>
        <Text style={styles.searchText}>Search</Text>
      </TouchableOpacity>
      </View>
        
      <ScrollView style={styles.scrollViewContainer} 
       contentContainerStyle={styles.contentContainerStyle}>
        {userData.map(item=> (
          <View key ={item.id}>
            <TouchableOpacity onPress= {async () => {
              console.log("ITEM PRESSED: " + item.id)
              const newChat = chatClient.channel('messaging', {
                members:[item.id , userID]
              })
              await newChat.watch();
              setChannel(newChat);
              let name = item.name
              navigation.replace('ChannelScreen', {name});
            }} style={styles.userItemTouchable} delayPressIn={5} delayPressOut={5} delayLongPress={5} >
              <Text style={styles.nameText}>{item.name}</Text>
              <Text style={styles.emailText}>{item.email}</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </View>
  )
}

export default NewChatModal

const styles = StyleSheet.create({
  container: {
    flex: 1
    
  },
  searchContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    flexDirection: 'row',
  },  
  searchButton: {
    borderRadius: 10,
    marginLeft: 20,
    padding: 10,
    backgroundColor: 'blue'
  },
  searchText: {
    color: 'white',
  },
  textContainer: {
    justifyContent: 'center',
    alignSelf: 'center',
    width: '70%',
    padding: 10,
    backgroundColor:"white",
    borderWidth:1,
    borderRadius: 10,
  },
  textInput: {
    paddingLeft: 10

  },
  userItemTouchable: {
    backgroundColor: 'white',
    borderRadius: 10,
    paddingHorizontal: 50,
    paddingVertical: 10
  },  
  scrollViewContainer: {

  },
  nameText: {
    fontWeight: '700',
    fontSize: 18
  },
  emailText:{

  },
  contentContainerStyle: {
    padding: 20
  },
})
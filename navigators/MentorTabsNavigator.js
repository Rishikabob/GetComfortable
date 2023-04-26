import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createBottomTabNavigator,  } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import ADMLogVisitScreen from '../screens/AdminScreens/ADMLogVisitScreen'
import ADMSurveyScreen from '../screens/AdminScreens/ADMSurveyScreen'
import ADMResourcesScreen from '../screens/AdminScreens/ADMResourcesScreen'
import ADMMessageScreen from '../screens/AdminScreens/ADMMessageScreen'
import UserHome from '../screens/UserScreens/UserHome';
import MentorHome from '../screens/MentorScreens/MentorHome';
import ChatNavigation from './ChatNavigation';
import { Chat } from 'stream-chat-expo';
import { chatApiKey } from '../chat_config/chatConfig';
import { StreamChat } from 'stream-chat';
import { useChatClient } from '../chat_config/useChatClient';




const MentorTabsNavigator = () => {
  const MentorTabs = createBottomTabNavigator();
  const chatClient = StreamChat.getInstance(chatApiKey);
  const { clientIsReady } = useChatClient();
  if (!clientIsReady) {
    return <Text>Loading chat ...</Text>
  }

  return (
    <Chat client={chatClient}>
    <MentorTabs.Navigator 
    screenOptions={() => ({
      headerShown: false,
      tabBarShowLabel: false,
      tabBarStyle: {
        height: 70,
        paddingHorizontal: 5,
        paddingTop: 20,
        paddingBottom: 20,
        backgroundColor: '#00645F',
        position: 'absolute',
        bottom:30,
        left:9,
        right:9,
        borderRadius:10,
        ...styles.shadow
      
    },
  })}> 
    <MentorTabs.Screen options={{headerShown: false, title: "Home",  tabBarIcon: ({focused}) => (
        <View 
        backgroundColor={focused ? '#003C39' : '#00645F'} style={styles.tabContainer}>
          <Ionicons name="home" size={30} color="white"/>
          <Text style={styles.iconText}>
            Home
          </Text>
        </View>
      ),}}  name="MentorHome" component={MentorHome} />

    <MentorTabs.Screen options={{headerShown: false, title: "Surveys",  tabBarIcon: ({focused}) => (
        <View 
        backgroundColor={focused ? '#003C39' : '#00645F'} style={styles.tabContainer}>
          <Ionicons name="clipboard" size={30} color="white"/>
          <Text style={styles.iconText}>
            Surveys
          </Text>
        </View>
      ),}}  name="MentorSurvey" component={ADMSurveyScreen} />

    <MentorTabs.Screen options={{headerShown: false, title: "Log Visit",  tabBarIcon: ({focused}) => (
        <View backgroundColor={focused ? '#003C39' : '#00645F'}style={styles.tabContainer}>
          <Ionicons name="checkmark-done-circle" size={30} color="white"/>
          <Text style={styles.iconText}>
            Log Vist
          </Text>
        </View>
      ),}}   name="MentorLogVisit" component={ADMLogVisitScreen} />

    <MentorTabs.Screen options={{headerShown: false, title: "Resoruces",  tabBarIcon: ({focused}) => (
        <View backgroundColor={focused ? '#003C39' : '#00645F'}style={styles.tabContainer}>
          <Ionicons name="stats-chart" size={30} color="white"/>
          <Text style={styles.iconText}>
            Resources
          </Text>
        </View>
      ),}}  name="MentorResources" component={ADMResourcesScreen} />

    <MentorTabs.Screen options={{headerShown: false, title: "Messages",  tabBarIcon: ({focused}) => (
        <View backgroundColor={focused ? '#003C39' : '#00645F'}style={styles.tabContainer}>
          <Ionicons name="chatbubble-ellipses-sharp" size={30} color="white"/>
          <Text style={styles.iconText}>
            Messages
          </Text>
        </View>
      ),}}   name="MentorMessages" component={ChatNavigation} />




  </MentorTabs.Navigator>
  </Chat>
  )
}

export default MentorTabsNavigator

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  shadow: {
    shadowColor: '#000000',
    shadowOffset : {
      width:0,
      height:10,
    },
    shadowOpacity: 0.25,
    shadowRadius:3.5,
    elevation:5,
  },
  tabContainer: {
    width:70,
    height: 60,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center'
  },
  iconText: {
    color: 'white', 
    paddingTop: 5,
    fontSize: 12,
    fontWeight: '500',
  },
})
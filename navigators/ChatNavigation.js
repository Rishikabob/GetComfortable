import { getFocusedRouteNameFromRoute } from '@react-navigation/native';

import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ADMMessageScreen from '../screens/AdminScreens/ADMMessageScreen';
import ChannelScreen from '../screens/chatScreens/ChannelScreen';
import NewChatModal from '../screens/chatScreens/NewChatModal';
import { Chat } from 'stream-chat-expo';


const ChatNavigation = ({ navigation, route }) => {
    React.useLayoutEffect(() => {
        const routeName = getFocusedRouteNameFromRoute(route);
        if (routeName === "MessagesScreen" || routeName === "NewChatModal" ){
            navigation.setOptions({tabBarStyle: { height: 70,
                paddingHorizontal: 5,
                paddingTop: 20,
                paddingBottom: 20,
                backgroundColor: '#00645F',
                position: 'absolute',
                bottom:30,
                left:9,
                right:9,
                borderRadius:10,}});
        }else if (routeName=== 'ChannelScreen'){
            navigation.setOptions({tabBarStyle: {display: 'none'}});
        }
    }, [navigation, route]);
    const ChatStack = createNativeStackNavigator()

  return (
    <ChatStack.Navigator>
        <ChatStack.Screen options={{headerShown: false}} name = "MessagesScreen" component={ADMMessageScreen}/>
        <ChatStack.Screen name = "ChannelScreen" component={ChannelScreen}/>
        <ChatStack.Group screenOptions={{ presentation:'modal', headerTintColor: '#00645F'}}>
            <ChatStack.Screen options={{title: 'New Message'}} name = "NewChatModal"  component={NewChatModal} />
        </ChatStack.Group>
    </ChatStack.Navigator>
  )
}

export default ChatNavigation
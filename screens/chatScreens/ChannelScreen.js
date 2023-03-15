import { StyleSheet, Text, View } from 'react-native'
import React, { useLayoutEffect }from 'react'
import { Channel,MessageList,MessageInput } from 'stream-chat-expo'
import { useAppContext } from '../../AppContext'
import { HeaderBackButton } from '@react-navigation/elements';




const ChannelScreen = (props) => {
  const { channel } = useAppContext();
  const { navigation } = props;
  useLayoutEffect (() => {
    navigation.setOptions({
        title: channel?.data?.name || "Channel",
        tabBarStyle: {display: 'none'},
        headerLeft: () => <HeaderBackButton onPress={()=>{navigation.goBack()}
      }
        />
        
    });
}, [channel?.data?.name])
    
    
  return (
    <View style={styles.container}>
    <Channel channel={channel}>
      <MessageList />
      <MessageInput />
    </Channel>
    </View>
    
  )
}

export default ChannelScreen

const styles = StyleSheet.create({
   
})
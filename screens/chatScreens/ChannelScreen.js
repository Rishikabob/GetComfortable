import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Channel,MessageList,MessageInput } from 'stream-chat-expo'
import { useAppContext } from '../../AppContext'

const ChannelScreen = (props) => {
    const { navigation } = props;
    const { channel } = useAppContext();
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
    container: {
        marginBottom: 100
    }
})
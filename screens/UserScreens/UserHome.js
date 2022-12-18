import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { auth } from '../../firebaseConfig'
import { useNavigation } from '@react-navigation/core';


const UserHome = () => {

    const navigation = useNavigation()

    const handleSignOut = () => {
        auth.signOut()
        .then(() => {
          navigation.replace("AuthScreens", {screen: "Login"})
        })
        .catch(error => alert(error.message))
    }

  return (
    <View style={styles.container}>
        <Text>
            User Home
        </Text>
      <Text>
        Email: {auth.currentUser?.email}
      </Text>
      <TouchableOpacity
      onPress={handleSignOut}
      style={styles.button}>
        <Text
        style={styles.buttonText}>
            Sign Out
        </Text>
      </TouchableOpacity>
    </View>
  )
}

export default UserHome

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: 'center',
    },
    button: {
        backgroundColor: "blue",
        width: '60%',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 40,

    },
    buttonText: {
        color: "white",
        fontWeight: '700',
        fontSize: 16,

    },
})
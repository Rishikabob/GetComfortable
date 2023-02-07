import { StyleSheet, Text, View } from 'react-native'
import React, {useState} from 'react'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { TextInput } from 'react-native-gesture-handler'

const EditResourcesModal = ({navigation}) => {

const [title, setTitle] = useState('')
const [subTitle, setSubTitle] = useState('')
const [link, setLink] = useState('')
const [icon, setIcon] = useState('')

  return (
    <KeyboardAwareScrollView>
        <View style={styles.innerContainer}>
        <TextInput style = {styles.textInput} placeholder='Enter Title'/>
        <TextInput style = {styles.textInput} placeholder='Enter Title'/>
        <TextInput style = {styles.textInput} placeholder='Enter Title'/>
        <TextInput style = {styles.textInput} placeholder='Enter Title'/>

        </View>
    </KeyboardAwareScrollView>
  )
}

export default EditResourcesModal

const styles = StyleSheet.create({
    textInput: {
        height: 40,
        borderColor: '#000000',
        borderWidth: 1,
        borderRadius: 7,
        marginBottom: 20,
        color: 'black',
        fontSize: 16,
        paddingHorizontal: 15,
        fontWeight:'500',
    },
    innerContainer: {
        padding:24,
        backgroundColor: 'red',
        flex:1,
        justifyContent: 'space-around',
    },
})
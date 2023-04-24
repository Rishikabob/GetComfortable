import { StyleSheet, KeyboardAvoidingView , Text, View, TouchableOpacity, Button, Platform, Alert } from 'react-native'
import React, {useLayoutEffect, useState} from 'react'
import { Ionicons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { TextInput } from 'react-native-gesture-handler';
import DropDownPicker from 'react-native-dropdown-picker';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { db } from '../../../firebaseConfig';
import { ref, push } from 'firebase/database';




const EditGlobalEvents = ({route, navigation}) => {
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(Platform.OS === 'ios' ? true : false);
  const [dateTimeText, setDateTimeText] = useState(formatDate(new Date()))
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('')

  
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [calendarType, setCalendarType] = useState([
    {label: 'User', value: 'userCalendar/'},                  
    {label: 'Mentor', value: 'mentorCalendar/'},
    {label: 'Global', value: 'globalCalendar/'},
      ]);



  const createEvent = () => {
    console.log(date)
    console.log(title)
    console.log(desc)
    console.log(value)
    console.log(date.toISOString())
    //let tempDate = new Date(date.toString())
    //console.log(tempDate.toString())
    writeData(title,desc,value,date.toISOString())
  }

  function writeData(title, desc, eventType, date) {
    const dbref = ref(db, eventType)
    push(dbref, {
      title: title,
      description: desc,
      dateTime: date,
    }).then(() => {Alert.alert("Event Created")}).catch((error)=>{Alert.alert("Error while creating Event")})
  }

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    console.log(Platform.OS==='ios')
    setShow(Platform.OS ==='ios')
    setDate(currentDate);


    let tempDate = new Date(currentDate)
    setDateTimeText(formatDate(tempDate))

  };

  function formatDate(date) {
    let fDate = date.toDateString()
    let fTime = ''
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0'+minutes : minutes;
    fTime = hours + ':' + minutes + ' ' + ampm;
    var strTime = '\n'+ fDate + '\n' + fTime
    return strTime

  }

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const showTimepicker = () => {
    showMode('time');
  };


    useLayoutEffect(() => {
        navigation.setOptions({headerRight: () => (
            <TouchableOpacity style={styles.iconContainer}onPress={() => {navigation.goBack()}}>
                <Ionicons name="ios-close" size={24} color='white' />
            </TouchableOpacity>
            
            )})
    }, [navigation])
    
  return (
    <View>
      <KeyboardAvoidingView style={styles.KAVcontainer}
    collapsable={Platform.select({ios: 'true', android: null})}
    behavior='padding'
    keyboardVerticalOffset={Platform.select({ios: null, android: -500})}>
    <View style= {styles.pickerContainer}>

    <View style={styles.pickerButtonContainer}>
      <Button color="gray" onPress={showDatepicker} title="Show date picker" />
    </View>
    <View style={styles.pickerButtonContainer}>
      <Button color="gray" onPress={showTimepicker} title="Show time picker" />
    </View>
    
    {show && (
      <DateTimePicker style={{alignSelf: 'center'}}
        testID="dateTimePicker"
        value={date}
        mode={mode}
        is24Hour={false}
        onChange={onChange}
      />
    )}
    </View>
    <Text style={styles.selectedText}>Selected: {dateTimeText}</Text>
    <View style={styles.titleContainer}>
      <Text style={styles.titleText}>Title</Text>
      <TextInput style={styles.titleInput}
       placeholder='Enter Event Title'
       value={title}
       onChangeText = {text => setTitle(text)} 

       placeholderTextColor="gray">
      </TextInput>
    </View>
    <View style={styles.descriptionContainer}>
      <Text style={styles.titleText}>
        Description
      </Text>
      <TextInput style={styles.descriptionInput}
      value={desc}
      onChangeText = {text => setDesc(text)} 

      placeholder='Enter Event Description'
      placeholderTextColor="gray"
      >

      </TextInput>
      <Text style={styles.titleText}>
        Select Event Type
        </Text>
      <View style={styles.eventTypeContainer}>
        
        <DropDownPicker style={styles.eventTypePicker}
        open={open}
        value={value}
        items={calendarType}
        setOpen={setOpen}
        setValue={setValue}
        setItems={setCalendarType}
        zIndex={3000}
        zIndexInverse={1000}
        />
        </View>
    </View>
    <TouchableOpacity style={styles.button} onPress={createEvent}>
        <Text style={styles.buttonText}>
            Create Event
        </Text>
      </TouchableOpacity>
      </KeyboardAvoidingView>

  </View>
  )
}

export default EditGlobalEvents

const styles = StyleSheet.create({
  pickerButtonContainer: {
    alignSelf: 'center',
    width: "80%",
    borderRadius: 10,
    marginVertical: 5,
    backgroundColor: '#00645F',
  },
  pickerContainer: {
    backgroundColor: 'white',
    padding: 10,
    margin: 10,
    borderRadius: 10,
  },
  KAVcontainer: {
        
},
  titleContainer: {

  }, 
  titleText: {
    fontWeight: '700',
    paddingHorizontal: 50,
    paddingVertical: 5,
  }, 
  titleInput: {
    paddingHorizontal: 10,
    backgroundColor: 'white',
    width: "75%",
    height: 50,
    alignSelf: 'center',
    borderRadius: 10,

  }, 
  descriptionContainer: {

  }, 
  descriptionInput: {
    paddingHorizontal: 10,
    backgroundColor: 'white',
    width: "75%",
    height: 50,
    alignSelf: 'center',
    borderRadius: 10,

  }, 
  eventTypeContainer: {
    alignSelf: 'center',
    
    zIndex: 110,
    width: "75%",
   
    justifyContent: 'center'
  }, 
  eventTypePicker: {
    alignSelf: 'center'
    
  }, 
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width:28,
    height:28,
    borderRadius:10,
    opacity:0.8,
    backgroundColor: '#FF3434',
    },
  selectedText: {
    marginTop: 10,
    fontWeight: '700',
    textAlign: 'center',
    alignSelf: 'center',
    fontSize: 18,
    },
    button: {
      backgroundColor: '#00645F',
      width: "75%",
      height: 50,
      marginTop: 130,
      justifyContent: 'center',
      alignItems: 'center',
      alignSelf: 'center',
      borderRadius: 10,
    },  
    buttonText: {
      color: 'white',
      fontWeight: '700',

    },  
})
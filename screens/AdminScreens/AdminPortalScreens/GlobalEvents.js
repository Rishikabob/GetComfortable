import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React, {useLayoutEffect, useState} from 'react'
import { Ionicons } from '@expo/vector-icons';
import { Calendar, Agenda } from 'react-native-calendars';


const GlobalEvents = ({navigation}) => {

const [selectedDate, setSelectedDate] = useState(new Date().timestamp)  
const [marksDate, setMarksDate] = useState({});
const [refreshCalender, setRefreshCalender] = useState(false);
const [events, setEvents] = useState({
    '2023-03-10': [],
    '2023-03-11': [{title: 'event 2', subtitle: 'subtitle'}],
'2023-03-12': [],
'2023-03-13': [{title: 'event 5', subtitle: 'subtitle'}],
'2023-03-14': [{title: 'event 6', subtitle: 'subtitle'}],
'2023-03-15': [{title: 'event 7', subtitle: 'subtitle'}],
'2023-03-18': [{title: 'event 8', subtitle: 'subtitle'}],
'2023-03-19': [{title: 'event 9', subtitle: 'subtitle'}],
'2023-03-20': [{title: 'event 10', subtitle: 'subtitle'}],})
const [refresh, setRefresh] = useState(false)



      
    useLayoutEffect (() => {
        navigation.setOptions({
            headerRight: () => 
            <TouchableOpacity onPress={()=> {navigation.navigate("Edit Global Event", {
              date: selectedDate
            })}}>
                <Ionicons name="pencil" size={24} color="black" />
                <Text style={styles.headerIconFont}>Add</Text>
            </TouchableOpacity>
            
        });
    }, [])
  return (
    <View style={styles.container}>
      <Agenda
        items={
            events
          }
        style={styles.calendarWrapper}
        scrollEnabled={true}
        theme={{
        // calendarBackground: '#000000'
        todayTextColor: '#00adf5',
        
        }}
        showOnlySelectedDayItems = {true}
        renderItem={(item, firstItemInDay) => {
            return (
            <View style={styles.itemContainer}>
                <Text style={styles.titleText}> {item.title}</Text>
                <Text style={styles.subtitleText}> {item.subtitle}</Text>
            </View >)
          }}
        
        renderEmptyData={() => {
            return( <View style={{alignItems: 'center', justifyContent: 'center', marginTop: 100}}>
                <Text style={{fontWeight:'700', fontSize: 20, textAlign:'center'}}>No events for selected day {'\n'}Please select another day</Text>
            </View >)
          }}
          
        />
        
        
    </View>
  )
}

export default GlobalEvents

const styles = StyleSheet.create({
  titleText: {
    fontWeight: '700',
    fontSize: 16
  },
  subtitleText: {

  },
    itemContainer: {
        padding: 10,
        marginTop: 20,
        justifyContent: 'center',
        backgroundColor: 'white',
      
    },
    container: {
        position: 'static',
        flex: 1,
        backgroundColor: '#E8EAED',
    },
})
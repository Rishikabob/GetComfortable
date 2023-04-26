import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Pressable } from 'react-native';

const EventListItem = ({eventItem: {dateTime, description, title}, id, onPress}) => {
const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];


const date = new Date(dateTime)
const day = date.getDate()
const month = date.getMonth()
const year = date.getFullYear();
const time = formatDate(date)

function formatDate(date) {
   
    let fTime = ''
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0'+minutes : minutes;
    fTime = hours + ':' + minutes + ' ' + ampm;
    var strTime = fTime
    return strTime

  }




  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
        <View style= {styles.topContainer}>
            <Text style={styles.monthText}>{monthNames[month]}</Text>
            <View style={{...styles.circle, backgroundColor: "#00645F" }} >
            <Text style={styles.dayText}>
                {day}
            </Text>
            </View>
        </View>
        <View style = {styles.bottomContainer}>
        
      <Text style={styles.eventText}>{title}</Text>
        </View>
        <View style = {styles.rightContainer}>
            <Text>{time}</Text>
        </View>
        
    </TouchableOpacity>
  )
}

export default EventListItem

const styles = StyleSheet.create({
    topContainer: {
        alignItems: 'center',
       
    },
    bottomContainer: {
        maxWidth: "60%",
        //marginLeft: 20,
        justifyContent: 'center',
        
    },
    rightContainer: {
        justifyContent: 'center'
    },
    daysLeftText: {
        textAlign: 'center',
        fontSize: 12,
    },  
    eventText: {
        textAlign: 'center',
        fontWeight: '700',
        fontSize: 16, 
    },
    monthText: {
        color: "#00645F",
        fontWeight: "700",
    },  
    dayText: {
        color: 'white',
        fontWeight: '700',
        fontSize: 18,
    },
    circle: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 30,
        height: 30,
        borderRadius: 30 / 2,
        //backgroundColor: "#00645F",
    },
    container: {
        justifyContent: "space-between",
        flexDirection:'row',
        padding: 10,
        margin: 5,
        backgroundColor: 'white',
        borderBottomWidth: 2,
        borderColor: '#d9d9d9',
    },
})
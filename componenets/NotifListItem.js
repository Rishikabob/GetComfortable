import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'

const NotifListItem = ({notifItem: {title, body, date}, id, reference}) => {
    const itemDate = new Date(date)
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
        var strTime = fDate +" at "+ fTime
        return strTime
    }
  return (
    <View style={styles.outerContainer}>
    <View style={styles.container}>
        <Text style = {styles.titleText}>{title}</Text>
        <Text style = {styles.bodyText}>{body}</Text>
        <Text style = {styles.dateText}>{formatDate(itemDate)}</Text>
    </View>
    </View>
  )
}

export default NotifListItem

const styles = StyleSheet.create({
    outerContainer: {
        paddingHorizontal: 10,
        paddingVertical: 15,
        backgroundColor: "#F5F5F5",
        justifyContent: 'space-between',
        flexDirection: 'row',
        marginVertical: 5,
        alignItems: 'center',
        borderRadius: 10,
        backgroundColor: "white"
      },
      rightIcon: {
        justifyContent: "space-around",
      },
      titleText: {
        fontWeight: "700",
        fontSize: 18,
        paddingBottom: 5,
      },
      bodyText: {
        fontSize: 16,
      },
      dateText: {
        paddingTop: 10,
        fontSize: 12,
      },
})
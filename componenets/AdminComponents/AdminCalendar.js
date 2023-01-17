import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Calendar } from 'react-native-calendars';

const AdminCalendar = () => {
  return (
    <View style={styles.calenderContainer}>
        <Calendar 
        hideExtraDays={true}
        firstDay={1}
        style ={{
          
          borderRadius: 10,
          
        }}
        theme={{
          selectedDayBackgroundColor: 'blue',
          todayBackgroundColor: 'blue',
          backgroundColor: '#BDDFDE',
          calendarBackground: '#ffffff',
          arrowColor: 'orange',
          monthTextColor: '#00645F',
          textMonthFontWeight: '700',
          marginVertical: 0,
          paddingLeft:0,
          paddingRight: 0,
          
          
          'stylesheet.calendar.header': {
            header: {
                backgroundColor: '#BDDFDE',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                borderTopLeftRadius:10,
                borderTopRightRadius:10,
                // borderRadius: 4
            },
          },
          'stylesheet.calendar.main': {
            container: {
              padding:0,
              backgroundColor: "white",
            },
            monthView: {
                backgroundColor: "white",
                borderRadius:10

            },
            week: {
                marginTop: 4,
                marginBottom: 4,
                flexDirection: 'row',
                justifyContent: 'space-around'
            },
        },
        }}
        />
      </View>
  )
}

export default AdminCalendar

const styles = StyleSheet.create({
calenderContainer: {
      width: "95%",
      backgroundColor: "white",
      shadowColor: '#171717',
      shadowOffset: {width: 0, height: 5},
      shadowOpacity: 0.25,
      shadowRadius: 3,
      borderRadius:10,
      elevation: 3,
      
    }

})
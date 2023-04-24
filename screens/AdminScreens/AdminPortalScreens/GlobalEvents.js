import { StyleSheet, Text, View, TouchableOpacity, ActivityIndicator, Pressable } from 'react-native'
import React, {useLayoutEffect, useState} from 'react'
import { Ionicons } from '@expo/vector-icons';
import { Calendar, Agenda } from 'react-native-calendars';
import { useEffect } from 'react';
import { ref, onValue, remove, query, orderByChild} from "firebase/database";
import { db } from '../../../firebaseConfig';
import { Alert } from 'react-native';
import { Modal } from 'react-native';
import moment from 'moment';
import { Picker } from '@react-native-picker/picker';
import { useMemo, memo } from 'react';



const GlobalEvents = ({navigation, route}) => {
const {type} = route.params;
const [isLoading, setIsLoading] = useState(false);
const [selectedDate, setSelectedDate] = useState(new Date().toISOString().substring(0, 10))
//set prevDate to the current date minus 1 month
const [prevDate, setPrevDate] = useState(new Date(new Date().setMonth(new Date().getMonth() - 1)).toISOString().substring(0, 10))
const [finalEvents, setFinalEvents] = useState()
const [marksDate, setMarksDate] = useState({});
const [refreshCalender, setRefreshCalender] = useState(false);
const [events, setEvents] = useState({})
const [refresh, setRefresh] = useState(false)
const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
const [selectedMonth, setSelectedMonth] = useState(0);
const [selectedYear, setSelectedYear] = useState(2023);
const currentYear = new Date().getFullYear();
const yearArray = useMemo(() => Array.from({ length: 21 }, (_, i) => currentYear + i - 10), [currentYear]);
const deleteAllEvents = () => { 
  Alert.alert(
    'Confirm Deletion',
    'Are you sure you want to delete all events?',
    [
      {
        text: 'Cancel',
        onPress: () => console.log('Deletion cancelled'),
        style: 'cancel'
      },
      {
        text: 'Delete',
        onPress: () => {
          const eventsRef = ref(db, type);
          remove(eventsRef)
            .then(() => {
              Alert.alert(
                'Success',
                'All events have been deleted successfully'
              );
            })
            .catch((error) => {
              console.log('Error removing event: ', error);
            });
        },
        style: 'destructive'
      }
    ],
    { cancelable: false }
  );
}

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

const handleDelete= () => {
  deleteEventsForMonth(selectedYear, selectedMonth);
}

const deleteEventsForMonth = (year, month) => {
  const eventsRef = ref(db, type);
  const eventsQuery = query(eventsRef, orderByChild("dateTime"));

  return onValue(eventsQuery, (snapshot) => {
    let itemDeleted = false;
    const events = snapshot.val();
    const eventKeys = Object.keys(events);
    if (eventKeys !== null) {
    const eventsToDelete = eventKeys.filter(key => {
      const event = events[key];
      const eventDate = moment(event.dateTime);
      return eventDate.year() === year && eventDate.month() === month;
    });
    if (eventsToDelete.length > 0) {
      eventsToDelete.forEach(key => {
        const eventRef = ref(db, type + `/ ${key}`);
        remove(eventRef);
      });

      itemDeleted = true;
    } else {

      itemDeleted = false;
    }
    if(itemDeleted) {
      alert("Events for selected month have been deleted");
    } else {
      alert("No events found for selected month");
    }}
  }, {
    onlyOnce: true
  }); 


  
};
const deleteEvent = (eventId) => {
 Alert.alert(
    'Confirm Deletion',
    'Are you sure you want to delete this event?',
    [
      {
        text: 'Cancel',
        onPress: () => console.log('Deletion cancelled'),
        style: 'cancel'
      },
      {
        text: 'Delete',
        onPress: () => {
          const eventRef = ref(db, type + `/${eventId}`);
          remove(eventRef)
            .then(() => {
              Alert.alert(
                'Success',
                'Event has been deleted successfully'
              );
            })
            .catch((error) => {
              console.log('Error removing event: ', error);
            });
        },
        style: 'destructive'
      }
    ],
    { cancelable: false }
  );
};  
    useLayoutEffect (() => {
        navigation.setOptions({
            headerRight: () => 
            <View style={styles.headerButtonsContainer}>
        <TouchableOpacity onPress={() => navigation.navigate("Edit Global Event", { date: selectedDate })}>
          <Ionicons name="pencil" size={24} color="black" />
          <Text style={styles.headerIconFont}>Add</Text>
        </TouchableOpacity>
        <View>
          <Text>     </Text>
        </View>
        <TouchableOpacity onPress={() => setIsDeleteModalVisible(true)}>
          <Ionicons name="trash" size={24} color="black" />
          <Text style={styles.headerIconFont}>Delete</Text>
        </TouchableOpacity>
      </View>
            
            
        });
    }, [])

  useEffect(() => {
    setIsLoading(true);
    const globalEventsRef = ref(db, type);
    return onValue(globalEventsRef, (snapshot) => {
      let data = snapshot.val() || {};
      let events = { ...data };
      //console.log(data)
      Object.keys(data).forEach((key) => {
        const event = data[key];
        const date = event.dateTime.slice(0, 10);
        if (!events[date]) {
          events[date] = [];
        }
        events[date].push({ title: event.title, subtitle: event.description, eventID: key, date: event.dateTime });
      });
      //console.log("events: "+ events)
      setEvents(events);
      console.log("events called")
      
    });
  },[])

  function getDatesBetween(startDate, endDate) {
    const dates = {};
    const currentDate = new Date(startDate);
    while (currentDate <= endDate) {
      const dateString = currentDate.toISOString().split("T")[0];
      dates[dateString] = [];
      currentDate.setDate(currentDate.getDate() + 1);
    }
    return dates;
  }
  // const getDatesBetween = useMemo(() => {
  //   return function(startDate, endDate) {
  //     const dates = [];
  //     const currentDate = new Date(startDate);
  //     while (currentDate <= endDate) {
  //       dates.push(currentDate.toISOString().split("T")[0]);
  //       currentDate.setDate(currentDate.getDate() + 1);
  //     }
  //     return dates;
  //   }
  // }, []);
  
  
  

  //when the user seletes a date, the events list will be updated to add empty events for plus and minus 10 days from selected date
  useEffect(() => {

    const date = new Date(selectedDate);
    //get month from selected date
    const month = date.getMonth();

    const startDate = new Date(date.getTime());
    const endDate = new Date(date.getTime());
    endDate.setDate(date.getDate() + 30);
    startDate.setDate(date.getDate());
    //console.log("start get dates between")
    const allDates = getDatesBetween(startDate, endDate);
    //console.log("end get dates between")
    //console.log("events: ")

    //console.log("start set final events")
    setFinalEvents({...allDates, ...events})
    //console.log("end set final events")
    //console.log({...allDates, ...events});
    setPrevDate(selectedDate)
    
    setIsLoading(false);
  }, [selectedDate, events]);

  const MemoizedAgendaItem = React.memo(({ item, firstItemInDay }) => {
    return (
      <View style={styles.itemContainer}>
        <Text style={styles.titleText}> {item.title}</Text>
        <Text style={styles.subtitleText}> {item.subtitle}</Text>
        <Text style={styles.timeText}> {formatDate(new Date(item.date))}</Text>
        <Pressable onPress={() => deleteEvent(item.eventID)}>
          <Text
            style={{
              color: "red",
              fontWeight: "700",
              fontSize: 16,
              textAlign: "right",
            }}
          >
            Delete
          </Text>
        </Pressable>
      </View>
    );
  });

  const MemoizedAgendaEmptyData = React.memo(() => {
    return (
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          marginTop: 100,
        }}
      >
        <Text
          style={{ fontWeight: "700", fontSize: 20, textAlign: "center" }}
        >
          No events for selected day {"\n"}Please select another day
        </Text>
      </View>
    );
  });
  const rowHasChanged = (r1, r2) => r1.name !== r2.name;
  const renderEmptyDate = () => {
    return (
      <View style={styles.emptyDate}>
        <Text>This is empty date!</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      
      <Modal
        visible={isDeleteModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setIsDeleteModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>
              Select month and year to delete:
            </Text>
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={selectedMonth}
                onValueChange={(value) => setSelectedMonth(value)}
                style={styles.picker}
              >
                <Picker.Item label="January" value={0} />
                <Picker.Item label="February" value={1} />
                <Picker.Item label="March" value={2} />
                <Picker.Item label="April" value={3} />
                <Picker.Item label="May" value={4} />
                <Picker.Item label="June" value={5} />
                <Picker.Item label="July" value={6} />
                <Picker.Item label="August" value={7} />
                <Picker.Item label="September" value={8} />
                <Picker.Item label="October" value={9} />
                <Picker.Item label="November" value={10} />
                <Picker.Item label="December" value={11} />
              </Picker>
              <Picker
                selectedValue={selectedYear}
                onValueChange={(value) => setSelectedYear(value)}
                style={styles.picker}
              >
                {yearArray.map((year) => (
                  <Picker.Item
                    key={year}
                    label={year.toString()}
                    value={year}
                  />
                ))}
              </Picker>
            </View>
            <TouchableOpacity
              style={styles.deleteButton}
              onPress={handleDelete}
            >
              <Text style={styles.deleteButtonText}>Delete Events</Text>
            </TouchableOpacity>

            <Text style={styles.modalTitle}>Clear all calendar events</Text>
            <TouchableOpacity
              style={styles.deleteButton}
              onPress={deleteAllEvents}
            >
              <Text style={styles.deleteButtonText}>Delete ALL events</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setIsDeleteModalVisible(false)}
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <Agenda
      rowHasChanged={rowHasChanged}
      
        //get the date of the day that is selected
        onDayPress={(day) => {
          setIsLoading(true);
          console.log(true)
          setSelectedDate(day.dateString);
          //console.log(day.dateString);
        }}
        items={finalEvents}
        selected={selectedDate}
        theme={{
          // calendarBackground: '#000000'
          todayTextColor: "#00adf5",
        }}
        renderItem={(item, firstItemInDay) => {
          return <MemoizedAgendaItem item={item} firstItemInDay={firstItemInDay} />;
        }}
        renderEmptyData={() => <MemoizedAgendaEmptyData />}
        //renderEmptyDate={renderEmptyDate}
      />
    </View>
  );
}

export default GlobalEvents

const styles = StyleSheet.create({
  headerButtonsContainer: {
    flexDirection: "row",
    marginRight: 16,
    justifyContent: 'space-between'
  },
  headerIconFont: {
    fontSize: 12,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 16,
    minWidth: 300,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
  },
  monthButtonsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  monthButton: {
    backgroundColor: "#eee",
    borderRadius: 5,
    padding: 8,
    margin: 4,
  },
  monthButtonText: {
    fontSize: 16,
  },
  clearAllButton: {
    backgroundColor: "red",
    borderRadius: 5,
    padding: 8,
    marginTop: 16
  },
  clearAllButtonText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  deleteContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 16,
  },
  deleteButton: {
    backgroundColor: "red",
    borderRadius: 5,
    padding: 8,
    marginHorizontal: 8,
    marginBottom: 10,
  },
  deleteButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  closeButton: {
    backgroundColor: "#ccc",
    borderRadius: 5,
    padding: 8,
    marginTop: 16,
  },
  closeButtonText: {
    fontWeight: "bold",
  },
  titleText: {
    fontWeight: '700',
    fontSize: 16
  },
  subtitleText: {

  },
  timeText: {
    marginTop: 5,
    color: 'grey',
    fontSize: 14
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

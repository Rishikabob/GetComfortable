import { StyleSheet, Text, View, ScrollView, Dimensions } from "react-native";
import React, { useState, useEffect } from "react";
import { Calendar, CalendarProvider } from "react-native-calendars";
import EventListItem from "../EventListItem";
import { ref, onValue, get, set, query, orderByChild, orderByValue } from "firebase/database";
import { db } from "../../firebaseConfig";
import { merge } from 'lodash';
import { Modal } from "react-native";
import { Pressable } from "react-native";


const AdminCalendar = () => {
  //state variables
  const [date, setDate] = useState("");
  const [month, setMonth] = useState("");
  const [dayStr, setDayStr] = useState("");
  const [year, setYear] = useState("");
  const [eventsShown, setEventsShown] = useState({});
  const [eventsLoading, setEventsLoading] = useState(false);
  const [events, setEvents] = useState({});
  const [mentorEvents, setMentorEvents] = useState({})
  const [sortedEvents, setSortedEvents] = useState({})
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItemName, setSelectedItemName] = useState("Test");
  const [selectedItemDesc, setSelectedItemDesc] = useState("Test");
  const [selectedItemDate, setSelectedItemDate] = useState("Test");
  const [selectedEvent, setSelectedEvent] = useState(null);


  //const eventsKey = Object.keys(events);
  //const [eventsKey, setEventsKeys] = useState(Object.keys(events))
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let mark = {};
  (Object.keys(events).forEach((key) => {
    
    const dateTime = new Date(events[key].dateTime);
    let str = dateTime.toISOString().slice(0,10)
    mark[str] = {
      marked: true,
    };
  }))
  Object.assign(mark, { [date]: { selected: true, marked: false } });
  
function setModalVisibleFunc(dateTime, description, title) {
    setSelectedItemName(title);
    setSelectedItemDesc(description);
    setSelectedItemDate(dateTime);
    setModalVisible(true);
  }
function getShownEvents(events) {
  if (date.length === 0) {
    console.log("Date Empty");
    if (events.length != 0) {
      // Get today's date
      const today = new Date();

      // Create an object to store the events that occur on or after today's date
      const eventsOnOrAfterToday = {};

      // Loop through each event object in the events structure
      Object.keys(events).forEach((key) => {
        // Convert the dateTime string to a Date object
        const dateTime = new Date(events[key].dateTime);
        // console.log("given");
        // console.log(dateTime.toISOString());
        // console.log("match");
        // console.log(today.toISOString());
        // console.log("\n");

        // Check if the event occurs on or after today's date
        if (dateTime >= today) {
          // Add the event object to the object with the same key
          eventsOnOrAfterToday[key] = events[key];
        }
      });

      // Get the keys of the first 10 events on or after today's date
      const eventKeys = Object.keys(eventsOnOrAfterToday).slice(0, 10);

      // Create a new object to store the first 10 events with their original keys
      const first10Events = {};

      // Loop through the event keys and add the corresponding events to the new object
      eventKeys.forEach((key) => {
        first10Events[key] = eventsOnOrAfterToday[key];
      });
      //console.log(first10Events);
      //setEventsKeys(Object.keys(first10Events))
      return first10Events;
    }
  } else {
    //console.log("Date Selected is " + date);
    // Get today's date
    const today = new Date(date.replace(/-/g, "/"));
    //console.log(today.toDateString())

    // Create an object to store the events that occur on or after today's date
    const eventsOnToday = {};

    // Loop through each event object in the events structure
    Object.keys(events).forEach((key) => {
      // Convert the dateTime string to a Date object
      const dateTime = new Date(events[key].dateTime);
      // Check if the event occurs on or after today's date
      if (dateTime.toDateString() == today.toDateString()) {
        // Add the event object to the object with the same key
        eventsOnToday[key] = events[key];
      }
    });
    //console.log(eventsOnToday);
    return eventsOnToday;
  }
}


  
  //fetch and read data from database
  useEffect(() => {
    // const globalEventsRef = ref(db, "globalCalendar/");
    // const mentorEventsRef= ref(db, "mentorCalendar/");
    // const userEventsRef = ref(db, "userCalendar/");
    // const orderedQuery = query(globalEventsRef, orderByChild('dateTime'))
    // return onValue(orderedQuery, (snapshot) => {
    //   let data = snapshot.val() || {};
    //   let events = { ...data };
    //   //console.log(data)
    //   setEvents(events);
    //   setSortedEvents(sortEvents(events))
     

    //   console.log('events Changed')
    // });
    const globalEventsRef = ref(db, "globalCalendar/");
  const mentorEventsRef = ref(db, "mentorCalendar/");
  const userEventsRef = ref(db, "userCalendar/");

  const orderedQueryGlobal = query(globalEventsRef, orderByChild("dateTime"));
  const orderedQueryMentor = query(mentorEventsRef, orderByChild("dateTime"));
  const orderedQueryUser = query(userEventsRef, orderByChild("dateTime"));

  let events = {};

  const globalPromise = new Promise((resolve) => {
    onValue(orderedQueryGlobal, (snapshot) => {
      const data = snapshot.val() || {};
      events = { ...events, ...data };
      setEvents(events);
      setSortedEvents(sortEvents(events));
      resolve();
    });
  });

  const mentorPromise = new Promise((resolve) => {
    onValue(orderedQueryMentor, (snapshot) => {
      const data = snapshot.val() || {};
      events = { ...events, ...data };
      setEvents (events);
      setSortedEvents(sortEvents(events));
      resolve();
    });
  });

  const userPromise = new Promise((resolve) => {
    onValue(orderedQueryUser, (snapshot) => {
      const data = snapshot.val() || {};
      events = { ...events, ...data };
      setEvents(events);
      setSortedEvents(sortEvents(events));
      resolve();
    });
  });

    setEvents(events);
    setSortedEvents(sortEvents(events));
    console.log("events Changed");

    
  }, []);



  
  
  // const newTest = {};

  // for (const key in test) {
  //   const event = test[key];
  //   const dateTime = event.dateTime;
  //   newTest[dateTime] = event;
  // }
    
  // console.log('sorted')
  // console.log(newTest);
  function sortEvents(events) {
    const sortedEvents = {};

    for (const key in events) {
      const event = events[key];
      const dateTime = event.dateTime;
      event.key = key; // Add new key property to the event object
      sortedEvents[dateTime+key] = event;
    }

    const ordered = Object.keys(sortedEvents).sort().reduce(
      (obj, key) => { 
        obj[key] = sortedEvents[key]; 
        return obj;
      }, 
      {}
    );

    return ordered
  }
  //console.log(getShownEvents(sortEvents(events)))


  //const eventsKey = (Object.keys(getShownEvents(events)));

  const eventsKey = (Object.keys(getShownEvents(sortedEvents)));
  //console.log(eventsKey)
  const handlePress = (event) => {
    setSelectedItemName(event.title);
    setSelectedItemDesc(event.description);
    setSelectedItemDate(formatDate(new Date(event.dateTime)));
    setModalVisible(true);
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
    var strTime = fDate +" at "+ fTime
    return strTime

  }

  return (
    <View style={styles.container}>
      <Modal
      visible={modalVisible}
      animationType="none"
      transparent={true}
       onRequestClose={() => setModalVisible(false)}
      
      >
        <View style={styles.modalContainer}>
          
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>{selectedItemName}</Text>
            </View>
            <View style={styles.modalBody}>
            <Text style={styles.modalTextDesc}>{selectedItemDesc}</Text>
              <Text style={styles.modalTextDate}>When: {selectedItemDate}</Text>
            </View>
            <Pressable style={styles.closeButton} onPress={() => setModalVisible(false)}>
            <Text style={styles.closeButtonText}>Close</Text>
          </Pressable>
            </View>
            </View>

      </Modal>
      <View style={styles.calenderContainer}>
        <Calendar
          hideExtraDays={true}
          firstDay={0}
          style={{
            borderRadius: 10,
          }}
          markedDates={mark}
          onDayPress={(day) => {
            if (date === day.dateString) {
              setDate("");
              setMonth("");
              setDayStr("");
              setYear("");
            } else {
              setDate(day.dateString);
              setMonth(day.month);
              setDayStr(day.day);
              setYear(day.year);
            }

            //console.log('selected day', day);
          }}
          theme={{
            //selectedDayBackgroundColor: 'blue',
            //todayBackgroundColor: 'Red',
            backgroundColor: "#BDDFDE",
            calendarBackground: "#ffffff",
            arrowColor: "orange",
            monthTextColor: "#00645F",
            textMonthFontWeight: "700",
            marginVertical: 0,
            paddingLeft: 0,
            paddingRight: 0,

            "stylesheet.calendar.header": {
              header: {
                backgroundColor: "#BDDFDE",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                borderTopLeftRadius: 10,
                borderTopRightRadius: 10,
                // borderRadius: 4
              },
            },
            "stylesheet.calendar.main": {
              container: {
                padding: 0,
                backgroundColor: "white",
              },
              monthView: {
                backgroundColor: "white",
                borderRadius: 10,
              },
              week: {
                marginTop: 4,
                marginBottom: 4,
                flexDirection: "row",
                justifyContent: "space-around",
              },
            },
          }}
        />
      </View>
      <View style={styles.eventViewContainer}>
        <View style={styles.eventHeader}>
          <Text style={styles.eventHeaderText}>
            {date.length === 0
              ? "Upcoming Items"
              : monthNames[month - 1] + " " + dayStr + " " + year}
          </Text>
        </View>
        <View>
          <ScrollView
            style={styles.scrollViewContaienr}
            contentContainerStyle={styles.contentContainerStyle}
          >
            <View>
              {eventsKey.length > 0 ? (
                eventsKey.map((key) => (
                  <EventListItem key={key} id={key} eventItem={sortedEvents[key]} 
                  onPress={() => handlePress(sortedEvents[key])}/>
                ))
              ) : (
                <Text style={styles.noEventsText}>No Events</Text>
              )}
            </View>
          </ScrollView>
        </View>
      </View>
    </View>
  );
};

export default AdminCalendar;

const styles = StyleSheet.create({
  container: {
    width: "95%",
    alignItems: "center",
  },
  noEventsText: {
    fontWeight: "700",
    textAlign: "center",
    fontSize: 18,
  },
  eventViewContainer: {
    marginTop: 10,
    width: "95%",
    backgroundColor: "white",
    shadowColor: "#171717",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.25,
    shadowRadius: 3,
    borderRadius: 10,
    elevation: 3,
  },
  eventHeader: {
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    width: "100%",
    backgroundColor: "#BDDFDE",
    alignItems: "center",
  },
  eventHeaderText: {
    color: "#00645F",
    padding: 10,
    fontWeight: "700",
    fontSize: 16,
  },
  calenderContainer: {
    width: "95%",
    backgroundColor: "white",
    shadowColor: "#171717",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.25,
    shadowRadius: 3,
    borderRadius: 10,
    elevation: 3,
  },
  scrollViewContaienr: {
    backgroundColor: "white",
    maxHeight: Dimensions.get("window").height * 0.23,
    borderRadius: 10,
  },
  contentContainerStyle: {
    padding: 5,
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
  closeButton: {
    backgroundColor: "#ccc",
    borderRadius: 5,
    padding: 8,
    marginTop: 20,
    alignItems: "center",
  },
  closeButtonText: {
    fontWeight: "bold",},

  modalTextDesc: {
    fontSize: 18,
    marginBottom: 30,
  },
  modalTextDate: {
    fontSize: 16,
    marginBottom: 8,
  },

  modalBody: {
    marginTop: 10,
  },



    
});

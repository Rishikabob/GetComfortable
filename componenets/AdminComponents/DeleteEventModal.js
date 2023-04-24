import React from 'react';
import { Modal, Alert } from 'react-native';
import { ref, remove } from "firebase/database";
import moment from 'moment';
import { Picker } from '@react-native-picker/picker';

const DeleteEventModal = ({ isModalVisible, setIsModalVisible, selectedYear, selectedMonth }) => {

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
            const eventsRef = ref(db, "globalCalendar/");
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

  const handleDelete = () => {
    deleteEventsForMonth(selectedYear, selectedMonth);
  }

  const deleteEventsForMonth = (year, month) => {
    const eventsRef = ref(db, "globalCalendar/");
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
            const eventRef = ref(db, `globalCalendar/${key}`);
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
            const eventRef = ref(db, `globalCalendar/${eventId}`);
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
} 
return {
    <Modal
  visible={isDeleteModalVisible}
  animationType="slide"
  transparent={true}
  onRequestClose={() => setIsDeleteModalVisible(false)}
>
<View style={styles.modalContainer}>
        <View style={styles.modalContent}>
        
          <Text style={styles.modalTitle}>Select month and year to delete:</Text>
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
    <Picker.Item key={year} label={year.toString()} value={year} />
  ))}
</Picker>
          </View>
          <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
            <Text style={styles.deleteButtonText}>Delete Events</Text>
          </TouchableOpacity>

          <Text style = {styles.modalTitle}> 
            Clear all calendar events
          </Text>
          <TouchableOpacity style={styles.deleteButton} onPress={deleteAllEvents}>
            <Text style={styles.deleteButtonText}>Delete ALL events</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.closeButton} onPress={() => setIsDeleteModalVisible(false)}>
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
    
}

export default DeleteEventModal

const styles = StyleSheet.create({})
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  Button,
  Keyboard,
  TouchableWithoutFeedback,
  Alert,
} from "react-native";
import React from "react";
import { db } from "../../../firebaseConfig";
import { get, set, ref, onValue, push } from "firebase/database";
import { useEffect } from "react";
import { useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { async } from "@firebase/util";

const NewNotifScreen = () => {
  // Define state variables
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [selectedGroup, setSelectedGroup] = useState("global");
  const [isLoading, setIsLoading] = useState(false);

  // Define a reference to the 'users' node in the Firebase Realtime Database
  const usersRef = ref(db, "users/");

  // Define state variables for the list of all users, mentors, and users respectively
  const [globalUsers, setGlobalUsers] = useState({});
  const [mentors, setMentors] = useState([]);
  const [users, setUsers] = useState([]);
  const [allUsers, setAllUsers] = useState([]);

  // Load the list of users from the Firebase Realtime Database when the component mounts
  useEffect(() => {
    // Set up a listener on the 'users' node to get updates whenever the list of users changes
    return onValue(usersRef, (snapshot) => {
      // Get the data from the snapshot, or an empty object if it doesn't exist
      let data = snapshot.val() || {};
      // Create a copy of the data object
      let globalUsers = { ...data };
      // Update the state variable with the new data
      setGlobalUsers(globalUsers);
    });
  }, []);

  // Load the list of mentors and users, and the list of all users, when the globalUsers state variable changes
  useEffect(() => {
    getMentors();
    getUsers();
    getAllUsers();
  }, [globalUsers]);

  // Log the list of mentor UIDs whenever it changes
  useEffect(() => {
    console.log("Mentor UID List");
    console.log(mentors);
  }, [mentors]);

  // Log the list of user UIDs whenever it changes
  useEffect(() => {
    console.log("user UID List");
    console.log(users);
  }, [users]);

  // Log the list of all user UIDs whenever it changes
  useEffect(() => {
    console.log("Global UID List");
    console.log(allUsers);
  }, [allUsers]);

  // Get an array of mentor tokens from the globalUsers object
  const getMentors = () => {
    //console.log('Get Mentors running')
    let mentorUIDArray = [];
    Object.keys(globalUsers).forEach((obj) => {
      if (globalUsers[obj].accountType === "mentor") {
        let token = globalUsers[obj].token;
        if (token != null && token != "") mentorUIDArray.push(token);
      }
    });
    setMentors(mentorUIDArray);
  };

  // Get an array of user tokens from the globalUsers object
  const getUsers = () => {
    //console.log('Get Users running')
    let userUIDArray = [];
    Object.keys(globalUsers).forEach((obj) => {
      if (globalUsers[obj].accountType === "user") {
        let token = globalUsers[obj].token;
        if (token != null && token != "") userUIDArray.push(token);
      }
    });
    setUsers(userUIDArray);
  };
// Get an array of all user tokens from the globalUsers object
  const getAllUsers = () => {
    //console.log('Get Global Users running')
    let allUIDArray = [];
    Object.keys(globalUsers).forEach((obj) => {
      let token = globalUsers[obj].token;
      if (token != null && token != "") allUIDArray.push(token);
    });
    setAllUsers(allUIDArray);
  };

  // Send push notifications to the selected group of users
  async function sendPushNotificationForGroup() {
    setIsLoading(true);
    // Check that the title and body fields are not empty
    if (!title || !body) {
      Alert.alert("Please fill in both fields");
      setIsLoading(false);
      return;
    }
    // Check that a group has been selected
    switch (selectedGroup) {
      // Send a push notification to all users
      case "global":
        allUsers.forEach((obj) => {
          console.log("Object: " + obj);
          sendPushNotification(obj);
        });
        //put notification in DB under globalNotifications
        writeData(title, body, "globalNotifications/");
        Alert.alert("Notification sent globally");
        break;

      // Send a push notification to all mentors
      case "mentors":
        mentors.forEach((obj) => {
          console.log("Object: " + obj);
          sendPushNotification(obj);
        });
        //put notification in DB under mentorNotifications
        writeData(title, body, "mentorNotifications/");
        Alert.alert("Notification sent to all mentors");
        break;

      // Send a push notification to all users
      case "user":
        users.forEach((obj) => {
          console.log("Object: " + obj);
          sendPushNotification(obj);
        });
        //put notification in DB under userNotifications
        writeData(title, body, "userNotifications/");
        Alert.alert("Notification sent to all users");
        break;

      default:
        console.log("No group selected");
        setIsLoading(false);
    }
  }
  // Send a push notification to the specified token
  async function sendPushNotification(expoPushToken) {
    //define message
    const message = {
      to: expoPushToken,
      sound: "default",
      title: title,
      body: body,
      data: { someData: "goes here" },
    };
    //send message using Expo API
    await fetch("https://exp.host/--/api/v2/push/send", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Accept-encoding": "gzip, deflate",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(message),
    });
  }

  // Dismiss the keyboard when the user taps outside of the text input
  const handleContainerPress = () => {
    Keyboard.dismiss();
  };

  // Add the notification to the database based on the selected group
  function writeData(title, body, notificationType) {
    // Get a reference to the database
    const dbRef = ref(db, notificationType);
    // Push the notification to the database
    push(dbRef, {
      title: title,
      body: body,
      date: new Date().toISOString(),
    })
    //on success, log to console and dismiss the loading indicator
      .then(() => {
        console.log("notificaiton added to db");
        setIsLoading(false);
      })
      //on error, log to console and dismiss the loading indicator
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  }
  return (
    <TouchableWithoutFeedback onPress={handleContainerPress}>
      <View style={{ flex: 1 }}>
        <View style={{ padding: 20 }}>
          <TextInput
            style={{
              backgroundColor: "white",
              borderRadius: 10,
              padding: 10,
              height: 40,
              borderColor: "gray",
              borderWidth: 1,
              marginBottom: 20,
            }}
            onChangeText={setTitle}
            value={title}
            placeholder="Title"
          />
          <TextInput
            style={{
              backgroundColor: "white",
              borderRadius: 10,
              padding: 10,
              height: 100,
              borderColor: "gray",
              borderWidth: 1,
              marginBottom: 20,
            }}
            onChangeText={setBody}
            value={body}
            placeholder="Body"
            multiline
          />
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <View
              style={{
                borderRadius: 10,
                backgroundColor:
                  selectedGroup === "global" ? "#0F6E69" : "white",
              }}
            >
              <Button
                title="Global"
                onPress={() => setSelectedGroup("global")}
                color={selectedGroup === "global" ? "white" : "#000"}
              />
            </View>
            <View
              style={{
                borderRadius: 10,
                backgroundColor:
                  selectedGroup === "mentors" ? "#0F6E69" : "white",
              }}
            >
              <Button
                title="Mentors"
                onPress={() => setSelectedGroup("mentors")}
                color={selectedGroup === "mentors" ? "white" : "#000"}
              />
            </View>
            <View
              style={{
                borderRadius: 10,
                backgroundColor: selectedGroup === "user" ? "#0F6E69" : "white",
              }}
            >
              <Button
                title="User"
                onPress={() => setSelectedGroup("user")}
                color={selectedGroup === "user" ? "white" : "#000"}
              />
            </View>
          </View>
          <View style={{ margin: 15 }} />
          <Button
            title="Send Notification"
            onPress={async () => {
              //await sendPushNotification("ExponentPushToken[mzEwM9G-nuT22M3rYZMWIl]");
              await sendPushNotificationForGroup();
            }}
          />
          <View style={{ margin: 15 }} />
          {isLoading && <Text>Sending Notifications. Please Wait...</Text>}
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default NewNotifScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  buttonContainer: {
    margin: 10,
    backgroundColor: "#00645F",
    borderRadius: 10,
  },
  buttonText: {
    padding: 10,
    fontWeight: "700",
    color: "white",
  },
});

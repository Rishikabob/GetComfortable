import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { getAuth, updateProfile } from "firebase/auth";

const ChangeNameScreen = () => {
  const navigation = useNavigation();
  const [displayName, setDisplayName] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const user = getAuth().currentUser;

  const handleUpdateName = () => {
    if (displayName === "") {
      setErrorMessage("Please enter a display name.");
      return;
    }

    updateProfile(user, {
      displayName: displayName,
    })
      .then(() => {
        setDisplayName("");
        setErrorMessage(null);
        alert("Display name updated successfully.");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setErrorMessage(errorMessage);
      });
  };

  return (
    <View style={styles.container}>
     
      <View style={styles.formContainer}>
        <Text style={styles.header}>Current Display Name:</Text>
        <Text style={styles.label}>{user.displayName}</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter new display name"
          onChangeText={(text) => setDisplayName(text)}
          value={displayName}
        />
        {errorMessage && <Text style={styles.error}>{errorMessage}</Text>}
        <TouchableOpacity style={styles.button} onPress={handleUpdateName}>
      <Text style={styles.buttonText}>Update Name</Text>
    </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  formContainer: {
    width: "80%",
    alignItems: "center",
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  text: {
    fontSize: 16,
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
    width: "100%",
  },
  error: {
    color: "red",
    marginBottom: 20,
  },
  button: {
    width: '80%',
    height: 48,
    borderRadius: 8,
    backgroundColor: '#007AFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default ChangeNameScreen;
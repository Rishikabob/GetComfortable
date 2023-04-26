import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { getAuth, updatePassword, reauthenticateWithCredential, EmailAuthProvider } from 'firebase/auth';
import { Alert } from 'react-native';


const ChangePasswordScreen = () => {
const auth = getAuth();

const [currentPassword, setCurrentPassword] = useState('');
const [newPassword, setNewPassword] = useState('');
const [confirmPassword, setConfirmPassword] = useState('');
const [error, setError] = useState('');

const handleUpdatePassword = () => {
  if (!currentPassword || !newPassword || !confirmPassword) {
    setError('Please fill in all fields.');
    return;
  }

  if (newPassword !== confirmPassword) {
    setError('Passwords do not match.');
    return;
  }


  const user = auth.currentUser;
  const credential = EmailAuthProvider.credential(user.email, currentPassword);

  reauthenticateWithCredential(user, credential).then(() => {
    updatePassword(user, newPassword)
    .then(() => {
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setError(null);
      Alert.alert("Success", "Password updated successfully.");
    
      // Password updated successfully.
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      setError(errorMessage);
      // An error occurred.
    });
  }).catch((error) => {
    if (error.code === 'auth/wrong-password') {
      setError('Invalid password.');
      return;
    } else {
        setError(error.message);
        return;
    }
  });

  if (!user) {
    setError('User not found.');
    return;
  }


  

  
};

return (
  <View style={styles.container}>
    <Text style={styles.title}>Change Password</Text>
    <TextInput
      style={styles.input}
      placeholder="Current Password"
      value={currentPassword}
      onChangeText={(text) => setCurrentPassword(text)}
      secureTextEntry={true}
      autoCapitalize="none"
    />
    <TextInput
      style={styles.input}
      placeholder="New Password"
      value={newPassword}
      onChangeText={(text) => setNewPassword(text)}
      secureTextEntry={true}
      autoCapitalize="none"
    />
    <TextInput
      style={styles.input}
      placeholder="Confirm Password"
      value={confirmPassword}
      onChangeText={(text) => setConfirmPassword(text)}
      secureTextEntry={true}
      autoCapitalize="none"
    />
    <TouchableOpacity style={styles.button} onPress={handleUpdatePassword}>
      <Text style={styles.buttonText}>Update Password</Text>
    </TouchableOpacity>
    {error ? <Text style={styles.error}>{error}</Text> : null}
  </View>
);
}

export default ChangePasswordScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
      },
      title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
      },
      input: {
        width: '80%',
        height: 48,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        paddingLeft: 16,
        marginBottom: 16,
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
      error: {
        color: '#FF3B30',
        fontSize: 14,
        marginTop: 8,
      },
})
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, Alert } from 'react-native';
import { getDatabase, ref, child, onValue, update } from 'firebase/database';
import { Ionicons } from '@expo/vector-icons';
import { TextInput } from 'react-native';


const DeactivateUserScreen = () => {
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const db = getDatabase();
    const usersRef = ref(db, 'users');

    onValue(usersRef, (snapshot) => {
      const data = snapshot.val() || {};
      const users = Object.entries(data).map(([id, user]) => ({ id, ...user }));
      setUsers(users);
    });
  }, []);

  const handleDeleteUser = (id) => {
    Alert.alert(
      'Delete User',
      'Are you sure you want to delete this user?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            const db = getDatabase();
            const userRef = child(ref(db), `users/${id}`);
            update(userRef, { inactive: true });
          },
        },
      ],
      { cancelable: true },
    );
  };

  const renderUser = ({ item: user }) => (
    <TouchableOpacity onPress={() => handleDeleteUser(user.id)}>
      <View style={styles.userContainer}>
        <View>
        <Text style={styles.userName}>{user.name} </Text>
        <Text style={styles.userEmail}>{user.email}</Text>
        <Text style={styles.userEmail}>Account Type: {(user.accountType).toUpperCase()}</Text>
        </View>
        <Text style={user.inactive? styles.inactiveText: styles.activeText}>{user.inactive? "Inactive" : "Active" }</Text>
        <Ionicons name="ios-trash-outline" size={24} color="#f44336" />
      </View>
    </TouchableOpacity>
  );
  const handleSearchQueryChange = (query) => {
    setSearchQuery(query);
  }; 
  const filteredUsers = users.filter((user) => {
    const searchLower = searchQuery.toLowerCase();
    return user.name.toLowerCase().includes(searchLower) || user.email.toLowerCase().includes(searchLower);
  });

  return (
    <View style={styles.container}>
        
        <TextInput
        style={styles.searchInput}
        placeholder="Search users by name or email..."
        value={searchQuery}
        onChangeText={handleSearchQueryChange}
      />
      {filteredUsers.length > 0 ? (
        <FlatList
          data={filteredUsers}
          renderItem={renderUser}
          keyExtractor={(user) => user.id}
          contentContainerStyle={styles.listContainer}
        />
      ) : (
        <Text>No users found.</Text>
      )}
    </View>
  );
};

const styles = {
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  listContainer: {
    paddingBottom: 20,
  },
  userContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#f2f2f2',
    borderRadius: 10,
    padding: 20,
    marginBottom: 10,
  },
  userName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  userEmail: {
    fontSize: 14,
  },
  searchInput: {
    backgroundColor: '#f2f2f2',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginTop: 10,
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center'
  },
  searchInputText: {
    flex: 1,
    fontSize: 16,
    color: '#333'
  },
    activeText: {
    fontSize: 16,
    color: '#4caf50',
    fontWeight: 'bold',
    },
    inactiveText: {
    fontSize: 16,
    color: '#f44336',
    fontWeight: 'bold',
    },

};

export default DeactivateUserScreen;

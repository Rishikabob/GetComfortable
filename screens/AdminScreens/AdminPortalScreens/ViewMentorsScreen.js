import { FlatList, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { getDatabase, ref, query, orderByChild, equalTo, onValue } from 'firebase/database';


const ViewMentorsScreen = () => {
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  
  useEffect(() => {
    const db = getDatabase();
    const usersRef = ref(db, 'users');
    const orderedQuery = query(usersRef, orderByChild('accountType'), equalTo('mentor'));
  
    return onValue(orderedQuery, (snapshot) => {
      const usersObject = snapshot.val();
      const usersList = Object.keys(usersObject).map((key) => ({
        ...usersObject[key],
        uid: key,
      }));
      setUsers(usersList);
    });
  

  }, []);

  const handleSearchQueryChange = (query) => {
    setSearchQuery(query);
  }; 


  const renderNoData = () => (
    <View style={styles.noDataContainer}>
      <Text style={styles.noDataText}>No users to show.</Text>
    </View>
  );
  const filteredUsers = users.filter((user) => {
    const searchLower = searchQuery.toLowerCase();
    return user.name.toLowerCase().includes(searchLower) || user.email.toLowerCase().includes(searchLower);
  });


  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search users by name or email..."
        onChangeText={handleSearchQueryChange}
        value={searchQuery}
      />
      {filteredUsers.length > 0 ? (
        <FlatList
          data={filteredUsers}
          renderItem={({ item }) => (
             <View style={styles.userContainer}>
              <View>
              <Text style={styles.userName}>{item.name}</Text>
              <Text style={styles.userEmail}>{item.email}</Text>
              <Text style={styles.userEmail}>Account Type: {(item.accountType).toUpperCase()}</Text>
              </View>
              <Text style={item.inactive? styles.inactiveText: styles.activeText}>{item.inactive? "Inactive" : "Active" }</Text>
            </View>
          )}
          keyExtractor={(item) => item.uid}
          contentContainerStyle={styles.listContainer}
          ListEmptyComponent={<View style={styles.noDataContainer}>
          <Text style={styles.noDataText}>No users to show.</Text>
        </View>}
        />
      ) : (
        renderNoData()
      )}
    </View>
  )
}

export default ViewMentorsScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    //alignItems: 'center',
    justifyContent: 'center',
    // borderColor: 'blue',
    // borderWidth: 1,
    padding : 10,
  },
  listContainer: {
    // borderColor: 'red',
    // borderWidth: 1,
    //flexGrow: 1,
    //width: "100%",
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  userContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#f2f2f2',
    borderRadius: 10,
    padding: 10,
    marginVertical: 5,
    width: '100%',
  },
  userName: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  userEmail: {
    color: '#666',
    fontSize: 16,
  },
  noDataContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  noDataText: {
    fontSize: 18,
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
})
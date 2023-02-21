import { StyleSheet, Text, TouchableOpacity, View, FlatList, ScrollView } from 'react-native'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import AdminTopBar from '../../componenets/AdminComponents/AdminTopBar'
import Constants from 'expo-constants';
import ItemListHome from '../../componenets/ItemListHome';
import { db } from '../../firebaseConfig';
import { ref, onValue } from 'firebase/database';


const ADMResourcesScreen = () => {
  const [resources, setResources] = useState([])
  
  const resourcesListRef = ref(db,'resourcesProd/')

  //fetch and read data from database
  useEffect(() => {
    return onValue(resourcesListRef,(snapshot) => {
      let data = snapshot.val() || {};
      let resources = {...data};
      setResources(resources)
    });
  }, [])  

  const resourcesKey = Object.keys(resources)

  return (
    <View style={styles.container}>
      <View style={styles.statusBar}/>
      <AdminTopBar/>

      <ScrollView style={styles.scrollViewContaienr}
    contentContainerStyle={styles.contentContainerStyle}>
      <View>
      {resourcesKey.length>0 ? (
        resourcesKey.map(key => (
        <ItemListHome
        key={key}
        id={key}
        surveyItem={resources[key]}
        />
      ))
      ) : (<Text>No Resources</Text>)}
      </View>
    </ScrollView>
    </View>
  )
}

export default ADMResourcesScreen

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
      flex: 1,
      alignItems: 'center',
  },
  statusBar: {
    backgroundColor: '#white',
    height: Constants.statusBarHeight
  },
  

  scrollViewContaienr: {
    backgroundColor: 'white',
    paddingTop: 12,
    width: "100%"
  },
  contentContainerStyle: {
    padding: 20
  },
  headerIconFont: {
        fontSize: 12,
  },
  saveButtonContainer: {
    marginHorizontal: 10,
    borderRadius: 10,
    alignItems: 'center',
    backgroundColor: '#00645F',
    marginBottom:50,
    padding: 20,
    marginTop: 20,
  },
  saveButtonText: {
    color: "white",
    fontWeight: '700',
    fontSize: 18
  },  
})

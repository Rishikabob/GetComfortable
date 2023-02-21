import { StyleSheet, Text, TouchableOpacity, View, FlatList, ScrollView } from 'react-native'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { Ionicons } from '@expo/vector-icons';
import {ref, onValue, set} from "firebase/database";
import { db } from '../../../firebaseConfig';
import FormListItem from '../../../componenets/AdminComponents/FormListItem';


const ResourcesScreen = ({navigation}) => {
  const [resources, setResources] = useState([])

    //change header options
    useLayoutEffect(() => {
        navigation.setOptions({
            title: 'Resources',
            headerBackTitle: 'Back',
            headerRight: () => 
            <TouchableOpacity onPress={() => {navigation.navigate('EditResource')}}>
                <Ionicons name="pencil" size={24} color="black" />
                <Text style={styles.headerIconText}>Edit</Text>
            </TouchableOpacity>
        })
    },[])

    const resourcesListRef = ref(db,'resources/')

    //fetch and read data from database
    useEffect(() => {
      return onValue(resourcesListRef,(snapshot) => {
        let data = snapshot.val() || {};
        let resources = {...data};
        setResources(resources)
      });
    }, [])  


    const saveChanges = () => {
      const prodRef = ref(db,'resourcesProd/')
      set(prodRef, resources).then(()=> {
        Alert.alert("Changes Saved to Production")
      }).catch((error)=> {
        Alert.alert("Could NOT save changes to production ")
      })
    }

    const resourcesKey = Object.keys(resources)
  return (
    <View style={styles.container}>
    <ScrollView style={styles.scrollViewContaienr}
    contentContainerStyle={styles.contentContainerStyle}>
      <View>
      {resourcesKey.length>0 ? (
        resourcesKey.map(key => (
        <FormListItem
        key={key}
        id={key}
        surveyItem={resources[key]}
        reference='resources'

        />
      ))
      ) : (<Text>No Resources</Text>)}
      </View>
    </ScrollView>
    
    <TouchableOpacity style={styles.saveButtonContainer} onPress={saveChanges}>
      <Text style={styles.saveButtonText}>Save Changes</Text>
    </TouchableOpacity>
    
    </View>
  )
}

export default ResourcesScreen

const styles = StyleSheet.create({
    headerIconText: {
        fontSize: 12,
    },
    container: {
      backgroundColor: 'white',
      flex:1,
    },
    scrollViewContaienr: {
      backgroundColor: 'white',
      paddingTop: 12
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

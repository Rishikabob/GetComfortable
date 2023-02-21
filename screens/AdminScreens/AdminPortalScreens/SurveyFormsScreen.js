import { StyleSheet, Text, TouchableOpacity, View, FlatList, ScrollView, Alert } from 'react-native'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { Ionicons } from '@expo/vector-icons';
import {ref, onValue, get, set} from "firebase/database";
import {db} from "../../../firebaseConfig"

import FormListItem from '../../../componenets/AdminComponents/FormListItem';
import { DrawerToggleButton } from '@react-navigation/drawer';


const SurveyFormsScreen = ({navigation}) => {
  
    const [surveys, setSurveys] = useState([])

    useLayoutEffect (() => {
        navigation.setOptions({
            title: "Survey Forms",
            headerBackTitle: "Back",
            headerRight: () => 
            <TouchableOpacity onPress={() => {navigation.navigate('EditSurvey')}}>
                <Ionicons name="pencil" size={24} color="black" />
                <Text style={styles.headerIconFont}>Edit</Text>
            </TouchableOpacity>
            
        });
    }, [])

    const surveyListRef = ref(db,'surveys/')
    //fetch and read data from database
    useEffect(() => {
      return onValue(surveyListRef,(snapshot) => {
        let data = snapshot.val() || {};
        let surveys = {...data};
        setSurveys(surveys)
      });
    }, [])  
    

    


    const saveChanges = () => {
      const prodRef = ref(db,'surveysProd/')
      set(prodRef, surveys).then(()=> {
        Alert.alert("Changes Saved to Production")
      }).catch((error)=> {
        Alert.alert("Could NOT save changes to production ")
      })
    }
    
    const surveyKey = Object.keys(surveys)
  return (
    <View style={styles.container}>
    <ScrollView style={styles.scrollViewContaienr}
    contentContainerStyle={styles.contentContainerStyle}>
      <View>
      {surveyKey.length>0 ? (
        surveyKey.map(key => (
        <FormListItem
        key={key}
        id={key}
        surveyItem={surveys[key]}
        reference='surveys'
        />
      ))
      ) : (<Text>No Surveys</Text>)}
      </View>
    </ScrollView>
    
    <TouchableOpacity style={styles.saveButtonContainer} onPress={saveChanges}>
      <Text style={styles.saveButtonText}>Save Changes</Text>
    </TouchableOpacity>
    
    </View>
  )
}

export default SurveyFormsScreen

const styles = StyleSheet.create({
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
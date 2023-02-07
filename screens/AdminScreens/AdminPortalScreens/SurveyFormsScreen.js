import { StyleSheet, Text, TouchableOpacity, View, FlatList } from 'react-native'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { Ionicons } from '@expo/vector-icons';
import {ref, onValue} from "firebase/database";
import {db} from "../../../firebaseConfig"


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
    // useEffect(() => {
    //   onValue(surveyListRef,(snapshot) => {
    //     const data = snapshot.val();
    //     setSurveys(data)
    //     console.log(surveys)
    //   })
    // },[])
    
  return (
    <View>
      <Text>SurveyFormsScreen</Text>
    </View>
  )
}

export default SurveyFormsScreen

const styles = StyleSheet.create({
    headerIconFont: {
        fontSize: 12,
    }
})
import { StyleSheet, Text, TouchableOpacity, View, FlatList, ScrollView } from 'react-native'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import WebView from 'react-native-webview'
import AdminTopBar from '../../componenets/AdminComponents/AdminTopBar'
import Constants from 'expo-constants';
import { db } from '../../firebaseConfig';
import { ref, onValue } from 'firebase/database';
import { Ionicons } from '@expo/vector-icons';
import ItemListHome from '../../componenets/ItemListHome';


const ADMSurveyScreen = () => {
  const [surveys, setSurveys] = useState([])

  const surveyListRef = ref(db,'surveysProd/')
    //fetch and read data from database
    useEffect(() => {
      return onValue(surveyListRef,(snapshot) => {
        let data = snapshot.val() || {};
        let surveys = {...data};
        setSurveys(surveys)
      });
    }, [])  


    const surveyKey = Object.keys(surveys)
  return (
    <View style={styles.container}>
      <View style={styles.statusBar}/>
      <AdminTopBar/>
     
    
    <ScrollView style={styles.scrollViewContaienr}
    contentContainerStyle={styles.contentContainerStyle}>
      <View>
      {surveyKey.length>0 ? (
        surveyKey.map(key => (
        <ItemListHome
        key={key}
        id={key}
        surveyItem={surveys[key]}
        />
      ))
      ) : (<Text>No Surveys</Text>)}
      </View>
    </ScrollView>
    
  
    
    
      
    </View>
  )
}

export default ADMSurveyScreen

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
  webViewContainer: {
    width: 400,
    height: 200
  },
  container2: {
    backgroundColor: 'white',
    flex:1,
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
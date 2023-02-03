import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import AdminListItems from '../../../componenets/AdminComponents/AdminListItems';


const ManageFroms = ({navigation}) => {

    const formOptions=[
        {title:'View All Forms', subTitle:'', icon:'clipboard-outline',iconBoxColor:'#00645F', onPress: () => {navigation.navigate("ViewAllForms")}},
        {title:'View/Edit Survey Froms', subTitle:'', icon:'clipboard-outline',iconBoxColor:'#00645F', onPress: () => {navigation.navigate("SurveyForms")}},
        {title:'View/Edit Resoruces', subTitle:'', icon:'stats-chart',iconBoxColor:'#00645F', onPress: () => {}}
    ];

  return (
    <AdminListItems items = {formOptions}/>
  )
}

export default ManageFroms

const styles = StyleSheet.create({})
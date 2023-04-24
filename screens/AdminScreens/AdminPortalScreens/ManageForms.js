import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import AdminListItems from '../../../componenets/AdminComponents/AdminListItems';


const ManageForms = ({navigation}) => {

    const formOptions=[
     
        {title:'View/Edit Survey Forms', subTitle:'', icon:'clipboard-outline',iconBoxColor:'#00645F', onPress: () => {navigation.navigate("SurveyForms")}},
        {title:'View/Edit Resources', subTitle:'', icon:'stats-chart',iconBoxColor:'#00645F', onPress: () => {navigation.navigate("ResourcesScreen")}}
    ];

  return (
    <AdminListItems items = {formOptions}/>
  )
}

export default ManageForms

const styles = StyleSheet.create({})
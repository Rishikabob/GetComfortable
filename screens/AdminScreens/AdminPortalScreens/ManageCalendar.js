import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import AdminListItems from '../../../componenets/AdminComponents/AdminListItems';


const ManageCalendar = ({navigation}) => {

    const calendarOptions=[
        {title:'View Global Events', subTitle: null, icon: 'calendar-outline', iconBoxColor: '#00645F', onPress: () => {navigation.navigate('Manage Global Events')}},
        {title:'View Mentor Events', subTitle: null, icon: 'calendar-outline', iconBoxColor: '#00645F', onPress: () => {navigation.navigate('Manage Mentor Events')}},
        {title:'View User Events', subTitle: null, icon: 'calendar-outline', iconBoxColor: '#00645F', onPress: () => {navigation.navigate('Manage User Events')}},
        ];
  return (
    <AdminListItems items = {calendarOptions} />
  )
}

export default ManageCalendar

const styles = StyleSheet.create({})
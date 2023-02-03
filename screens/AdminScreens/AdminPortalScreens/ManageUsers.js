import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import AdminListItems from '../../../componenets/AdminComponents/AdminListItems';
import { useNavigation } from '@react-navigation/core';

const ManageUsers = () => {
  const navigation = useNavigation()

  const usersOptions=[
    {title:'View All Users', subTitle: null, icon: 'person-outline', iconBoxColor: '#00645F', onPress: () => {}},
    {title:'View All Mentors', subTitle: null, icon: 'person-outline', iconBoxColor: '#00645F', onPress: () => {}},
    {title:'View All Students', subTitle: null, icon: 'person-outline', iconBoxColor: '#00645F', onPress: () => {}},
    {title:'Add User', subTitle: null, icon: 'person-add-outline', iconBoxColor: '#589D00', onPress: () => {navigation.navigate("Add User")}},
    {title:'Delete User', subTitle: null, icon: 'person-remove-outline', iconBoxColor: 'rgb(255, 52, 52)', onPress: () => {}},
  ];
  return (
    <AdminListItems items = {usersOptions} />
  )
}

export default ManageUsers

const styles = StyleSheet.create({})
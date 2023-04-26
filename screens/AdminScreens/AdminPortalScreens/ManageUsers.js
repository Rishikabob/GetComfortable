import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import AdminListItems from '../../../componenets/AdminComponents/AdminListItems';
import { useNavigation } from '@react-navigation/core';

const ManageUsers = () => {
  const navigation = useNavigation()

  const usersOptions=[
    {title:'View All Users', subTitle: null, icon: 'person-outline', iconBoxColor: '#00645F', onPress: () => {navigation.navigate("ViewUsers")}},
    {title:'View All Mentors', subTitle: null, icon: 'person-outline', iconBoxColor: '#00645F', onPress: () => {navigation.navigate("ViewMentors")}},
    {title:'View All Admins', subTitle: null, icon: 'person-outline', iconBoxColor: '#00645F', onPress: () => {navigation.navigate("ViewAdmins")}},
    {title:'Invite User', subTitle: null, icon: 'person-add-outline', iconBoxColor: '#589D00', onPress: () => {navigation.navigate("Add User")}},
    {title:'Deactivate User', subTitle: null, icon: 'person-remove-outline', iconBoxColor: 'rgb(255, 52, 52)', onPress: () => {navigation.navigate("DeactivateUser")}},
    {title:'Reactivate User', subTitle: null, icon: 'person-add-outline', iconBoxColor: '#589D00', onPress: () => {navigation.navigate("ReactivateUser")}},

  ];
  return (
    <AdminListItems items = {usersOptions} />
  )
}

export default ManageUsers

const styles = StyleSheet.create({})
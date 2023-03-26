import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import AdminListItems from '../../../componenets/AdminComponents/AdminListItems';
import { useNavigation } from '@react-navigation/core';

const ManageNotifications = () => {
    const navigation = useNavigation()
    const notificationOptions=[
        {title:'View Global Notifications', subTitle: null, icon: 'notifications-outline', iconBoxColor: '#589D00', onPress: () => {navigation.navigate("Global Notifications")}},
        {title:'View Mentor Notifications', subTitle: null, icon: 'notifications-outline', iconBoxColor: '#c75b18', onPress: () => {navigation.navigate("Mentor Notifications")}},
        {title:'View User Notifications', subTitle: null, icon: 'notifications-outline', iconBoxColor: '#1884c7', onPress: () => {navigation.navigate("User Notifications")}},
        {title:'Create New Notification', subTitle: null, icon: 'notifications-outline', iconBoxColor: 'rgb(255, 52, 52)', onPress: () => {navigation.navigate("New Notification")}},

      ];
      return (
        <AdminListItems items = {notificationOptions} />
      )
}

export default ManageNotifications

const styles = StyleSheet.create({})
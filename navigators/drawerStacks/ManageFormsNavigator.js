import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ManageFroms from '../../screens/AdminScreens/AdminPortalScreens/ManageFroms';
import AllFromsScreen from '../../screens/AdminScreens/AdminPortalScreens/AllFromsScreen';
import SurveyFormsScreen from '../../screens/AdminScreens/AdminPortalScreens/SurveyFormsScreen';
import EditSurveyModal from '../../screens/AdminScreens/AdminPortalScreens/EditSurveyModal';
import ResourcesScreen from '../../screens/AdminScreens/AdminPortalScreens/ResourcesScreen';
import EditResourcesModal from '../../screens/AdminScreens/AdminPortalScreens/EditResourcesModal';


const ManageFormsNavigator = () => {

    const ManageFromsStack = createNativeStackNavigator()


  return (
    <ManageFromsStack.Navigator>
        <ManageFromsStack.Screen options={{headerShown: false, headerTintColor: '#00645F'}} name = "ManageFroms" component={ManageFroms}/>

        <ManageFromsStack.Screen options={{headerShown: true, headerTintColor: '#00645F'}} name = "ViewAllForms" component={AllFromsScreen}/>
        <ManageFromsStack.Screen options={{headerShown: true, headerTintColor: '#00645F'}} name = "SurveyForms" component={SurveyFormsScreen}/>

        <ManageFromsStack.Group  screenOptions={{ presentation:'modal', headerTintColor: '#00645F'}}>
          <ManageFromsStack.Screen options={{title: 'Add new Survey'}} name = "EditSurvey"  component={EditSurveyModal} />
        </ManageFromsStack.Group>

        <ManageFromsStack.Group  screenOptions={{ presentation:'modal', headerTintColor: '#00645F'}}>
          <ManageFromsStack.Screen options={{title: 'Add new Resoruce'}} name = "EditResoruces"  component={EditResourcesModal} />
        </ManageFromsStack.Group>

        <ManageFromsStack.Screen options={{headerShown: true, headerTintColor: '#00645F'}} name = "ResourcesScreen" component={ResourcesScreen}/>

        

    </ManageFromsStack.Navigator>
  )
}

export default ManageFormsNavigator

const styles = StyleSheet.create({})
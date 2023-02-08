import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ManageForms from '../../screens/AdminScreens/AdminPortalScreens/ManageForms';
import AllFormsScreen from '../../screens/AdminScreens/AdminPortalScreens/AllFormsScreen';
import SurveyFormsScreen from '../../screens/AdminScreens/AdminPortalScreens/SurveyFormsScreen';
import EditSurveyModal from '../../screens/AdminScreens/AdminPortalScreens/EditSurveyModal';
import ResourcesScreen from '../../screens/AdminScreens/AdminPortalScreens/ResourcesScreen';
import EditResourcesModal from '../../screens/AdminScreens/AdminPortalScreens/EditResourcesModal';


const ManageFormsNavigator = () => {

    const ManageFromsStack = createNativeStackNavigator()


  return (
    <ManageFromsStack.Navigator>
        <ManageFromsStack.Screen options={{headerShown: false, headerTintColor: '#00645F'}} name = "ManageFroms" component={ManageForms}/>

        <ManageFromsStack.Screen options={{headerShown: true, headerTintColor: '#00645F'}} name = "ViewAllForms" component={AllFormsScreen}/>
        <ManageFromsStack.Screen options={{headerShown: true, headerTintColor: '#00645F'}} name = "SurveyForms" component={SurveyFormsScreen}/>

        <ManageFromsStack.Group  screenOptions={{ presentation:'modal', headerTintColor: '#00645F'}}>
          <ManageFromsStack.Screen options={{title: 'Add new Survey'}} name = "EditSurvey"  component={EditSurveyModal} />
        </ManageFromsStack.Group>

        <ManageFromsStack.Group  screenOptions={{ presentation:'modal', headerTintColor: '#00645F'}}>
          <ManageFromsStack.Screen options={{title: 'Add new Resource'}} name = "EditResource"  component={EditResourcesModal} />
        </ManageFromsStack.Group>

        <ManageFromsStack.Screen options={{headerShown: true, headerTintColor: '#00645F'}} name = "ResourcesScreen" component={ResourcesScreen}/>

        

    </ManageFromsStack.Navigator>
  )
}

export default ManageFormsNavigator

const styles = StyleSheet.create({})
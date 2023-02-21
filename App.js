import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './screens/AuthScreens/LoginScreen';
import ForgotPassScreen from './screens/AuthScreens/ForgotPassScreen';
import HomeScreen from './screens/HomeScreen';
import {useFonts} from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import { createAppContainer } from '@react-navigation/native';
// import {createSwitchNavigator} from '@react-navigation'
import AdminHome from './screens/AdminScreens/AdminHome';
import UserHome from './screens/UserScreens/UserHome';
import { createBottomTabNavigator,  } from '@react-navigation/bottom-tabs';
import ADMLogVisitScreen from './screens/AdminScreens/ADMLogVisitScreen'
import ADMSurveyScreen from './screens/AdminScreens/ADMSurveyScreen'
import ADMResourcesScreen from './screens/AdminScreens/ADMResourcesScreen'
import ADMMessageScreen from './screens/AdminScreens/ADMMessageScreen'
import AdminTabsNavigator from './navigators/AdminTabsNavigator';
import AdminDrawerNavigator from './navigators/AdminDrawerNavigator';
import ManageUsers from './screens/AdminScreens/AdminPortalScreens/ManageUsers';
import AuthNavigator from './navigators/AuthNavigator';
import ManageUsersNavigator from './navigators/drawerStacks/ManageUsersNavigator';
import SplashScreen from './screens/SplashScreen';
import UserModal from './screens/Settings/UserSettings';
import UserModalTEST from './componenets/UserModalTEST';
import AddUserModal from './screens/AdminScreens/AdminPortalScreens/AddUserModal';
import ChannelScreen from './screens/chatScreens/ChannelScreen';
import AddChatScreen from './screens/MessageScreens/AddChatScreen';
import { AppProvider } from './AppContext';
import {
  OverlayProvider
} from 'stream-chat-expo'; 
//Root Stack
const Stack = createNativeStackNavigator();


//define different user flows 
//TODO: Move to navigation folder

//normal user flow i.e. student/parent ---- move to different file Like admin tabs navigator--- not drawer navigator since user doesnt have admindrawer on left
const UserStack = createNativeStackNavigator();
function UserStackNavigator() {
  return (
    <UserStack.Navigator>
      <UserStack.Screen options={{headerShown: false}} name="UserHome" component={UserHome} />
    </UserStack.Navigator>
  );
}


//APP LAYER...

export default function App() {


  const [fontsLoaded] = useFonts({
    'Montserrat' : require('./assets/fonts/Montserrat/Montserrat-VariableFont_wght.ttf')
  })
  return (
    ///TODO: change default to splash screen, which then checks if user is authenticated or not, then show right stack based on that.
    // Root stack. Contains nested stack of: Login screen ;; Admin Stack ;; User Stack ;; TODO: Add Mentor Stack and splash screen at the top.
    <AppProvider>
      <OverlayProvider>

      
   
    <NavigationContainer>
      <Stack.Navigator screenOptions={{}}>
        <Stack.Screen options={{headerShown: false, animation: 'none'}} name="SplashScreen" component={SplashScreen}/>
        <Stack.Screen options={{headerShown: false}} name="AuthScreens" component={AuthNavigator} />
        <Stack.Screen options={{headerShown: false, headerBackButtonMenuEnabled: false}} name="AdminHomeScreens" component={AdminDrawerNavigator} />
        <Stack.Screen options={{headerShown: false, headerBackButtonMenuEnabled: false}} name="UserHomeScreens" component={UserStackNavigator} />
        
        <Stack.Screen options={{headerShown: true, headerBackButtonMenuEnabled: false, title: "Add Chat"}} name="AddChatScreen" component={AddChatScreen} />
        
        <Stack.Group  screenOptions={{ headerShown: true, headerTintColor: '#00645F'}}>
          <Stack.Screen options={{title: 'Account Settings'}} name = "User Settings"  component={UserModal} />
        </Stack.Group>
        

        
        {/* <Stack.Screen options={{
      headerShown: true,
      headerTitleAlign: 'center',
      title: 'Manage Users',
      headerTintColor: '#00645F',
    }}  name = "ManageUsersNav" component={ManageUsersNavigator}/> */}
      </Stack.Navigator>
    </NavigationContainer>
    </OverlayProvider>
    </AppProvider>
    
  );
}
// options={{headerTintColor: '#00645F', headerStyle: {backgroundColor:'#BDDFDE'}}}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  shadow: {
    shadowColor: '#000000',
    shadowOffset : {
      width:0,
      height:10,
    },
    shadowOpacity: 0.25,
    shadowRadius:3.5,
    elevation:5,
  },
  tabContainer: {
    width:80,
    height: 70,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center'
  },
});

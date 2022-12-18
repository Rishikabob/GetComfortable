import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
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

//Root Stack
const Stack = createNativeStackNavigator();


//define different user flows 

//admin flow

//normal user flow i.e. student/parent
const UserStack = createNativeStackNavigator();
function UserStackNavigator() {
  return (
    <UserStack.Navigator>
      <UserStack.Screen options={{headerShown: false}} name="UserHome" component={UserHome} />
    </UserStack.Navigator>
  );
}

//Auth Flow
const AuthStack = createNativeStackNavigator();
function AuthStackNavigator() {
  return (
    <AuthStack.Navigator>
      <AuthStack.Screen options={{headerShown: false}} name="Login" component={LoginScreen} />
      <AuthStack.Screen name="Forgot Password" component={ForgotPassScreen} />
    </AuthStack.Navigator>
  );
}

//APP LAYER...

export default function App() {
  const [fontsLoaded] = useFonts({
    'Montserrat' : require('./assets/fonts/Montserrat/Montserrat-VariableFont_wght.ttf')
  })
  return (
    ///TODO: change default to splash screen, which then checks if user is authenticated or not, then show right stack based on that.
    // Root stack. Contains nested stack of: Login screen(TODO: Change to auth stack) ;; Admin Stack ;; User Stack ;; TODO: Add Mentor Stack
    <NavigationContainer>
      <Stack.Navigator screenOptions={{}}>
        <Stack.Screen options={{headerShown: false}} name="AuthScreens" component={AuthStackNavigator} />
        <Stack.Screen options={{headerShown: false, headerBackButtonMenuEnabled: false}} name="AdminHomeScreens" component={AdminDrawerNavigator} />
        <Stack.Screen options={{headerShown: false, headerBackButtonMenuEnabled: false}} name="UserHomeScreens" component={UserStackNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
    
  );
}

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

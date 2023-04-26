# GetComfortable
Get Comfortable is a mobile application that facilitates communication between mentors and parents. It is built using Expo, Firebase, and GetStream. It allows mentors to send messages to parents, receive push notifications for important events, and keep track of their mentorship sessions. The app includes a built-in admin dashboard where an admin can congiure the app, send push notification, update calendar events, and manage users. 

## How to Install and run **Windows**
1. Clone repository into local machine
2. Install Node Package Manager LTS version **18.13.0** https://nodejs.org/en/download/
3. Run 	`npm --v` in terminal (inside VSCode) / powershell and verify that version is **8.19.3**
4. In terminal, navigate to GetComfortable directory
5. Run `npm install -g expo-cli`
6. To run, type `npx expo start -c --tunnel`
7. Install and Open Expo Go app on Device
8. Scan QR code from terminal
9. App will be shown on the host decive

## Features

- **Real-time messaging:** Mentors can send and receive messages from parents in real-time using GetStream, making it easy to stay connected and up-to-date.
- **Push notifications:** Mentors receive push notifications for important events, such as upcoming mentorship sessions or messages from parents.
- **Calendar:** Users can view a global or group calendar to see upcoming events
- **Mentor session logging:** Mentors can log their mentorship sessions with parents, including the date, time, and details of each session.
- **Admin Dashboard:** Admins have a built in dashboard where they can manage the app as well as users.



# Dependencies:

```
GetComfortable
├─ App.js
├─ assets
│  ├─ adaptive-icon.png
│  ├─ favicon.png
│  ├─ icon.png
│  ├─ images
│  │  └─ logo_white.png
│  ├─ splash.png
│  └─ toggle-drawer-icon.png
├─ chat_config
│  ├─ chatConfig.js
│  └─ useChatClient.js
├─ componenets
│  ├─ AdminComponents
│  │  ├─ AdminCalendar.js
│  │  ├─ AdminHomeTopBar.js
│  │  ├─ AdminListItems.js
│  │  ├─ AdminNotifListItem.js
│  │  ├─ AdminTopBar.js
│  │  ├─ DeleteEventModal.js
│  │  └─ FormListItem.js
│  ├─ CustomListItem.js
│  ├─ EventListItem.js
│  ├─ ItemListHome.js
│  ├─ NotifListItem.js
│  ├─ SettingItems.js
│  ├─ UserModalTEST.js
│  └─ UserTopBar.js
├─ config
├─ firebaseConfig.js
├─ hooks
│  ├─ setupNotifications.js
│  └─ useTogglePasswordVisibility.js
├─ navigators
│  ├─ AdminDrawerNavigator.js
│  ├─ AdminTabsNavigator.js
│  ├─ AuthNavigator.js
│  ├─ ChatNavigation.js
│  ├─ drawerStacks
│  │  ├─ ManageCalendarNavigator.js
│  │  ├─ ManageFormsNavigator.js
│  │  ├─ ManageNotificationsNavigator.js
│  │  └─ ManageUsersNavigator.js
│  ├─ MentorTabsNavigator.js
│  └─ UserTabsNavigator.js
├─ screens
│  ├─ AdminScreens
│  │  ├─ AdminHome.js
│  │  ├─ AdminPortalScreens
│  │  │  ├─ AddUserModal.js
│  │  │  ├─ AllFormsScreen.js
│  │  │  ├─ EditGlobalEvents.js
│  │  │  ├─ EditResourcesModal.js
│  │  │  ├─ EditSurveyModal.js
│  │  │  ├─ GlobalEvents.js
│  │  │  ├─ GlobalNotifScreen.js
│  │  │  ├─ ManageCalendar.js
│  │  │  ├─ ManageForms.js
│  │  │  ├─ ManageNotifications.js
│  │  │  ├─ ManageUsers.js
│  │  │  ├─ MentorEvents.js
│  │  │  ├─ MentorNotifScreen.js
│  │  │  ├─ NewNotifScreen.js
│  │  │  ├─ Notifications
│  │  │  ├─ ResourcesScreen.js
│  │  │  ├─ SurveyFormsScreen.js
│  │  │  ├─ UserEvents.js
│  │  │  └─ UserNotifScreen.js
│  │  ├─ ADMLogVisitScreen.js
│  │  ├─ ADMMessageScreen.js
│  │  ├─ ADMResourcesScreen.js
│  │  └─ ADMSurveyScreen.js
│  ├─ AuthScreens
│  │  ├─ ForgotPassScreen.js
│  │  ├─ LoginScreen.js
│  │  └─ RegisterScreen.js
│  ├─ chatScreens
│  │  ├─ ChannelScreen.js
│  │  └─ NewChatModal.js
│  ├─ HomeScreen.js
│  ├─ MentorScreens
│  │  └─ MentorHome.js
│  ├─ MessageScreens
│  │  └─ AddChatScreen.js
│  ├─ NotificationScreens
│  │  └─ NotificationView.js
│  ├─ Settings
│  │  └─ UserSettings.js
│  ├─ SplashScreen.js
│  ├─ UserScreens
│  │  └─ UserHome.js
│  └─ WebViewScreen.js

```
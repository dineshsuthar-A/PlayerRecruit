import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Registration from './components/Registration';
import Verification from './components/Verification';
import SelectAccount from './components/SelectAccount';
import axios from 'axios';
import Login from './components/Login';
import SelectStudentTemplate from './components/SelectStudentTemplate';
import RegistrationStudentPersonal from './components/RegistrationStudentPersonal';
import AthleticInformation from './components/AthleticInformation';

axios.defaults.baseURL = "https://d74c3a57-2b0a-4ba1-b62e-8d4f4f9f78d6.mock.pstmn.io";
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer >
      <Stack.Navigator>
        <Stack.Screen
          options={{ headerShown: false }}
          name="Registration"
          component={Registration} />
        <Stack.Screen
          options={{ headerShown: false }}
          name="Verification"
          component={Verification} />
        <Stack.Screen
          options={{ headerShown: false }}
          name="SelectAccount"
          component={SelectAccount} />
        <Stack.Screen
          options={{ headerShown: false }}
          name="Login"
          component={Login} />
        <Stack.Screen options={{
          headerStyle: {
            backgroundColor: '#004E75',

          },

          title: 'Registration Student Info',
          headerTintColor: "white",
          headerTitleStyle: {
            fontSize: 18,
            fontWeight: 'bold',
            color: "white",
            fontFamily: "Roboto"
          }
        }}
          name='SelectStudentTemplate'
          component={SelectStudentTemplate} />

        <Stack.Screen options={{
          headerStyle: {
            backgroundColor: '#004E75',

          },

          title: 'Student Registration',
          headerTintColor: "white",
          headerTitleStyle: {
            fontSize: 18,
            fontWeight: 'bold',
            color: "white",
            fontFamily: "Roboto"
          }
        }}
          name='RegistrationStudentPersonal'
          component={RegistrationStudentPersonal} />

        <Stack.Screen options={{
          headerStyle: {
            backgroundColor: '#004E75',

          },

          title: 'Athletic Information',
          headerTintColor: "white",
          headerTitleStyle: {
            fontSize: 18,
            fontWeight: 'bold',
            color: "white",
            fontFamily: "Roboto"
          }
        }}
          name='AthleticInformation'
          component={AthleticInformation} />

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
});

import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Registration from './components/Registration';
import Verification from './components/Verification';
import SelectAccount from './components/SelectAccount';
import axios from 'axios';
import Login from './components/Login';

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

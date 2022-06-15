import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, LogBox } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import 'react-native-gesture-handler';
import { createStackNavigator, TransitionSpecs, cardStyleInterpolator, CardStyleInterpolators } from '@react-navigation/stack';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import * as SecureStore from 'expo-secure-store';
LogBox.ignoreLogs(['ViewPropTypes']);
import Login from './components/Login';
import Registration from './components/Registration';
import Verification from './components/Verification';
import RegistrationSelectAccount from './components/RegistrationSelectAccount';
import Registration_coach from './components/Registration_coach';
import Navigation from './components/Navigation';
import NavigationCoach from './components/NavigationCoach';
import { baseURL } from './config';
import Registration_student from './components/Registration_student';

axios.defaults.baseURL = baseURL;

const Stack = createStackNavigator();
const config = {
  animation: 'slide',
  config: {
    stiffness: 1000,
    damping: 500,
    mass: 3,
    overshootClamping: true,
    restDisplacementThreshold: 0.01,
    restSpeedThreshold: 0.01,
  },
};
export default function App() {
  const [flag, setFlag] = useState(0);
  const [rout, setRout] = useState("Registration");
  const checkToken = async () => {
    const token = await SecureStore.getItemAsync("token");
    if (token) {
      const type = await SecureStore.getItemAsync("type");
      if (type == '0') {

        setRout("RegistrationSelectAccount");
      } else if (type == '1') {
        setRout("Main");
      } else if (type == '2') {
        setRout("CoachMain");
      }
      setFlag(1);

    } else {
      setFlag(1);
    }
  }

  useEffect(() => {
    checkToken();
  }, [])


  return (
    flag ?
      <NavigationContainer>
        <Stack.Navigator initialRouteName={rout}>
          <Stack.Screen options={{
            cardStyleInterpolator: CardStyleInterpolators.forFadeFromBottomAndroid,
            headerShown: false,
          }}
            name='Main'
            component={Navigation} />
          <Stack.Screen options={{
            cardStyleInterpolator: CardStyleInterpolators.forFadeFromBottomAndroid,
            headerShown: false,
          }}
            name='CoachMain'
            component={NavigationCoach} />

          <Stack.Screen
            options={{ headerShown: false, cardStyleInterpolator: CardStyleInterpolators.forFadeFromBottomAndroid, }}
            name="RegistrationSelectAccount"
            component={RegistrationSelectAccount} />


          < Stack.Screen
            options={{ headerShown: false, cardStyleInterpolator: CardStyleInterpolators.forFadeFromBottomAndroid, }}
            name="Registration"
            component={Registration} />

          <Stack.Screen
            options={{
              headerShown: false,
              cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS
            }}
            name="Verification"
            component={Verification} />

          <Stack.Screen
            options={{ headerShown: false, cardStyleInterpolator: CardStyleInterpolators.forModalPresentationIOS }}
            name="Login"
            component={Login} />

          <Stack.Screen options={{
            cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
            headerShown: false
          }}
            name='RegistrationStudentInfo'
            component={Registration_student} />


          <Stack.Screen options={{
            cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
            headerShown: false
          }}
            name='RegistrationCoachInfo'
            component={Registration_coach} />

        </Stack.Navigator>
      </NavigationContainer >
      :
      null
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

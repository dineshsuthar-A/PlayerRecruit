import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import 'react-native-gesture-handler';
import { createStackNavigator, TransitionSpecs, cardStyleInterpolator, CardStyleInterpolators } from '@react-navigation/stack';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import * as SecureStore from 'expo-secure-store';

import Login from './components/Login';
import Registration from './components/Registration';
import Verification from './components/Verification';
import RegistrationSelectAccount from './components/RegistrationSelectAccount';
import RegistrationStudentInfo from './components/RegistrationStudentInfo';
import RegistrationStudentPersonal from './components/RegistrationStudentPersonal';
import RegistrationStudentSchool from './components/RegistrationStudentSchool';
import RegistrationStudentAthletic from './components/RegistrationStudentAthletic';
import RegistrationStudentFinal from './components/RegistrationStudentFinal';
import RegistrationCoachInfo from './components/RegistrationCoachInfo';
import RegistrationCoachPersonal from './components/RegistrationCoachPersonal';
import RegistrationCoachAcademic from './components/RegistrationCoachAcademic';
import RegistrationCoachAthletic from './components/RegistrationCoachAthletic';
import RegistrationCoachFinal from './components/RegistrationCoachFinal';
import Navigation from './components/Navigation';

axios.defaults.baseURL = "http://192.168.92.158:5000/";

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
      setRout("SelectAccount");
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
        <Stack.Navigator initialRouteName="RegistrationCoachAthletic" >
          <Stack.Screen options={{
            cardStyleInterpolator: CardStyleInterpolators.forFadeFromBottomAndroid,
            headerShown: false,
          }}
            name='Main'
            component={Navigation} />

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
            headerMode: 'float',
            cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
            headerStyle: { backgroundColor: '#004467', },
            title: 'Registration Student Info',
            headerTintColor: "white",
            headerTitleStyle: {
              fontSize: 18,
              fontWeight: 'bold',
              color: "white",
              fontFamily: "Roboto"
            }
          }}
            name='RegistrationStudentInfo'
            component={RegistrationStudentInfo} />

          <Stack.Screen options={{
            headerMode: 'float',
            cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
            headerStyle: {
              backgroundColor: '#004467',
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
            cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
            headerMode: "float",
            headerStyle: { backgroundColor: '#004467' },
            title: 'Academic Information',
            headerTintColor: "white",
            headerTitleStyle: {
              fontSize: 18,
              fontWeight: 'bold',
              color: "white",
              fontFamily: "Roboto"
            }
          }}
            name='RegistrationStudentSchool'
            component={RegistrationStudentSchool} />
          <Stack.Screen options={{

            cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
            headerMode: "float",
            headerStyle: { backgroundColor: '#004467' },
            title: 'Athletic Information',
            headerTintColor: "white",
            headerTitleStyle: {
              fontSize: 18,
              fontWeight: 'bold',
              color: "white",
              fontFamily: "Roboto"
            }
          }}
            name='RegistrationStudentAthletic'
            component={RegistrationStudentAthletic} />

          <Stack.Screen options={{

            cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
            headerMode: "float",
            headerStyle: {
              backgroundColor: '#004467',

            },
            title: 'Athletic Bio',
            headerTintColor: "white",
            headerTitleStyle: {
              fontSize: 18,
              fontWeight: 'bold',
              color: "white",
              fontFamily: "Roboto"
            }
          }}
            name='RegistrationStudentFinal'
            component={RegistrationStudentFinal} />

          <Stack.Screen options={{
            cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
            headerMode: "float",
            headerStyle: {
              backgroundColor: '#004467',

            },
            title: 'Registration Coach Info',
            headerTintColor: "white",
            headerTitleStyle: {
              fontSize: 18,
              fontWeight: 'bold',
              color: "white",
              fontFamily: "Roboto"
            }
          }}
            name='RegistrationCoachInfo'
            component={RegistrationCoachInfo} />
          <Stack.Screen options={{
            cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
            headerMode: "float",
            headerStyle: {
              backgroundColor: '#004467',

            },
            title: 'Coach Registration',
            headerTintColor: "white",
            headerTitleStyle: {
              fontSize: 18,
              fontWeight: 'bold',
              color: "white",
              fontFamily: "Roboto"
            }
          }}
            name='RegistrationCoachPersonal'
            component={RegistrationCoachPersonal} />

          <Stack.Screen options={{
            cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
            headerMode: "float",
            headerStyle: {
              backgroundColor: '#004467',
            },
            title: 'Academic Information',
            headerTintColor: "white",
            headerTitleStyle: {
              fontSize: 18,
              fontWeight: 'bold',
              color: "white",
              fontFamily: "Roboto"
            }
          }}
            name='RegistrationCoachAcademic'
            component={RegistrationCoachAcademic} />
          <Stack.Screen options={{
            cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
            headerMode: "float",
            headerStyle: {
              backgroundColor: '#004467',

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
            name='RegistrationCoachAthletic'
            component={RegistrationCoachAthletic} />
          <Stack.Screen options={{
            cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
            headerMode: "float",
            headerStyle: {
              backgroundColor: '#004467',
            },
            title: 'Athletic Bio',
            headerTintColor: "white",
            headerTitleStyle: {
              fontSize: 18,
              fontWeight: 'bold',
              color: "white",
              fontFamily: "Roboto"
            }
          }}
            name='RegistrationCoachFinal'
            component={RegistrationCoachFinal} />


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

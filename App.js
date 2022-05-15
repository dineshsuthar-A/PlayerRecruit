import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import 'react-native-gesture-handler';
import { createStackNavigator, TransitionSpecs, cardStyleInterpolator, CardStyleInterpolators } from '@react-navigation/stack';
import Registration from './components/Registration';
import Verification from './components/Verification';
import React, { useState, useEffect } from 'react';
import SelectAccount from './components/SelectAccount';
import axios from 'axios';
import Login from './components/Login';
import SelectStudentTemplate from './components/SelectStudentTemplate';
import RegistrationStudentPersonal from './components/RegistrationStudentPersonal';
import AthleticInformation from './components/AthleticInformation';
import AtleticInfotwo from './components/AtleticInfotwo';
import AthleticBio from './components/AthleticBio';
import * as SecureStore from 'expo-secure-store';

axios.defaults.baseURL = "https://d74c3a57-2b0a-4ba1-b62e-8d4f4f9f78d6.mock.pstmn.io";
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
        <Stack.Navigator initialRouteName={rout} >

          <Stack.Screen
            options={{ headerShown: false, cardStyleInterpolator: CardStyleInterpolators.forFadeFromBottomAndroid, }}
            name="SelectAccount"
            component={SelectAccount} />
          < Stack.Screen

            options={{ headerShown: false, }}
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
            headerStyle: { backgroundColor: '#004E75', },
            title: 'Registration Student Info',
            headerTintColor: "white",
            headerTitleStyle: {
              fontSize: 18,
              fontWeight: 'bold',
              color: "white",
              fontFamily: "Roboto"
            }
          }
          }
            name='SelectStudentTemplate'
            component={SelectStudentTemplate} />

          <Stack.Screen options={{
            headerMode: 'float',
            cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
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
            cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
            headerMode: "float",
            headerStyle: { backgroundColor: '#004E75' },
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
          <Stack.Screen options={{

            cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
            headerMode: "float",
            headerStyle: { backgroundColor: '#004E75' },
            title: 'Athletic Information',
            headerTintColor: "white",
            headerTitleStyle: {
              fontSize: 18,
              fontWeight: 'bold',
              color: "white",
              fontFamily: "Roboto"
            }
          }}
            name='AtleticInfotwo'
            component={AtleticInfotwo} />

          <Stack.Screen options={{

            cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
            headerMode: "float",
            headerStyle: {
              backgroundColor: '#004E75',

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
            name='AthleticBio'
            component={AthleticBio} />
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

import { StyleSheet, Text, View, StatusBar, ImageBackground, ScrollView, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import 'react-native-gesture-handler';
import { createStackNavigator, TransitionSpecs, cardStyleInterpolator, CardStyleInterpolators } from '@react-navigation/stack';
import Profile from '../ProfileCoach';
import CoachPreviewCard from './CoachPreviewCard';
import CardAthelete from '../CardAthelete';
const stack = createStackNavigator();
export default function CoachProfile() {
    return (
        <stack.Navigator>

            <stack.Screen name="profilecoach" options={{ headerShown: false }} component={Profile} />
            <stack.Screen name="previewcard" options={{
                headerStyle: { backgroundColor: '#004467', },
                title: 'Coach Card',
                headerTintColor: "white",
            }} component={CoachPreviewCard} />
        </stack.Navigator>
    )
}

const styles = StyleSheet.create({})
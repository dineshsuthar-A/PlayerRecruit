import { StyleSheet, Text, View, Button, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import AthleteLikes from './AthleteLikes'
import { createStackNavigator } from '@react-navigation/stack'
import { AntDesign } from '@expo/vector-icons';
import ShowProfile from '../CoachShowProfile';
import CoachPreviewCard from './CoachPreviewCard';

const stack = createStackNavigator();
export default function Matches() {
  return (
    <stack.Navigator >
      <stack.Screen name="Likes" options={{ headerShown: false }} component={AthleteLikes} />
      <stack.Screen name="profile" options={{ headerShown: false }} component={ShowProfile} />
      <stack.Screen name="previewcard" options={{
        headerStyle: { backgroundColor: '#004467', },
        title: 'Coach Card',
        headerTintColor: "white",
      }} component={CoachPreviewCard} />
    </stack.Navigator >
  )
}

const styles = StyleSheet.create({})
import { StyleSheet, Text, View, Button, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import CoachLikes from './CoachLikes';
import { createStackNavigator } from '@react-navigation/stack'
import { AntDesign } from '@expo/vector-icons';
import AthleteShowProfile from "../AthleteShowProfile";
import previewCard from "./PreviewCard";
const stack = createStackNavigator();
export default function CoachMatches() {
  return (
    <stack.Navigator >
      <stack.Screen name="Likes" options={{ headerShown: false }} component={CoachLikes} />
      <stack.Screen name="profile" options={{ headerShown: false }} component={AthleteShowProfile} />
      <stack.Screen name="previewcard" options={{
        headerStyle: { backgroundColor: '#004467', },
        title: 'Athlete Card',
        headerTintColor: "white",
      }} component={previewCard} />
    </stack.Navigator >
  )
}

const styles = StyleSheet.create({})
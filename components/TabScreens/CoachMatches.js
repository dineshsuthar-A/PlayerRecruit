import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import CoachLikedByMe from './CoachLikedByMe';
import CoachLikedYou from './CoachLikedYou';
const Tab = createMaterialTopTabNavigator();

const CoachMatches = () => {
  return (
    <Tab.Navigator screenOptions={{
      tabBarStyle: { backgroundColor: '#004467' },
      tabBarLabelStyle: {
        color: 'white', fontWeight: '700'
      }, tabBarIndicatorStyle: { backgroundColor: 'white' },
    }}>
      <Tab.Screen  name="Liked By Me" component={CoachLikedByMe} />
      <Tab.Screen  name="Liked By Atheletes" component={CoachLikedYou} />
    </Tab.Navigator>
  )
}

export default CoachMatches

const styles = StyleSheet.create({})
import { StyleSheet, Text, View, StatusBar, ImageBackground, ScrollView, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import 'react-native-gesture-handler';
import { createStackNavigator, TransitionSpecs, cardStyleInterpolator, CardStyleInterpolators } from '@react-navigation/stack';
import ProfileAthelete from '../ProfileAthelete';
import PreviewCard from './PreviewCard';
import CardAthelete from '../CardAthelete';
const stack = createStackNavigator();
export default function Profile() {
    return (
        <stack.Navigator>

            <stack.Screen name="ProfileAthelte" options={{ headerShown: false }} component={ProfileAthelete} />
            <stack.Screen name="previewcard" options={{
                headerStyle: { backgroundColor: '#004467', },
                title: 'Athletic Card',
                headerTintColor: "white",
            }} component={PreviewCard} />
        </stack.Navigator>
    )
}

const styles = StyleSheet.create({})
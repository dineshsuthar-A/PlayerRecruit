import { StyleSheet, Text, View } from 'react-native'
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
const Tab = createBottomTabNavigator();
import Profile from './TabScreens/CoachProfile';
import CoachDiscover from './TabScreens/CoachDiscover';
import Matches from './TabScreens/Matches';
import Message from './TabScreens/Message';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function NavigationCoach() {
    return (
        <Tab.Navigator screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
                let iconname;
                let rn = route.name;
                let si = 20;
                if (rn == "Profile") {
                    iconname = focused ? "person-circle" : "person-circle-outline";
                    si = 24;
                }
                if (rn == "Discovery") {
                    iconname = focused ? "search-sharp" : "search-outline";
                    si = focused ? 22 : 20;
                }
                if (rn == "Matches") {
                    iconname = focused ? "trophy-sharp" : "trophy-outline";
                }
                if (rn == "Chat") {
                    iconname = focused ? "person" : "person-outline";
                }
                return <Ionicons name={iconname} size={si} color="white" />
            },
            tabBarLabelStyle: {
                color: "white"
            },
            tabBarStyle: {
                backgroundColor: '#004E75',
                padding: 4,
                paddingBottom: 4
            }

        })}>
            <Tab.Screen options={{ headerShown: false, title: "Profile" }} name="Profile" component={Profile} />
            <Tab.Screen options={{ headerShown: false, title: "Discovery" }} name="Discovery" component={CoachDiscover} />
            <Tab.Screen options={{ headerStyle: { backgroundColor: '#004467' }, headerTitle: 'Coaches liked you!', headerTintColor: 'white', headerTitleStyle: { fontSize: 18, marginLeft: 20 }, title: "Matches" }} name="Matches" component={Matches} />
            <Tab.Screen options={{ headerStyle: { backgroundColor: '#004467' }, headerTitle: 'Messenger', headerTintColor: 'white', headerTitleStyle: { fontSize: 18, marginLeft: 20 }, tabBarStyle: { display: 'none' }, title: "Chat" }} name="Chat" component={Message} />
        </Tab.Navigator >
    )
}

const styles = StyleSheet.create({})
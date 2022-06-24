import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createStackNavigator, cardStyleInterpolator, CardStyleInterpolators } from '@react-navigation/stack'
import MessageList from './MessageList';
const stack = createStackNavigator();
import Chat from './Chat';
import CoachMessagesList from './CoachMessagesList';
export default function CoachMessages() {
    return (
        <stack.Navigator>
            <stack.Screen name="messagelist" options={{ headerStyle: { backgroundColor: '#004467' }, headerTitle: 'Messenger', headerTintColor: 'white', headerTitleStyle: { fontSize: 18, marginLeft: 20 }, }} component={CoachMessagesList} />
            <stack.Screen name="chat" options={{
                headerShown: false,
                cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
            }} component={Chat} />
        </stack.Navigator>
    )
}

const styles = StyleSheet.create({})
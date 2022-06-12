import { StyleSheet, Text, View, Button, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import Swiping from './Swiping';
import Filter from './Filter';
import ShowProfile from '../CoachShowProfile';
import CoachPreviewCard from './CoachPreviewCard';
import { AntDesign } from '@expo/vector-icons';

const stack = createStackNavigator();

export default function Discover() {
    const [route, setroute] = useState("Swiping")
    return (
        <stack.Navigator initialRouteName={route}>
            <stack.Screen name="Swiping" options={({ navigation }) => ({

                headerStyle: { backgroundColor: '#004467', },
                title: '',
                headerTintColor: "white",
                headerRight: () => (
                    <View>
                        <TouchableOpacity onPress={() => navigation.navigate('filter')} >
                            <AntDesign name="filter" size={24} color="white" style={{ paddingRight: 17 }} />
                        </TouchableOpacity>
                    </View>
                ),


            })} component={Swiping} />
            <stack.Screen name="filter" options={{ headerStyle: { backgroundColor: '#004467' }, headerTintColor: 'white', title: 'Filter Settings', }} component={Filter} />
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
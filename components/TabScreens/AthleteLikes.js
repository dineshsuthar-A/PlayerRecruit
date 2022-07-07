import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Me from './LikedbyMe';
import Coaches from './LikedbyCoaches';
import { Dimensions, StatusBar } from 'react-native';
import Neutral from './Neutral';
import AtheleteMatched from './AtheleteMatched';
const windowHeight = Dimensions.get("window").height;
const Tab = createMaterialTopTabNavigator();

export default function AthleteLikes() {
    return (
        <View style={{ width: '100%', height: '100%' }}>
            <View style={{ width: '100%', height: '9%', justifyContent: 'center', paddingLeft: '8%', backgroundColor: '#004467', elevation: 1 }}><Text style={{ color: 'white', fontSize: windowHeight * 0.026, fontWeight: '600' }}>Coaches</Text></View>
            <Tab.Navigator screenOptions={{
                tabBarStyle: { backgroundColor: '#004467', height: "10%", justifyContent: 'center' },
                tabBarLabelStyle: {
                    color: 'white', fontWeight: '700'
                }, tabBarIndicatorStyle: { backgroundColor: 'white' },
            }}>
                <Tab.Screen name="Liked By Me" component={Me} />
                <Tab.Screen name="Liked By Coaches" component={Coaches} />
                <Tab.Screen name="Neutral" component={Neutral} />
                <Tab.Screen name="Matched" component={AtheleteMatched} />
            </Tab.Navigator>
        </View>

    )
}

const styles = StyleSheet.create({})
import { StyleSheet, Text, View, Dimensions } from 'react-native'
import React from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import CoachLikedByMe from './CoachLikedByMe';
import CoachLikedYou from './CoachLikedYou';
const Tab = createMaterialTopTabNavigator();
const windowHeight = Dimensions.get("window").height;
const CoachLikes = () => {
    return (
        <View style={{ width: '100%', height: '100%' }}>
            <View style={{ width: '100%', height: '9%', justifyContent: 'center', paddingLeft: '8%', backgroundColor: '#004467', elevation: 1 }}><Text style={{ color: 'white', fontSize: windowHeight * 0.026, fontWeight: '600' }}>Athletes</Text></View>

            <Tab.Navigator screenOptions={{
                tabBarStyle: { backgroundColor: '#004467', height: '10%', justifyContent: 'center' },
                tabBarLabelStyle: {
                    color: 'white', fontWeight: '700'
                }, tabBarIndicatorStyle: { backgroundColor: 'white' },
            }}>
                <Tab.Screen name="Liked By Me" component={CoachLikedByMe} />
                <Tab.Screen name="Liked By Atheletes" component={CoachLikedYou} />
            </Tab.Navigator>
        </View>
    )
}

export default CoachLikes;

const styles = StyleSheet.create({})
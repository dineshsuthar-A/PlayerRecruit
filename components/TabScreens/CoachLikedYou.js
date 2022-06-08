import { StyleSheet, Text, View, ImageBackground, ScrollView, Image, TouchableOpacity } from 'react-native'
import React from 'react';
import { Entypo } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';

export default function CoachLikedYou() {
    return (
        <ImageBackground source={require('../../assets/bg.png')} style={{ width: '100%', height: '100%' }}>
            <ScrollView style={{ paddingHorizontal: '4%', paddingVertical: '4%', height: '90%' }} contentContainerStyle={{ flexGrow: 1 }} >

                <View style={{ display: 'flex', flexDirection: 'row', backgroundColor: '#E6EDF1', padding: 20, borderRadius: 60, marginTop: 10 }}>
                    <View style={{ flex: 0.2, justifyContent: 'center' }}>
                        <Image source={require('../../assets/stock.png')} style={{ width: 50, height: 50, borderRadius: 25, borderWidth: 1, borderColor: 'black' }} />
                    </View>
                    <View style={{ flex: 0.65, flexDirection: 'column', justifyContent: 'center', marginLeft: '3%' }}>
                        <Text style={{ fontWeight: '600', fontSize: 19 }}>John Smith</Text>
                        <View style={{ flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap' }}>
                            <Text style={{ fontSize: 12, fontWeight: '600' }}>Division</Text>
                            <Entypo name="dot-single" size={20} color="black" />
                            <Text style={{ fontSize: 12, fontWeight: '600' }}>Title</Text>
                            <Entypo name="dot-single" size={20} color="black" />
                            <Text style={{ fontSize: 12, fontWeight: '600' }}>College</Text>
                        </View>
                    </View>
                    <View style={{ flex: 0.15, justifyContent: 'center', alignItems: 'center' }}>
                        <TouchableOpacity style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                            <Feather name="plus-circle" size={16} color="#00B8FE" />
                            <Text style={{ fontWeight: '700', color: '#00B8FE' }}> Add</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
            <View style={{ width: '100%', height: '20%', justifyContent: 'center', alignItems: 'center', }}>
                <View style={{ justifyContent: 'center', alignItems: 'center', marginBottom: 20 }}>
                    <Text style={{ color: 'white', fontWeight: '600' }}>225</Text>
                    <Text style={{ color: 'white', fontWeight: '600' }}>Views</Text>
                </View>
                <View style={{ width: '100%', paddingHorizontal: '10%', marginBottom: 20 }}>
                    <TouchableOpacity style={{ backgroundColor: '#00B8FE', width: '100%', height: 50, borderRadius: 25, justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ color: 'white', fontWeight: '600' }}>Boost</Text>
                    </TouchableOpacity>
                </View>

            </View>
        </ImageBackground >
    )
}

const styles = StyleSheet.create({})
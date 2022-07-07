import { StyleSheet, Text, View, ImageBackground, ScrollView, Image, TouchableOpacity, Dimensions, ActivityIndicator } from 'react-native'
import React, { useState } from 'react';
import { Entypo } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import * as SecureStore from 'expo-secure-store';
import axios from 'axios';
import { baseURL } from '../../config';

const windowHeight = Dimensions.get('window').height


export default function CoachLikedYou(props) {
    const [data, setdata] = useState();
    const [st, setST] = useState(false);
    const getdata = async () => {
        setST(true);
        const token = "Bearer " + await SecureStore.getItemAsync("token");
        axios.get("/api/coach/likebyathletes", {
            headers: {
                "Authorization": token
            }
        }).then((response) => {
            setST(false);
            setdata(response.data.data);
        }).catch((err) => {
            setST(false);
            console.log(err.response.data);
        });
    }
    const match = async (data) => {
        const token = "Bearer " + await SecureStore.getItemAsync("token");
        axios.post("/api/match/add", {
            "athleteid": data?.registration_id
        }, {
            headers: {
                "Authorization": token
            }
        }).then((response) => {
            console.log(response.data);
            getdata();
        }).catch((err) => {
            console.log(err.response.data);
        });
    }
    useFocusEffect(React.useCallback(() => {
        getdata();
    }, []))
    return (
        <ImageBackground source={require('../../assets/bg.png')} style={{ width: '100%', height: '100%' }}>
            <ActivityIndicator size="large" animating={st} color="#004467" style={{ position: "absolute", top: '50%', left: '45%', zIndex: 10 }} />

            <ScrollView style={{ paddingHorizontal: '4%', height: '90%' }} contentContainerStyle={{ flexGrow: 1 }} >
                {(data && data.length > 0) ?

                    data.map((i, index) =>
                        <View key={index} style={{ display: 'flex', flexDirection: 'row', backgroundColor: '#E6EDF1', paddingHorizontal: windowHeight * 0.01, borderRadius: 60, marginTop: windowHeight * 0.01 }}>
                            <TouchableOpacity onPress={() => props.navigation.navigate("profile", { "id": i.registration_id })} style={{ flex: 0.8, flexDirection: 'row', paddingVertical: '4%', }}>
                                <View style={{ flex: 0.2, marginRight: '4%' }}>
                                    <Image source={{ uri: baseURL + "uploads/" + i.image }} style={{ width: windowHeight * 0.07, height: windowHeight * 0.07, borderRadius: windowHeight * 0.07 / 2, borderWidth: 1, borderColor: 'black' }} />
                                </View>
                                <View style={{ flex: 0.65, flexDirection: 'column', marginLeft: '3%', justifyContent: 'center' }}>
                                    <Text style={{ fontWeight: '600', fontSize: windowHeight * 0.02 }}>{i.firstname} {i.lastname}</Text>
                                    <View style={{ flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap' }}>
                                        <Text style={{ fontSize: windowHeight * 0.015, fontWeight: '600' }}>{i.gpa}</Text>
                                        <Entypo name="dot-single" size={windowHeight * 0.03} color="black" />
                                        <Text style={{ fontSize: windowHeight * 0.015, fontWeight: '600' }}>{i.scholastic_year}</Text>
                                        <Entypo name="dot-single" size={windowHeight * 0.03} color="black" />
                                        <Text style={{ fontSize: windowHeight * 0.015, fontWeight: '600' }}>{i.school_name}</Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                            <View style={{ flex: 0.2, justifyContent: 'center', alignItems: 'center' }}>
                                <TouchableOpacity onPress={() => match(i)} style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                    <Feather name="plus-circle" size={windowHeight * 0.02} color="#00B8FE" />
                                    <Text style={{ fontWeight: '700', color: '#00B8FE' }}>  Add</Text>
                                </TouchableOpacity>
                            </View>
                        </View>) : null}
            </ScrollView>
            {/* <View style={{ width: '100%', height: '20%', justifyContent: 'center', alignItems: 'center', }}>
                <View style={{ justifyContent: 'center', alignItems: 'center', marginBottom: windowHeight * 0.02 }}>
                    <Text style={{ color: 'white', fontWeight: '600' }}>225</Text>
                    <Text style={{ color: 'white', fontWeight: '600' }}>Views</Text>
                </View>
                <View style={{ width: '100%', paddingHorizontal: '10%', marginBottom: windowHeight * 0.02 }}>
                    <TouchableOpacity style={{ backgroundColor: '#00B8FE', width: '100%', height: windowHeight * 0.07, borderRadius: 25, justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ color: 'white', fontWeight: '600' }}>Boost</Text>
                    </TouchableOpacity>
                </View>

            </View> */}
        </ImageBackground >
    )
}

const styles = StyleSheet.create({})
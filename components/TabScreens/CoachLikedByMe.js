import { StyleSheet, Text, View, ImageBackground, ScrollView, Image, TouchableOpacity, Dimensions } from 'react-native'
import React, { useState } from 'react';
import { Entypo } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import * as SecureStore from 'expo-secure-store';
import axios from 'axios';
import { baseURL } from '../../config';
const windowHeight = Dimensions.get("window").height;
export default function CoachLikedByMe(props) {
    const [data, setdata] = useState();
    const getdata = async () => {
        const token = "Bearer " + await SecureStore.getItemAsync("token");
        axios.get("/api/coach/likebyme", {
            headers: {
                "Authorization": token
            }
        }).then((response) => {
            setdata(response.data.data);
        }).catch((err) => {
            console.log(err.response.data);
        });
    }
    useFocusEffect(React.useCallback(() => {
        getdata();
    }, []))
    return (
        <ImageBackground source={require('../../assets/bg.png')} style={{ width: '100%', height: '100%' }}>
            <ScrollView style={{ paddingHorizontal: '4%', paddingVertical: '4%', height: '100%' }}  >
                {(data && data.length > 0) ?
                    data.map((i, index) =>
                        <View key={index} style={{ display: 'flex', flexDirection: 'row', backgroundColor: '#E6EDF1', paddingHorizontal: windowHeight * 0.02, paddingVertical: windowHeight * 0.02, borderRadius: 60, marginBottom: windowHeight * 0.015, }}>
                            <TouchableOpacity onPress={() => props.navigation.navigate("profile", { "id": i.registration_id })} style={{ display: 'flex', flexDirection: 'row', flex: 1 }}>
                                <View style={{ flex: 0.2, }}>
                                    <Image source={{ uri: baseURL + "uploads/" + i.image }} style={{ width: 50, height: 50, borderRadius: 25, borderWidth: 1, borderColor: 'black' }} />
                                </View>
                                <View style={{ flex: 0.75, flexDirection: 'column', marginLeft: '3%' }}>
                                    <Text style={{ fontWeight: '600', fontSize: windowHeight * 0.025 }}>{i.firstname} {i.lastname}</Text>
                                    <View style={{ flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap' }}>
                                        <Text style={{ fontSize: windowHeight * 0.015, fontWeight: '600' }}>{i.gpa}</Text>
                                        <Entypo name="dot-single" size={20} color="black" />
                                        <Text style={{ fontSize: windowHeight * 0.015, fontWeight: '600' }}>{i.scholastic_year}</Text>
                                        <Entypo name="dot-single" size={20} color="black" />
                                        <Text style={{ fontSize: windowHeight * 0.015, fontWeight: '600' }}>{i.school_name}</Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                            {/* <View style={{ flex: 0.25, justifyContent: 'center', alignItems: 'center' }}>
                                <TouchableOpacity style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                    <Feather name="plus-circle" size={windowHeight * 0.02} color="#00B8FE" />
                                    <Text style={{ fontWeight: '700', color: '#00B8FE' }}> Remove</Text>
                                </TouchableOpacity>
                            </View> */}
                        </View>) : null}

            </ScrollView>
            {/* <View style={{ width: '100%', height: '20%', justifyContent: 'center', alignItems: 'center', }}>
                <View style={{ justifyContent: 'center', alignItems: 'center', marginBottom: 20 }}>
                    <Text style={{ color: 'white', fontWeight: '600' }}>225</Text>
                    <Text style={{ color: 'white', fontWeight: '600' }}>Views</Text>
                </View>
                <View style={{ width: '100%', paddingHorizontal: '10%', marginBottom: 20 }}>
                    <TouchableOpacity style={{ backgroundColor: '#00B8FE', width: '100%', height: 50, borderRadius: 25, justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ color: 'white', fontWeight: '600' }}>Boost</Text>
                    </TouchableOpacity>
                </View>

            </View> */}
        </ImageBackground >
    )
}

const styles = StyleSheet.create({})
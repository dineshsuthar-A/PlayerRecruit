import { StyleSheet, Text, View, ImageBackground, ToastAndroid, TouchableOpacity, Image, ActivityIndicator, ScrollView, Dimensions } from 'react-native'
import React, { useState } from 'react'
import { baseURL } from '../../config';
import { async } from '@firebase/util';
import { useFocusEffect } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import * as SecureStore from 'expo-secure-store';
import axios from 'axios';
const windowHeight = Dimensions.get("window").height;
const windowWidth = Dimensions.get('window').width;


export default function CoachMatched(props) {
    const [st, setSt] = useState(false);
    const [data, setdata] = useState();
    const getdata = async () => {
        const token = "Bearer " + await SecureStore.getItemAsync("token");
        axios.get("/api/coach/matches", {
            headers: {
                "Authorization": token
            }
        }).then((res) => {
            setdata(res.data.data);
        }).catch((err) => {
            if (err?.message == "Network Error") {
                ToastAndroid.show("Can't able to reach to the server,Please enable your internet.", ToastAndroid.SHORT);
            } else
                ToastAndroid.show("Error occured", ToastAndroid.SHORT);
        });
    }
    const Remove = async (id) => {
        const token = "Bearer " + await SecureStore.getItemAsync("token");
        axios.post("api/match/remove", {
            "athleteid": id
        }, {
            headers: {
                "Authorization": token
            }
        }).then((response) => {
            console.log(response.data);
            getdata();
        }).catch((err) => {
            console.log(err.response.data);
        })
    }
    useFocusEffect(React.useCallback(() => {
        getdata();
    }, []))
    return (
        <ImageBackground source={require('../../assets/bg.png')} style={{ width: '100%', height: '100%' }}>
            <ActivityIndicator size="large" animating={st} color="#004467" style={{ position: "absolute", top: '50%', left: '45%', zIndex: 10 }} />
            <ScrollView style={{ paddingHorizontal: '4%', paddingVertical: '4%', height: '90%' }} contentContainerStyle={{ flexGrow: 1 }} >

                {(data && data.length > 0) ?
                    data.map((i, index) =>
                        <View key={index} style={{ display: 'flex', flexDirection: 'row', backgroundColor: '#E6EDF1', paddingHorizontal: windowHeight * 0.01, borderRadius: 60, marginBottom: windowHeight * 0.01 }}>

                            <TouchableOpacity onPress={() => props.navigation.navigate("profile", { "id": i.registration_id })} style={{ flex: 0.8, flexDirection: 'row', paddingVertical: '4%', }}>
                                <View style={{ flex: 0.3, justifyContent: 'center' }}>
                                    <Image source={{ uri: baseURL + "uploads/" + i.image }} style={{ width: windowHeight * 0.07, height: windowHeight * 0.07, borderRadius: windowHeight * 0.07 / 2, borderWidth: 1, borderColor: 'black' }} />
                                </View>
                                <View style={{ flex: 0.7, flexDirection: 'column', justifyContent: 'center', marginLeft: '3%' }}>
                                    <Text numberOfLines={1} style={{ fontWeight: '600', fontSize: windowHeight * 0.02 }}>{i.firstname} {i.lastname}</Text>
                                    <View style={{ flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap' }}>
                                        <Text numberOfLines={2} style={{ fontSize: windowHeight * 0.015, fontWeight: '600' }}>{i.gpa}</Text>
                                        <Entypo name="dot-single" size={windowHeight * 0.02} color="black" />
                                        <Text numberOfLines={2} style={{ fontSize: windowHeight * 0.015, fontWeight: '600' }}>{i.scholastic_year}</Text>
                                        <Entypo name="dot-single" size={windowHeight * 0.02} color="black" />
                                        <Text numberOfLines={2} style={{ fontSize: windowHeight * 0.015, fontWeight: '600' }}>{i.school_name}</Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                            <View style={{ flex: 0.3, justifyContent: 'center', alignItems: 'center', paddingVertical: '2%' }}>
                                <TouchableOpacity onPress={() => Remove(i.registration_id)} style={{ flex: 0.5, alignItems: 'center', justifyContent: 'center', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                    <View style={{ borderWidth: 1, paddingVertical: windowHeight * 0.01, paddingHorizontal: windowHeight * 0.01, borderRadius: windowHeight * 0.02, paddingVertical: windowHeight * 0.002, alignItems: 'center', justifyContent: 'center', flexDirection: 'row', borderColor: "red" }}>
                                        <AntDesign name="closecircleo" size={windowHeight * 0.015} color="red" />
                                        <Text style={{ fontWeight: '700', color: 'red', fontSize: windowHeight * 0.015 }}> Remove</Text></View>
                                </TouchableOpacity>
                            </View>
                        </View>) : null}
            </ScrollView>
        </ImageBackground >
    )
}

const styles = StyleSheet.create({})

import { StyleSheet, Text, View, ImageBackground, ScrollView, Image, TouchableOpacity, Dimensions, ActivityIndicator, ToastAndroid } from 'react-native'
import React, { useState } from 'react';
import { Entypo } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import * as SecureStore from 'expo-secure-store';
import axios from 'axios';
import { AntDesign } from '@expo/vector-icons';
import { baseURL } from '../../config';
import { get } from 'react-native/Libraries/Utilities/PixelRatio';
const windowHeight = Dimensions.get("window").height;

export default function CoachNeutral(props) {
    const [data, setdata] = useState();
    const [st, setSt] = useState(false);
    const getdata = async () => {
        setSt(true);
        const token = "Bearer " + await SecureStore.getItemAsync("token");
        axios.get("/api/coach/neutral", {
            headers: {
                "Authorization": token
            }
        }).then((response) => {
            setSt(false);
            setdata(response.data.data);
        }).catch((err) => {
            setSt(false);
            console.log(err.response.data);
        });
    }
    const swipedleft = async (id) => {
        setSt(true);
        const token = "Bearer " + await SecureStore.getItemAsync("token");
        axios.post("/api/swipe/left", {
            "id": id
        }, {
            headers: {
                "Authorization": token
            }
        }).then((response) => {
            getdata();
        }).catch((err) => {
            setSt(false);
            ToastAndroid.show("Try again!", ToastAndroid.SHORT);
            console.log(err);
        });
    }
    const swipedRight = async (id) => {
        setSt(true);
        const token = "Bearer " + await SecureStore.getItemAsync("token");
        axios.post("/api/swipe/right", {
            "id": id
        }, {
            headers: {
                "Authorization": token
            }
        }).then((response) => {
            getdata();
        }).catch((err) => {
            setSt(false);
            console.log(err);
            ToastAndroid.show("Try again!", ToastAndroid.SHORT);
        });
    }
    useFocusEffect(React.useCallback(() => {
        getdata();
    }, []))
    return (
        <ImageBackground source={require('../../assets/bg.png')} style={{ width: '100%', height: '100%' }}>
            <ActivityIndicator size="large" animating={st} color="#004467" style={{ position: "absolute", top: '50%', left: '45%', zIndex: 10 }} />

            <ScrollView style={{ paddingHorizontal: '4%', height: '100%' }}   >
                {(data && data.length > 0) ?
                    data.map((i, index) =>
                        <View key={index} style={{ display: 'flex', flexDirection: 'row', backgroundColor: '#E6EDF1', paddingHorizontal: windowHeight * 0.01, borderRadius: 60, marginTop: windowHeight * 0.01 }}>

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
                                <TouchableOpacity onPress={() => swipedRight(i.registration_id)} style={{ flex: 0.5, alignItems: 'center', justifyContent: 'center', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                    <View style={{ borderWidth: 1, paddingVertical: windowHeight * 0.01, paddingHorizontal: windowHeight * 0.01, borderRadius: windowHeight * 0.02, paddingVertical: windowHeight * 0.002, alignItems: 'center', justifyContent: 'center', flexDirection: 'row', borderColor: "#00B8FE", width: '80%' }}>
                                        <AntDesign name="like2" size={windowHeight * 0.015} color="#00B8FE" />
                                        <Text style={{ fontWeight: '700', color: '#00B8FE', fontSize: windowHeight * 0.015 }}> Like</Text></View>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => swipedleft(i.registration_id)} style={{ flex: 0.5, alignItems: 'center', justifyContent: 'center', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                    <View style={{ borderWidth: 1, paddingVertical: windowHeight * 0.01, paddingHorizontal: windowHeight * 0.01, borderRadius: windowHeight * 0.02, paddingVertical: windowHeight * 0.002, alignItems: 'center', justifyContent: 'center', flexDirection: 'row', borderColor: 'red', width: '80%' }}>
                                        <AntDesign name="closecircleo" size={windowHeight * 0.015} color="red" />
                                        <Text style={{ fontWeight: '700', color: 'red', fontSize: windowHeight * 0.015 }}> Dislike</Text></View>
                                </TouchableOpacity>

                            </View>
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
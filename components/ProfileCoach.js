import { StyleSheet, Text, View, StatusBar, ImageBackground, ScrollView, TouchableOpacity, Image, Dimensions } from 'react-native'
import React, { useState } from 'react'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import axios from 'axios';
import * as SecureStore from 'expo-secure-store';
import { baseURL } from '../config';
const windowHeight = Dimensions.get("window").height;
export default function ProfileCoach({ navigation }) {
    const [data, setdata] = useState();
    const [date, setDate] = useState();
    const getData = async () => {
        const token = "Bearer " + await SecureStore.getItemAsync("token");
        const months = [" January ", " Feb ", " Mar ", " Apr ", " May ", " Jun ", " Jul ", " Aug ", " Sept ", " Oct ", " Nov ", " Dec "];
        axios.get("/api/coach/info", {
            headers: {
                "Authorization": token
            }
        }).then((response) => {
            setdata(response.data.data);
            setDate((response.data.data.dob.split("T")[0].split("-")[2]) + months[parseInt(response.data.data.dob.split("T")[0].split("-")[1]) - 1] + response.data.data.dob.split("T")[0].split("-")[0])
        }).catch((error) => {
            console.log(error.response);
        })
    }

    useFocusEffect(React.useCallback(() => {
        getData();
    }, []));
    return (
        data ?
            <ScrollView style={{ backgroundColor: 'white' }}>
                <StatusBar barStyle="light-content" backgroundColor="#004467" />

                <View style={{ width: '100%', display: 'flex', flexDirection: 'row' }}>
                    <ImageBackground source={{ uri: baseURL + "uploads/" + data.image }} style={{ flex: 0.65, width: '100%', height: undefined, aspectRatio: 5.5 / 4, display: 'flex', justifyContent: 'space-between' }} >
                        <TouchableOpacity><Text style={{ textAlign: 'right', margin: '2%' }}><MaterialCommunityIcons name="pencil" size={24} color="white" /></Text></TouchableOpacity>
                        <View style={{ margin: '2%' }}>
                            <Text style={{ color: 'white', fontSize: windowHeight * 0.04, fontWeight: '400' }}>Coach</Text>
                            <Text style={{ color: 'white', fontSize: windowHeight * 0.04, fontWeight: 'bold' }}>Card</Text>
                        </View>
                    </ImageBackground>
                    <View style={{ flex: 0.35, justifyContent: 'space-around', alignItems: 'center', paddingVertical: '4%', backgroundColor: '#004467' }}>
                        <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', borderBottomWidth: 0.5, paddingBottom: "3%", width: '70%', borderColor: 'grey' }}>
                            <Text style={styles.textbottom}>Views</Text>
                            <Text style={{ color: 'white', fontWeight: '400', fontSize: windowHeight * 0.026 }}>554</Text>
                        </View>
                        <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', borderBottomWidth: 0.5, paddingBottom: "3%", width: '70%', borderColor: 'grey' }}>
                            <Text style={styles.textbottom}>Remaining</Text>
                            <Text style={{ color: 'white', fontWeight: '400', fontSize: windowHeight * 0.026 }}>10</Text>
                        </View>
                        <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={styles.textbottom}>Plan</Text>
                            <Text style={{ color: 'white', fontWeight: '400', fontSize: windowHeight * 0.026 }}>Platinum</Text>
                        </View>
                    </View>
                </View>
                <View style={{ display: 'flex', paddingHorizontal: '11%', marginTop: '3%' }}>
                    <TouchableOpacity onPress={() => navigation.navigate("previewcard", data)} style={{ width: '100%', backgroundColor: '#00B8FE', borderRadius: 40, borderWidth: 1, }}>
                        <Text style={{ color: 'white', fontWeight: 'bold', textAlign: 'center', padding: '6%', fontSize: windowHeight * 0.02 }}>Preview Card</Text>
                    </TouchableOpacity>

                </View>


                <View style={{ paddingHorizontal: '6%' }}>


                    <View style={{ marginTop: '6%' }}>
                        <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', borderBottomWidth: 1, borderColor: '#00B8FE', paddingBottom: '1%', marginBottom: '2%' }}>
                            <Text style={{ color: "#00B8FE", fontWeight: '600', fontSize: windowHeight * 0.02 }} >Personal</Text>
                            <TouchableOpacity>
                                <Text><MaterialCommunityIcons name="pencil" size={20} color="#00B8FE" /></Text>
                            </TouchableOpacity>
                        </View>
                        <View>
                            <Text style={{ fontWeight: '600', fontSize: windowHeight * 0.03 }}>{data.firstname} {data.lastname}</Text>
                            <View style={{ display: 'flex', flexDirection: 'row', width: '100%', marginTop: '5%' }}>
                                <View style={{ flex: 0.5 }}>
                                    <Text style={styles.textHead}>{data.gender}</Text>
                                    <Text style={styles.textbottom}>Gender</Text>
                                </View>
                                <View style={{ flex: 0.5 }}>
                                    <Text style={styles.textHead}>{date}</Text>
                                    <Text style={styles.textbottom}>Birthday</Text>
                                </View>
                            </View>
                            <View style={{ display: 'flex', flexDirection: 'row', width: '100%', marginTop: '5%' }}>
                                <View style={{ flex: 0.5 }}>
                                    <Text style={styles.textHead}>{data.ethnicities}</Text>
                                    <Text style={styles.textbottom}>Ethnicity</Text>
                                </View>
                            </View>
                        </View>
                    </View>


                    <View>
                        <Text style={{ width: '100%', borderWidth: 0.5, height: 0.5, borderColor: 'lightgrey', marginVertical: '6%' }}></Text>
                        <View style={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
                            <View style={{ flex: 0.5 }}>
                                <Text style={styles.textHead}>{data.phone}</Text>
                                <Text style={styles.textbottom}>Phone</Text>
                            </View>
                            <View style={{ flex: 0.5 }}>
                                <Text style={styles.textHead}>{data.email}</Text>
                                <Text style={styles.textbottom}>Email</Text>
                            </View>
                        </View>
                        <View style={{ display: 'flex', flexDirection: 'row', width: '100%', marginTop: '5%' }}>
                            <View style={{ flex: 0.5 }}>
                                <Text style={styles.textHead}>Always</Text>
                                <Text style={styles.textbottom}>Visibility</Text>
                            </View>
                            <View style={{ flex: 0.5 }}>
                                <Text style={styles.textHead}>{data.city}, {data.statename}</Text>
                                <Text style={styles.textbottom}>Location</Text>
                            </View>
                        </View>
                    </View>



                    <View>
                        <Text style={{ width: '100%', borderWidth: 0.5, height: 0.5, borderColor: 'lightgrey', marginVertical: '6%' }}></Text>
                        <View style={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
                            <View style={{ flex: 1 }}>
                                <Text style={styles.textHead}>Bio</Text>
                                <Text style={{ color: 'grey', fontSize: windowHeight * 0.016, marginTop: '2%', textAlign: 'justify', width: '100%' }}>{data.personal_bio}</Text>
                            </View>
                        </View>
                        <View style={{ display: 'flex', flexDirection: 'row', width: '100%', marginTop: '5%' }}>
                            <View style={{ flex: 0.5 }}>
                                <Text style={styles.textHead}>{data.college_name}</Text>
                                <Text style={styles.textbottom}>College Name</Text>
                            </View>
                            <View style={{ flex: 0.5 }}>
                                <Text style={styles.textHead}>{data.College_State}</Text>
                                <Text style={styles.textbottom}>University State</Text>
                            </View>
                        </View>
                        <View style={{ display: 'flex', flexDirection: 'row', width: '100%', marginTop: '5%' }}>
                            <View style={{ flex: 1 }}>
                                <Text style={styles.textHead}>{data.university_email}</Text>
                                <Text style={styles.textbottom}>University Email</Text>
                            </View>
                        </View>
                    </View>






                    <View style={{ marginTop: '6%' }}>
                        <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', borderBottomWidth: 1, borderColor: '#00B8FE', paddingBottom: '1%', marginBottom: '6%' }}>
                            <Text style={{ color: "#00B8FE", fontWeight: '600', fontSize: windowHeight * 0.02 }} >Athletics</Text>
                            <TouchableOpacity>
                                <Text><MaterialCommunityIcons name="pencil" size={20} color="#00B8FE" /></Text>
                            </TouchableOpacity>
                        </View>

                        <View style={{ display: 'flex', flexDirection: 'row', width: '100%', marginBottom: '5%' }}>
                            <View style={{ flex: 0.5 }}>
                                <Text style={styles.textHead}>{data.sportsname}</Text>
                                <Text style={styles.textbottom}>Sport</Text>
                            </View>
                            <View style={{ flex: 0.5 }}>
                                <Text style={styles.textHead}>{data.team}</Text>
                                <Text style={styles.textbottom}>Team Name</Text>
                            </View>
                        </View>
                        <View style={{ display: 'flex', flexDirection: 'row', width: '100%', marginBottom: '5%' }}>
                            <View style={{ flex: 0.5 }}>
                                <Text style={styles.textHead}>{data.divisions}</Text>
                                <Text style={styles.textbottom}>Division</Text>
                            </View>
                            <View style={{ flex: 0.5 }}>
                                <Text style={styles.textHead}>{data.jobtitle}</Text>
                                <Text style={styles.textbottom}>Job Title</Text>
                            </View>
                        </View>
                        <View style={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
                            <View style={{ flex: 0.5 }}>
                                <Text style={styles.textHead}>{data.coaching_gender}</Text>
                                <Text style={styles.textbottom}>Coachs</Text>
                            </View>
                        </View>
                        <Text style={{ color: 'black', fontWeight: '600', fontSize: windowHeight * 0.02, marginTop: '6%', marginBottom: '4%' }}>Highlight Reel</Text>
                        <View style={{ paddingHorizontal: '5%' }}>
                            <Image source={require('../assets/image.png')} style={{ width: '100%' }} />
                            <TouchableOpacity>
                                <Text style={{ fontWeight: 'bold', color: '#00B8FE', marginVertical: '3%', textAlign: 'center' }}><MaterialCommunityIcons name="pencil" size={16} color="#00B8FE" /> Set video link</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </ScrollView >
            :
            null
    )
}


const styles = StyleSheet.create({
    textHead: { color: 'black', fontWeight: '600', fontSize: windowHeight * 0.02 },
    textbottom: { color: 'grey', fontSize: 12 }
})

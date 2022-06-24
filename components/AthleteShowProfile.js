import { StyleSheet, Text, View, StatusBar, ImageBackground, ScrollView, TouchableOpacity, Image, Dimensions, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import axios from 'axios';
import * as SecureStore from 'expo-secure-store';
import { baseURL } from '../config';

const windowHeight = Dimensions.get("window").height;
export default function ShowProfile({ route, navigation }) {
    const [data, setdata] = useState();
    const [date, setDate] = useState();
    const getData = async () => {
        const token = "Bearer " + await SecureStore.getItemAsync("token");
        const months = [" January ", " Feb ", " Mar ", " Apr ", " May ", " Jun ", " Jul ", " Aug ", " Sept ", " Oct ", " Nov ", " Dec "];
        axios.get("api/student/profile", {
            params: {
                "id": route.params.id
            },
            headers: {
                "Authorization": token
            }
        }).then((response) => {
            setdata(response.data.data);
            setDate((response.data.data.dob.split("T")[0].split("-")[2]) + months[parseInt(response.data.data.dob.split("T")[0].split("-")[1]) - 1] + response.data.data.dob.split("T")[0].split("-")[0])
        }).catch((error) => {
            console.log(error.response.data);
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
                    <ImageBackground source={{ uri: baseURL + "uploads/" + data.image }} style={{ flex: 1, width: '100%', height: undefined, aspectRatio: 5.5 / 4, display: 'flex', justifyContent: 'space-between' }} >
                        <View style={{ margin: '2%' }}>
                            <Text style={{ color: 'white', fontSize: windowHeight * 0.04, fontWeight: '400' }}>Athlete</Text>
                            <Text style={{ color: 'white', fontSize: windowHeight * 0.04, fontWeight: 'bold' }}>Card</Text>
                        </View>
                    </ImageBackground>

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

                        </View>
                        <View>
                            <Text style={{ fontWeight: '600', fontSize: windowHeight * 0.03 }}>{data.firstname + " " + data.lastname}</Text>
                            <View style={{ display: 'flex', flexDirection: 'row', width: '100%', marginTop: '5%' }}>
                                <View style={{ flex: 0.5 }}>
                                    <Text style={styles.textHead}>{data.gender}</Text>
                                    <Text style={styles.textbottom}>Gender</Text>
                                </View>
                                <View style={{ flex: 0.5 }}>
                                    <Text style={styles.textHead}>{date ? date : "-"}</Text>
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
                                <Text style={styles.textHead}>{data.school_name}</Text>
                                <Text style={styles.textbottom}>{data.school_type} Name</Text>
                            </View>
                            <View style={{ flex: 0.5 }}>
                                <Text style={styles.textHead}>{data.scholastic_year}</Text>
                                <Text style={styles.textbottom}>Scholastic Year</Text>
                            </View>
                        </View>
                    </View>
                    <View >
                        <Text style={{ width: '100%', borderWidth: 0.5, height: 0.5, borderColor: 'lightgrey', marginVertical: '6%' }}></Text>
                        <View style={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
                            <View style={{ flex: 0.5 }}>
                                <Text style={styles.textHead}>{data.gpa}</Text>
                                <Text style={styles.textbottom}>GPA</Text>
                            </View>
                            <View style={{ flex: 0.5 }}>

                                <Text style={styles.textHead}>{data.sat}</Text>
                                <Text style={styles.textbottom}>SAT</Text>
                            </View>
                        </View>
                        <View style={{ display: 'flex', flexDirection: 'row', width: '100%', marginTop: '5%' }}>
                            <View style={{ flex: 0.5 }}>
                                <Text style={styles.textHead}>{data.act}</Text>
                                <Text style={styles.textbottom}>ACT</Text>
                            </View>
                        </View>
                    </View>
                    <View style={{ marginTop: '6%' }}>
                        <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', borderBottomWidth: 1, borderColor: '#00B8FE', paddingBottom: '1%', marginBottom: '6%' }}>
                            <Text style={{ color: "#00B8FE", fontWeight: '600', fontSize: windowHeight * 0.02 }} >Athletics</Text>
                        </View>
                        {
                            data.sport ? data.sport.map((i, index) =>

                                <View key={index} style={{ display: 'flex', flexDirection: 'row', width: '100%', marginBottom: '5%' }}>
                                    <View style={{ flex: 0.5 }}>
                                        <Text style={styles.textHead}>{i.sportsname}</Text>
                                        <Text style={styles.textbottom}>Sport</Text>
                                    </View>
                                    <View style={{ flex: 0.5 }}>
                                        <Text style={styles.textHead}>{i.position}</Text>
                                        <Text style={styles.textbottom}>Position</Text>
                                    </View>
                                </View>
                            ) : null
                        }
                        <View style={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
                            <View style={{ flex: 0.5 }}>
                                <Text style={styles.textHead}>{data.height} CM </Text>
                                <Text style={styles.textbottom}>Height</Text>
                            </View>
                            <View style={{ flex: 0.5 }}>
                                <Text style={styles.textHead}>{data.weight} KG</Text>
                                <Text style={styles.textbottom}>Weight</Text>
                            </View>
                        </View>
                        <Text style={{ color: 'black', fontWeight: '600', fontSize: windowHeight * 0.02, marginTop: '6%', marginBottom: '4%' }}>Highlight Reel</Text>
                        <View style={{ paddingHorizontal: '5%', marginBottom: 10 }}>
                            <Image source={require('../assets/image.png')} style={{ width: '100%' }} />

                        </View>
                    </View>
                </View>
            </ScrollView >
            :
            <ActivityIndicator size="large" animating={true} color="#004467" style={{ position: "absolute", top: '50%', left: '45%', zIndex: 10 }} />

    )
}


const styles = StyleSheet.create({

    textHead: { color: 'black', fontWeight: '600', fontSize: windowHeight * 0.02 },
    textbottom: { color: 'grey', fontSize: 12 }
})

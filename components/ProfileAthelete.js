import { StyleSheet, Text, View, StatusBar, ImageBackground, ScrollView, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { MaterialCommunityIcons } from '@expo/vector-icons';
export default function ProfileAthelete({ navigation }) {
    return (
        <ScrollView style={{ backgroundColor: 'white' }}>
            <StatusBar barStyle="light-content" backgroundColor="#004467" />

            <View style={{ width: '100%', display: 'flex', flexDirection: 'row' }}>
                <ImageBackground source={require("../assets/image.png")} style={{ flex: 0.65, width: '100%', height: undefined, aspectRatio: 5.5 / 4, display: 'flex', justifyContent: 'space-between' }} >
                    <TouchableOpacity><Text style={{ textAlign: 'right', margin: '2%' }}><MaterialCommunityIcons name="pencil" size={24} color="white" /></Text></TouchableOpacity>
                    <View style={{ margin: '2%' }}>
                        <Text style={{ color: 'white', fontSize: 30, fontWeight: '400' }}>Athlete</Text>
                        <Text style={{ color: 'white', fontSize: 30, fontWeight: 'bold' }}>Card</Text>
                    </View>
                </ImageBackground>
                <View style={{ flex: 0.35, justifyContent: 'space-around', alignItems: 'center', paddingVertical: '4%', backgroundColor: '#004467' }}>
                    <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', borderBottomWidth: 0.5, paddingBottom: "3%", width: '70%', borderColor: 'grey' }}>
                        <Text style={{ color: 'grey', fontSize: 12 }}>Views</Text>
                        <Text style={{ color: 'white', fontWeight: '400', fontSize: 20 }}>554</Text>
                    </View>
                    <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', borderBottomWidth: 0.5, paddingBottom: "3%", width: '70%', borderColor: 'grey' }}>
                        <Text style={{ color: 'grey', fontSize: 12 }}>Remaining</Text>
                        <Text style={{ color: 'white', fontWeight: '400', fontSize: 20 }}>10</Text>
                    </View>
                    <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ color: 'grey', fontSize: 12 }}>Plan</Text>
                        <Text style={{ color: 'white', fontWeight: '400', fontSize: 20 }}>Platinum</Text>
                    </View>
                </View>
            </View>
            <View style={{ display: 'flex', paddingHorizontal: '11%', marginTop: '3%' }}>
                <TouchableOpacity onPress={() => navigation.navigate("previewcard")} style={{ width: '100%', backgroundColor: '#00B8FE', borderRadius: 40, borderWidth: 1, }}>
                    <Text style={{ color: 'white', fontWeight: 'bold', textAlign: 'center', padding: '6%' }}>Preview Card</Text>
                </TouchableOpacity>

            </View>


            <View style={{ paddingHorizontal: '6%' }}>


                <View style={{ marginTop: '3%' }}>
                    <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', borderBottomWidth: 1, borderColor: '#00B8FE', paddingBottom: '1%' }}>
                        <Text style={{ color: "#00B8FE", fontWeight: '600', fontSize: 16 }} >Personal</Text>
                        <TouchableOpacity>
                            <Text><MaterialCommunityIcons name="pencil" size={24} color="#00B8FE" /></Text>
                        </TouchableOpacity>
                    </View>
                    <View>
                        <Text style={{ fontWeight: '600', fontSize: 24 }}>John Smith</Text>
                        <View style={{ display: 'flex', flexDirection: 'row', width: '100%', marginTop: '5%' }}>
                            <View style={{ flex: 0.5 }}>
                                <Text style={{ color: 'black', fontWeight: '600', fontSize: 15 }}>Male</Text>
                                <Text style={{ color: 'grey', fontSize: 12, marginTop: '2%' }}>Gender</Text>
                            </View>
                            <View style={{ flex: 0.5 }}>
                                <Text style={{ color: 'black', fontWeight: '600', fontSize: 15 }}>06 Jun 1995</Text>
                                <Text style={{ color: 'grey', fontSize: 12, marginTop: '2%' }}>Birthday</Text>
                            </View>
                        </View>
                        <View style={{ display: 'flex', flexDirection: 'row', width: '100%', marginTop: '5%' }}>
                            <View style={{ flex: 0.5 }}>
                                <Text style={{ color: 'black', fontWeight: '600', fontSize: 15 }}>American</Text>
                                <Text style={{ color: 'grey', fontSize: 12, marginTop: '2%' }}>Ethnicity</Text>
                            </View>
                            <View style={{ flex: 0.5 }}>
                                <Text style={{ color: 'black', fontWeight: '600', fontSize: 15 }}>Texas, USA</Text>
                                <Text style={{ color: 'grey', fontSize: 12, marginTop: '2%' }}>Location</Text>
                            </View>
                        </View>
                    </View>
                </View>


                <View>
                    <Text style={{ width: '100%', borderWidth: 0.5, height: 0.5, borderColor: 'lightgrey', marginVertical: '6%' }}></Text>
                    <View style={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
                        <View style={{ flex: 0.5 }}>
                            <Text style={{ color: 'black', fontWeight: '600', fontSize: 15 }}>+1-440 4888 00</Text>
                            <Text style={{ color: 'grey', fontSize: 12, marginTop: '2%' }}>Phone</Text>
                        </View>
                        <View style={{ flex: 0.5 }}>
                            <Text style={{ color: 'black', fontWeight: '600', fontSize: 15 }}>john.smith@gmail.com</Text>
                            <Text style={{ color: 'grey', fontSize: 12, marginTop: '2%' }}>Email</Text>
                        </View>
                    </View>
                    <View style={{ display: 'flex', flexDirection: 'row', width: '100%', marginTop: '5%' }}>
                        <View style={{ flex: 0.5 }}>
                            <Text style={{ color: 'black', fontWeight: '600', fontSize: 15 }}>Always</Text>
                            <Text style={{ color: 'grey', fontSize: 12, marginTop: '2%' }}>Visibility</Text>
                        </View>
                        <View style={{ flex: 0.5 }}>
                            <Text style={{ color: 'black', fontWeight: '600', fontSize: 15 }}>Texas, USA</Text>
                            <Text style={{ color: 'grey', fontSize: 12, marginTop: '2%' }}>Location</Text>
                        </View>
                    </View>
                </View>



                <View>
                    <Text style={{ width: '100%', borderWidth: 0.5, height: 0.5, borderColor: 'lightgrey', marginVertical: '6%' }}></Text>
                    <View style={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
                        <View style={{ flex: 1 }}>
                            <Text style={{ color: 'black', fontWeight: '600', fontSize: 15 }}>Bio</Text>
                            <Text style={{ color: 'grey', fontSize: 12, marginTop: '2%', textAlign: 'justify', width: '100%' }}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</Text>
                        </View>
                    </View>
                    <View style={{ display: 'flex', flexDirection: 'row', width: '100%', marginTop: '5%' }}>
                        <View style={{ flex: 0.5 }}>
                            <Text style={{ color: 'black', fontWeight: '600', fontSize: 15 }}>St. John</Text>
                            <Text style={{ color: 'grey', fontSize: 12 }}>School Name</Text>
                        </View>
                        <View style={{ flex: 0.5 }}>
                            <Text style={{ color: 'black', fontWeight: '600', fontSize: 15 }}>2000</Text>
                            <Text style={{ color: 'grey', fontSize: 12 }}>Scholastic Year</Text>
                        </View>
                    </View>
                </View>


                <View >
                    <Text style={{ width: '100%', borderWidth: 0.5, height: 0.5, borderColor: 'lightgrey', marginVertical: '6%' }}></Text>
                    <View style={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
                        <View style={{ flex: 0.5 }}>
                            <Text style={{ color: 'black', fontWeight: '600', fontSize: 15 }}>4.5</Text>
                            <Text style={{ color: 'grey', fontSize: 12, marginTop: '2%' }}>GPA</Text>
                        </View>
                        <View style={{ flex: 0.5 }}>

                            <Text style={{ color: 'black', fontWeight: '600', fontSize: 15 }}>6.5</Text>
                            <Text style={{ color: 'grey', fontSize: 12, marginTop: '2%' }}>SAT</Text>
                        </View>
                    </View>
                    <View style={{ display: 'flex', flexDirection: 'row', width: '100%', marginTop: '5%' }}>
                        <View style={{ flex: 0.5 }}>
                            <Text style={{ color: 'black', fontWeight: '600', fontSize: 15 }}>4</Text>
                            <Text style={{ color: 'grey', fontSize: 12, marginTop: '2%' }}>ACT</Text>
                        </View>
                    </View>
                </View>



                <View style={{ marginTop: '6%' }}>
                    <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', borderBottomWidth: 1, borderColor: '#00B8FE', paddingBottom: '1%', marginBottom: '6%' }}>
                        <Text style={{ color: "#00B8FE", fontWeight: '600', fontSize: 16 }} >Athletics</Text>
                        <TouchableOpacity>
                            <Text><MaterialCommunityIcons name="pencil" size={24} color="#00B8FE" /></Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
                        <View style={{ flex: 0.5 }}>
                            <Text style={{ color: 'black', fontWeight: '600', fontSize: 15 }}>Basket Ball</Text>
                            <Text style={{ color: 'grey', fontSize: 12, marginTop: '2%' }}>Sport</Text>
                        </View>
                        <View style={{ flex: 0.5 }}>
                            <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
                                <Text style={{ fontSize: 15, fontWeight: '600' }}>3</Text>
                                <Text style={{ fontSize: 10, fontWeight: '600' }}>rd</Text>
                            </View>
                            <Text style={{ color: 'grey', fontSize: 12, marginTop: '2%' }}>Position</Text>
                        </View>
                    </View>
                    <View style={{ display: 'flex', flexDirection: 'row', width: '100%', marginTop: '5%' }}>
                        <View style={{ flex: 0.5 }}>
                            <Text style={{ color: 'black', fontWeight: '600', fontSize: 15 }}>155 cm</Text>
                            <Text style={{ color: 'grey', fontSize: 12, marginTop: '2%' }}>Height</Text>
                        </View>
                        <View style={{ flex: 0.5 }}>
                            <Text style={{ color: 'black', fontWeight: '600', fontSize: 15 }}>40 lbs</Text>
                            <Text style={{ color: 'grey', fontSize: 12, marginTop: '2%' }}>Weight</Text>
                        </View>
                    </View>
                    <Text style={{ color: 'black', fontWeight: '600', fontSize: 15, marginTop: '6%', marginBottom: '4%' }}>Highlight Reel</Text>
                    <View style={{ paddingHorizontal: '5%' }}>
                        <Image source={require('../assets/image.png')} style={{ width: '100%' }} />
                        <TouchableOpacity>
                            <Text style={{ fontWeight: 'bold', color: '#00B8FE', marginVertical: '3%', textAlign: 'center' }}><MaterialCommunityIcons name="pencil" size={18} color="#00B8FE" /> Set video link</Text>
                        </TouchableOpacity>
                    </View>
                </View>





            </View>
        </ScrollView >
    )
}

const styles = StyleSheet.create({})

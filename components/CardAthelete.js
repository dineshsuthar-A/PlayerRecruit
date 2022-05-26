import {
    StyleSheet, Text, View, ImageBackground, Switch, TouchableOpacity, ScrollView,
    Button,
    Pressable,
} from 'react-native'
import React, { useState, useRef } from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import FlipCard from 'react-native-flip-card'

export default function CardAthelete() {
    const [flip, setflip] = useState(false);
    return (

        <FlipCard
            friction={6}
            perspective={1000}
            flipHorizontal={true}
            flipVertical={false}
            flip={flip}
            clickable={false}
        >
            {/* Face Side */}
            <View style={{ width: '100%', height: '100%', backgroundColor: '#F89180', borderRadius: 20 }}>
                <View style={{ position: 'absolute', bottom: 0, backgroundColor: '#C0F880', zIndex: 0, height: '52%', width: '100%', borderRadius: 20 }}>
                </View>
                <View style={{ width: '100%', height: '100%', paddingHorizontal: '4%', paddingTop: '9%', paddingBottom: '4%', borderRadius: 20, overflow: 'hidden' }}>

                    <ImageBackground source={require("../assets/stock.png")} style={{ display: 'flex', width: '100%', height: '100%', borderRadius: 20, overflow: 'hidden', borderWidth: 1, borderColor: 'grey' }}>




                        <View style={{ flex: 1, width: '100%', height: '100%', display: 'flex' }}>
                            <View style={{ flex: 0.25 }}>
                                <View style={{ display: 'flex', flexDirection: 'row' }}>
                                    <View style={{ paddingHorizontal: '4%', paddingTop: '6%', flex: 0.7 }}>
                                        <Text style={{ fontSize: 20 }}>John </Text>
                                        <Text style={{ fontSize: 26, fontWeight: '600' }}>Smith</Text>

                                    </View>
                                    <TouchableOpacity onPress={() => setflip(true)} style={{ flex: 0.3, alignItems: 'center', justifyContent: 'center' }}>
                                        <Text style={{ color: "#00B8FE", fontWeight: '600', fontSize: 16 }} >BACK</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <View style={{ flex: 1, width: '100%', height: '100%' }}>
                                <Text style={{ flex: 0.65, fontSize: 20, paddingHorizontal: '4%' }}>3rd</Text>
                                <View style={{ flex: 0.35, backgroundColor: 'white', borderRadius: 10, opacity: 0.8, justifyContent: 'center', paddingHorizontal: '4%' }}>
                                    <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingBottom: '4%' }}>
                                        <View style={{ borderRightWidth: 1, borderColor: "lightgrey", flex: 1, alignItems: 'center' }}>
                                            <View>
                                                <Text style={{ color: 'grey', fontSize: 12, marginBottom: '3%' }}>Year</Text>
                                                <Text style={{ fontSize: 16 }}>2021</Text>
                                            </View>
                                        </View>
                                        <View style={{ borderRightWidth: 1, borderColor: "lightgrey", flex: 1, alignItems: 'center' }}>
                                            <View>
                                                <Text style={{ color: 'grey', fontSize: 12, marginBottom: '3%' }}>School</Text>
                                                <Text style={{ fontSize: 16 }}>St. John</Text>
                                            </View>
                                        </View>
                                        <View style={{ flex: 1, alignItems: 'center' }}>
                                            <View>
                                                <Text style={{ color: 'grey', fontSize: 12, marginBottom: '3%' }}>State</Text>
                                                <Text style={{ fontSize: 16 }}>Texas</Text>
                                            </View>
                                        </View>
                                    </View>
                                    <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', borderTopWidth: 1, borderColor: 'lightgrey', paddingTop: '4%' }}>
                                        <View style={{ borderRightWidth: 1, borderColor: "lightgrey", flex: 1, alignItems: 'center' }}>
                                            <View>
                                                <Text style={{ color: 'grey', fontSize: 12, marginBottom: '3%' }}>Height</Text>
                                                <Text style={{ fontSize: 16 }}>165</Text>
                                            </View>
                                        </View>
                                        <View style={{ borderRightWidth: 1, borderColor: "lightgrey", flex: 1, alignItems: 'center' }}>
                                            <View>
                                                <Text style={{ color: 'grey', fontSize: 12, marginBottom: '3%' }}>Weight</Text>
                                                <Text style={{ fontSize: 16 }}>75</Text>
                                            </View>
                                        </View>
                                        <View style={{ flex: 1, alignItems: 'center' }}>
                                            <View >
                                                <Text style={{ color: 'grey', fontSize: 12, marginBottom: '3%' }}>GPA</Text>
                                                <Text style={{ fontSize: 16 }}>4.5</Text>
                                            </View>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </ImageBackground>
                </View>
            </View>



            {/* Back Side */}
            <View style={{ width: '100%', height: '100%', backgroundColor: '#F89180', borderRadius: 20 }}>
                <View style={{ position: 'absolute', bottom: 0, backgroundColor: '#C0F880', zIndex: 0, height: '52%', width: '100%', borderRadius: 20 }}>
                </View>
                <View style={{ width: '100%', height: '100%', paddingHorizontal: '4%', paddingTop: '9%', paddingBottom: '4%', borderRadius: 20, overflow: 'hidden' }}>

                    <ImageBackground source={require("../assets/stock.png")} style={{ display: 'flex', width: '100%', height: '100%', borderRadius: 20, overflow: 'hidden', borderWidth: 1, borderColor: 'grey' }}>


                        <View style={{ flex: 1, width: '100%', height: '100%', display: 'flex', backgroundColor: 'white', opacity: 0.8 }}>
                            <View style={{ flex: 0.25 }}>
                                <View style={{ display: 'flex', flexDirection: 'row' }}>
                                    <View style={{ paddingHorizontal: '4%', paddingTop: '6%', flex: 0.7 }}>
                                        <Text style={{ fontSize: 20 }}>John </Text>
                                        <Text style={{ fontSize: 26, fontWeight: '600' }}>Smith</Text>
                                    </View>
                                    <TouchableOpacity onPress={() => setflip(false)} style={{ flex: 0.3, alignItems: 'center', justifyContent: 'center' }}>
                                        <Text style={{ color: "#00B8FE", fontWeight: '600', fontSize: 16 }} >FRONT</Text>
                                    </TouchableOpacity>

                                </View>
                            </View>
                            <ScrollView style={{ flex: 1, width: '100%', height: '100%', padding: '4%' }}>
                                <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', borderBottomWidth: 1, borderColor: '#00B8FE' }}>
                                    <Text style={{ color: "#00B8FE", fontWeight: '600', fontSize: 16 }} >Details</Text>
                                    <TouchableOpacity>
                                        <Text><MaterialCommunityIcons name="pencil" size={24} color="#00B8FE" /></Text>
                                    </TouchableOpacity>
                                </View>
                                <View>
                                    <Text style={{ fontWeight: '600', fontSize: 24 }}>+1-440 4888 00</Text>
                                    <View style={{ display: 'flex', flexDirection: 'row', width: '100%', marginTop: '5%' }}>
                                        <View style={{ flex: 0.6 }}>
                                            <Text style={{ color: 'black', fontWeight: '600', fontSize: 15 }}>Football</Text>
                                            <Text style={{ color: 'grey', fontSize: 12, marginTop: '2%' }}>Sport</Text>
                                        </View>
                                        <View style={{ flex: 0.4 }}>
                                            <Text style={{ color: 'black', fontWeight: '600', fontSize: 15 }}>3rd</Text>
                                            <Text style={{ color: 'grey', fontSize: 12, marginTop: '2%' }}>Position</Text>
                                        </View>
                                    </View>
                                    <View style={{ display: 'flex', flexDirection: 'row', width: '100%', marginTop: '5%' }}>
                                        <View style={{ flex: 0.6 }}>
                                            <Text style={{ color: 'black', fontWeight: '600', fontSize: 15 }}>1995</Text>
                                            <Text style={{ color: 'grey', fontSize: 12, marginTop: '2%' }}>Year</Text>
                                        </View>
                                        <View style={{ flex: 0.4 }}>
                                            <Text style={{ color: 'black', fontWeight: '600', fontSize: 15 }}>St. John</Text>
                                            <Text style={{ color: 'grey', fontSize: 12, marginTop: '2%' }}>School</Text>
                                        </View>
                                    </View>
                                    <View style={{ display: 'flex', flexDirection: 'row', width: '100%', marginTop: '5%' }}>
                                        <View style={{ flex: 0.6 }}>
                                            <Text style={{ color: 'black', fontWeight: '600', fontSize: 15 }}>Texas, USA</Text>
                                            <Text style={{ color: 'grey', fontSize: 12, marginTop: '2%' }}>State</Text>
                                        </View>
                                        <View style={{ flex: 0.4 }}>
                                            <Text style={{ color: 'black', fontWeight: '600', fontSize: 15 }}>2.5</Text>
                                            <Text style={{ color: 'grey', fontSize: 12, marginTop: '2%' }}>GPA</Text>
                                        </View>
                                    </View>
                                    <View style={{ display: 'flex', flexDirection: 'row', width: '100%', marginTop: '5%' }}>
                                        <View style={{ flex: 0.6 }}>
                                            <Text style={{ color: 'black', fontWeight: '600', fontSize: 15 }}>Lipsum</Text>
                                            <Text style={{ color: 'grey', fontSize: 12, marginTop: '2%' }}>SAT</Text>
                                        </View>
                                        <View style={{ flex: 0.4 }}>
                                            <Text style={{ color: 'black', fontWeight: '600', fontSize: 15 }}>Texas, USA</Text>
                                            <Text style={{ color: 'grey', fontSize: 12, marginTop: '2%' }}>ACT</Text>
                                        </View>
                                    </View>
                                    <View style={{ display: 'flex', flexDirection: 'row', width: '100%', marginTop: '5%' }}>
                                        <View style={{ flex: 0.6 }}>
                                            <Text style={{ color: 'black', fontWeight: '600', fontSize: 15 }}>Male</Text>
                                            <Text style={{ color: 'grey', fontSize: 12, marginTop: '2%' }}>Gender</Text>
                                        </View>
                                        <View style={{ flex: 0.4 }}>
                                            <Text style={{ color: 'black', fontWeight: '600', fontSize: 15 }}>American</Text>
                                            <Text style={{ color: 'grey', fontSize: 12, marginTop: '2%' }}>Ethnicity</Text>
                                        </View>
                                    </View>
                                    <Text style={{ width: '100%', borderWidth: 0.5, height: 0.5, borderColor: 'lightgrey', marginVertical: '4%' }}></Text>
                                    <View style={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
                                        <View style={{ flex: 1 }}>
                                            <Text style={{ color: 'grey', fontWeight: '400', fontSize: 12 }}>Bio</Text>
                                            <Text style={{ color: 'black', fontSize: 12, marginTop: '2%', textAlign: 'justify' }}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</Text>
                                        </View>
                                    </View>
                                </View>
                            </ScrollView>
                        </View>




                    </ImageBackground>
                </View >
            </View >
        </FlipCard>
    )
}

const styles = StyleSheet.create({

})
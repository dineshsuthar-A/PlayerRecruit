import {
    StyleSheet, Text, View, ImageBackground, Dimensions, TouchableOpacity, ScrollView,
    Button,
    Pressable,
} from 'react-native'
import React, { useState, useRef } from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import FlipCard from 'react-native-flip-card'
import { baseURL } from '../config';

const windowHeight = Dimensions.get('window').height;
export default function CardCoach(props) {
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

                    <ImageBackground source={{ uri: baseURL + "uploads/" + props.image }} style={{ display: 'flex', width: '100%', height: '100%', borderRadius: 20, overflow: 'hidden', borderWidth: 1, borderColor: 'grey' }}>




                        <View style={{ flex: 1, width: '100%', height: '100%', display: 'flex' }}>
                            <View style={{ flex: 0.25 }}>
                                <View style={{ display: 'flex', flexDirection: 'row' }}>
                                    <View style={{ paddingHorizontal: '4%', paddingTop: '6%', flex: 0.7 }}>
                                        <Text style={{ fontSize: windowHeight * 0.024 }}>{props.firstname} </Text>
                                        <Text style={{ fontSize: windowHeight * 0.03, fontWeight: '600' }}>{props.lastname}</Text>

                                    </View>
                                    <TouchableOpacity onPress={() => setflip(true)} style={{ flex: 0.3, alignItems: 'center', justifyContent: 'center' }}>
                                        <Text style={{ color: "#00B8FE", fontWeight: '600', fontSize: windowHeight * 0.02 }} >BACK</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <View style={{ flex: 1, width: '100%', height: '100%' }}>
                                <Text style={{ flex: 0.84, fontSize: windowHeight * 0.024, paddingHorizontal: '4%', width: '46%' }}>{props.jobtitle}</Text>
                                <View style={{ flex: 0.16, backgroundColor: 'white', borderRadius: 10, opacity: 0.8, justifyContent: 'center', paddingHorizontal: '4%' }}>

                                    <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', }}>
                                        <View style={{ borderRightWidth: 1, borderColor: "lightgrey", flex: 0.3, alignItems: 'center' }}>
                                            <View>
                                                <Text style={{ color: 'grey', fontSize: windowHeight * 0.012, marginBottom: '3%' }}>Team Name</Text>
                                                <Text style={{ fontSize: windowHeight * 0.02 }}>{props.team}</Text>
                                            </View>
                                        </View>
                                        <View style={{ borderRightWidth: 1, borderColor: "lightgrey", flex: 0.4, alignItems: 'center' }}>
                                            <View>
                                                <Text style={{ color: 'grey', fontSize: windowHeight * 0.012, marginBottom: '3%' }}>College</Text>
                                                <Text style={{ fontSize: windowHeight * 0.02 }}>{props.college}</Text>
                                            </View>
                                        </View>
                                        <View style={{ flex: 0.3, alignItems: 'center' }}>
                                            <View >
                                                <Text style={{ color: 'grey', fontSize: windowHeight * 0.012, marginBottom: '3%' }}>Division</Text>
                                                <Text style={{ fontSize: windowHeight * 0.02 }}>{props.division}</Text>
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

                    <ImageBackground source={{ uri: baseURL + "uploads/" + props.image }} style={{ display: 'flex', width: '100%', height: '100%', borderRadius: 20, overflow: 'hidden', borderWidth: 1, borderColor: 'grey' }}>


                        <View style={{ flex: 1, width: '100%', height: '100%', display: 'flex', backgroundColor: 'white', opacity: 0.8 }}>
                            <View style={{ flex: 0.2 }}>
                                <View style={{ display: 'flex', flexDirection: 'row' }}>
                                    <View style={{ paddingHorizontal: '4%', paddingTop: '6%', flex: 0.7 }}>
                                        <Text style={{ fontSize: windowHeight * 0.024 }}>{props.firstname} </Text>
                                        <Text style={{ fontSize: windowHeight * 0.03, fontWeight: '600' }}>{props.lastname}</Text>
                                    </View>
                                    <TouchableOpacity onPress={() => setflip(false)} style={{ flex: 0.3, alignItems: 'center', justifyContent: 'center' }}>
                                        <Text style={{ color: "#00B8FE", fontWeight: '600', fontSize: windowHeight * 0.02 }} >FRONT</Text>
                                    </TouchableOpacity>

                                </View>
                            </View>
                            <ScrollView style={{ flex: 0.8, width: '100%', height: '100%', padding: '4%' }}>
                                <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', borderBottomWidth: 1, borderColor: '#00B8FE' }}>
                                    <Text style={{ color: "#00B8FE", fontWeight: '600', fontSize: windowHeight * 0.02 }} >Details</Text>

                                </View>
                                <View>
                                    <Text style={{ fontWeight: '600', fontSize: windowHeight * 0.028 }}>{props.phone}</Text>
                                    <View style={{ display: 'flex', flexDirection: 'row', width: '100%', marginTop: '5%' }}>
                                        <View style={{ flex: 0.6 }}>
                                            <Text style={{ color: 'black', fontWeight: '600', fontSize: windowHeight * 0.02 }}>{props.jobtitle}</Text>
                                            <Text style={{ color: 'grey', fontSize: windowHeight * 0.016, marginTop: '2%' }}>Job Title</Text>
                                        </View>
                                        <View style={{ flex: 0.4 }}>
                                            <Text style={{ color: 'black', fontWeight: '600', fontSize: windowHeight * 0.02 }}>{props.sport}</Text>
                                            <Text style={{ color: 'grey', fontSize: windowHeight * 0.016, marginTop: '2%' }}>Sport</Text>
                                        </View>
                                    </View>
                                    <View style={{ display: 'flex', flexDirection: 'row', width: '100%', marginTop: '5%' }}>
                                        <View style={{ flex: 0.6 }}>
                                            <Text style={{ color: 'black', fontWeight: '600', fontSize: windowHeight * 0.02 }}>{props.coaches}</Text>
                                            <Text style={{ color: 'grey', fontSize: windowHeight * 0.016, marginTop: '2%' }}>Coaches</Text>
                                        </View>
                                        <View style={{ flex: 0.4 }}>
                                            <Text style={{ color: 'black', fontWeight: '600', fontSize: windowHeight * 0.02 }}>{props.team}</Text>
                                            <Text style={{ color: 'grey', fontSize: windowHeight * 0.016, marginTop: '2%' }}>Team</Text>
                                        </View>
                                    </View>
                                    <View style={{ display: 'flex', flexDirection: 'row', width: '100%', marginTop: '5%' }}>
                                        <View style={{ flex: 0.6 }}>
                                            <Text style={{ color: 'black', fontWeight: '600', fontSize: windowHeight * 0.02 }}>{props.college}</Text>
                                            <Text style={{ color: 'grey', fontSize: windowHeight * 0.016, marginTop: '2%' }}>College</Text>
                                        </View>
                                        <View style={{ flex: 0.4 }}>
                                            <Text style={{ color: 'black', fontWeight: '600', fontSize: windowHeight * 0.02 }}>{props.city}, {props.state}</Text>
                                            <Text style={{ color: 'grey', fontSize: windowHeight * 0.016, marginTop: '2%' }}>State</Text>
                                        </View>
                                    </View>
                                    <View style={{ display: 'flex', flexDirection: 'row', width: '100%', marginTop: '5%' }}>
                                        <View style={{ flex: 1 }}>
                                            <Text style={{ color: 'black', fontWeight: '600', fontSize: windowHeight * 0.02 }}>{props.division}</Text>
                                            <Text style={{ color: 'grey', fontSize: windowHeight * 0.016, marginTop: '2%' }}>Division</Text>
                                        </View>

                                    </View>

                                    <Text style={{ width: '100%', borderWidth: 0.5, height: 0.5, borderColor: 'lightgrey', marginVertical: '4%' }}></Text>
                                    <View style={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
                                        <View style={{ flex: 1 }}>
                                            <Text style={{ color: 'grey', fontWeight: '400', fontSize: windowHeight * 0.016 }}>Bio</Text>
                                            <Text style={{ color: 'black', fontSize: windowHeight * 0.016, marginTop: '2%', textAlign: 'justify' }}>{props.bio}</Text>
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
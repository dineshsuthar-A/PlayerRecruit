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
export default function CardAthelete(props) {
    const [flip, setflip] = useState(false);
    return (
        props.image ?
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
                                        <TouchableOpacity onPress={() => props.id ? props.nav.navigate("profile", { "id": props.id }) : null} style={{ paddingHorizontal: '4%', paddingTop: '6%', flex: 0.7 }}>
                                            <Text style={{ fontSize: windowHeight * 0.024 }}>{props.fname} </Text>
                                            <Text style={{ fontSize: windowHeight * 0.03, fontWeight: '600' }}>{props.lname}</Text>

                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={() => setflip(true)} style={{ flex: 0.3, alignItems: 'center', justifyContent: 'center' }}>
                                            <Text style={{ color: "#00B8FE", fontWeight: '600', fontSize: windowHeight * 0.02 }} >BACK</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                                <View style={{ flex: 1, width: '100%', height: '100%' }}>
                                    <Text style={{ flex: 0.65, fontSize: windowHeight * 0.024, paddingHorizontal: '4%' }}>{props.sport[0].position}</Text>
                                    <View style={{ flex: 0.35, backgroundColor: 'white', borderRadius: 10, opacity: 0.8, justifyContent: 'center', paddingHorizontal: '4%' }}>
                                        <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingBottom: '4%' }}>
                                            <View style={{ flex: 1, alignItems: 'center' }}>
                                                <View>
                                                    <Text style={{ color: 'grey', fontSize: windowHeight * 0.016, marginBottom: '3%' }}>Year</Text>
                                                    <Text style={{ fontSize: windowHeight * 0.02 }}>{props.scholasticyear}</Text>
                                                </View>
                                            </View>
                                            <View style={{ borderRightWidth: 1, borderLeftWidth: 1, borderColor: "lightgrey", flex: 1, alignItems: 'center' }}>
                                                <View>
                                                    <Text style={{ color: 'grey', fontSize: windowHeight * 0.016, marginBottom: '3%' }}>{props.type}</Text>
                                                    <Text numberOfLines={2} style={{ fontSize: windowHeight * 0.02 }}>{props.school}</Text>
                                                </View>
                                            </View>
                                            <View style={{ flex: 1, alignItems: 'center' }}>
                                                <View>
                                                    <Text style={{ color: 'grey', fontSize: windowHeight * 0.016, marginBottom: '3%' }}>State</Text>
                                                    <Text style={{ fontSize: windowHeight * 0.02 }}>{props.state}</Text>
                                                </View>
                                            </View>
                                        </View>
                                        <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', borderTopWidth: 1, borderColor: 'lightgrey', paddingTop: '4%' }}>
                                            <View style={{ flex: 1, alignItems: 'center' }}>
                                                <View>
                                                    <Text style={{ color: 'grey', fontSize: windowHeight * 0.016, marginBottom: '3%' }}>Height</Text>
                                                    <Text style={{ fontSize: windowHeight * 0.02 }}>{props.height}</Text>
                                                </View>
                                            </View>
                                            <View style={{ borderRightWidth: 1, borderLeftWidth: 1, borderColor: "lightgrey", flex: 1, alignItems: 'center' }}>
                                                <View>
                                                    <Text style={{ color: 'grey', fontSize: windowHeight * 0.016, marginBottom: '3%' }}>Weight</Text>
                                                    <Text style={{ fontSize: windowHeight * 0.02 }}>{props.weight}</Text>
                                                </View>
                                            </View>
                                            <View style={{ flex: 1, alignItems: 'center' }}>
                                                <View >
                                                    <Text style={{ color: 'grey', fontSize: windowHeight * 0.016, marginBottom: '3%' }}>GPA</Text>
                                                    <Text style={{ fontSize: windowHeight * 0.02 }}>{props.gpa}</Text>
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
                                            <Text style={{ fontSize: windowHeight * 0.024 }}>{props.fname} </Text>
                                            <Text style={{ fontSize: windowHeight * 0.03, fontWeight: '600' }}>{props.lname}</Text>
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
                                                <Text style={{ color: 'black', fontWeight: '600', fontSize: windowHeight * 0.02 }}>{props.sport[0].sportsname}</Text>
                                                <Text style={{ color: 'grey', fontSize: windowHeight * 0.016, marginTop: '2%' }}>Sport</Text>
                                            </View>
                                            <View style={{ flex: 0.4 }}>
                                                <Text style={{ color: 'black', fontWeight: '600', fontSize: windowHeight * 0.02 }}>{props.sport[0].position}</Text>
                                                <Text style={{ color: 'grey', fontSize: windowHeight * 0.016, marginTop: '2%' }}>Position</Text>
                                            </View>
                                        </View>
                                        <View style={{ display: 'flex', flexDirection: 'row', width: '100%', marginTop: '5%' }}>
                                            <View style={{ flex: 0.6 }}>
                                                <Text style={{ color: 'black', fontWeight: '600', fontSize: windowHeight * 0.02 }}>{props.scholasticyear}</Text>
                                                <Text style={{ color: 'grey', fontSize: windowHeight * 0.016, marginTop: '2%' }}>Year</Text>
                                            </View>
                                            <View style={{ flex: 0.4 }}>
                                                <Text style={{ color: 'black', fontWeight: '600', fontSize: windowHeight * 0.02 }}>{props.school}</Text>
                                                <Text style={{ color: 'grey', fontSize: windowHeight * 0.016, marginTop: '2%' }}>{props.type}</Text>
                                            </View>
                                        </View>
                                        <View style={{ display: 'flex', flexDirection: 'row', width: '100%', marginTop: '5%' }}>
                                            <View style={{ flex: 0.6 }}>
                                                <Text style={{ color: 'black', fontWeight: '600', fontSize: windowHeight * 0.02 }}>{props.state}</Text>
                                                <Text style={{ color: 'grey', fontSize: windowHeight * 0.016, marginTop: '2%' }}>State</Text>
                                            </View>
                                            <View style={{ flex: 0.4 }}>
                                                <Text style={{ color: 'black', fontWeight: '600', fontSize: windowHeight * 0.02 }}>{props.gpa}</Text>
                                                <Text style={{ color: 'grey', fontSize: windowHeight * 0.016, marginTop: '2%' }}>GPA</Text>
                                            </View>
                                        </View>
                                        <View style={{ display: 'flex', flexDirection: 'row', width: '100%', marginTop: '5%' }}>
                                            <View style={{ flex: 0.6 }}>
                                                <Text style={{ color: 'black', fontWeight: '600', fontSize: windowHeight * 0.02 }}>{props.sat}</Text>
                                                <Text style={{ color: 'grey', fontSize: windowHeight * 0.016, marginTop: '2%' }}>SAT</Text>
                                            </View>
                                            <View style={{ flex: 0.4 }}>
                                                <Text style={{ color: 'black', fontWeight: '600', fontSize: windowHeight * 0.02 }}>{props.act}</Text>
                                                <Text style={{ color: 'grey', fontSize: windowHeight * 0.016, marginTop: '2%' }}>ACT</Text>
                                            </View>
                                        </View>
                                        <View style={{ display: 'flex', flexDirection: 'row', width: '100%', marginTop: '5%' }}>
                                            <View style={{ flex: 0.6 }}>
                                                <Text style={{ color: 'black', fontWeight: '600', fontSize: windowHeight * 0.02 }}>{props.gender}</Text>
                                                <Text style={{ color: 'grey', fontSize: windowHeight * 0.016, marginTop: '2%' }}>Gender</Text>
                                            </View>
                                            <View style={{ flex: 0.4 }}>
                                                <Text style={{ color: 'black', fontWeight: '600', fontSize: windowHeight * 0.02 }}>{props.ethnicity}</Text>
                                                <Text style={{ color: 'grey', fontSize: windowHeight * 0.016, marginTop: '2%' }}>Ethnicity</Text>
                                            </View>
                                        </View>
                                        <Text style={{ width: '100%', borderWidth: 0.5, height: 0.5, borderColor: 'lightgrey', marginVertical: '4%' }}></Text>
                                        <View style={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
                                            <View style={{ flex: 1 }}>
                                                <Text style={{ color: 'grey', fontWeight: '400', fontSize: windowHeight * 0.016 }}>Bio</Text>
                                                <Text numberOfLines={4} style={{ color: 'black', fontSize: windowHeight * 0.016, marginTop: '2%', textAlign: 'justify' }}>{props.bio}</Text>
                                            </View>
                                        </View>
                                    </View>
                                </ScrollView>
                            </View>




                        </ImageBackground>
                    </View >
                </View >
            </FlipCard> : null
    )
}

const styles = StyleSheet.create({

})
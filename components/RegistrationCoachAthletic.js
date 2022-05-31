
import { StyleSheet, StatusBar, ImageBackground, ScrollView, ToastAndroid, Text, Dimensions, Platform, View, KeyboardAvoidingView, SafeAreaView, Image, TouchableOpacity, TextInput } from 'react-native'
import { Picker } from '@react-native-picker/picker';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const windowHeight = Dimensions.get("window").height;
export default function RegistrationCoachAthletic({ route, navigation }) {
    const [gender, setGender] = useState();
    const [sportCoach, setSportCoach] = useState();
    const [teamName, setTeamName] = useState();
    const [division, setDivision] = useState();
    const [jobTitle, setJobTitle] = useState();


    const onNext = () => {
        if (!(sportCoach && teamName && division && jobTitle)) {
            ToastAndroid.show("Fill all columns", ToastAndroid.SHORT);
        } else {
            const a = route.params;
            a.sportCoach = sportCoach;
            a.teamName = teamName;
            a.division = division;
            a.jobTitle = jobTitle;
            a.CoachingGender = gender;
            navigation.navigate("RegistrationCoachFinal", a);
        }
    }
    return (
        <ImageBackground source={require('../assets/bg.png')} style={{ backgroundColor: "#004467", width: "100%", height: "100%" }}>
            <ScrollView contentContainerStyle={{ flexGrow: 1 }} style={styles.fullView} showsVerticalScrollIndicator={false}>
                <KeyboardAvoidingView enabled>
                    <StatusBar barStyle="light-content" backgroundColor="#004467" />

                    <View style={{ display: 'flex', width: '100%', height: '100%' }}>
                        <View style={{ paddingHorizontal: '11%', flex: 0.75, justifyContent: 'center' }}>
                            <Text style={styles.text}>What sport do you coach?</Text>
                            <TextInput placeholder='Select Sport' onChangeText={(t) => setSportCoach(t)} style={styles.textbox} />
                            <Text style={styles.text}>What’s your team name?</Text>
                            <TextInput style={styles.textbox} onChangeText={(t) => setTeamName(t)} />

                            <Text style={styles.text}>Do you coach men’s or women’s?</Text>
                            <View style={{ display: "flex", flexDirection: "row", marginTop: "2%", marginBottom: "7%" }}>
                                <TouchableOpacity onPress={() => setGender("Male")} style={gender == "Male" ? styles.activetab : styles.tab}><Image source={require("../assets/maleblack.png")} /><Text >Male</Text></TouchableOpacity>
                                <TouchableOpacity onPress={() => setGender("Female")} style={gender == "Female" ? styles.activetab : styles.tab}><Image source={require("../assets/femaleblack.png")} /><Text>Female</Text></TouchableOpacity>
                            </View>
                            <Text style={styles.text}>What division/league is your team in?</Text>
                            <TextInput style={styles.textbox} onChangeText={(t) => setDivision(t)} />
                            <Text style={styles.text}>What’s your job title?</Text>
                            <TextInput style={styles.textbox} onChangeText={(t) => setJobTitle(t)} />

                        </View>
                        <View style={{ paddingHorizontal: '11%', alignItems: 'center', flex: 0.25 }}>
                            <View style={{ display: 'flex', flexDirection: 'row' }}>
                                <Text style={styles.activedot}></Text>

                                <Text style={styles.activedot}></Text>

                                <Text style={styles.activedot}></Text>

                                <Text style={styles.dot}></Text>
                            </View>
                            <TouchableOpacity onPress={() => onNext()} style={styles.button}><Text style={{ height: '100%', textAlignVertical: 'center', color: 'white', fontWeight: 'bold', fontSize: windowHeight * 0.02 }}>Next</Text></TouchableOpacity>
                        </View>
                    </View>

                </KeyboardAvoidingView>
            </ScrollView>

        </ImageBackground >
    )
}

const styles = StyleSheet.create({
    text: { color: "white", fontSize: windowHeight * 0.02, fontWeight: '700' },
    tab: {
        backgroundColor: "#CBD5DB",
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 20,
        padding: 5,
        paddingHorizontal: 10,
        marginRight: 10
    },
    activetab: {
        backgroundColor: "#00B8FE",
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 20,
        padding: 5,
        paddingHorizontal: 10,
        marginRight: 10
    },
    textbox: { backgroundColor: 'white', width: '100%', height: windowHeight * 0.07, borderRadius: 5, paddingLeft: 10, marginTop: windowHeight * 0.01, marginBottom: windowHeight * 0.025, },
    activedot: {
        height: 15, width: 15, borderWidth: 1, borderColor: "#CCD4D8", borderRadius: 10, marginRight: 4, backgroundColor: "#CCD4D8"
    },
    dot: { height: 15, width: 15, borderWidth: 1, borderColor: "#CCD4D8", borderRadius: 10, marginRight: 4 },
    button: {
        backgroundColor: '#00B8FE',
        width: '100%',
        marginTop: windowHeight * 0.06,
        alignItems: 'center',
        height: windowHeight * 0.07,
        borderRadius: 30

    },
    fullView: {
        width: '100%',
        height: '100%',
    }


})
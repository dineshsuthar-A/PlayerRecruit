
import { StyleSheet, StatusBar, ImageBackground, ScrollView, ToastAndroid, Text, ActivityIndicator, Platform, View, KeyboardAvoidingView, SafeAreaView, Image, TouchableOpacity, TextInput } from 'react-native'
import { Picker } from '@react-native-picker/picker';
import React, { useState, useEffect } from 'react';
export default function RegistrationCoachAcademic({ route, navigation }) {

    const [collegename, setCollegename] = useState();
    const [collegeState, setCollegeState] = useState();
    const [email, setEmail] = useState();

    const onNext = () => {
        if (!(collegeState && collegeState && email)) {
            ToastAndroid.show("Fill all columns", ToastAndroid.SHORT);
        } else {
            const a = route.params;
            a.collegename = collegename;
            a.collegeState = collegeState;
            a.email = email;

            navigation.navigate("RegistrationCoachAthletic", {
                a
            });

        }
    }
    return (
        <ImageBackground source={require('../assets/bg.png')} style={{ backgroundColor: "#004467", width: "100%", height: "100%" }}>
            <ScrollView contentContainerStyle={{ flexGrow: 1 }} style={styles.fullView} keyboardShouldPersistTaps="handled" contentInsetAdjustmentBehavior='automatic'
                showsVerticalScrollIndicator={false}>
                <KeyboardAvoidingView enabled>
                    <StatusBar barStyle="light-content" backgroundColor="#004467" />
                    <View style={{ display: 'flex', width: '100%', height: '100%', }}>
                        <View style={{ flex: 0.85, alignItems: 'center', paddingHorizontal: '11%', marginTop: '10%' }}>
                            <TextInput placeholder='College Name' onChangeText={(t) => setCollegename(t)} style={styles.textbox} />
                            <TextInput placeholder='College State' onChangeText={(t) => setCollegeState(t)} style={styles.textbox} />
                            <View style={{ display: "flex", flexDirection: 'row', justifyContent: "center", alignContent: "center", marginTop: "6%", width: '100%' }}>
                                <TextInput onChangeText={(t) => setEmail(t)} placeholder='University Email' style={styles.textBoxMail} />
                                <View style={{ backgroundColor: "white", justifyContent: "center", width: '10%', height: 50, borderBottomRightRadius: 5, borderTopRightRadius: 5 }}><Image source={require("../assets/checkIcon.png")} style={{ width: 20, height: 20 }} /></View>
                            </View>
                        </View>

                        <View style={{ flex: 0.15, paddingHorizontal: '11%', alignItems: 'center', justifyContent: 'center' }}>
                            <View style={{ display: 'flex', flexDirection: 'row', }}>
                                <Text style={styles.activedot}></Text>
                                <Text style={styles.activedot}></Text>
                                <Text style={styles.dot}></Text>
                                <Text style={styles.dot}></Text>
                            </View>
                            <TouchableOpacity onPress={() => onNext()} style={styles.button}><Text style={{ height: '100%', textAlignVertical: 'center', color: 'white', fontWeight: 'bold' }}>Next</Text></TouchableOpacity>
                        </View>

                    </View>

                </KeyboardAvoidingView>
            </ScrollView>

        </ImageBackground >
    )
}

const styles = StyleSheet.create({
    textbox: { backgroundColor: 'white', width: '100%', height: 50, borderRadius: 5, paddingLeft: 10, marginTop: '6%' },
    textBoxMail: { backgroundColor: 'white', width: '90%', height: 50, borderBottomLeftRadius: 5, paddingLeft: 10, borderTopLeftRadius: 5, },

    activedot: {
        height: 15, width: 15, borderWidth: 1, borderColor: "#CCD4D8", borderRadius: 10, marginRight: 4, backgroundColor: "#CCD4D8"
    },
    dot: { height: 15, width: 15, borderWidth: 1, borderColor: "#CCD4D8", borderRadius: 10, marginRight: 4 },
    button: {
        backgroundColor: '#00B8FE',
        width: '100%',
        marginTop: "10%",
        alignItems: 'center',
        height: 50,
        borderRadius: 30
    },
    fullView: {
        width: '100%',
        height: '100%',
    }

})
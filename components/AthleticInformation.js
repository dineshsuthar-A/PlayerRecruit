import { StyleSheet, StatusBar, ImageBackground, ScrollView, Text, ActivityIndicator, Platform, View, KeyboardAvoidingView, SafeAreaView, Image, TouchableOpacity, TextInput } from 'react-native'
import { Picker } from '@react-native-picker/picker';
import React, { useState, useEffect } from 'react';

export default function AthleticInformation({ navigation }) {
    return (<ImageBackground source={require('../assets/bg.png')} style={{ backgroundColor: "#004E75", width: "100%", height: "100%" }}>
        <ScrollView style={styles.fullView} keyboardShouldPersistTaps="handled" contentInsetAdjustmentBehavior='automatic'
            showsVerticalScrollIndicator={false}>
            <KeyboardAvoidingView enabled>
                <StatusBar barStyle="light-content" backgroundColor="#004E75" />
                <Text style={{ marginLeft: 40, color: "white", fontWeight: "bold", fontSize: 16, fontFamily: "Roboto" }}>Which type of school do you attend?</Text>
                <View style={{ display: "flex", flexDirection: "row", marginLeft: 40, marginTop: 10 }}>
                    <View style={{ backgroundColor: "#CBD5DB", display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center", borderRadius: 20, padding: 5, paddingHorizontal: 10, marginRight: 10 }}><Image source={require("../assets/schoolblack.png")} /><Text > Highschool</Text></View>
                    <View style={{ backgroundColor: "#CBD5DB", display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center", borderRadius: 20, padding: 5, paddingHorizontal: 10, marginRight: 10 }}><Image source={require("../assets/schoolblack.png")} /><Text> College</Text></View>
                </View>
                <View style={styles.main}>
                    <TextInput placeholder='School/College name' style={styles.textBox} />
                    <TextInput placeholder='Scholastic year' style={styles.textBox} />
                    <TextInput placeholder='GPA' style={styles.textBox} />


                    <TextInput placeholder='SAT' style={styles.textBox} />
                    <TextInput placeholder='ACT' style={styles.textBox} />

                    <View style={{ display: 'flex', flexDirection: 'row', marginTop: 80 }}>
                        <Text style={{ height: 20, width: 20, borderWidth: 1, borderColor: "#CCD4D8", borderRadius: 10, marginRight: 4, backgroundColor: "#CCD4D8" }}></Text>

                        <Text style={{ height: 20, width: 20, borderWidth: 1, borderColor: "#CCD4D8", borderRadius: 10, marginRight: 4, backgroundColor: "#CCD4D8" }}></Text>

                        <Text style={{ height: 20, width: 20, borderWidth: 1, borderColor: "#CCD4D8", borderRadius: 10, marginRight: 4 }}></Text>

                        <Text style={{ height: 20, width: 20, borderWidth: 1, borderColor: "#CCD4D8", borderRadius: 10, marginRight: 4 }}></Text>
                    </View>
                    <TouchableOpacity style={styles.button}><Text style={{ height: '100%', textAlignVertical: 'center', color: 'white', fontWeight: 'bold' }}>Next</Text></TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        </ScrollView>

    </ImageBackground >
    )
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#00B8FE',
        width: '100%',
        marginTop: 20,
        alignItems: 'center',
        height: 50,
        borderRadius: 30

    },
    logo: {
        width: 150,
        height: 150,
        marginTop: 20
    },
    textBox: {
        backgroundColor: "white",
        marginTop: 15,
        color: "black",
        width: "100%",
        height: 50,
        borderRadius: 5,
        paddingLeft: 20,
        padding: 10
    },
    pickerbox: {
        marginTop: 15,
        backgroundColor: 'white',
        width: '100%',
        borderRadius: 20
    },
    main: {
        display: "flex",
        marginLeft: 40,
        marginRight: 40,
        justifyContent: "center",
        alignItems: "center"
    },
    headerBack: {
        height: 40,
        width: 40,
        marginLeft: 20,
        marginRight: 20
    },
    header: {
        display: "flex",
        justifyContent: "center",
        marginBottom: 10,
        flexDirection: "row",
        alignItems: "center",
        paddingTop: 0
    },
    headTitle: {
        color: "white",
        fontWeight: '900',
        fontFamily: "Roboto",
        fontSize: 20
    },
    fullView: {
        paddingTop: 20,
        width: '100%',
        height: '100%'
    },
})
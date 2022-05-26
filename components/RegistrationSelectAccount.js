import { StyleSheet, StatusBar, ImageBackground, ScrollView, Text, ToastAndroid, Platform, View, KeyboardAvoidingView, SafeAreaView, Image, TouchableOpacity, TextInput } from 'react-native'
import React, { useState } from 'react';


export default function RegistrationSelectAccount({ navigation }) {

    return (

        <ImageBackground source={require('../assets/bg.png')} style={{ width: "100%", height: "100%" }}>
            <StatusBar barStyle="light-content" backgroundColor="#004467" />
            <View style={styles.body}>
                <View style={styles.header}>
                    <Text style={styles.headTitle}>Select Account Type</Text>
                </View>
                <View style={{ flex: 0.9, width: '100%', alignItems: 'center' }}>
                    <Image source={require('../assets/logo.png')} style={styles.logo} />
                    <Text style={{ color: "white", fontFamily: "Roboto", marginTop: "11%", fontWeight: "bold", fontSize: 20, marginBottom: "1%" }}>Welcome,</Text>
                    <Text style={{ color: "white", fontFamily: "Roboto", fontWeight: "700", fontSize: 19, textAlign: "center" }}>Select the account registration type</Text>

                    <View style={{ width: '100%', paddingHorizontal: '11%', paddingVertical: '5%' }}>
                        <TouchableOpacity onPress={() => navigation.navigate("RegistrationStudentInfo")} style={styles.button}><Text style={{ height: '100%', textAlignVertical: 'center', color: 'white', fontWeight: 'bold' }}>Student Athelete</Text></TouchableOpacity>
                        <TouchableOpacity onPress={() => navigation.navigate("RegistrationCoachInfo")} style={styles.button}><Text style={{ height: '100%', textAlignVertical: 'center', color: 'white', fontWeight: 'bold' }}>College Coach</Text></TouchableOpacity>
                    </View>

                </View>

                <View style={{ flex: 0.1 }}>
                    <Text style={{ color: "white", fontWeight: "500" }}>Already have an account? <Text style={{ color: "#00B8FE", fontWeight: '500', textAlignVertical: "center" }} onPress={() => navigation.navigate("Login")} >Signin</Text></Text>
                </View>

            </View>
        </ImageBackground >
    )
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#00B8FE',
        width: '100%',
        alignItems: 'center',
        height: 50,
        borderRadius: 30,
        marginTop: "5%"

    },
    logo: {
        marginTop: "4%",
        height: 150,
        width: 150
    },
    body: { width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' },
    header: {
        padding: '3%'

    },
    headTitle: {
        color: "white",
        fontWeight: '900',
        fontFamily: "Roboto",
        fontSize: 20
    },
})
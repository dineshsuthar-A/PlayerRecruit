import { StyleSheet, StatusBar, ImageBackground, ScrollView, Text, ToastAndroid, Platform, View, KeyboardAvoidingView, SafeAreaView, Image, TouchableOpacity, TextInput } from 'react-native'
import React, { useState } from 'react';


export default function SelectAccount({ navigation }) {

    return (

        <ImageBackground source={require('../assets/bg.png')} style={{ width: "100%", height: "100%" }}>

            <ScrollView style={styles.fullView} keyboardShouldPersistTaps="handled"
                showsVerticalScrollIndicator={false}>

                <StatusBar barStyle="light-content" backgroundColor="#004E75" />
                <KeyboardAvoidingView enabled>
                    <View style={styles.header}>
                        <TouchableOpacity onPress={() => navigation.navigate("Verification")}><Image source={require('../assets/back_arrow.png')} style={styles.headerBack} /></TouchableOpacity>
                        <Text style={styles.headTitle}>Select Account Type</Text>
                    </View>
                    <View style={styles.main}>
                        <Image source={require('../assets/logo.png')} style={styles.logo} />
                        <Text style={{ color: "white", fontFamily: "Roboto", marginTop: 30, fontWeight: "bold", fontSize: 20, marginBottom: 5 }}>Welcome,</Text>
                    </View>
                    <Text style={{ color: "white", fontFamily: "Roboto", fontWeight: "700", fontSize: 20, textAlign: "center" }}>Select the account registration type</Text>
                    <View style={{
                        marginTop: 30,
                        display: "flex",
                        marginLeft: 40,
                        marginRight: 40,
                        justifyContent: "center",
                        alignItems: "center"
                    }}>
                        <TouchableOpacity style={styles.button}><Text style={{ height: '100%', textAlignVertical: 'center', color: 'white', fontWeight: 'bold' }}>Student Athelete</Text></TouchableOpacity>
                        <TouchableOpacity style={styles.button}><Text style={{ height: '100%', textAlignVertical: 'center', color: 'white', fontWeight: 'bold' }}>College Coach</Text></TouchableOpacity>
                        <Text style={{ marginTop: 150, color: "white", fontWeight: "500" }}>Already have an account? <Text style={{ color: "#00B8FE", fontWeight: '500', textAlignVertical: "center" }} >Signin</Text></Text>
                    </View>
                </KeyboardAvoidingView>
            </ScrollView>
        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#00B8FE',
        width: '100%',
        marginTop: 30,
        alignItems: 'center',
        height: 50,
        borderRadius: 30,
        marginTop: 20

    },
    logo: {
        width: 150,
        height: 150,
        marginTop: 20,
    },
    textBox: {
        backgroundColor: "white",
        color: "black",
        height: 50,
        width: 50,
        borderRadius: 2,
        textAlign: "center",
        fontSize: 20,
        fontWeight: "bold"
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
        flexDirection: "row",
        alignItems: "center",

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
        height: '100%',
        paddingBottom: 20
    },
})
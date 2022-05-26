import { StyleSheet, StatusBar, ImageBackground, ScrollView, Text, ActivityIndicator, ToastAndroid, Platform, View, KeyboardAvoidingView, SafeAreaView, Image, TouchableOpacity, TextInput } from 'react-native'
import React, { useState, useEffect } from 'react';
import axios from 'axios';

import * as SecureStore from 'expo-secure-store';

export default function Registration({ navigation }) {
    const [name, setName] = useState("");
    const [pass, setPass] = useState("");
    const [rpass, setRpass] = useState("");
    const [phone, setPhone] = useState("");
    const [st, setst] = useState(false);

    const RegisterPress = async () => {


        if (!(name && pass && rpass && phone)) {
            ToastAndroid.show("Fill the columns", ToastAndroid.SHORT);
        } else if (pass != rpass) {
            ToastAndroid.show("Password doesn't matched! Retry", ToastAndroid.SHORT);
        } else if (phone.length != 10) {
            ToastAndroid.show("Enter valid Phone Number", ToastAndroid.SHORT);
        } else if (pass.length < 6) {
            ToastAndroid.show("Password length should be more than 6", ToastAndroid.SHORT);
        } else {
            setst(true);
            axios.post("auth/signup/", {
                data: {
                    username: name,
                    password: pass,
                    account_phone: phone
                }
            }).then(async (response) => {
                setst(false);
                await SecureStore.setItemAsync("phone", phone);
                await SecureStore.setItemAsync("pass", pass);
                await SecureStore.setItemAsync("name", name);
                navigation.navigate("Verification");
            }).catch((err) => {
                setst(false);
                console.log(err);
            })
        }
    }


    return (

        <ImageBackground source={require('../assets/bg.png')} style={{ backgroundColor: "#004467", width: "100%", height: "100%" }}>
            <StatusBar barStyle="light-content" backgroundColor="#004467" />
            <ScrollView contentContainerStyle={{ flexGrow: 1 }} style={styles.fullView} keyboardShouldPersistTaps="handled" contentInsetAdjustmentBehavior='automatic'
                showsVerticalScrollIndicator={false}>
                <KeyboardAvoidingView enabled>
                    <ActivityIndicator size="large" animating={st} color="#00ff00" style={{ position: "absolute", top: '50%', left: '45%', zIndex: 10 }} />
                    <View style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center' }}>
                        <View style={styles.header}>
                            <Text style={styles.headTitle}>User Registration</Text>
                        </View>
                        <View style={styles.main}>
                            <View style={{ flex: 0.2, alignItems: 'center' }}>
                                <Image source={require('../assets/logo.png')} style={styles.logo} />
                                <Text style={{ color: "white", fontFamily: "Roboto", fontWeight: "900", fontSize: 20, marginBottom: '3%' }}>Register User</Text>
                            </View>
                            <View style={{ flex: 0.5, alignItems: 'center', paddingHorizontal: '11%', width: '100%', }}>
                                <TextInput onChangeText={(t) => setName(t)} placeholder='Username' style={styles.textBox} />
                                <TextInput onChangeText={(t) => setPass(t)} placeholder='Password' secureTextEntry={true} style={styles.textBox} />
                                <TextInput onChangeText={(t) => setRpass(t)} placeholder='Retype Password' secureTextEntry={true} style={styles.textBox} />
                                <TextInput onChangeText={(t) => setPhone(t)} placeholder='Phone Number' maxLength={10} keyboardType="number-pad" style={styles.textBox} />
                            </View>
                        </View>
                        <View style={{ flex: 0.4, width: '100%', paddingHorizontal: '11%', alignItems: 'center' }}>
                            <TouchableOpacity onPress={() => RegisterPress()} style={styles.button}><Text style={{ height: '100%', textAlignVertical: 'center', color: 'white', fontWeight: 'bold' }}>Register</Text></TouchableOpacity>
                            <Text style={{ color: "white", fontWeight: "500", marginTop: '12%' }}>Already have an account? <Text onPress={() => navigation.navigate("Login")} style={{ color: "#00B8FE", fontWeight: '500', textAlignVertical: "center" }} >Signin</Text></Text>
                        </View>
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
        alignItems: 'center',
        height: 50,
        borderRadius: 30,

    },
    logo: {
        width: 150,
        height: 150,
        marginBottom: '8%'
    },
    textBox: {
        backgroundColor: "white",
        color: "black",
        width: "100%",
        height: 50,
        borderRadius: 5,
        paddingLeft: 20,
        padding: 10,
        marginBottom: '6%'
    },
    main: {
        flex: 0.4,
        marginLeft: "11%",
        marginRight: "11%",
        alignItems: "center",
        width: '100%',
        justifyContent: 'flex-end'
    },
    header: {
        flex: 0.1,
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
        paddingTop: "2%",
        width: '100%',
        height: '100%'
    },
})
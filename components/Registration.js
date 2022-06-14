import { StyleSheet, StatusBar, ImageBackground, ScrollView, Text, ActivityIndicator, ToastAndroid, Dimensions, View, KeyboardAvoidingView, SafeAreaView, Image, TouchableOpacity, TextInput } from 'react-native'
import React, { useState, useEffect } from 'react';
import axios from 'axios';
var validator = require('validator');
import * as SecureStore from 'expo-secure-store';
import isAlpha from 'validator/lib/isAlpha';
import isAlphanumeric from 'validator/lib/isAlphanumeric';
const windowHeight = Dimensions.get("window").height;


export default function Registration({ navigation }) {
    const [name, setName] = useState("");
    const [pass, setPass] = useState("");
    const [rpass, setRpass] = useState("");
    const [phone, setPhone] = useState("");
    const [st, setst] = useState(false);

    const phonenumber = (inputtxt) => {
        var phoneno = /^\d{10}$/;
        if (((inputtxt).match(phoneno))) {
            return true;
        }
        else {
            return false;
        }
    }
    const RegisterPress = async () => {


        if (!(name && pass && rpass && phone)) {
            ToastAndroid.show("Fill the columns", ToastAndroid.SHORT);
        } else if (pass.length < 6) {
            ToastAndroid.show("Password length should be more than 6", ToastAndroid.SHORT);
        } else if (!(validator.isEmail(rpass))) {

            ToastAndroid.show("Enter valid mail id.", ToastAndroid.SHORT);
        } else if (!phonenumber(phone)) {
            ToastAndroid.show("Enter correct phone number", ToastAndroid.SHORT);
        }
        else {
            setst(true);
            axios.post("/api/register", {

                "username": name.trim(),
                "email": rpass,
                "phone": phone,
                "password": pass

            }).then(async (response) => {
                setst(false);
                await SecureStore.setItemAsync("email", rpass);
                await SecureStore.setItemAsync("phone", phone);
                await SecureStore.setItemAsync("password", pass);
                await SecureStore.setItemAsync("name", name);
                ToastAndroid.show(response.data.otp.toString(), ToastAndroid.SHORT);
                navigation.navigate("Verification");
            }).catch((err) => {
                setst(false);
                ToastAndroid.show(err.response.data.error, ToastAndroid.SHORT);
            })
        }
    }

    return (

        <ImageBackground source={require('../assets/bg.png')} style={{ backgroundColor: "#004467", width: "100%", height: "100%" }}>
            <StatusBar barStyle="light-content" backgroundColor="#004467" />
            <ScrollView contentContainerStyle={{ flexGrow: 1 }} style={styles.fullView}
                showsVerticalScrollIndicator={false}>
                <ActivityIndicator size="large" animating={st} color="#004467" style={{ position: "absolute", top: '50%', left: '45%', zIndex: 10 }} />
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
                            <TextInput selectionColor={"#004467"} value={name} onChangeText={(e) => setName(e)} autoCapitalize="none" placeholder='Username' style={styles.textBox} />
                            <TextInput selectionColor={"#004467"} onChangeText={(t) => setRpass(t)} placeholder='Email' style={styles.textBox} />
                            <TextInput selectionColor={"#004467"} onChangeText={(t) => setPhone(t)} placeholder='Phone Number' maxLength={10} keyboardType="number-pad" style={styles.textBox} />
                            <TextInput selectionColor={"#004467"} onChangeText={(t) => setPass(t)} placeholder='Password' secureTextEntry={true} style={styles.textBox} />
                        </View>
                    </View>
                    <View style={{ flex: 0.4, width: '100%', paddingHorizontal: '11%', alignItems: 'center' }}>
                        <TouchableOpacity onPress={() => RegisterPress()} style={styles.button}><Text style={{ height: '100%', textAlignVertical: 'center', color: 'white', fontWeight: 'bold' }}>Register</Text></TouchableOpacity>
                        <Text style={{ color: "white", fontWeight: "500", marginTop: '12%' }}>Already have an account? <Text onPress={() => navigation.navigate("Login")} style={{ color: "#00B8FE", fontWeight: '500', textAlignVertical: "center" }} >Signin</Text></Text>
                    </View>
                </View>
            </ScrollView>

        </ImageBackground >
    )
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#00B8FE',
        width: '100%',
        alignItems: 'center',
        height: windowHeight * 0.07,
        borderRadius: 30,

    },
    logo: {
        width: windowHeight * 0.2,
        height: windowHeight * 0.2,
        marginBottom: '8%'
    },
    textBox: {
        backgroundColor: "white",
        color: "black",
        width: "100%",
        height: windowHeight * 0.07,
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
        fontSize: windowHeight * 0.03
    },
    fullView: {
        paddingTop: "2%",
        width: '100%',
        height: '100%'
    },
})
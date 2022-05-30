import { StyleSheet, StatusBar, ScrollView, ImageBackground, ActivityIndicator, Text, ToastAndroid, Platform, View, KeyboardAvoidingView, SafeAreaView, Image, TouchableOpacity, TextInput } from 'react-native'
import React, { useState, useRef } from 'react';
import axios from 'axios';
import * as SecureStore from 'expo-secure-store';
export default function Verification({ navigation }) {
    const [code1, setCode1] = useState();
    const [code2, setCode2] = useState();
    const [code3, setCode3] = useState();
    const [code4, setCode4] = useState();
    const [st, setst] = useState(false);
    const ref_input1 = useRef();
    const ref_input2 = useRef();
    const ref_input3 = useRef();
    const ref_input4 = useRef();

    const verify = async () => {
        if (!(code1 && code2 && code3 && code4)) {
            ToastAndroid.show("Enter verification code first.", ToastAndroid.SHORT);
        } else {
            setst(true);
            const code = code1 + code2 + code3 + code4;
            const email = await SecureStore.getItemAsync("email");
            axios.post("/api/verify", {
                "email": email,
                "otp": parseInt(code)
            }).then(async (response) => {
                await SecureStore.setItemAsync("token", response.data.access_token);
                setst(false);
                ToastAndroid.show("Successfully verified", ToastAndroid.SHORT);
                navigation.reset({
                    index: 0,
                    routes: [{ name: "RegistrationSelectAccount" }]
                });
            }).catch((ERR) => {
                ToastAndroid.show(ERR.response.data.error, ToastAndroid.SHORT);
                setst(false);
            });
        }
    }
    const Resend = async () => {

        setst(true);
        const phone = await SecureStore.getItemAsync("phone");
        const pass = await SecureStore.getItemAsync("pass");
        const email = await SecureStore.getItemAsync("email");
        const name = await SecureStore.getItemAsync("name");
        axios.post("api/register", {
            "username": name,
            "email": email,
            "phone": phone,
            "password": pass

        }).then((response) => {
            setst(false);
            ToastAndroid.show(response.data.otp.toString(), ToastAndroid.SHORT);

        }).catch((err) => {
            setst(false);
            ToastAndroid.show(err.response.data.error, ToastAndroid.SHORT);
            console.log(err);
        })
    }

    const change = async (t, n) => {
        if (n == 0) {
            if (t.key == "Backspace") {
                setCode1();
            } else {
                setCode1(t.key);
                ref_input2.current.focus();
            }
        } else if (n == 1) {
            if (t.key == "Backspace") {
                setCode2();
                ref_input1.current.focus();
            } else {
                setCode2(t.key);
                ref_input3.current.focus();
            }
        } else if (n == 2) {
            if (t.key == "Backspace") {
                setCode3();
                ref_input2.current.focus();
            } else {
                setCode3(t.key)
                ref_input4.current.focus();
            }
        } else {
            if (t.key == "Backspace") {
                setCode4();
                ref_input3.current.focus();
            } else
                setCode4(t.key);
        }
    }


    return (

        <ImageBackground source={require('../assets/bg.png')} style={{ width: "100%", height: "100%" }}>

            <ScrollView contentContainerStyle={{ flexGrow: 1 }} style={styles.fullView} keyboardShouldPersistTaps="handled"
                showsVerticalScrollIndicator={false}>

                <StatusBar barStyle="light-content" backgroundColor="#004467" />
                <KeyboardAvoidingView enabled>

                    <ActivityIndicator size="large" animating={st} color="#00ff00" style={{ position: "absolute", top: '50%', left: '45%', zIndex: 10 }} />
                    <View style={{ width: '100%', height: '100%', display: 'flex', flex: 1 }}>
                        <View style={styles.header}>
                            <TouchableOpacity onPress={() => navigation.navigate("Registration")}><Image source={require('../assets/back_arrow.png')} style={styles.headerBack} /></TouchableOpacity>
                            <Text style={styles.headTitle}>User Registration</Text>
                        </View>
                        <View style={styles.main}>
                            <Image source={require('../assets/logo.png')} style={styles.logo} />
                            <Text style={{ color: "white", fontFamily: "Roboto", marginTop: "12%", fontWeight: "900", fontSize: 20, marginBottom: "5%" }}>Verification Code</Text>
                            <View style={{ display: "flex", flexDirection: 'row', justifyContent: "space-around", width: "100%" }}>
                                <TextInput value={code1} ref={ref_input1} style={styles.textBox} autoFocus={true} onKeyPress={({ nativeEvent }) => change(nativeEvent, 0)} maxLength={1} keyboardType="number-pad" key='1' />
                                <TextInput value={code2} style={styles.textBox} onKeyPress={({ nativeEvent }) => change(nativeEvent, 1)} ref={ref_input2} maxLength={1} keyboardType="number-pad" key='2' />
                                <TextInput value={code3} onKeyPress={({ nativeEvent }) => change(nativeEvent, 2)} style={styles.textBox} maxLength={1}
                                    ref={ref_input3} keyboardType="number-pad" key='3' />
                                <TextInput value={code4} onKeyPress={({ nativeEvent }) => change(nativeEvent, 3)} style={styles.textBox} ref={ref_input4} onSubmitEditing={() => verify()} maxLength={1} keyboardType="number-pad" key='4' />
                            </View>
                            <TouchableOpacity onPress={() => Resend()} ><Text style={{ color: "#00B8FE", marginTop: "11%" }}>Resend Verification</Text></TouchableOpacity>
                        </View>
                        <View style={{ flex: 0.5, justifyContent: 'flex-start', paddingHorizontal: '11%' }}>
                            <TouchableOpacity onPress={() => verify()} style={styles.button}><Text style={{ height: '100%', textAlignVertical: 'center', color: 'white', fontWeight: 'bold' }}>Submit</Text></TouchableOpacity>
                        </View>
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
        alignItems: 'center',
        height: 50,
        borderRadius: 30,
        marginTop: "60%"

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
        flex: 0.8,
        marginLeft: "11%",
        marginRight: "11%",
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
        flex: 0.2
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
    },
})
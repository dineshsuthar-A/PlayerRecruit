import { StyleSheet, ScrollView, ActivityIndicator, Text, ToastAndroid, Platform, View, KeyboardAvoidingView, SafeAreaView, Image, TouchableOpacity, TextInput } from 'react-native'
import React, { useState, useRef } from 'react';
import axios from 'axios';
import * as SecureStore from 'expo-secure-store';
export default function Verification({ navigation }) {
    const [code1, setCode1] = useState();
    const [code2, setCode2] = useState();
    const [code3, setCode3] = useState();
    const [code4, setCode4] = useState();
    const [st, setst] = useState(false);
    const ref_input2 = useRef();
    const ref_input3 = useRef();
    const ref_input4 = useRef();

    const verify = async () => {
        setst(true);
        const code = code1 + code2 + code3 + code4;
        const phone = await SecureStore.getItemAsync("phone");
        console.log(phone);
        axios.post("/auth/verify/phone", {
            data: {
                account_phone: phone,
                sms_challenge: code
            }
        }).then((response) => {
            console.log(response);
            setst(false);
            ToastAndroid.show("Successfully verified", ToastAndroid.SHORT);
            navigation.navigate("SelectAccount")
        }).catch((ERR) => {
            console.log(ERR);
            setst(false);
        });
    }
    const Resend = async () => {

        setst(true);
        const phone = await SecureStore.getItemAsync("phone");
        const pass = await SecureStore.getItemAsync("pass");
        const name = await SecureStore.getItemAsync("name");
        axios.post("auth/signup/", {
            username: name,
            password: pass,
            account_phone: phone

        }).then((response) => {
            setst(false);
            ToastAndroid.show("Verification code sent", ToastAndroid.SHORT);

        }).catch((err) => {
            setst(false);
            console.log(err);
        })
    }

    const change = (t, n) => {
        if (n == 0) {
            setCode1(t);
            ref_input2.current.focus();
        } else if (n == 1) {
            ref_input3.current.focus();
            setCode2(t);
        } else if (n == 2) {
            setCode3(t);
            ref_input4.current.focus();
        } else {
            setCode4(t);
        }
    }


    return (

        <ScrollView style={styles.fullView} keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}>

            <StatusBar barStyle="light-content" backgroundColor="#004E75" />
            <KeyboardAvoidingView enabled>

                <ActivityIndicator size="large" animating={st} color="#00ff00" style={{ position: "absolute", top: '50%', left: '45%', zIndex: 10 }} />
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.navigate("Registration")}><Image source={require('../assets/back_arrow.png')} style={styles.headerBack} /></TouchableOpacity>
                    <Text style={styles.headTitle}>User Registration</Text>
                </View>
                <View style={styles.main}>
                    <Image source={require('../assets/logo.png')} style={styles.logo} />
                    <Text style={{ color: "white", fontFamily: "Roboto", marginTop: 30, fontWeight: "900", fontSize: 20, marginBottom: 15 }}>Verification Code</Text>
                    <View style={{ display: "flex", flexDirection: 'row', justifyContent: "space-around", width: "100%" }}>
                        <TextInput style={styles.textBox} autoFocus={true} onChangeText={(t) => change(t, 0)} maxLength={1} keyboardType="number-pad" key='1' />
                        <TextInput style={styles.textBox} onChangeText={(t) => change(t, 1)}
                            ref={ref_input2} maxLength={1} keyboardType="number-pad" key='2' />
                        <TextInput style={styles.textBox} maxLength={1}
                            ref={ref_input3} onChangeText={(t) => change(t, 2)} keyboardType="number-pad" key='3' />
                        <TextInput style={styles.textBox} ref={ref_input4} onChangeText={(t) => change(t, 3)} maxLength={1} keyboardType="number-pad" key='4' />
                    </View>
                    <TouchableOpacity onPress={() => Resend()} ><Text style={{ color: "#00B8FE", marginTop: 30 }}>Resend Verification</Text></TouchableOpacity>
                    <TouchableOpacity onPress={() => verify()} style={styles.button}><Text style={{ height: '100%', textAlignVertical: 'center', color: 'white', fontWeight: 'bold' }}>Submit</Text></TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        </ScrollView>
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
        marginTop: 180

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
        paddingTop: 20
    },
    headTitle: {
        color: "white",
        fontWeight: '900',
        fontFamily: "Roboto",
        fontSize: 20
    },
    fullView: {
        paddingTop: 20,
        backgroundColor: '#004E75',
        width: '100%',
        height: '100%',
        paddingBottom: 20
    },
})
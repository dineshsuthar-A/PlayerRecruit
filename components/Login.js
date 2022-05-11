import { StyleSheet, StatusBar, ScrollView, ImageBackground, ActivityIndicator, Text, ToastAndroid, Platform, View, KeyboardAvoidingView, SafeAreaView, Image, TouchableOpacity, TextInput } from 'react-native';
import React, { useState, useRef } from 'react';
import axios from 'axios';
export default function Login({ navigation }) {
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    const [st, setSt] = useState(false);

    const login = () => {
        if (!(username && password)) {
            ToastAndroid.show("Fill the columns", ToastAndroid.SHORT);
        } else if (password.length < 6) {
            ToastAndroid.show("Password length should be more than 6.");
        } else {

            setSt(true);
            axios.post("/auth/login/", {
                username, password
            }).then((response) => {
                setSt(false);
                console.log(response);
                ToastAndroid.show("Logged In", ToastAndroid.SHORT);
            }).catch((err) => {
                setSt(false);
                console.log(err);
                ToastAndroid.show("Failed", ToastAndroid.SHORT);
            })
        }
    }
    return (

        <ImageBackground source={require('../assets/bg.png')} style={{ width: "100%", height: "100%" }}>
            <ScrollView style={styles.fullView} keyboardShouldPersistTaps="handled"
                showsVerticalScrollIndicator={false}>
                <KeyboardAvoidingView enabled>
                    <StatusBar barStyle="light-content" backgroundColor="#004E75" />
                    <ActivityIndicator size="large" animating={st} color="#00ff00" style={{ position: "absolute", top: '50%', left: '45%', zIndex: 10 }} />
                    <View style={styles.header}>
                        <TouchableOpacity onPress={() => navigation.navigate("Registration")}><Image source={require('../assets/back_arrow.png')} style={styles.headerBack} /></TouchableOpacity>
                        <Text style={styles.headTitle}>User Login</Text>
                    </View>
                    <View style={styles.main}>
                        <Image source={require('../assets/logo.png')} style={styles.logo} />
                        <Text style={{ color: "white", fontFamily: "Roboto", marginTop: 30, fontWeight: "900", fontSize: 20 }}>Login with your account info</Text>
                        <TextInput onChangeText={(t) => setUsername(t)} placeholder='Username' style={styles.textBox} />
                        <TextInput onSubmitEditing={() => login()} onChangeText={(t) => setPassword(t)} placeholder='Password' secureTextEntry={true} style={styles.textBox} />
                        <TouchableOpacity  ><Text style={{ color: "#00B8FE", marginTop: 10 }}>Forgot account info?</Text></TouchableOpacity>
                        <TouchableOpacity onPress={() => login()} style={styles.button}><Text style={{ height: '100%', textAlignVertical: 'center', color: 'white', fontWeight: 'bold' }}>Login</Text></TouchableOpacity>
                        <Text style={{ marginTop: 30, color: "white", fontWeight: "500" }}>Don't have an account? <Text style={{ color: "#00B8FE", fontWeight: '500', textAlignVertical: "center" }} onPress={() => navigation.navigate("Registration")}> Register</Text></Text>
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
        marginTop: 130,
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
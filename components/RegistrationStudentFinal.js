import { StyleSheet, Text, View, ImageBackground, ToastAndroid, ScrollView, StatusBar, KeyboardAvoidingView, TouchableOpacity, Image, TextInput } from 'react-native';
import React, { useState, useEffect } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { Platform } from 'expo-modules-core';


export default function RegistrationStudentFinal({ route, navigation }) {
    const [bio, setBio] = useState();
    const [image, setImage] = useState(null);

    const pickImage = async () => {
        // No permissions request is necessary for launching the image library

        if (Platform.OS !== 'web') {
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        }

        let result = await ImagePicker.launchImageLibraryAsync({

            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 4],
            quality: 1,
        });
        if (!result.cancelled) {
            setImage(result.uri);
        }
    }
    const onFinish = () => {
        if (image == null) {
            ToastAndroid.show("Select Profile Photo", ToastAndroid.SHORT);
        } else if (!bio) {
            ToastAndroid.show("Enter Bio", ToastAndroid.SHORT);
        } else {
            const object = route.params;

        }


    }

    return (
        <ImageBackground source={require('../assets/bg.png')} style={{ backgroundColor: "#004E75", width: "100%", height: "100%" }}>
            <ScrollView contentContainerStyle={{ flexGrow: 1 }} style={styles.fullView} keyboardShouldPersistTaps="handled" contentInsetAdjustmentBehavior='automatic'
                showsVerticalScrollIndicator={false}>
                <KeyboardAvoidingView enabled>
                    <StatusBar barStyle="light-content" backgroundColor="#004E75" />
                    <View style={{ display: 'flex', width: '100%', height: '100%' }}>
                        <View style={{ flex: 0.75, paddingHorizontal: '11%' }}>
                            <View style={styles.dpArea}>
                                <Image style={{ width: 140, height: 140, borderRadius: 70 }} source={image ? { uri: image } : require("../assets/logo.png")} />
                                <TouchableOpacity onPress={() => pickImage()} style={styles.choosePhoto}>
                                    <Image style={{ width: 17, height: 17 }} source={require("../assets/editIcon.png")} />
                                    <Text style={styles.chooseText}>  Choose photo</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.bioAndReel}>
                                <Text style={styles.bioText}>Bio</Text>
                                <TextInput onChangeText={(t) => setBio(t)} style={styles.bioTextBox} placeholder='Tell athletes a little about yourself…' multiline={true} />
                                <Text style={styles.bioTextHigh}>Highlight Reel</Text>
                                <Image style={styles.highImage} source={require("../assets/image.png")} />
                                <TouchableOpacity style={styles.choosePhoto}>
                                    <Image style={{ width: 17, height: 17 }} source={require("../assets/editIcon.png")} />
                                    <Text style={styles.chooseText}>  Set video link</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={styles.below}>
                            <View style={{ display: 'flex', flexDirection: 'row', }}>
                                <Text style={styles.activedot}></Text>
                                <Text style={styles.activedot}></Text>
                                <Text style={styles.activedot}></Text>
                                <Text style={styles.activedot}></Text>
                            </View>
                            <TouchableOpacity onPress={() => onFinish()} style={styles.button}><Text style={{ height: '100%', textAlignVertical: 'center', color: 'white', fontWeight: 'bold' }}>Finish</Text></TouchableOpacity>
                        </View>
                    </View>
                </KeyboardAvoidingView>
            </ScrollView>
        </ImageBackground>
    )
}


const styles = StyleSheet.create({
    highImage: {
        width: "100%",
        marginTop: "1%",
        height: 135
    },
    bioTextHigh: {
        color: "white",
        fontWeight: "bold",
        fontSize: 16,
        marginTop: '6%'
    },
    bioText: {
        color: "white",
        fontWeight: "bold",
        fontSize: 16
    },
    bioTextBox: {
        backgroundColor: "white",
        width: "100%",
        padding: 10,
        borderRadius: 5,
        marginTop: "1%",
        height: '24%',
        textAlignVertical: 'top'
    },
    bioAndReel: {
    },
    chooseText: {
        color: "#00B8FE",
    },
    choosePhoto: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        paddingTop: 5,
    },
    dpArea: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center"
    },
    below: {
        flex: 0.25,
        alignItems: 'center',
        paddingHorizontal: '11%'
    },
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
})
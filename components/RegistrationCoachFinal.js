
import { StyleSheet, Text, View, ImageBackground, Modal, ScrollView, StatusBar, KeyboardAvoidingView, TouchableOpacity, Image, TextInput, Dimensions, ToastAndroid } from 'react-native';
import React, { useState, useEffect } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { Platform } from 'expo-modules-core';
import * as SecureStore from 'expo-secure-store';
export default function RegistrationCoachFinal({ route, navigation }) {
    const [bio, setBio] = useState();
    const [image, setImage] = useState(null);
    const [videoLink, setvideoLink] = useState();
    const [modal, setModalVisible] = useState(false);
    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height;


    const pickImage = async () => {
        // No permissions request is necessary for launching the image library

        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (permissionResult.granted === false) {
            alert("You've refused to allow this appp to access your photos!");
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
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
        } else if (!videoLink) {
            ToastAndroid.show("Add Video Link", ToastAndroid.SHORT);
        } else {
            navigation.navigate("Main");
        }
    }

    return (
        <ImageBackground source={require('../assets/bg.png')} style={{ backgroundColor: "#004467", width: "100%", height: "100%" }}>
            <ScrollView contentContainerStyle={{ flexGrow: 1 }} style={styles.fullView} keyboardShouldPersistTaps="handled" contentInsetAdjustmentBehavior='automatic'
                showsVerticalScrollIndicator={false}>
                <KeyboardAvoidingView enabled>
                    <StatusBar barStyle="light-content" backgroundColor="#004467" />
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
                                <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.choosePhoto}>
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
                    <Modal
                        animationType="fade"
                        transparent={true}
                        visible={modal}
                        onRequestClose={() => {
                            setModalVisible(!modal);
                        }}>
                        <View style={styles.centeredView}>
                            <View style={styles.modalView}>

                                <View style={{ alignItems: 'center' }}>
                                    <TextInput onChangeText={(t) => setvideoLink(t)} placeholder='Video Link' style={{ marginBottom: 20, borderWidth: 1, borderColor: 'grey', width: windowWidth - 100, paddingLeft: 10, height: 50, borderRadius: 5 }} />
                                    <TouchableOpacity onPress={() => setModalVisible(false)} style={{ backgroundColor: '#2196F3', alignItems: 'center', height: 30, justifyContent: 'center', width: 150, borderRadius: 50, marginBottom: 10 }} ><Text style={{ color: 'white', fontWeight: "bold", fontSize: 14 }}>Submit</Text></TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </Modal>
                </KeyboardAvoidingView>
            </ScrollView>
        </ImageBackground>
    )
}


const styles = StyleSheet.create({
    modalView: {
        backgroundColor: 'white',
        elevation: 20,
        paddingTop: 40,
        paddingHorizontal: 20,
        paddingBottom: 10,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
    },
    centeredView: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1
    },
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
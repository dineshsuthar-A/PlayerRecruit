import { StyleSheet, Text, View, ImageBackground, ToastAndroid, Dimensions, Modal, ScrollView, StatusBar, TouchableOpacity, Image, TextInput, ActivityIndicator } from 'react-native';
import React, { useState, useEffect } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { Platform } from 'expo-modules-core';
import axios from 'axios';
import * as SecureStore from 'expo-secure-store';


const windowHeight = Dimensions.get('window').height;
export default function RegistrationStudentFinal({ route, navigation }) {
    const [bio, setBio] = useState();
    const [image, setImage] = useState(null);
    const [videoLink, setvideoLink] = useState();
    const [modal, setModalVisible] = useState(false);
    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height;
    const [st, setSt] = useState(false);

    const pickImage = async () => {
        // No permissions request is necessary for launching the image library

        if (Platform.OS !== 'web') {
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        }
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            quality: 1,
        });
        if (result?.type != "image") {
            ToastAndroid.show("image file is only allowed.", ToastAndroid.SHORT);
        } else
            if (!result.cancelled) {

                const uriParts = result?.uri.split(".");
                const imgExt = uriParts && uriParts[uriParts?.length - 1];
                const fileName = `profilepic.${imgExt}`;
                const imgType = `image/${imgExt}`;
                if (result?.uri) {
                    setImage({
                        uri: result?.uri,
                        type: imgType,
                        name: fileName,
                    });
                }
            }
    }
    const onFinish = async () => {
        if (image == null) {
            ToastAndroid.show("Select Profile Photo", ToastAndroid.SHORT);
        } else if (!bio) {
            ToastAndroid.show("Enter Bio", ToastAndroid.SHORT);
        } else if (!videoLink) {
            ToastAndroid.show("Add Video Link", ToastAndroid.SHORT);
        } else {
            setSt(true);
            const object = route.params;
            const fd = new FormData();
            fd.append("image", image);
            const token = "Bearer " + await SecureStore.getItemAsync("token");
            await axios.post("/api/student/register",
                {
                    "firstname": object.firstname,
                    "lastname": object.lastname,
                    "dob": object.date,
                    "age": object.age,
                    "gender": object.gender,
                    "state": object.state,
                    "city": object.city,
                    "ethnicity": object.ethnicity,
                    "school_type": object.school,
                    "school_name": object.schoolname,
                    "scholastic_year": parseInt(object.scholasticyear),
                    "gpa": object.gpa,
                    "sat": parseFloat(object.sat),
                    "act": parseFloat(object.act),
                    "sports": object.sports,
                    "height": parseFloat(object.height),
                    "weight": parseFloat(object.weight),
                    "wingspan": parseFloat(object.wingspan),
                    "dominant_hand": object.hand,
                    "personal_bio": bio.trim(),
                    "video": videoLink
                },
                {
                    headers: {
                        "Authorization": token
                    }
                }
            ).then(async (response) => {

                await axios.post("/api/student/uploadimage", fd
                    , {
                        headers: {

                            "Content-Type": "multipart/form-data",
                            "Authorization": token
                        }
                    }).then((response) => {
                        console.log(response.data);
                    }).catch((err) => {
                        ToastAndroid.show("Picture unable to upload.", ToastAndroid.SHORT);
                    });
                setSt(false);
                await SecureStore.setItemAsync("type", "1");
                ToastAndroid.show("Registered.", ToastAndroid.SHORT);
                navigation.reset({
                    index: 0,
                    routes: [{ name: "Main" }]
                });

            }).catch((err) => {
                setSt(false);
                console.log(err.response.data);
                ToastAndroid.show(err?.response?.data?.error ? err?.response?.data?.error : "Try again! some error occured.", ToastAndroid.SHORT);
            });
        }
    }

    return (
        <ImageBackground source={require('../assets/bg.png')} style={{ backgroundColor: "#004467", width: "100%", height: "100%" }}>

            <ActivityIndicator size="large" animating={st} color="#004467" style={{ position: "absolute", top: '50%', left: '45%', zIndex: 10 }} />
            <ScrollView contentContainerStyle={{ flexGrow: 1 }} style={styles.fullView} showsVerticalScrollIndicator={false} >
                <StatusBar barStyle="light-content" backgroundColor="#004467" />
                <View style={{ width: '100%', height: '100%' }}>
                    <View style={{ paddingHorizontal: '11%' }}>
                        <View style={styles.dpArea}>
                            <Image style={{ height: windowHeight * 0.2, width: windowHeight * 0.2, borderRadius: (windowHeight * 0.2) / 2 }} source={image ? { uri: image.uri } : require("../assets/logo.png")} />
                            <TouchableOpacity onPress={() => pickImage()} style={styles.choosePhoto}>
                                <Image style={{ width: windowHeight * 0.02, height: windowHeight * 0.02 }} source={require("../assets/editIcon.png")} />
                                <Text style={styles.chooseText}>  Choose photo</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.bioAndReel}>
                            <Text style={styles.bioText}>Bio</Text>
                            <TextInput selectionColor={"#004467"} onChangeText={(t) => setBio(t)} style={styles.bioTextBox} placeholder='Tell athletes a little about yourself…' multiline={true} />
                            <Text style={styles.bioTextHigh}>Highlight Reel</Text>
                            <Image style={styles.highImage} source={require("../assets/image.png")} />
                            <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.choosePhoto}>
                                <Image style={{ width: windowHeight * 0.02, height: windowHeight * 0.02 }} source={require("../assets/editIcon.png")} />
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
                        <TouchableOpacity onPress={() => onFinish()} style={styles.button}><Text style={{ height: '100%', textAlignVertical: 'center', color: 'white', fontWeight: 'bold', fontSize: windowHeight * 0.02 }}>Finish</Text></TouchableOpacity>
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
                                <TextInput value={videoLink} autoCapitalize="none" selectionColor={"#004467"} onChangeText={(t) => setvideoLink(t)} placeholder='Video Link' style={{ marginBottom: 20, borderWidth: 1, borderColor: 'grey', width: windowWidth - 100, paddingLeft: 10, height: 50, borderRadius: 5 }} />
                                <TouchableOpacity onPress={() => setModalVisible(false)} style={{ backgroundColor: '#2196F3', alignItems: 'center', height: 30, justifyContent: 'center', width: 150, borderRadius: 50, marginBottom: 10 }} ><Text style={{ color: 'white', fontWeight: "bold", fontSize: 14 }}>Submit</Text></TouchableOpacity>
                            </View>
                        </View>
                    </View>


                </Modal>
            </ScrollView>
        </ImageBackground>
    )
}


const styles = StyleSheet.create({
    modalView: {
        backgroundColor: 'white',
        elevation: 20,
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
        paddingTop: 40
    },
    centeredView: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1
    },
    highImage: {
        width: "100%",
        marginTop: windowHeight * 0.01,
        height: windowHeight * 0.2
    },
    bioTextHigh: {
        color: "white",
        fontWeight: "bold",
        fontSize: windowHeight * 0.023,
        marginTop: windowHeight * 0.02
    },
    bioText: {
        color: "white",
        fontWeight: "bold",
        fontSize: windowHeight * 0.023
    },
    bioTextBox: {
        backgroundColor: "white",
        width: "100%",
        padding: windowHeight * 0.012,
        borderRadius: 5,
        marginTop: windowHeight * 0.01,
        height: '24%',
        textAlignVertical: 'top',
        fontSize: windowHeight * 0.018
    },
    bioAndReel: {
        height: windowHeight * 0.5
    },
    chooseText: {
        color: "#00B8FE",
        fontSize: windowHeight * 0.019
    },
    choosePhoto: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        paddingTop: windowHeight * 0.014,
    },
    dpArea: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
    below: {
        alignItems: 'center',
        paddingHorizontal: '11%',
    },
    activedot: {
        height: windowHeight * 0.02, width: windowHeight * 0.02, borderWidth: 1, borderColor: "#CCD4D8", borderRadius: 10, marginRight: 4, backgroundColor: "#CCD4D8"
    },
    dot: { height: windowHeight * 0.02, width: windowHeight * 0.02, borderWidth: 1, borderColor: "#CCD4D8", borderRadius: 10, marginRight: 4 },
    button: {
        backgroundColor: '#00B8FE',
        width: '100%',
        marginTop: windowHeight * 0.04,
        alignItems: 'center',
        borderRadius: windowHeight * 0.05,
        height: windowHeight * 0.07

    },
    fullView: {
        width: '100%',
        height: '100%'
    }
})
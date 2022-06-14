
import { StyleSheet, Text, View, ImageBackground, Modal, ScrollView, StatusBar, TouchableOpacity, Image, TextInput, Dimensions, ToastAndroid, ActivityIndicator } from 'react-native';
import React, { useState, useEffect } from 'react';
import * as ImagePicker from 'expo-image-picker';

const windowHeight = Dimensions.get("window").height;
import * as SecureStore from 'expo-secure-store';
import axios from 'axios';
export default function RegistrationCoachFinal({ route, navigation }) {
    const [bio, setBio] = useState();
    const [image, setImage] = useState(null);
    const [videoLink, setvideoLink] = useState();
    const [modal, setModalVisible] = useState(false);
    const windowWidth = Dimensions.get('window').width;
    const [st, setSt] = useState(false);


    const pickImage = async () => {
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (permissionResult.granted === false) {
            alert("You've refused to allow this appp to access your photos!");
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            quality: 1,
        });

        if (!result.cancelled) {
            if (result?.type != "image") {
                ToastAndroid.show("image file is only allowed.", ToastAndroid.SHORT);
            } else {
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
            const token = "Bearer " + await SecureStore.getItemAsync("token");
            const data = route.params;
            const fd = new FormData();
            fd.append("image", image);
            axios.post("/api/coach/register", {
                "firstname": data.firstname,
                "lastname": data.lastname,
                "dob": data.date,
                "gender": data.gender,
                "state": data.state,
                "city": data.city,
                "ethnicity": data.ethnicity,
                "college_name": data.collegename,
                "college_state": data.collegeState,
                "university_email": data.email,
                "sport_coach": data.sportCoach,
                "team_name": data.teamName,
                "coaching_gender": data.CoachingGender,
                "division": data.division,
                "job_title": data.jobTitle,
                "personal_bio": bio.trim(),
                "video": videoLink.trim()
            }, {
                headers: {
                    "Authorization": token
                }
            }).then(async (response) => {
                await axios.post("/api/coach/uploadimage", fd
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
                await SecureStore.setItemAsync("type", "2");
                ToastAndroid.show("Registered.", ToastAndroid.SHORT);
                navigation.reset({
                    index: 0,
                    routes: [{ name: "CoachMain" }]
                });
            }).catch((err) => {
                setSt(false);
                ToastAndroid.show(err.response.data.error, ToastAndroid.SHORT);
            });

        }
    }

    return (
        <ImageBackground source={require('../assets/bg.png')} style={{ backgroundColor: "#004467", width: "100%", height: "100%" }}>
            <ActivityIndicator size="large" animating={st} color="#004467" style={{ position: "absolute", top: '50%', left: '45%', zIndex: 10 }} />

            <ScrollView contentContainerStyle={{ flexGrow: 1 }} style={styles.fullView} showsVerticalScrollIndicator={false}>
                <StatusBar barStyle="light-content" backgroundColor="#004467" />
                <View style={{ width: '100%', height: '100%', paddingTop: windowHeight * 0.01 }}>
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
                                <TextInput autoCapitalize='none' value={videoLink} selectionColor={"#004467"} onChangeText={(t) => setvideoLink(t)} placeholder='Video Link' style={{ marginBottom: 20, borderWidth: 1, borderColor: 'grey', width: windowWidth - 100, paddingLeft: 10, height: 50, borderRadius: 5 }} />
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
        padding: 10,
        borderRadius: 5,
        marginTop: windowHeight * 0.008,
        height: windowHeight * 0.13,
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
        paddingTop: windowHeight * 0.002,
    },
    dpArea: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center"
    },
    below: {
        alignItems: 'center',
        paddingHorizontal: '11%',
        paddingTop: windowHeight * 0.03
    },
    activedot: {
        height: 15, width: 15, borderWidth: 1, borderColor: "#CCD4D8", borderRadius: 10, marginRight: 4, backgroundColor: "#CCD4D8"
    },
    dot: { height: 15, width: 15, borderWidth: 1, borderColor: "#CCD4D8", borderRadius: 10, marginRight: 4 },
    button: {
        backgroundColor: '#00B8FE',
        width: '100%',
        marginTop: windowHeight * 0.03,
        alignItems: 'center',
        height: windowHeight * 0.07,
        borderRadius: windowHeight * 0.05

    },
})
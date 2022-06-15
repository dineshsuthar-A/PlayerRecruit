import { StyleSheet, Text, View, ToastAndroid, Dimensions, Modal, TouchableOpacity, Image, TextInput } from 'react-native';
import React, { useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { Platform } from 'expo-modules-core';
const windowwidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function RegistrationStudentFinal(props) {

    const [modal, setModalVisible] = useState(false);
    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height;

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

        if (!result.cancelled) {
            if (result?.type != "image") {
                ToastAndroid.show("image file is only allowed.", ToastAndroid.SHORT);
            }
            else {
                const uriParts = result?.uri.split(".");
                const imgExt = uriParts && uriParts[uriParts?.length - 1];
                const fileName = `profilepic.${imgExt}`;
                const imgType = `image/${imgExt}`;
                if (result?.uri) {
                    props.setdata({
                        ...props.data,
                        "image": {
                            uri: result?.uri,
                            type: imgType,
                            name: fileName,
                        }
                    });
                }
            }
        }
    }


    return (
        <View style={{ width: windowwidth, paddingHorizontal: '2%', height: '100%', }}>
            <View style={styles.dpArea}>
                <Image style={{ height: windowHeight * 0.2, width: windowHeight * 0.2, borderRadius: (windowHeight * 0.2) / 2 }} source={props.data.image ? { uri: props?.data?.image?.uri } : require("../../assets/logo.png")} />
                <TouchableOpacity onPress={() => pickImage()} style={styles.choosePhoto}>
                    <Image style={{ width: windowHeight * 0.02, height: windowHeight * 0.02 }} source={require("../../assets/editIcon.png")} />
                    <Text style={styles.chooseText}>  Choose photo</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.bioAndReel}>
                <Text style={styles.bioText}>Bio</Text>
                <TextInput selectionColor={"#004467"} value={props?.data?.bio} onChangeText={(t) => props.setdata({
                    ...props.data,
                    "bio": t
                })} style={styles.bioTextBox} placeholder={(props.type == "coach") ? 'Tell athletes a little about yourself…' : 'Tell coaches a little about yourself…'} multiline={true} />
                <Text style={styles.bioTextHigh}>Highlight Reel</Text>
                <Image style={styles.highImage} source={require("../../assets/image.png")} />
                <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.choosePhoto}>
                    <Image style={{ width: windowHeight * 0.02, height: windowHeight * 0.02 }} source={require("../../assets/editIcon.png")} />
                    <Text style={styles.chooseText}>  Set video link</Text>
                </TouchableOpacity>
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
                            <TextInput value={props?.data?.video} autoCapitalize="none" selectionColor={"#004467"} onChangeText={(t) => props.setdata({
                                ...props.data,
                                "video": t,
                            })} placeholder='Video Link' style={{ marginBottom: 20, borderWidth: 1, borderColor: 'grey', width: windowWidth - 100, paddingLeft: 10, height: 50, borderRadius: 5 }} />
                            <TouchableOpacity onPress={() => setModalVisible(false)} style={{ backgroundColor: '#2196F3', alignItems: 'center', height: 30, justifyContent: 'center', width: 150, borderRadius: 50, marginBottom: 10 }} ><Text style={{ color: 'white', fontWeight: "bold", fontSize: 14 }}>Submit</Text></TouchableOpacity>
                        </View>
                    </View>
                </View>


            </Modal>
        </View>



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
})
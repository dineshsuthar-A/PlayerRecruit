import { StyleSheet, Text, View, StatusBar, ImageBackground, ScrollView, TouchableOpacity, Image, Dimensions, ActivityIndicator, Modal, TextInput, ToastAndroid } from 'react-native'
import React, { useState, useRef } from 'react'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { useFocusEffect } from '@react-navigation/native';
import axios from 'axios';
import * as SecureStore from 'expo-secure-store';
import { AntDesign } from '@expo/vector-icons';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { baseURL } from '../config';
var validator = require('validator');
import dataapis from '../apicalls/dataapis'
const windowHeight = Dimensions.get("window").height;
const windowWidth = Dimensions.get("window").width;
export default function ProfileCoach({ navigation }) {
    const [data, setdata] = useState();
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [date, setDate] = useState();
    const [modal, setModalVisible] = useState(false);
    const [image, setImage] = useState();
    const [editpersonal, seteditpersonal] = useState(false);
    const [statedata, setstatedata] = useState();
    const [ethnicitymodal, setethnicityModalVisible] = useState(false);
    const [collegesdatamodal, setcollegesdatamodal] = useState(false);
    const [unistatemodal, setunistatemodal] = useState(false);
    const [collegesdata, setcollegesdata] = useState();
    const [ethnicitydata, setethnicitydata] = useState();
    const [statemodal, setstatemodal] = useState(false);
    const [citymodal, setcitymodal] = useState(false);
    const [citydata, setcitydata] = useState();
    const [editathletics, seteditathletics] = useState(false);
    const [videomodal, setvideoModalVisible] = useState(false);
    const [collegefilterdata, setcollegefilterdata] = useState();
    const [divisionmodal, setdivisionmodal] = useState(false);
    const [sportsmodal, setsportsmodal] = useState(false);
    const [divisionData, setDivisionData] = useState();
    const [cityfilter, setcityfilter] = useState();
    const [statefilter, setstatefilter] = useState();
    const [sportsData, setSportsData] = useState();
    const [tempstate, settempstate] = useState();
    const [phonemodal, setphonemodal] = useState(false);
    const [phone, setphone] = useState();
    const [yearmodal, setyearmodal] = useState(false);
    const [email, setemail] = useState();
    const [emailmodal, setemailmodal] = useState(false);
    const [load, setload] = useState(false);

    const firstref = useRef();
    const lastref = useRef();
    const bioref = useRef();
    const uniemailref = useRef();
    const jobref = useRef();
    const teamref = useRef();

    const months = [" January ", " Feb ", " Mar ", " Apr ", " May ", " Jun ", " Jul ", " Aug ", " Sept ", " Oct ", " Nov ", " Dec "];

    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };
    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };
    const handleConfirm = async (d) => {
        var c = new Date();
        var day = d.getDate();
        var month = d.getMonth() + 1;
        var year = d.getFullYear();
        const age = parseInt(c.getFullYear()) - parseInt(year) + 1;
        const dob = day + months[month - 1] + year;
        setDate(dob);
        setdata({
            ...data,
            "dob": year + "-" + month + "-" + day
        });
        var da = (day < 10 ? ("0" + day) : day) + "/" + (month < 10 ? ("0" + month) : month) + "/" + year;

        hideDatePicker();
    };
    const onCameraSelect = async () => {
        setModalVisible(false)
        const token = "Bearer " + await SecureStore.getItemAsync("token");
        const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
        if (permissionResult.granted != true) {
            ToastAndroid.show("You've refused to allow this app to access your camera!, Cannot Open camera.", ToastAndroid.SHORT);
            return;
        }
        const result = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            quality: 1
        });
        // Explore the result
        if (!result.cancelled) {
            if (result.type == "image") {
                {
                    const uriParts = result?.uri.split(".");
                    const imgExt = uriParts && uriParts[uriParts?.length - 1];
                    const fileName = `profilepic.${imgExt}`;
                    const imgType = `image/${imgExt}`;


                    if (result?.uri) {
                        const image = {

                            uri: result?.uri,
                            type: imgType,
                            name: fileName,

                        };


                        const fd = new FormData();
                        fd.append("image", image);
                        axios.post("/api/coach/uploadimage", fd
                            , {
                                headers: {

                                    "Content-Type": "multipart/form-data",
                                    "Authorization": token
                                }
                            }).then((response) => {
                                getData();
                            }).catch((err) => {
                                if (err?.message == "Network Error") {
                                    ToastAndroid.show("Can't able to reach to the server,Please enable your internet.", ToastAndroid.SHORT);
                                } else
                                    ToastAndroid.show("Picture unable to upload,Retry", ToastAndroid.SHORT);
                            });
                    }
                }
            } else {
                ToastAndroid.show("image file is only allowed.", ToastAndroid.SHORT);
            }
        }
    }
    const pickImage = async () => {
        const token = "Bearer " + await SecureStore.getItemAsync("token");
        // No permissions request is necessary for launching the image library
        setModalVisible(false);
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
                    const image = {

                        uri: result?.uri,
                        type: imgType,
                        name: fileName,

                    };


                    const fd = new FormData();
                    fd.append("image", image);
                    axios.post("/api/coach/uploadimage", fd
                        , {
                            headers: {

                                "Content-Type": "multipart/form-data",
                                "Authorization": token
                            }
                        }).then((response) => {
                            getData();
                        }).catch((err) => {
                            if (err?.message == "Network Error") {
                                ToastAndroid.show("Can't able to reach to the server,Please enable your internet.", ToastAndroid.SHORT);
                            } else
                                ToastAndroid.show("Picture unable to upload,Retry", ToastAndroid.SHORT);
                        });
                }
            }
        }
    }
    const getathleticpickerdata = () => {
        dataapis.getsportsdata().then((response) => {
            setSportsData(response.data.sports);
        }).catch((error) => {
            console.log(error.response.data);
            ToastAndroid.show("Some error occured.", ToastAndroid.SHORT);
        });

        dataapis.getdivisiondata().then((response) => {
            setDivisionData(response.data.divisions);
        }).catch((error) => {
            console.log(error?.response?.data);
            ToastAndroid.show("Some error occured.", ToastAndroid.SHORT);
        });
    }
    const getpickerData = () => {
        dataapis.getStateData().then((response) => {
            setstatedata(response.data.states);
            setstatefilter(response.data.states);
        }).catch((err) => {
            ToastAndroid.show("Some error occured, not able to reach server.", ToastAndroid.SHORT);
        });
        dataapis.getethanicitydata().then((response) => {
            setethnicitydata(response.data.ethnicity);
        }).catch((error) => {
            ToastAndroid.show("Some error occured, not able to reach server.", ToastAndroid.SHORT);
        });
        dataapis.getcolleges().then((response) => {
            setcollegesdata(response.data.colleges);
            setcollegefilterdata(response.data.colleges);
        }).catch((err) => {
            console.log(err);
        });
    }
    const getcities = (item) => {
        dataapis.getcities(item).then((response) => {
            setcitydata(response.data.cities);
            setcityfilter(response.data.cities);
        }).catch((err) => {
            console.log(err?.response?.data);
        });
    }
    const filtercity = (txt) => {
        const d = cityfilter.filter((i) => {
            return i.city_name.toUpperCase().indexOf(txt.toString().toUpperCase()) > -1;;
        });
        setcitydata(d);
    }
    const filterstate = (txt) => {
        const d = statefilter.filter((i) => {
            return i.statename.toUpperCase().indexOf(txt.toString().toUpperCase()) > -1;;
        });
        setstatedata(d);
    }
    const getData = async () => {
        const token = "Bearer " + await SecureStore.getItemAsync("token");
        axios.get("/api/coach/info", {
            headers: {
                "Authorization": token
            }
        }).then((response) => {
            setdata(response.data.data);
            setDate((response.data.data.dob.split("T")[0].split("-")[2]) + months[parseInt(response.data.data.dob.split("T")[0].split("-")[1]) - 1] + response.data.data.dob.split("T")[0].split("-")[0])
        }).catch((error) => {
            console.log(error);
            console.log(error?.response?.data);
        })
    }

    const updateathletics = async () => {
        if (!data?.team || data?.team?.length < 1) {
            ToastAndroid.show("Enter team name", ToastAndroid.SHORT);
            teamref?.current?.focus();
        } else if (!data?.jobtitle || data?.jobtitle?.length < 1) {
            ToastAndroid.show("Enter your job title.", ToastAndroid.SHORT);
            jobref?.current?.focus();
        } else {
            const token = "Bearer " + await SecureStore.getItemAsync("token");
            axios.post("/api/coach/updateathletics", {
                "division": data.divisionid,
                "sport": data.sportid,
                "team": data.team,
                "job": data.jobtitle,
                "coaches": data.coaching_gender,
                "video": data.video,
                "coaching_gender": data.coaching_gender
            }, {
                headers: {
                    "Authorization": token
                }
            }).then((response) => {
                seteditathletics(!editathletics);
                ToastAndroid.show("Updated", ToastAndroid.SHORT);
                console.log(response.data);
            }).catch((err) => {
                if (err?.message == "Network Error") {
                    ToastAndroid.show("Can't able to reach to the server,Please enable your internet.", ToastAndroid.SHORT);
                } else
                    ToastAndroid.show(err?.response?.data?.error ? err?.response?.data?.error : "Try Again", ToastAndroid.SHORT);
            });
        }
    }
    const updatepersonal = async () => {
        if (!data?.firstname || data?.firstname?.length < 1) {
            ToastAndroid.show("Enter firstname", ToastAndroid.SHORT);
            firstref?.current?.focus();
        } else if (!data?.lastname || data?.lastname.length < 1) {
            ToastAndroid.show("Enter lastname", ToastAndroid.SHORT);
            lastref?.current?.focus();
        } else if (!data?.personal_bio || data?.personal_bio.length < 1) {
            ToastAndroid.show("Enter bio", ToastAndroid.SHORT);
            bioref?.current?.focus();
        } else if (!data?.university_email || data?.university_email.length < 1 || !validator.isEmail(data?.university_email)) {
            ToastAndroid.show("Enter correct university email.", ToastAndroid.SHORT);
            uniemailref?.current?.focus();
        } else {
            const token = "Bearer " + await SecureStore.getItemAsync("token");
            axios.post("/api/coach/updatepersonal", {
                "firstname": data?.firstname,
                "lastname": data?.lastname,
                "ethnicity": data?.ethnicityid,
                "state": data?.stateid,
                "city": data?.cityid,
                "gender": data?.gender,
                "bio": data?.personal_bio,
                "college": data?.collegeid,
                "collegestate": data?.collegestateid,
                "university_email": data?.university_email,
                "dob": data.dob
            }, {
                headers: {
                    "Authorization": token
                }
            }).then((response) => {
                seteditpersonal(!editpersonal);
                ToastAndroid.show("Updated", ToastAndroid.SHORT);
            }).catch((err) => {
                if (err?.message == "Network Error") {
                    ToastAndroid.show("Can't able to reach to the server,Please enable your internet.", ToastAndroid.SHORT);
                } else
                    ToastAndroid.show(err?.response?.data?.error ? err?.response?.data?.error : "Try Again", ToastAndroid.SHORT);
            });
        }
    }
    const phonenumber = (inputtxt) => {
        var phoneno = /^\d{10}$/;
        if (((inputtxt).match(phoneno))) {
            return true;
        }
        else {
            return false;
        }
    }
    const updatemobile = async (txt) => {
        const token = "Bearer " + await SecureStore.getItemAsync("token");

        if (txt && phonenumber(txt)) {
            setload(true);
            axios.post("/api/update/mobile", {
                "number": txt
            }, {
                headers: {
                    "Authorization": token
                }
            }).then((response) => {
                setload(false);
                ToastAndroid.show("Update number", ToastAndroid.SHORT);
                setdata({
                    ...data,
                    "phone": txt
                })
                setphonemodal(false);
            }).catch((err) => {
                setload(false);
                if (err?.message == "Network Error") {
                    ToastAndroid.show("Can't able to reach to the server,Please enable your internet.", ToastAndroid.SHORT);
                } else
                    ToastAndroid.show(err?.response?.data?.error ? err?.response?.data?.error : "Try Again", ToastAndroid.SHORT);
            });
        } else {
            ToastAndroid.show("Invalid Number", ToastAndroid.SHORT);
        }

    }
    const updateemail = async (txt) => {
        const token = "Bearer " + await SecureStore.getItemAsync("token");

        if (txt && validator.isEmail(txt)) {
            setload(true);
            axios.post("/api/update/email", {
                "email": txt
            }, {
                headers: {
                    "Authorization": token
                }
            }).then((response) => {
                setload(false);
                ToastAndroid.show("Email updated", ToastAndroid.SHORT);
                setdata({
                    ...data,
                    "email": txt
                })
                setemailmodal(false);
            }).catch((err) => {
                setload(false);
                if (err?.message == "Network Error") {
                    ToastAndroid.show("Can't able to reach to the server,Please enable your internet.", ToastAndroid.SHORT);
                } else
                    ToastAndroid.show(err?.response?.data?.error ? err?.response?.data?.error : "Try Again", ToastAndroid.SHORT);
            });
        } else {
            ToastAndroid.show("Invalid email", ToastAndroid.SHORT);
        }

    }
    const filtercolleges = (txt) => {
        const d = collegefilterdata.filter((i) => {
            return i.college_name.toUpperCase().indexOf(txt.toString().toUpperCase()) > -1;;
        });
        setcollegesdata(d);
    }
    useFocusEffect(React.useCallback(() => {
        getData();
    }, []));
    return (
        data ?
            <ScrollView style={{ backgroundColor: 'white' }}>
                <StatusBar barStyle="light-content" backgroundColor="#004467" />

                <View style={{ width: '100%', display: 'flex', flexDirection: 'row' }}>
                    <ImageBackground source={{ uri: baseURL + "uploads/" + data.image }} style={{ flex: 0.65, width: '100%', height: undefined, aspectRatio: 5.5 / 4, display: 'flex', justifyContent: 'space-between' }} >
                        <TouchableOpacity onPress={() => setModalVisible(true)}><Text style={{ textAlign: 'right', margin: '2%' }}><MaterialCommunityIcons name="pencil" size={24} color="white" /></Text></TouchableOpacity>
                        <View style={{ margin: '2%' }}>
                            <Text style={{ color: 'white', fontSize: windowHeight * 0.04, fontWeight: '400' }}>Coach</Text>
                            <Text style={{ color: 'white', fontSize: windowHeight * 0.04, fontWeight: 'bold' }}>Card</Text>
                        </View>
                    </ImageBackground>
                    <View style={{ flex: 0.35, justifyContent: 'space-around', alignItems: 'center', paddingVertical: '4%', backgroundColor: '#004467' }}>
                        <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', borderBottomWidth: 0.5, paddingBottom: "3%", width: '70%', borderColor: 'grey' }}>
                            <Text style={styles.textbottom}>Views</Text>
                            <Text style={{ color: 'white', fontWeight: '400', fontSize: windowHeight * 0.026 }}>{data.views}</Text>
                        </View>
                        <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', borderBottomWidth: 0.5, paddingBottom: "3%", width: '70%', borderColor: 'grey' }}>
                            <Text style={styles.textbottom}>Remaining</Text>
                            <Text style={{ color: 'white', fontWeight: '400', fontSize: windowHeight * 0.026 }}>10</Text>
                        </View>
                        <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={styles.textbottom}>Plan</Text>
                            <Text style={{ color: 'white', fontWeight: '400', fontSize: windowHeight * 0.026 }}>Platinum</Text>
                        </View>
                    </View>
                </View>
                <View style={{ display: 'flex', paddingHorizontal: '11%', marginTop: '3%' }}>
                    <TouchableOpacity onPress={() => navigation.navigate("previewcard", data)} style={{ width: '100%', backgroundColor: '#00B8FE', borderRadius: 40, borderWidth: 1, }}>
                        <Text style={{ color: 'white', fontWeight: 'bold', textAlign: 'center', padding: '6%', fontSize: windowHeight * 0.02 }}>Preview Card</Text>
                    </TouchableOpacity>

                </View>


                <View style={{ paddingHorizontal: '6%' }}>


                    <View style={{ marginTop: '6%' }}>
                        <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', borderBottomWidth: 1, borderColor: '#00B8FE', paddingBottom: '1%', marginBottom: '2%' }}>
                            <Text style={{ color: "#00B8FE", fontWeight: '600', fontSize: windowHeight * 0.02 }} >Personal</Text>
                            {!editpersonal ?
                                <TouchableOpacity onPress={() => {
                                    if (editathletics) {
                                        ToastAndroid.show("Haven't completed with the athletic information update.", ToastAndroid.SHORT);
                                    } else {
                                        getpickerData();
                                        seteditpersonal(!editpersonal);
                                    }
                                }}>
                                    <Text><MaterialCommunityIcons name="pencil" size={20} color="#00B8FE" /></Text>
                                </TouchableOpacity>
                                :
                                <View style={{ flexDirection: 'row' }}>
                                    <TouchableOpacity onPress={() => {
                                        getData();
                                        seteditpersonal(!editpersonal);
                                    }} style={{ marginRight: 10 }}>
                                        <Text><AntDesign name="closecircle" size={24} color="red" /></Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => {
                                        updatepersonal();
                                    }}>
                                        <Text><AntDesign name="checkcircle" size={24} color="#00B8FE" /></Text>
                                    </TouchableOpacity>
                                </View>
                            }
                        </View>

                    </View>

                    {!editpersonal ?
                        <View>
                            <View>
                                <Text style={{ fontWeight: '600', fontSize: windowHeight * 0.03 }}>{data.firstname} {data.lastname}</Text>
                                <View style={{ display: 'flex', flexDirection: 'row', width: '100%', marginTop: '5%' }}>
                                    <View style={{ flex: 0.5 }}>
                                        <Text style={styles.textHead}>{data.gender}</Text>
                                        <Text style={styles.textbottom}>Gender</Text>
                                    </View>
                                    <View style={{ flex: 0.5 }}>
                                        <Text style={styles.textHead}>{date}</Text>
                                        <Text style={styles.textbottom}>Birthday</Text>
                                    </View>
                                </View>
                                <View style={{ display: 'flex', flexDirection: 'row', width: '100%', marginTop: '5%' }}>
                                    <View style={{ flex: 1 }}>
                                        <Text style={styles.textHead}>{data.ethnicities}</Text>
                                        <Text style={styles.textbottom}>Ethnicity</Text>
                                    </View>
                                </View>
                            </View>


                            <View>
                                <Text style={{ width: '100%', borderWidth: 0.5, height: 0.5, borderColor: 'lightgrey', marginVertical: '6%' }}></Text>
                                <View style={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
                                    <View style={{ flex: 0.5 }}>
                                        <Text style={styles.textHead}>{data.phone}</Text>
                                        <Text style={styles.textbottom}>Phone</Text>
                                    </View>
                                    <View style={{ flex: 0.5 }}>
                                        <Text style={styles.textHead}>{data.email}</Text>
                                        <Text style={styles.textbottom}>Email</Text>
                                    </View>
                                </View>
                                <View style={{ display: 'flex', flexDirection: 'row', width: '100%', marginTop: '5%' }}>
                                    <View style={{ flex: 0.5 }}>
                                        <Text style={styles.textHead}>Always</Text>
                                        <Text style={styles.textbottom}>Visibility</Text>
                                    </View>
                                    <View style={{ flex: 0.5 }}>
                                        <Text style={styles.textHead}>{data.city}, {data.statename}</Text>
                                        <Text style={styles.textbottom}>Location</Text>
                                    </View>
                                </View>
                            </View>



                            <View>
                                <Text style={{ width: '100%', borderWidth: 0.5, height: 0.5, borderColor: 'lightgrey', marginVertical: '6%' }}></Text>
                                <View style={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
                                    <View style={{ flex: 1 }}>
                                        <Text style={styles.textHead}>Bio</Text>
                                        <Text style={{ color: 'grey', fontSize: windowHeight * 0.016, marginTop: '2%', textAlign: 'justify', width: '100%' }}>{data.personal_bio}</Text>
                                    </View>
                                </View>
                                <View style={{ display: 'flex', flexDirection: 'row', width: '100%', marginTop: '5%' }}>
                                    <View style={{ flex: 0.5 }}>
                                        <Text style={styles.textHead}>{data.college_name}</Text>
                                        <Text style={styles.textbottom}>College Name</Text>
                                    </View>
                                    <View style={{ flex: 0.5 }}>
                                        <Text style={styles.textHead}>{data.College_State}</Text>
                                        <Text style={styles.textbottom}>University State</Text>
                                    </View>
                                </View>
                                <View style={{ display: 'flex', flexDirection: 'row', width: '100%', marginTop: '5%' }}>
                                    <View style={{ flex: 1 }}>
                                        <Text style={styles.textHead}>{data.university_email}</Text>
                                        <Text style={styles.textbottom}>University Email</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                        :

                        <View>
                            <View>
                                <View style={{ flexDirection: 'row' }}>
                                    <TextInput ref={firstref} style={{ fontWeight: '600', fontSize: windowHeight * 0.03, marginRight: '2%', textDecorationLine: 'underline' }} value={data.firstname} onChangeText={(t) => setdata({
                                        ...data,
                                        firstname: t
                                    })} selectionColor='#004467' />
                                    <TextInput ref={lastref} style={{ fontWeight: '600', fontSize: windowHeight * 0.03, textDecorationLine: 'underline' }} value={data.lastname} onChangeText={(t) => setdata({
                                        ...data,
                                        lastname: t
                                    })} selectionColor='#004467' />
                                </View>
                                <View style={{ display: 'flex', flexDirection: 'row', width: '100%', marginTop: '5%' }}>
                                    <View style={{ flex: 0.5 }}>
                                        <View style={{ flexDirection: 'row' }}>
                                            <TouchableOpacity onPress={() => setdata({
                                                ...data,
                                                gender: "Male"
                                            })} style={{ padding: 5, backgroundColor: data.gender == "Male" ? "#00B8FE" : 'grey', marginRight: '5%', borderRadius: 20, paddingHorizontal: 10 }}><Text style={{ color: 'white' }}>Male</Text></TouchableOpacity>
                                            <TouchableOpacity onPress={() => setdata({
                                                ...data,
                                                gender: "Female"
                                            })} style={{ padding: 5, backgroundColor: data.gender == "Female" ? "#00B8FE" : 'grey', borderRadius: 20, paddingHorizontal: 10 }}><Text style={{ color: 'white' }}>Female</Text></TouchableOpacity>
                                        </View>
                                        <Text style={styles.textbottom}>Gender</Text>
                                    </View>
                                    <View style={{ flex: 0.5 }}>
                                        <TouchableOpacity onPress={() => setDatePickerVisibility(true)}>
                                            <Text style={{ textDecorationLine: 'underline', color: 'black', fontWeight: '600', fontSize: windowHeight * 0.02 }}>{date}</Text>
                                        </TouchableOpacity>
                                        <Text style={styles.textbottom}>Birthday</Text>
                                    </View>
                                    <DateTimePickerModal
                                        isVisible={isDatePickerVisible}
                                        mode="date"
                                        onConfirm={handleConfirm}
                                        onCancel={hideDatePicker}
                                        maximumDate={new Date()}
                                    />
                                </View>
                                <View style={{ display: 'flex', flexDirection: 'row', width: '100%', marginTop: '5%' }}>
                                    <View style={{ flex: 1 }}>
                                        <TouchableOpacity onPress={() => setethnicityModalVisible(true)}>
                                            <Text style={{ textDecorationLine: 'underline', color: 'black', fontWeight: '600', fontSize: windowHeight * 0.02 }}>{data.ethnicities}</Text>
                                        </TouchableOpacity>
                                        <Text style={styles.textbottom}>Ethnicity</Text>
                                    </View>
                                </View>
                            </View>


                            <View>
                                <Text style={{ width: '100%', borderWidth: 0.5, height: 0.5, borderColor: 'lightgrey', marginVertical: '6%' }}></Text>
                                <View style={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
                                    <View style={{ flex: 0.5 }}>
                                        <TouchableOpacity onPress={() => {
                                            setphone(data?.phone);
                                            setphonemodal(true);
                                        }}>
                                            <Text style={{ textDecorationLine: 'underline', color: 'black', fontWeight: '600', fontSize: windowHeight * 0.02 }}>{data.phone}</Text>
                                        </TouchableOpacity>
                                        <Text style={styles.textbottom}>Phone</Text>
                                    </View>
                                    <View style={{ flex: 0.5 }}>
                                        <TouchableOpacity onPress={() => {
                                            setemail(data?.email);
                                            setemailmodal(true);
                                        }}>
                                            <Text style={{ textDecorationLine: 'underline', color: 'black', fontWeight: '600', fontSize: windowHeight * 0.02 }}>{data.email}</Text>
                                        </TouchableOpacity>
                                        <Text style={styles.textbottom}>Email</Text>
                                    </View>
                                </View>
                                <View style={{ display: 'flex', flexDirection: 'row', width: '100%', marginTop: '5%' }}>
                                    {/* <View style={{ flex: 0.5 }}>
                                        <Text style={styles.textHead}>Always</Text>
                                        <Text style={styles.textbottom}>Visibility</Text>
                                    </View> */}
                                    <View style={{ flex: 0.5 }}>
                                        <TouchableOpacity onPress={() => setstatemodal(true)}>
                                            <Text style={{ textDecorationLine: 'underline', color: 'black', fontWeight: '600', fontSize: windowHeight * 0.02 }}>{data.city}, {data.statename}</Text>
                                        </TouchableOpacity>
                                        <Text style={styles.textbottom}>Location</Text>
                                    </View>
                                </View>
                            </View>

                            <View>
                                <Text style={{ width: '100%', borderWidth: 0.5, height: 0.5, borderColor: 'lightgrey', marginVertical: '6%' }}></Text>
                                <View style={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
                                    <View style={{ flex: 1 }}>
                                        <Text style={styles.textHead}>Bio</Text>
                                        <TextInput ref={bioref} style={{ color: 'grey', fontSize: windowHeight * 0.016, textAlign: 'justify', width: '100%', textDecorationLine: 'underline' }} multiline={true} selectionColor='#004467' value={data.personal_bio} onChangeText={(t) =>
                                            setdata({
                                                ...data,
                                                personal_bio: t
                                            })} />
                                    </View>
                                </View>
                                <View style={{ display: 'flex', flexDirection: 'row', width: '100%', marginTop: '5%' }}>
                                    <View style={{ flex: 0.5 }}>
                                        <TouchableOpacity onPress={() => {
                                            filtercolleges("");
                                            setcollegesdatamodal(true)
                                        }}>
                                            <Text style={{ textDecorationLine: 'underline', color: 'black', fontWeight: '600', fontSize: windowHeight * 0.02 }}>{data.college_name}</Text>
                                        </TouchableOpacity>
                                        <Text style={styles.textbottom}>College Name</Text>
                                    </View>
                                    <View style={{ flex: 0.5 }}>
                                        <TouchableOpacity onPress={() => setunistatemodal(true)}>
                                            <Text style={{ textDecorationLine: 'underline', color: 'black', fontWeight: '600', fontSize: windowHeight * 0.02 }}>{data.College_State}</Text>
                                        </TouchableOpacity>
                                        <Text style={styles.textbottom}>University State</Text>
                                    </View>
                                </View>
                                <View style={{ display: 'flex', flexDirection: 'row', width: '100%', marginTop: '5%' }}>
                                    <View style={{ flex: 1 }}>
                                        <TextInput ref={uniemailref} style={{ color: 'black', fontWeight: '600', fontSize: windowHeight * 0.02, textDecorationLine: 'underline' }} selectionColor='#004467' value={data.university_email} onChangeText={(t) =>
                                            setdata({
                                                ...data,
                                                university_email: t
                                            })} />
                                        <Text style={styles.textbottom}>University Email</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                    }
                    {!editathletics ?
                        <View style={{ marginTop: '6%' }}>
                            <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', borderBottomWidth: 1, borderColor: '#00B8FE', paddingBottom: '1%', marginBottom: '6%' }}>
                                <Text style={{ color: "#00B8FE", fontWeight: '600', fontSize: windowHeight * 0.02 }} >Athletics</Text>
                                <TouchableOpacity onPress={() => {
                                    if (editpersonal) {
                                        ToastAndroid.show("Haven't completed with the personal information update.", ToastAndroid.SHORT);
                                    } else {
                                        getathleticpickerdata();
                                        seteditathletics(true);
                                    }
                                }}>
                                    <Text><MaterialCommunityIcons name="pencil" size={20} color="#00B8FE" /></Text>
                                </TouchableOpacity>
                            </View>

                            <View style={{ display: 'flex', flexDirection: 'row', width: '100%', marginBottom: '5%' }}>
                                <View style={{ flex: 0.5 }}>
                                    <Text style={styles.textHead}>{data.sportsname}</Text>
                                    <Text style={styles.textbottom}>Sport</Text>
                                </View>
                                <View style={{ flex: 0.5 }}>
                                    <Text style={styles.textHead}>{data.team}</Text>
                                    <Text style={styles.textbottom}>Team Name</Text>
                                </View>
                            </View>
                            <View style={{ display: 'flex', flexDirection: 'row', width: '100%', marginBottom: '5%' }}>
                                <View style={{ flex: 0.5 }}>
                                    <Text style={styles.textHead}>{data.divisions}</Text>
                                    <Text style={styles.textbottom}>Division</Text>
                                </View>
                                <View style={{ flex: 0.5 }}>
                                    <Text style={styles.textHead}>{data.jobtitle}</Text>
                                    <Text style={styles.textbottom}>Job Title</Text>
                                </View>
                            </View>
                            <View style={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
                                <View style={{ flex: 0.5 }}>
                                    <Text style={styles.textHead}>{data.coaching_gender}</Text>
                                    <Text style={styles.textbottom}>Coachs</Text>
                                </View>
                            </View>
                            <Text style={{ color: 'black', fontWeight: '600', fontSize: windowHeight * 0.02, marginTop: '6%', marginBottom: '4%' }}>Highlight Reel</Text>
                            <View style={{ paddingHorizontal: '5%' }}>
                                <Image source={require('../assets/image.png')} style={{ width: '100%' }} />

                            </View>
                        </View>
                        :
                        <View style={{ marginTop: '6%' }}>
                            <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', borderBottomWidth: 1, borderColor: '#00B8FE', paddingBottom: '1%', marginBottom: '6%' }}>
                                <Text style={{ color: "#00B8FE", fontWeight: '600', fontSize: windowHeight * 0.02 }} >Athletics</Text>
                                <View style={{ flexDirection: 'row' }}>
                                    <TouchableOpacity onPress={() => {
                                        getData();
                                        seteditathletics(!editathletics);
                                    }} style={{ marginRight: 10 }}>
                                        <Text><AntDesign name="closecircle" size={24} color="red" /></Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => {
                                        updateathletics();
                                    }}>
                                        <Text><AntDesign name="checkcircle" size={24} color="#00B8FE" /></Text>
                                    </TouchableOpacity>
                                </View>
                            </View>

                            <View style={{ display: 'flex', flexDirection: 'row', width: '100%', marginBottom: '5%' }}>
                                <View style={{ flex: 0.5 }}>
                                    <TouchableOpacity onPress={() => setsportsmodal(true)}>
                                        <Text style={{ textDecorationLine: 'underline', color: 'black', fontWeight: '600', fontSize: windowHeight * 0.02 }}>{data.sportsname}</Text>
                                    </TouchableOpacity>
                                    <Text style={styles.textbottom}>Sport</Text>
                                </View>
                                <View style={{ flex: 0.5 }}>
                                    <TextInput ref={teamref} style={{ color: 'black', fontWeight: '600', fontSize: windowHeight * 0.02, textDecorationLine: 'underline' }} selectionColor='#004467' value={data.team} onChangeText={(t) =>
                                        setdata({
                                            ...data,
                                            "team": t
                                        })} />
                                    <Text style={styles.textbottom}>Team Name</Text>
                                </View>
                            </View>
                            <View style={{ display: 'flex', flexDirection: 'row', width: '100%', marginBottom: '5%' }}>
                                <View style={{ flex: 0.5 }}>
                                    <TouchableOpacity onPress={() => {
                                        setdivisionmodal(true);
                                    }} >
                                        <Text style={{ textDecorationLine: 'underline', color: 'black', fontWeight: '600', fontSize: windowHeight * 0.02 }}>{data.divisions}</Text>
                                    </TouchableOpacity>
                                    <Text style={styles.textbottom}>Division</Text>
                                </View>
                                <View style={{ flex: 0.5 }}>
                                    <TextInput ref={jobref} style={{ color: 'black', fontWeight: '600', fontSize: windowHeight * 0.02, textDecorationLine: 'underline' }} selectionColor='#004467' value={data.jobtitle} onChangeText={(t) =>
                                        setdata({
                                            ...data,
                                            "jobtitle": t
                                        })} />
                                    <Text style={styles.textbottom}>Job Title</Text>
                                </View>
                            </View>
                            <View style={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
                                <View style={{ flex: 0.5 }}>
                                    <View style={{ flexDirection: 'row' }}>
                                        <TouchableOpacity onPress={() => setdata({
                                            ...data,
                                            coaching_gender: "Male"
                                        })} style={{ padding: 5, backgroundColor: data.coaching_gender == "Male" ? "#00B8FE" : 'grey', marginRight: '5%', borderRadius: 20, paddingHorizontal: 10 }}><Text style={{ color: 'white' }}>Male</Text></TouchableOpacity>
                                        <TouchableOpacity onPress={() => setdata({
                                            ...data,
                                            coaching_gender: "Female"
                                        })} style={{ padding: 5, backgroundColor: data.coaching_gender == "Female" ? "#00B8FE" : 'grey', borderRadius: 20, paddingHorizontal: 10 }}><Text style={{ color: 'white' }}>Female</Text></TouchableOpacity>
                                    </View>
                                    <Text style={styles.textbottom}>Coachs</Text>
                                </View>
                            </View>
                            <Text style={{ color: 'black', fontWeight: '600', fontSize: windowHeight * 0.02, marginTop: '6%', marginBottom: '4%' }}>Highlight Reel</Text>
                            <View style={{ paddingHorizontal: '5%' }}>
                                <Image source={require('../assets/image.png')} style={{ width: '100%' }} />
                                <TouchableOpacity onPress={() => setvideoModalVisible(true)}>
                                    <Text style={{ fontWeight: 'bold', color: '#00B8FE', marginVertical: '3%', textAlign: 'center' }}><MaterialCommunityIcons name="pencil" size={16} color="#00B8FE" /> Set video link</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    }
                </View>



                {/* modals */}
                <Modal
                    animationType="fade"
                    transparent={true}
                    visible={emailmodal}
                    onRequestClose={() => {
                        setemailmodal(!emailmodal);
                    }}>
                    <View style={styles.darkeffect}></View>
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <View style={{ alignItems: 'center' }}>
                                <TextInput value={email} onChangeText={(t) => {
                                    setemail(t)
                                }} autoCapitalize="none" selectionColor={"#004467"} placeholder='Email' style={{ marginBottom: 20, borderWidth: 1, borderColor: 'grey', width: windowWidth - 100, paddingLeft: 10, height: 50, borderRadius: 5 }} />

                                <ActivityIndicator size="large" animating={load} color="#004467" style={{ position: "absolute", alignSelf: 'center' }} />
                                <TouchableOpacity disabled={load} onPress={() => updateemail(email)} style={{ backgroundColor: '#2196F3', alignItems: 'center', height: 30, justifyContent: 'center', width: 150, borderRadius: 50, marginBottom: 10 }} ><Text style={{ color: 'white', fontWeight: "bold", fontSize: 14 }}>Submit</Text></TouchableOpacity>



                            </View>

                        </View>
                    </View>
                </Modal>
                <Modal
                    animationType="fade"
                    transparent={true}
                    visible={phonemodal}
                    onRequestClose={() => {
                        setphonemodal(!phonemodal);
                    }}>
                    <View style={styles.darkeffect}></View>
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <View style={{ alignItems: 'center' }}>
                                <TextInput keyboardType='numeric' maxLength={10} disabled={load} value={phone} onChangeText={(t) => {
                                    setphone(t)
                                }} autoCapitalize="none" selectionColor={"#004467"} placeholder='Phone' style={{ marginBottom: 20, borderWidth: 1, borderColor: 'grey', width: windowWidth - 100, paddingLeft: 10, height: 50, borderRadius: 5 }} />

                                <ActivityIndicator size="large" animating={load} color="#004467" style={{ position: "absolute", alignSelf: 'center' }} />
                                <TouchableOpacity disabled={load} onPress={() => updatemobile(phone)} style={{ backgroundColor: '#2196F3', alignItems: 'center', height: 30, justifyContent: 'center', width: 150, borderRadius: 50, marginBottom: 10 }} ><Text style={{ color: 'white', fontWeight: "bold", fontSize: 14 }}>Submit</Text></TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Modal>
                <Modal
                    animationType="fade"
                    transparent={true}
                    visible={modal}
                    onRequestClose={() => {
                        setModalVisible(!modal);
                    }}>
                    <View style={styles.darkeffect}></View>

                    <View style={styles.centeredView}>
                        <View style={{ backgroundColor: '#fafaf7', opacity: 0.98, width: '60%', borderRadius: 10, alignItems: 'center' }}>
                            <Text style={{ fontWeight: '600', marginTop: 10, marginBottom: 5 }}>Select image</Text>
                            <Text style={{ fontSize: 12, color: 'grey', marginBottom: 10 }}>From one of the option</Text>
                            <View style={{ borderTopWidth: 0.5, borderBottomWidth: 0.5, width: '100%', alignItems: 'center', paddingVertical: 15, borderColor: 'grey' }}>
                                <TouchableOpacity onPress={() => onCameraSelect()} style={{ width: '100%', height: 22, alignItems: 'center' }}><Text style={{ color: '#00B8FE', fontSize: 16 }}>Camera</Text></TouchableOpacity>
                            </View>
                            <View style={{ borderBottomWidth: 0.5, width: '100%', alignItems: 'center', paddingVertical: 15, borderColor: 'grey' }}>
                                <TouchableOpacity onPress={() => pickImage()} style={{ width: '100%', height: 22, alignItems: 'center' }}><Text style={{ color: '#00B8FE', fontSize: 16 }}>Photo library</Text></TouchableOpacity>
                            </View>
                            <TouchableOpacity onPress={() => setModalVisible(!modal)} style={{ paddingVertical: 20, width: '100%', alignItems: 'center' }}>
                                <Text style={{ color: 'red', }}>Cancel</Text>
                            </TouchableOpacity>
                        </View>

                    </View>


                </Modal>
                <Modal
                    animationType="fade"
                    transparent={true}
                    visible={ethnicitymodal}
                    onRequestClose={() => {
                        setethnicityModalVisible(!ethnicitymodal);
                    }}>
                    <View style={styles.darkeffect}></View>

                    <View style={styles.centeredView}>
                        <View style={{ backgroundColor: "#fafaf7", padding: 10, borderRadius: 5, width: '70%', maxHeight: '60%' }}>
                            <Text style={{ fontSize: windowHeight * 0.023, fontWeight: '600', }}>Choose your ethnicity</Text>
                            <ScrollView style={{ borderTopWidth: 1, marginTop: windowHeight * 0.008 }}>

                                {
                                    ethnicitydata ?
                                        ethnicitydata.map((i, index) =>
                                            <TouchableOpacity onPress={() => {
                                                setdata({
                                                    ...data,
                                                    "ethnicities": i.ethnicities,
                                                    "ethnicityid": i.id
                                                });
                                                setethnicityModalVisible(false);
                                            }} key={index} style={{ marginVertical: 5, padding: 5 }}>
                                                <Text style={{ fontSize: windowHeight * 0.02, fontWeight: '500' }}>{i.ethnicities}</Text>
                                            </TouchableOpacity>
                                        ) : <Text> No data present</Text>
                                }

                            </ScrollView>
                        </View>
                    </View>
                </Modal>
                <Modal
                    animationType="fade"
                    transparent={true}
                    visible={unistatemodal}
                    onRequestClose={() => {
                        setunistatemodal(!unistatemodal);
                    }}>
                    <View style={styles.darkeffect}></View>
                    <View style={styles.centeredView}>
                        <View style={{ backgroundColor: "#fafaf7", padding: 10, borderRadius: 5, width: '70%', maxHeight: '80%' }}>
                            <Text style={{ fontSize: windowHeight * 0.023, fontWeight: '600', }}>Choose your university state</Text>
                            <ScrollView style={{ borderTopWidth: 1, marginTop: windowHeight * 0.008 }}>

                                {
                                    statedata ?
                                        statedata.map((i, index) =>
                                            <TouchableOpacity onPress={() => {
                                                setdata({
                                                    ...data,
                                                    "College_State": i.statename,
                                                    "collegestateid": i.id
                                                });
                                                setunistatemodal(false);
                                            }} key={index} style={{ marginVertical: 5, padding: 5 }}>
                                                <Text style={{ fontSize: windowHeight * 0.02, fontWeight: '500' }}>{i.statename}</Text>
                                            </TouchableOpacity>
                                        ) : <Text> No data present</Text>
                                }

                            </ScrollView>
                        </View>
                    </View>
                </Modal>
                <Modal
                    animationType="fade"
                    transparent={true}
                    visible={collegesdatamodal}
                    onRequestClose={() => {
                        setcollegesdatamodal(!collegesdatamodal);
                    }}>
                    <View style={styles.darkeffect}></View>
                    <View style={styles.centeredView}>
                        <View style={{ backgroundColor: "#fafaf7", padding: 10, paddingVertical: 20, borderRadius: 5, width: '80%', maxHeight: '80%' }}>
                            <TextInput onChangeText={(t) => filtercolleges(t)} placeholder='Search your college..' style={{ width: '100%', borderWidth: 1, padding: 5, paddingHorizontal: 5, borderRadius: 5, borderColor: 'grey' }} />
                            <ScrollView style={{ borderTopWidth: 1, marginTop: windowHeight * 0.008 }}>
                                {
                                    collegesdata ?
                                        collegesdata.map((i, index) =>
                                            <TouchableOpacity onPress={() => {
                                                setdata({
                                                    ...data,
                                                    "college_name": i.college_name,
                                                    "collegeid": i.id
                                                });
                                                setcollegesdatamodal(false);
                                            }} key={index} style={{ marginVertical: 5, padding: 5 }}>
                                                <Text style={{ fontSize: windowHeight * 0.02, fontWeight: '500' }}>{i.college_name}</Text>
                                            </TouchableOpacity>
                                        ) : <Text> No data present</Text>
                                }
                                <View>
                                    <TouchableOpacity onPress={() => setcollegesdatamodal(false)} style={{ paddingHorizontal: 10 }}>
                                        <Text style={{ color: 'red', fontWeight: '600', textAlign: 'right' }}>Cancel</Text>
                                    </TouchableOpacity>
                                </View>
                            </ScrollView>
                        </View>
                    </View>
                </Modal>
                <Modal
                    animationType="fade"
                    transparent={true}
                    visible={statemodal}
                    onRequestClose={() => {
                        settempstate(undefined);
                        setstatemodal(!statemodal);
                    }}>
                    <View style={styles.darkeffect}></View>
                    <View style={styles.centeredView}>
                        <View style={{ backgroundColor: "#fafaf7", padding: 10, paddingVertical: 20, borderRadius: 5, width: '80%', maxHeight: '80%' }}>
                            <TextInput onChangeText={(t) => filterstate(t)} placeholder='Search your state..' style={{ width: '100%', borderWidth: 1, padding: 5, paddingHorizontal: 5, borderRadius: 5, borderColor: 'grey' }} />
                            <ScrollView style={{ borderTopWidth: 1, marginTop: windowHeight * 0.008 }}>
                                {
                                    statedata ?
                                        statedata.map((i, index) =>
                                            <TouchableOpacity onPress={() => {
                                                settempstate({
                                                    "statename": i.statename,
                                                    "stateid": i.id
                                                });
                                                getcities(i.id);
                                                setstatemodal(false);
                                                setcitymodal(true);
                                            }} key={index} style={{ marginVertical: 5, padding: 5 }}>
                                                <Text style={{ fontSize: windowHeight * 0.02, fontWeight: '500' }}>{i.statename}</Text>
                                            </TouchableOpacity>
                                        ) : <Text> No data present</Text>
                                }
                                <View>
                                    <TouchableOpacity onPress={() => setstatemodal(false)} style={{ paddingHorizontal: 10 }}>
                                        <Text style={{ color: 'red', fontWeight: '600', textAlign: 'right' }}>Cancel</Text>
                                    </TouchableOpacity>
                                </View>
                            </ScrollView>
                        </View>
                    </View>
                </Modal>
                <Modal
                    animationType="fade"
                    transparent={true}
                    visible={citymodal}
                    onRequestClose={() => {
                        setstatemodal(true);
                        setcitymodal(false);
                    }}>
                    <View style={styles.darkeffect}></View>

                    <View style={styles.centeredView}>
                        <View style={{ backgroundColor: "#fafaf7", padding: 10, paddingVertical: 20, borderRadius: 5, width: '80%', maxHeight: '80%' }}>
                            <TextInput onChangeText={(t) => filtercity(t)} placeholder='Search your city..' style={{ width: '100%', borderWidth: 1, padding: 5, paddingHorizontal: 5, borderRadius: 5, borderColor: 'grey' }} />
                            <ScrollView style={{ borderTopWidth: 1, marginTop: windowHeight * 0.008 }}>
                                {
                                    citydata && citydata.length > 0 ?
                                        citydata.map((i, index) =>
                                            <TouchableOpacity onPress={() => {
                                                setdata({
                                                    ...data,
                                                    "city": i.city_name,
                                                    "cityid": i.id,
                                                    "statename": tempstate?.statename,
                                                    "stateid": tempstate?.stateid
                                                });
                                                getcities(i.id);
                                                setcitymodal(false);
                                            }} key={index} style={{ marginVertical: 5, padding: 5 }}>
                                                <Text style={{ fontSize: windowHeight * 0.02, fontWeight: '500' }}>{i.city_name}</Text>
                                            </TouchableOpacity>
                                        ) : <Text> No data present</Text>
                                }
                                <View>
                                    <TouchableOpacity onPress={() => {
                                        setstatemodal(true);
                                        setcitymodal(false);
                                    }} style={{ paddingHorizontal: 10 }}>
                                        <Text style={{ color: 'red', fontWeight: '600', textAlign: 'right' }}>Back</Text>
                                    </TouchableOpacity>
                                </View>
                            </ScrollView>
                        </View>
                    </View>
                </Modal>
                <Modal
                    animationType="fade"
                    transparent={true}
                    visible={videomodal}
                    onRequestClose={() => {
                        setvideoModalVisible(!videomodal);
                    }}>
                    <View style={styles.darkeffect}></View>

                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <View style={{ alignItems: 'center' }}>
                                <TextInput value={data.video} onChangeText={(t) => {
                                    setdata({
                                        ...data,
                                        "video": t
                                    })
                                }} autoCapitalize="none" selectionColor={"#004467"} placeholder='Video Link' style={{ marginBottom: 20, borderWidth: 1, borderColor: 'grey', width: windowWidth - 100, paddingLeft: 10, height: 50, borderRadius: 5 }} />
                                <TouchableOpacity onPress={() => setvideoModalVisible(false)} style={{ backgroundColor: '#2196F3', alignItems: 'center', height: 30, justifyContent: 'center', width: 150, borderRadius: 50, marginBottom: 10 }} ><Text style={{ color: 'white', fontWeight: "bold", fontSize: 14 }}>Submit</Text></TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Modal>
                <Modal
                    animationType="fade"
                    transparent={true}
                    visible={sportsmodal}
                    onRequestClose={() => {
                        setsportsmodal(!sportsmodal);
                    }}>
                    <View style={styles.darkeffect}></View>
                    <View style={styles.centeredView}>
                        <View style={{ backgroundColor: "#fafaf7", padding: 10, borderRadius: 5, width: '70%', maxHeight: '60%' }}>
                            <Text style={{ fontSize: windowHeight * 0.023, fontWeight: '600', }}>Choose  sport</Text>
                            <ScrollView style={{ borderTopWidth: 1, marginTop: windowHeight * 0.008 }}>

                                {
                                    sportsData ?
                                        sportsData.map((i, index) =>
                                            <TouchableOpacity onPress={() => {
                                                setdata({
                                                    ...data,
                                                    "sportsname": i.sportsname,
                                                    "sportid": i.id
                                                });
                                                setsportsmodal(false);
                                            }} key={index} style={{ marginVertical: 5, padding: 5 }}>
                                                <Text style={{ fontSize: windowHeight * 0.02, fontWeight: '500' }}>{i.sportsname}</Text>
                                            </TouchableOpacity>
                                        ) : <Text> No data present</Text>
                                }

                            </ScrollView>
                            <View>
                                <TouchableOpacity onPress={() => setsportsmodal(false)} style={{ paddingHorizontal: 10 }}>
                                    <Text style={{ color: 'red', fontWeight: '600', textAlign: 'right' }}>Cancel</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Modal>
                <Modal
                    animationType="fade"
                    transparent={true}
                    visible={divisionmodal}
                    onRequestClose={() => {
                        setdivisionmodal(!divisionmodal);
                    }}>
                    <View style={styles.darkeffect}></View>
                    <View style={styles.centeredView}>
                        <View style={{ backgroundColor: "#fafaf7", padding: 10, borderRadius: 5, width: '70%', maxHeight: '60%' }}>
                            <Text style={{ fontSize: windowHeight * 0.023, fontWeight: '600', }}>Choose division</Text>
                            <ScrollView style={{ borderTopWidth: 1, marginTop: windowHeight * 0.008 }}>

                                {
                                    divisionData ?
                                        divisionData.map((i, index) =>
                                            <TouchableOpacity onPress={() => {
                                                setdata({
                                                    ...data,
                                                    "divisions": i.divisions,
                                                    "divisionid": i.id
                                                });
                                                setdivisionmodal(false);
                                            }} key={index} style={{ marginVertical: 5, padding: 5 }}>
                                                <Text style={{ fontSize: windowHeight * 0.02, fontWeight: '500' }}>{i.divisions}</Text>
                                            </TouchableOpacity>
                                        ) : <Text> No data present</Text>
                                }

                            </ScrollView>
                            <View>
                                <TouchableOpacity onPress={() => setdivisionmodal(false)} style={{ paddingHorizontal: 10 }}>
                                    <Text style={{ color: 'red', fontWeight: '600', textAlign: 'right' }}>Cancel</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Modal>
            </ScrollView >
            :
            <ActivityIndicator size="large" animating={true} color="#004467" style={{ position: "absolute", top: '50%', left: '45%', zIndex: 10 }} />

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
        paddingTop: 40,
    }, centeredView: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        position: 'absolute',
        width: '100%',
        height: '100%'
    },
    darkeffect: {

        width: '100%',
        height: '100%',
        backgroundColor: 'black',
        opacity: 0.4
    },
    textHead: { color: 'black', fontWeight: '600', fontSize: windowHeight * 0.02 },
    textbottom: { color: 'grey', fontSize: 12 }
})

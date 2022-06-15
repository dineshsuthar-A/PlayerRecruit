import { StyleSheet, Text, View, ImageBackground, Animated, ScrollView, useWindowDimensions, StatusBar, Dimensions, TouchableOpacity, BackHandler, KeyboardAvoidingView, ToastAndroid, ActivityIndicator } from 'react-native'
import React, { useState, useRef } from 'react'
import RegistrationStudentPersonal from './RegistrationStudentFormComponents/RegistrationStudentPersonal'
import RegistrationStudentSchool from './RegistrationStudentFormComponents/RegistrationStudentSchool'
import RegistrationStudentFinal from './RegistrationStudentFormComponents/RegistrationStudentFinal'
import RegistrationStudentAthletic from './RegistrationStudentFormComponents/RegistrationStudentAthletic'
import RegistrationStudentInfo from './RegistrationStudentFormComponents/RegistrationStudentInfo'
import { useFocusEffect } from '@react-navigation/native'
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';

import * as SecureStore from 'expo-secure-store';

const windowHeight = Dimensions.get("window").height;
export default function Registration_student({ navigation }) {

    const [st, setst] = useState(false);
    const [s1, sets1] = useState({});
    const [s2, sets2] = useState({});
    const [s3, sets3] = useState({
        "sports": [],
        "hand": "Right"
    });
    const [s4, sets4] = useState({});
    const [step, setstep] = useState(1);

    const scrollX = useRef(new Animated.Value(0)).current;
    const scrollBar = useRef();
    const windowWidth = Dimensions.get("window").width;

    const onNext = async () => {
        if (step == 1) {
            setstep(step + 1);
            scrollBar?.current?.scrollTo({ x: windowWidth * 1, animated: true });
        } else if (step == 2) {
            if (!(s1.firstname && s1.dob && s1.city && s1.lastname)) {
                ToastAndroid.show("Fill up all the columns", ToastAndroid.SHORT);
            } else if (!(s1.gender)) {
                ToastAndroid.show("Choose Gender", ToastAndroid.SHORT);
            } else if (!(s1.state)) {
                ToastAndroid.show("Pick your state", ToastAndroid.SHORT);
            } else if (!(s1.ethnicity)) {
                ToastAndroid.show("Pick your ethnicity", ToastAndroid.SHORT);
            } else {
                scrollBar?.current?.scrollTo({ x: windowWidth * 2, animated: true });
                setstep(step + 1);
            }
        } else if (step == 3) {
            if (!(s2?.act && s2?.sat && s2?.schoolname)) {
                ToastAndroid.show("Fill up all the columns.", ToastAndroid.SHORT);
            } else if (!(s2?.scholastic_year)) {
                ToastAndroid.show("Pick your scholastic year.", ToastAndroid.SHORT);
            } else if (!(s2?.gpa)) {
                ToastAndroid.show("Pick your GPA.", ToastAndroid.SHORT);
            } else if (!s2?.school) {
                ToastAndroid.show("Choose school type.", ToastAndroid.SHORT);
            } else if (isNaN(s2.act)) {
                ToastAndroid.show("Invalid act value", ToastAndroid.SHORT);
            } else if (isNaN(s2.sat)) {
                ToastAndroid.show("Invalid Sat value", ToastAndroid.SHORT);
            } else {
                scrollBar?.current?.scrollTo({ x: windowWidth * 3, animated: true });
                setstep(step + 1);
            }
        } else if (step == 4) {
            if (!(s3.height && s3.weight && s3.wingspan)) {
                ToastAndroid.show("Fill up all the columns", ToastAndroid.SHORT);
            } else if (isNaN(s3.height)) {
                ToastAndroid.show("Invalid height value.", ToastAndroid.SHORT);
            } else if (isNaN(s3.weight)) {
                ToastAndroid.show("Invalid weight value.", ToastAndroid.SHORT);
            } else if (isNaN(s3.wingspan)) {
                ToastAndroid.show("Invalid wingspan value.", ToastAndroid.SHORT);
            } else if (s3.sports.length < 1) {
                ToastAndroid.show("At least choose one sport.", ToastAndroid.SHORT);
            } else {
                scrollBar?.current?.scrollTo({ x: windowWidth * 4, animated: true });
                setstep(step + 1);
            }
        } else {
            if (!(s4.image)) {
                ToastAndroid.show("Choose image", ToastAndroid.SHORT);
            } else if (!(s4.bio)) {
                ToastAndroid.show("Fill up the bio.", ToastAndroid.SHORT);
            } else if (!(s4.video)) {
                ToastAndroid.show("Insert the video link.", ToastAndroid.SHORT);
            } else {
                var date = new Date();
                const age = parseInt(date.getFullYear()) - parseInt(s1.dob.split("-")[0]);
                setst(true);
                const fd = new FormData();
                fd.append("image", s4.image);
                const token = "Bearer " + await SecureStore.getItemAsync("token");
                await axios.post("/api/student/register",
                    {
                        "firstname": s1.firstname.trim(),
                        "lastname": s1.lastname.trim(),
                        "dob": s1.dob,
                        "age": 2,
                        "gender": s1.gender,
                        "state": s1.state,
                        "city": s1.city.trim(),
                        "ethnicity": s1.ethnicity,
                        "school_type": s2.school,
                        "school_name": s2.schoolname.trim(),
                        "scholastic_year": s2.scholastic_year,
                        "gpa": s2.gpa,
                        "sat": parseFloat(s2.sat),
                        "act": parseFloat(s2.act),
                        "sports": s3.sports,
                        "height": parseFloat(s3.height),
                        "weight": parseFloat(s3.weight),
                        "wingspan": parseFloat(s3.wingspan),
                        "dominant_hand": s3.hand,
                        "personal_bio": s4.bio.trim(),
                        "video": s4.video.trim()
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
                    setst(false);
                    await SecureStore.setItemAsync("type", "1");
                    ToastAndroid.show("Registered.", ToastAndroid.SHORT);
                    navigation.reset({
                        index: 0,
                        routes: [{ name: "Main" }]
                    });

                }).catch((err) => {
                    setst(false);
                    console.log(err.response.data);
                    ToastAndroid.show(err?.response?.data?.error ? err?.response?.data?.error : "Try again! some error occured.", ToastAndroid.SHORT);
                });
            }
        }

    }

    const backAction = async () => {
        if (step == 5) {
            scrollBar?.current?.scrollTo({ x: windowWidth * 3, animated: true });
        }
        if (step == 2) {
            scrollBar?.current?.scrollTo({ x: 0, animated: true });
        }
        if (step == 4) {
            scrollBar?.current?.scrollTo({ x: windowWidth * 2, animated: true });
        }
        if (step == 3) {
            scrollBar?.current?.scrollTo({ x: windowWidth * 1, animated: true });
        }

        if (step > 1) {
            setstep(step - 1);
        } else {
            navigation.pop();
        }
        return true;
    };
    useFocusEffect(React.useCallback(() => {
        const backHandler = BackHandler.addEventListener(
            "hardwareBackPress",
            backAction
        );
        return () => backHandler.remove();
    }, [step]));

    return (

        <ImageBackground source={require('../assets/bg.png')} style={{ backgroundColor: "#004467", width: "100%", height: "100%" }}>
            <ActivityIndicator animating={st} size="large" style={{ position: 'absolute', top: '43%', left: '43%', zIndex: 10 }} color="#004467" />
            <StatusBar barStyle="light-content" backgroundColor="#004467" />
            <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}   >
                <View style={{ width: windowWidth, height: windowHeight * 0.08, alignItems: 'center', paddingHorizontal: windowWidth * 0.04, shadowOffset: 3, shadowColor: "white", flexDirection: 'row', }}>
                    <TouchableOpacity onPress={() => backAction()} style={{ padding: windowHeight * 0.01, borderRadius: windowHeight * 0.2, marginRight: windowWidth * 0.02 }}>
                        <Ionicons name="chevron-back" size={windowHeight * 0.028} color="white" />
                    </TouchableOpacity>
                    <Text style={{
                        fontSize: windowHeight * 0.025,
                        fontWeight: 'bold',
                        color: "white",
                        fontFamily: "Roboto"
                    }}> {(step == 1) ? "Registration Student Info" : (step == 2) ? "Student Registration" : (step == 3) ? "Academic Information" : (step == 4) ? "Athletic Information" : (step == 5) ? "Athletic Bio" : "Student Registration"}</Text>
                </View>

                <ScrollView ref={scrollBar} horizontal={true} pagingEnabled scrollEnabled={false} showsHorizontalScrollIndicator={false}
                    scrollEventThrottle={1}
                    style={{ height: windowHeight * 0.75 }}
                >
                    <RegistrationStudentInfo />
                    <RegistrationStudentPersonal data={s1} setdata={sets1} />
                    <RegistrationStudentSchool data={s2} setdata={sets2} />
                    <RegistrationStudentAthletic data={s3} setdata={sets3} />
                    <RegistrationStudentFinal data={s4} setdata={sets4} />
                </ScrollView>


                <View style={{ height: windowHeight * 0.14, width: '100%', paddingHorizontal: '11%', alignItems: 'center', marginTop: '3%' }}>
                    <View style={{ display: 'flex', flexDirection: 'row' }}>
                        <Text style={(step == 2 || step == 3 || step == 4 || step == 5) ? styles.activedot : styles.dot}></Text>
                        <Text style={(step == 3 || step == 4 || step == 5) ? styles.activedot : styles.dot}></Text>
                        <Text style={(step == 4 || step == 5) ? styles.activedot : styles.dot}></Text>
                        <Text style={(step == 5) ? styles.activedot : styles.dot}></Text>
                    </View>
                    <TouchableOpacity onPress={() => onNext()} style={styles.button}><Text style={{ height: '100%', textAlignVertical: 'center', color: 'white', fontWeight: 'bold' }}>{(step == 5) ? "Finish" : (step == 1) ? "Begin" : "Next"}</Text></TouchableOpacity>
                </View>

            </ScrollView>
        </ImageBackground >
    )
}

const styles = StyleSheet.create({
    activedot: {
        height: 15, width: 15, borderWidth: 1, borderColor: "#CCD4D8", borderRadius: 10, marginRight: 4, backgroundColor: "#CCD4D8"
    },
    dot: { height: 15, width: 15, borderWidth: 1, borderColor: "#CCD4D8", borderRadius: 10, marginRight: 4 },
    button: {
        backgroundColor: '#00B8FE',
        width: '100%',
        alignItems: 'center',
        height: windowHeight * 0.07,
        borderRadius: windowHeight * 0.05,
        marginTop: windowHeight * 0.03

    },
})
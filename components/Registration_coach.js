import { StyleSheet, Text, View, ImageBackground, Animated, ScrollView, StatusBar, Dimensions, TouchableOpacity, BackHandler, KeyboardAvoidingView, ToastAndroid, ActivityIndicator } from 'react-native'
import React, { useState, useRef } from 'react'
import RegistrationStudentPersonal from './RegistrationStudentFormComponents/RegistrationStudentPersonal'
import RegistrationStudentFinal from './RegistrationStudentFormComponents/RegistrationStudentFinal'
import RegistrationCoachAthletic from './RegistrationCoachFormComponent/RegistrationCoachAthletic'
import RegistrationCoachAcademic from './RegistrationCoachFormComponent/RegistrationCoachAcademic'
import { useFocusEffect } from '@react-navigation/native'
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';
var validator = require('validator');

import * as SecureStore from 'expo-secure-store';
import RegistrationCoachInfo from './RegistrationCoachFormComponent/RegistrationCoachInfo'

const windowHeight = Dimensions.get("window").height;
export default function Registration_coach({ navigation }) {

    const [st, setst] = useState(false);
    const [s1, sets1] = useState({});
    const [s2, sets2] = useState({});
    const [s3, sets3] = useState({});
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
            if (!(s2.college_name && s2.universityemail)) {
                ToastAndroid.show("Fill up all the columns.", ToastAndroid.SHORT);
            } else if (!s2.college_state) {
                ToastAndroid.show("Pick your college state.", ToastAndroid.SHORT);
            } else if (!(validator.isEmail(s2.universityemail))) {
                ToastAndroid.show("Invalid email", ToastAndroid.SHORT);
            } else {
                scrollBar?.current?.scrollTo({ x: windowWidth * 3, animated: true });
                setstep(step + 1);
            }
        } else if (step == 4) {
            if (!(s3.jobtitle && s3.team_name)) {
                ToastAndroid.show("Fill up all the columns.", ToastAndroid.SHORT);
            } else if (!s3.division) {
                ToastAndroid.show("Pick your division.", ToastAndroid.SHORT);
            } else if (!s3.sport) {
                ToastAndroid.show("Pick sport.", ToastAndroid.SHORT);
            } else if (!s3.player_gender) {
                ToastAndroid.show("Choose gender.", ToastAndroid.SHORT);
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
                setst(true);
                const fd = new FormData();
                fd.append("image", s4.image);
                const token = "Bearer " + await SecureStore.getItemAsync("token");
                await axios.post("/api/coach/register",
                    {
                        "firstname": s1.firstname.trim(),
                        "lastname": s1.lastname.trim(),
                        "dob": s1.dob,
                        "gender": s1.gender,
                        "state": s1.state,
                        "city": s1.city.id,
                        "ethnicity": s1.ethnicity,
                        "college_name": s2.college_name.id,
                        "college_state": s2.college_state,
                        "university_email": s2.universityemail,
                        "sport_coach": s3.sport,
                        "coaching_gender": s3.player_gender,
                        "team_name": s3.team_name.trim(),
                        "division": s3.division,
                        "job_title": s3.jobtitle.trim(),
                        "personal_bio": s4.bio.trim(),
                        "video": s4.video.trim()
                    },
                    {
                        headers: {
                            "Authorization": token
                        }
                    }
                ).then(async (response) => {

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
                    setst(false);
                    await SecureStore.setItemAsync("type", "2");
                    ToastAndroid.show("Registered", ToastAndroid.SHORT);
                    navigation.reset({
                        index: 0,
                        routes: [{ name: "CoachMain" }]
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
                    }}> {(step == 1) ? "Registration Coach Info" : (step == 2) ? "Coach Registration" : (step == 3) ? "Academic Information" : (step == 4) ? "Athletic Information" : (step == 5) ? "Athletic Bio" : "Student Registration"}</Text>
                </View>

                <ScrollView ref={scrollBar} horizontal={true} pagingEnabled scrollEnabled={false} showsHorizontalScrollIndicator={false}
                    scrollEventThrottle={1}
                    style={{ height: windowHeight * 0.74 }}
                >
                    <RegistrationCoachInfo />
                    <RegistrationStudentPersonal data={s1} setdata={sets1} />
                    <RegistrationCoachAcademic data={s2} setdata={sets2} />
                    <RegistrationCoachAthletic data={s3} setdata={sets3} />
                    <RegistrationStudentFinal data={s4} type={"coach"} setdata={sets4} />
                </ScrollView>


                <View style={{ height: windowHeight * 0.18, width: '100%', paddingHorizontal: '11%', alignItems: 'center', marginTop: '3%' }}>
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
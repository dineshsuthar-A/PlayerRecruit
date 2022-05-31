import { StyleSheet, StatusBar, ImageBackground, ScrollView, ToastAndroid, Text, Dimensions, Platform, View, KeyboardAvoidingView, SafeAreaView, Image, TouchableOpacity, TextInput } from 'react-native'
import { Picker } from '@react-native-picker/picker';
import React, { useState, useEffect } from 'react';

const windowHeight = Dimensions.get('window').height;
export default function RegistrationStudentSchool({ route, navigation }) {
    const [school, setSchool] = useState();
    const [schoolname, setSchoolname] = useState();
    const [syear, setsyear] = useState();
    const [gpa, setgpa] = useState();
    const [sat, setsat] = useState();
    const [act, setact] = useState();

    const onNext = () => {
        if (!(school && schoolname && syear && gpa && sat && act)) {
            ToastAndroid.show("Fill all columns", ToastAndroid.SHORT);
        } else {
            const a = route.params;
            a.school = school;
            a.schoolname = schoolname;
            a.scholasticyear = syear;
            a.gpa = gpa;
            a.sat = sat;
            a.act = act;
            navigation.navigate("RegistrationStudentAthletic", a);
        }
    }
    return (
        <ImageBackground source={require('../assets/bg.png')} style={{ backgroundColor: "#004467", width: "100%", height: "100%" }}>
            <ScrollView contentContainerStyle={{ flexGrow: 1 }} style={styles.fullView} showsVerticalScrollIndicator={false} >
                <StatusBar barStyle="light-content" backgroundColor="#004467" />
                <View style={{ display: 'flex', width: '100%', height: '100%' }}>

                    <View style={styles.main}>
                        <Text style={{ color: "white", fontWeight: "bold", fontSize: 16, fontFamily: "Roboto" }}>Which type of school do you attend?</Text>
                        <View style={{ display: "flex", flexDirection: "row", marginTop: 10 }}>
                            <TouchableOpacity onPress={() => setSchool("Highschool")} style={school != "Highschool" ? styles.gender : styles.activeGender}><Image source={require("../assets/schoolblack.png")} /><Text > Highschool</Text></TouchableOpacity>
                            <TouchableOpacity onPress={() => setSchool("College")} style={school != "College" ? styles.gender : styles.activeGender}><Image source={require("../assets/schoolblack.png")} /><Text> College</Text></TouchableOpacity>
                        </View>
                        <TextInput onChangeText={(t) => setSchoolname(t)} placeholder='School/College name' style={styles.textBox} />
                        <TextInput onChangeText={(t) => setsyear(t)} placeholder='Scholastic year' style={styles.textBox} />
                        <TextInput onChangeText={(t) => setgpa(t)} placeholder='GPA' style={styles.textBox} />
                        <TextInput onChangeText={(t) => setsat(t)} placeholder='SAT' style={styles.textBox} />
                        <TextInput onChangeText={(t) => setact(t)} placeholder='ACT' style={styles.textBox} />
                    </View>
                    <View style={{ flex: 0.2, width: '100%', paddingHorizontal: '11%', alignItems: 'center', marginTop: '3%' }}>
                        <View style={{ display: 'flex', flexDirection: 'row' }}>
                            <Text style={styles.activedot}></Text>

                            <Text style={styles.activedot}></Text>

                            <Text style={styles.dot}></Text>

                            <Text style={styles.dot}></Text>
                        </View>
                        <TouchableOpacity onPress={() => onNext()} style={styles.button}><Text style={{ height: '100%', textAlignVertical: 'center', color: 'white', fontWeight: 'bold' }}>Next</Text></TouchableOpacity>
                    </View>

                </View>
            </ScrollView>

        </ImageBackground >
    )
}

const styles = StyleSheet.create({
    gender: {
        backgroundColor: "#CBD5DB",
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 20,
        padding: windowHeight * 0.008,
        paddingHorizontal: 10,
        marginRight: 10
    },
    activeGender: {
        backgroundColor: "#00B8FE",
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 20,
        padding: windowHeight * 0.008,
        paddingHorizontal: 10,
        marginRight: 10
    },
    activedot: {
        height: 15, width: 15, borderWidth: 1, borderColor: "#CCD4D8", borderRadius: 10, marginRight: 4, backgroundColor: "#CCD4D8"
    },
    dot: { height: 15, width: 15, borderWidth: 1, borderColor: "#CCD4D8", borderRadius: 10, marginRight: 4 },
    button: {
        backgroundColor: '#00B8FE',
        width: '100%',
        marginTop: windowHeight * 0.06,
        alignItems: 'center',
        height: windowHeight * 0.07,
        borderRadius: 30

    },
    textBox: {
        backgroundColor: "white",
        marginTop: windowHeight * 0.02,
        color: "black",
        width: "100%",
        height: windowHeight * 0.07,
        borderRadius: 5,
        paddingLeft: 20,
        fontSize: windowHeight * 0.02
    },
    pickerbox: {
        marginTop: windowHeight * 0.02,
        backgroundColor: 'white',
        width: '100%',
        borderRadius: 20
    },
    main: {
        flex: 0.8,
        paddingHorizontal: '11%'
    },
    fullView: {
        paddingTop: windowHeight * 0.03,
        width: '100%',
        height: '100%'
    },
})
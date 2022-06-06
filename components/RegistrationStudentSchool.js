import { StyleSheet, StatusBar, ImageBackground, ScrollView, ToastAndroid, Text, Dimensions, Platform, View, KeyboardAvoidingView, SafeAreaView, Image, TouchableOpacity, TextInput } from 'react-native'
import { Picker } from '@react-native-picker/picker';
import React, { useState, useEffect } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import dataapis from '../apicalls/dataapis';
const windowHeight = Dimensions.get('window').height;
export default function RegistrationStudentSchool({ route, navigation }) {
    const [school, setSchool] = useState();
    const [schoolname, setSchoolname] = useState();
    const [syear, setsyear] = useState();
    const [gpa, setgpa] = useState(null);
    const [sat, setsat] = useState();
    const [act, setact] = useState();
    const [GPADATA, setGPADATA] = useState();

    const onNext = () => {
        if (!(school && schoolname && syear && gpa && sat && act)) {
            ToastAndroid.show("Fill all columns", ToastAndroid.SHORT);
        } else if (isNaN(sat)) {
            ToastAndroid.show("SAT should be numeric.", ToastAndroid.SHORT);
        } else if (isNaN(act)) {
            ToastAndroid.show("ACT should be numeric.", ToastAndroid.SHORT);
        } else if (isNaN(syear)) {
            ToastAndroid.show("Scholastic year should be numeric.", ToastAndroid.SHORT);
        } else if (syear.length < 4) {
            ToastAndroid.show("Enter year in four digit format.", ToastAndroid.SHORT);
        } else {
            const a = route.params;
            console.log(a);
            a.school = school;
            a.schoolname = schoolname.trim();
            a.scholasticyear = syear;
            a.gpa = gpa;
            a.sat = sat;
            a.act = act;
            navigation.navigate("RegistrationStudentAthletic", a);
        }
    }
    const getdata = () => {
        dataapis.getgpadata().then((response) => {
            setGPADATA(response.data.gpa);
        }).catch((err) => {
            ToastAndroid.show("Some error occured,Try again.", ToastAndroid.SHORT);
        })
    }
    useFocusEffect(React.useCallback(() => {
        getdata();
    }, []));
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
                        <TextInput onChangeText={(t) => setSchoolname(t)} placeholder='School/College name' placeholderTextColor='grey' style={styles.textBox} />
                        <TextInput onChangeText={(t) => setsyear(t)} keyboardType="number-pad" maxLength={4} placeholder='Scholastic year' placeholderTextColor='grey' style={styles.textBox} />
                        <View style={{ width: "100%", borderRadius: 5, overflow: "hidden", backgroundColor: "white", height: windowHeight * 0.07, alignItems: 'center', marginTop: windowHeight * 0.02, paddingLeft: windowHeight * 0.02 }}>
                            <Picker style={styles.pickerbox} selectedValue={gpa} onValueChange={(itemValue, itemIndex) => setgpa(itemValue)} >
                                <Picker.Item label="GPA" style={{ fontSize: windowHeight * 0.019, marginLeft: 40, color: 'grey' }} value={null} />

                                {GPADATA ?
                                    GPADATA.map((i, index) => <Picker.Item style={{ fontSize: windowHeight * 0.02, fontFamily: "Roboto" }} key={index} value={i.id} label={i.gpa.toString()} />)
                                    : null
                                }
                            </Picker>
                        </View>
                        <TextInput onChangeText={(t) => setsat(t)} keyboardType="numeric" placeholderTextColor='grey' placeholder='SAT' style={styles.textBox} />
                        <TextInput onChangeText={(t) => setact(t)} keyboardType="numeric" placeholderTextColor='grey' placeholder='ACT' style={styles.textBox} />
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
    }, pickerbox: {
        backgroundColor: 'white',
        width: '100%',
        height: '100%',

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
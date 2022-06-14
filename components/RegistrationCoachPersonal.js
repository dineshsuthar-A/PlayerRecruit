import { StyleSheet, StatusBar, ImageBackground, ScrollView, Text, Dimensions, ToastAndroid, View, KeyboardAvoidingView, SafeAreaView, Image, TouchableOpacity, TextInput } from 'react-native'
import { Picker } from '@react-native-picker/picker';
import React, { useState, useEffect } from 'react';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { useFocusEffect } from '@react-navigation/native';
import axios from 'axios';
const windowHeight = Dimensions.get('window').height;
const dataapis = require("../apicalls/dataapis");

export default function RegistrationCoachPersonal({ navigation }) {
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [date, setDate] = useState();
    const [gender, setGender] = useState();
    const [firstname, setFirstname] = useState();
    const [lastname, setLastname] = useState();
    const [city, setCity] = useState();
    const [ethnicity, setethnicity] = useState();
    const [state, setState] = useState();
    const [orginaldate, setoriginaldate] = useState();
    const [statedata, setstatedata] = useState();
    const [etha, setEtha] = useState();
    const onNext = () => {
        if (!(date && gender && firstname && lastname && city && ethnicity && state)) {
            ToastAndroid.show("Fill All Details", ToastAndroid.SHORT);
        } else {

            navigation.navigate("RegistrationCoachAcademic", {
                "firstname": firstname.trim(),
                "lastname": lastname.trim(),
                gender,
                "date": orginaldate,
                "city": city.trim(),
                ethnicity,
                state
            });

        }
    }


    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };
    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };
    const handleConfirm = (d) => {
        var day = d.getDate();
        var month = d.getMonth() + 1;
        var year = d.getFullYear();
        setoriginaldate(year + "-" + month + "-" + day);
        var da = (day < 10 ? ("0" + day) : day) + "/" + (month < 10 ? ("0" + month) : month) + "/" + year;
        setDate(da);
        hideDatePicker();
    };
    const getdata = () => {
        dataapis.getStateData().then((response) => {
            setstatedata(response.data.states);
        }).catch((err) => {
            ToastAndroid.show("Some error occured, not able to reach server.", ToastAndroid.SHORT);
        });
        dataapis.getethanicitydata().then((response) => {
            setEtha(response.data.ethnicity);
        }).catch((error) => {
            ToastAndroid.show("Some error occured, not able to reach server.", ToastAndroid.SHORT);
        });
    }
    useFocusEffect(React.useCallback(() => {
        getdata();
    }, []));
    return (
        <ImageBackground source={require('../assets/bg.png')} style={{ backgroundColor: "#004467", width: "100%", height: "100%" }}>
            <ScrollView contentContainerStyle={{ flexGrow: 1 }} style={styles.fullView} keyboardShouldPersistTaps="handled" contentInsetAdjustmentBehavior='automatic'
                showsVerticalScrollIndicator={false}>
                <KeyboardAvoidingView enabled>
                    <StatusBar barStyle="light-content" backgroundColor="#004467" />
                    <View style={{ width: '100%', height: '100%', display: 'flex' }}>
                        <View style={{ flex: 0.75, width: '100%', paddingHorizontal: '11%' }}>
                            <View style={styles.main}>
                                <TextInput selectionColor={"#004467"} onChangeText={(t) => setFirstname(t)} placeholderTextColor="grey" placeholder='First name' style={styles.textBox} />
                                <TextInput selectionColor={"#004467"} onChangeText={(t) => setLastname(t)} placeholderTextColor="grey" placeholder='Last name' style={styles.textBox} />
                                <TouchableOpacity onPress={() => showDatePicker()} style={{ backgroundColor: "white", width: "100%", display: "flex", flexDirection: "row", justifyContent: "space-between", paddingHorizontal: 20, alignItems: "center", borderRadius: 5, height: windowHeight * 0.07, marginTop: '5%' }}><Text style={date ? { color: "black", marginRight: 10 } : { color: 'grey', marginRight: 10 }}  >{date ? date : "Birthday"}</Text><Image source={require('../assets/event_black.png')} /></TouchableOpacity>
                                <DateTimePickerModal
                                    isVisible={isDatePickerVisible}
                                    mode="date"
                                    onConfirm={handleConfirm}
                                    onCancel={hideDatePicker}
                                    maximumDate={new Date()}
                                />
                            </View>
                            <View style={{ display: "flex", flexDirection: "row", marginTop: '5%', marginBottom: "5%" }}>
                                <TouchableOpacity onPress={() => setGender("Male")} style={gender == "Male" ? styles.activeGender : styles.gender}><Image source={require("../assets/maleblack.png")} /><Text >Male</Text></TouchableOpacity>
                                <TouchableOpacity onPress={() => setGender("Female")} style={gender == "Female" ? styles.activeGender : styles.gender}><Image source={require("../assets/femaleblack.png")} /><Text>Female</Text></TouchableOpacity>
                            </View>

                            <View style={styles.main}>
                                <View style={{ width: "100%", borderRadius: 5, overflowX: 'hidden', overflow: "hidden", backgroundColor: "white", height: windowHeight * 0.07, alignItems: 'center', paddingHorizontal: 10, }}>
                                    <Picker style={styles.pickerbox} selectedValue={state} onValueChange={(itemValue, itemIndex) => setState(itemValue)} >
                                        <Picker.Item label="State" style={{ fontSize: windowHeight * 0.02, marginLeft: 20, color: 'grey' }} />
                                        {statedata ?
                                            statedata.map((i, index) => <Picker.Item style={{ fontSize: windowHeight * 0.02, fontFamily: "Roboto" }} label={i.statename} value={i.id} key={index} />)
                                            : null
                                        }
                                    </Picker>
                                </View>
                                <TextInput selectionColor={"#004467"} placeholder='City' onChangeText={(t) => setCity(t)} placeholderTextColor="grey" style={styles.textBox} />

                                <View style={styles.pickerOuter}>
                                    <Picker
                                        style={styles.pickerbox} selectedValue={ethnicity} onValueChange={(itemValue, itemIndex) => setethnicity(itemValue)}>
                                        <Picker.Item label="Ethnicity" value="null" style={{ fontSize: windowHeight * 0.02, marginLeft: 20, color: 'grey' }} />
                                        {
                                            etha ?
                                                etha.map((i, index) => <Picker.Item style={{ fontSize: windowHeight * 0.02, fontFamily: "Roboto" }} label={i.ethnicities} value={i.id} key={index} />) : null
                                        }
                                    </Picker>
                                </View>
                            </View>
                        </View>
                        <View style={{ flex: 0.25, alignItems: 'center', paddingHorizontal: '11%', width: '100%', marginTop: windowHeight * 0.02 }}>
                            <View style={{ display: 'flex', flexDirection: 'row' }}>
                                <Text style={styles.activedot}></Text>

                                <Text style={styles.dot}></Text>

                                <Text style={styles.dot}></Text>

                                <Text style={styles.dot}></Text>
                            </View>
                            <TouchableOpacity onPress={() => onNext()} style={styles.button}><Text style={{ height: '100%', textAlignVertical: 'center', color: 'white', fontWeight: 'bold', fontSize: windowHeight * 0.02 }}>Next</Text></TouchableOpacity>
                        </View>
                    </View>
                </KeyboardAvoidingView>
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
        marginTop: windowHeight * 0.06

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
    gender: {
        backgroundColor: "#CBD5DB",
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 20,
        padding: windowHeight * 0.008,
        paddingHorizontal: 10,
        marginRight: 10,
        width: '35%'
    },
    activeGender: {
        backgroundColor: "#00B8FE",
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 20,
        marginRight: 10,
        padding: windowHeight * 0.008,
        width: '35%'
    },
    pickerbox: {
        backgroundColor: 'white',
        width: '100%',
        borderRadius: 20,
    },
    pickerOuter: {
        width: "100%",
        borderRadius: 5,
        backgroundColor: "white",
        alignItems: 'center',
        paddingHorizontal: 0,
        marginTop: '5%'
    },
    main: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: '100%'
    },
    fullView: {
        paddingTop: windowHeight * 0.03,
        width: '100%',
        height: '100%'
    },
})
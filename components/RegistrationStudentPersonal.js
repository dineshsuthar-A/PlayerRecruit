import { StyleSheet, StatusBar, ImageBackground, ScrollView, Text, ActivityIndicator, ToastAndroid, View, KeyboardAvoidingView, SafeAreaView, Image, TouchableOpacity, TextInput } from 'react-native'
import { Picker } from '@react-native-picker/picker';
import React, { useState, useEffect } from 'react';
import DateTimePickerModal from "react-native-modal-datetime-picker";
export default function RegistrationStudentPersonal({ navigation }) {
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [date, setDate] = useState();
    const [gender, setGender] = useState();
    const [firstname, setFirstname] = useState();
    const [lastname, setLastname] = useState();
    const [city, setCity] = useState();
    const [ethnicity, setethnicity] = useState();
    const [state, setState] = useState();
    const [orginaldate, setoriginaldate] = useState();


    const onNext = () => {
        if (!(date && gender && firstname && lastname && city && ethnicity && state)) {
            ToastAndroid.show("Fill All Details", ToastAndroid.SHORT);
        } else {

            navigation.navigate("RegistrationStudentSchool", {
                firstname,
                lastname,
                gender,
                "date": orginaldate,
                city,
                ethnicity,
                state
            });
        }
    }

    const [statedata, setstatedata] = useState(
        [
            "Andhra Pradesh",
            "Arunachal Pradesh",
            "Assam",
            "Bihar",
            "Chhattisgarh",
            "Goa",
            "Gujarat",
            "Haryana",
            "Himachal Pradesh",
            "Jammu and Kashmir",
            "Jharkhand",
            "Karnataka",
            "Kerala",
            "Madhya Pradesh",
            "Maharashtra",
            "Manipur",
            "Meghalaya",
            "Mizoram",
            "Nagaland",
            "Odisha",
            "Punjab",
            "Rajasthan",
            "Sikkim",
            "Tamil Nadu",
            "Telangana",
            "Tripura",
            "Uttarakhand",
            "Uttar Pradesh",
            "West Bengal",
            "Andaman and Nicobar Islands",
            "Chandigarh",
            "Dadra and Nagar Haveli",
            "Daman and Diu",
            "Delhi",
            "Lakshadweep",
            "Puducherry"
        ]);
    const [etha, setEtha] = useState(["White", "Black", "Hispanic", "Asian American", "Pacific Islander", "American Indian", "Unclassified"]);

    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };
    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };
    const handleConfirm = (d) => {
        setoriginaldate(d.toString());
        var day = d.getDate();
        var month = d.getMonth() + 1;
        var year = d.getFullYear();
        var da = (day < 10 ? ("0" + day) : day) + "/" + (month < 10 ? ("0" + month) : month) + "/" + year;
        setDate(da);
        hideDatePicker();
    };

    return (
        <ImageBackground source={require('../assets/bg.png')} style={{ backgroundColor: "#004467", width: "100%", height: "100%" }}>
            <ScrollView contentContainerStyle={{ flexGrow: 1 }} style={styles.fullView} keyboardShouldPersistTaps="handled" contentInsetAdjustmentBehavior='automatic'
                showsVerticalScrollIndicator={false}>
                <StatusBar barStyle="light-content" backgroundColor="#004467" />
                <View style={{ width: '100%', height: '100%', display: 'flex' }}>
                    <View style={{ flex: 0.75, width: '100%', paddingHorizontal: '11%' }}>
                        <View style={styles.main}>
                            <TextInput onChangeText={(t) => setFirstname(t)} placeholderTextColor="grey" placeholder='First name' style={styles.textBox} />
                            <TextInput onChangeText={(t) => setLastname(t)} placeholderTextColor="grey" placeholder='Last name' style={styles.textBox} />
                            <TouchableOpacity onPress={() => showDatePicker()} style={{ backgroundColor: "white", width: "100%", display: "flex", flexDirection: "row", justifyContent: "space-between", paddingHorizontal: 20, alignItems: "center", borderRadius: 5, height: 50, marginTop: '5%' }}><Text style={date ? { color: "black", marginRight: 10 } : { color: 'grey', marginRight: 10 }}  >{date ? date : "Birthday"}</Text><Image source={require('../assets/event_black.png')} /></TouchableOpacity>
                            <DateTimePickerModal
                                isVisible={isDatePickerVisible}
                                mode="date"
                                onConfirm={handleConfirm}
                                onCancel={hideDatePicker}
                            />
                        </View>
                        <View style={{ display: "flex", flexDirection: "row", marginTop: '5%', marginBottom: "5%" }}>
                            <TouchableOpacity onPress={() => setGender("Male")} style={gender == "Male" ? styles.activeGender : styles.gender}><Image source={require("../assets/maleblack.png")} /><Text >Male</Text></TouchableOpacity>
                            <TouchableOpacity onPress={() => setGender("Female")} style={gender == "Female" ? styles.activeGender : styles.gender}><Image source={require("../assets/femaleblack.png")} /><Text>Female</Text></TouchableOpacity>
                        </View>

                        <View style={styles.main}>
                            <View style={{ width: "100%", borderRadius: 5, overflowX: 'hidden', overflow: "hidden", backgroundColor: "white", height: 50, alignItems: 'center', paddingHorizontal: 10, }}>
                                <Picker style={styles.pickerbox} selectedValue={state} onValueChange={(itemValue, itemIndex) => setState(itemValue)} >
                                    <Picker.Item label="State" style={{ fontSize: 14, marginLeft: 40, color: 'grey' }} />
                                    {
                                        statedata.map((i, index) => <Picker.Item style={{ fontSize: 14.5, fontFamily: "Roboto" }} label={i} value={i} key={index} />)
                                    }
                                </Picker>
                            </View>
                            <TextInput placeholder='City' onChangeText={(t) => setCity(t)} placeholderTextColor="grey" style={styles.textBox} />

                            <View style={styles.pickerOuter}>
                                <Picker
                                    style={styles.pickerbox} selectedValue={ethnicity} onValueChange={(itemValue, itemIndex) => setethnicity(itemValue)}>
                                    <Picker.Item label="Ethnicity" value="null" style={{ fontSize: 14, marginLeft: 40, color: 'grey' }} />
                                    {
                                        etha.map((i, index) => <Picker.Item style={{ fontSize: 14.5, fontFamily: "Roboto" }} label={i} value={i} key={index} />)
                                    }
                                </Picker>
                            </View>
                        </View>
                    </View>
                    <View style={{ flex: 0.25, alignItems: 'center', paddingHorizontal: '11%', width: '100%', marginTop: '2%' }}>
                        <View style={{ display: 'flex', flexDirection: 'row' }}>
                            <Text style={styles.activedot}></Text>

                            <Text style={styles.dot}></Text>

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
    logo: {
        width: 150,
        height: 150,
        marginTop: 20
    },
    textBox: {
        backgroundColor: "white",
        marginTop: 15,
        color: "black",
        width: "100%",
        height: 50,
        borderRadius: 5,
        paddingLeft: 20,
        padding: 10
    },
    gender: {
        backgroundColor: "#CBD5DB",
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 20,
        padding: 5,
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
        padding: 5,
        marginRight: 10,
        paddingHorizontal: 10
    },
    pickerbox: {
        backgroundColor: 'white',
        width: '100%',
        borderRadius: 20,
    },
    pickerOuter: { width: "100%", borderRadius: 5, overflowX: 'hidden', overflow: "hidden", backgroundColor: "white", height: 50, alignItems: 'center', paddingHorizontal: 10, marginTop: '5%' },
    main: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: '100%'
    },
    headerBack: {
        height: 40,
        width: 40,
        marginLeft: 20,
        marginRight: 20
    },
    header: {
        display: "flex",
        justifyContent: "center",
        marginBottom: 10,
        flexDirection: "row",
        alignItems: "center",
        paddingTop: 0
    },
    headTitle: {
        color: "white",
        fontWeight: '900',
        fontFamily: "Roboto",
        fontSize: 20
    },
    fullView: {
        paddingTop: 20,
        width: '100%',
        height: '100%'
    },
})
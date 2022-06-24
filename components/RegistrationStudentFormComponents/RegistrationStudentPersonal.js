import { StyleSheet, StatusBar, ImageBackground, ScrollView, Text, Dimensions, ToastAndroid, View, KeyboardAvoidingView, SafeAreaView, Image, TouchableOpacity, TextInput } from 'react-native'
import { Picker } from '@react-native-picker/picker';
import React, { useState, useEffect } from 'react';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { useFocusEffect } from '@react-navigation/native';
import dataapis from "../../apicalls/dataapis";
const windowHeight = Dimensions.get('window').height;
import { Feather } from '@expo/vector-icons';
const windowwidth = Dimensions.get('window').width;
export default function RegistrationStudentPersonal(props) {
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [date, setDate] = useState();
    const [statedata, setstatedata] = useState();
    const [etha, setEtha] = useState();
    const [city, setcity] = useState([]);
    const [data, setdata] = useState([]);
    const [texref, settexref] = useState(false);

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
        props.setdata({
            ...props.data,
            "dob": (year + "-" + month + "-" + day)
        });
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

    const statechange = (itemValue) => {
        props.setdata({
            ...props.data,
            "city": undefined
        });
        props.setdata({
            ...props.data,
            "state": itemValue
        });
        dataapis.getcities(itemValue).then((response) => {
            setcity(response.data.cities);
            setdata(response.data.cities);
        }).catch((err) => {
            console.log(err.response.data);
        })
    }
    const filter = (t) => {
        props.setdata({
            ...props.data,
            "city": undefined
        });
        const d = city.filter((i) => {
            return i.city_name.toUpperCase().indexOf(t.toString().toUpperCase()) > -1;;
        });
        setdata(d);
    }
    useFocusEffect(React.useCallback(() => {
        getdata();
    }, []));

    return (

        <View style={{ width: windowwidth, paddingHorizontal: '2%', }}>
            <View style={styles.main}>
                <TextInput value={props.data.firstname} selectionColor={"#004467"} onChangeText={(t) => props.setdata({
                    ...props.data,
                    "firstname": t
                })} placeholderTextColor="grey" placeholder='First name' style={styles.textBox} />
                <TextInput value={props.data.lastname} selectionColor={"#004467"} onChangeText={(t) => props.setdata({
                    ...props.data,
                    "lastname": t
                })} placeholderTextColor="grey" placeholder='Last name' style={styles.textBox} />

                <TouchableOpacity onPress={() => showDatePicker()} style={{ backgroundColor: "white", width: "100%", display: "flex", flexDirection: "row", justifyContent: "space-between", paddingHorizontal: 20, alignItems: "center", borderRadius: 5, height: windowHeight * 0.07, marginTop: '5%' }}><Text style={date ? { color: "black", marginRight: 10 } : { color: 'grey', marginRight: 10 }}  >{date ? date : "Birthday"}</Text><Image source={require('../../assets/event_black.png')} /></TouchableOpacity>

                <DateTimePickerModal
                    isVisible={isDatePickerVisible}
                    mode="date"
                    onConfirm={handleConfirm}
                    onCancel={hideDatePicker}
                    maximumDate={new Date()}
                />
            </View>
            <View style={{ display: "flex", flexDirection: "row", marginTop: '5%', marginBottom: "5%" }}>
                <TouchableOpacity onPress={() => props.setdata({ ...props.data, "gender": "Male" })} style={props.data.gender == "Male" ? styles.activeGender : styles.gender}><Image source={require("../../assets/maleblack.png")} /><Text >Male</Text></TouchableOpacity>
                <TouchableOpacity onPress={() => props.setdata({ ...props.data, "gender": "Female" })} style={props.data.gender == "Female" ? styles.activeGender : styles.gender}><Image source={require("../../assets/femaleblack.png")} /><Text>Female</Text></TouchableOpacity>
            </View>

            <View style={styles.main}>
                <View style={{ width: "100%", borderRadius: 5, overflow: "hidden", backgroundColor: "white", height: windowHeight * 0.07, alignItems: 'center', paddingRight: 10, paddingLeft: 2 }}>
                    <Picker style={styles.pickerbox} selectedValue={props.data.state} onValueChange={(itemValue, itemIndex) => statechange(itemValue)} >
                        <Picker.Item label="State" style={{ fontSize: windowHeight * 0.02, marginLeft: 20, color: 'grey' }} />
                        {statedata ?
                            statedata.map((i, index) => <Picker.Item style={{ fontSize: windowHeight * 0.02, fontFamily: "Roboto" }} label={i.statename} value={i.id} key={index} />)
                            : null
                        }
                    </Picker>
                </View>
                <View style={{ width: '100%' }}>
                    <TextInput value={props?.data?.city?.city_name} onChangeText={(t) => filter(t)} onSubmitEditing={() => settexref(false)} onFocus={() => settexref(true)} selectionColor={"#004467"} placeholder='City' placeholderTextColor='grey' style={{
                        backgroundColor: "white",
                        marginTop: windowHeight * 0.02,
                        color: "black",
                        width: "100%",
                        height: windowHeight * 0.07,
                        borderRadius: 5,
                        includeFontPadding: false,
                        paddingLeft: 20,
                        fontSize: windowHeight * 0.02
                    }} />
                    <ScrollView automaticallyAdjustContentInsets={false}
                        keyboardShouldPersistTaps="always" scrollEnabled style={{ display: texref ? "flex" : "none", backgroundColor: 'white', width: '100%', position: 'absolute', top: windowHeight * 0.085, zIndex: 2, maxHeight: windowHeight * 0.2, }}>
                        {data ?
                            data.map((i, index) => (
                                <TouchableOpacity key={index} onPress={() => {
                                    props.setdata({
                                        ...props.data,
                                        "city": i
                                    });
                                    settexref(false);
                                }} style={{ borderTopWidth: 0.2, width: '100%', padding: windowHeight * 0.02, borderColor: 'grey', flexDirection: 'row', alignItems: "center", justifyContent: 'space-between' }}>
                                    <Text style={{ fontWeight: 'bold' }}>{i.city_name}</Text>
                                    <Feather name="arrow-up-left" size={windowHeight * 0.02} color="grey" />
                                </TouchableOpacity>))
                            : null
                        }
                    </ScrollView>
                </View>

                <View style={styles.pickerOuter}>
                    <Picker
                        style={styles.pickerbox} selectedValue={props.data.ethnicity} onValueChange={(itemValue, itemIndex) => props.setdata({
                            ...props.data,
                            "ethnicity": itemValue
                        })}>
                        <Picker.Item label="Ethnicity" value={null} style={{ fontSize: windowHeight * 0.02, marginLeft: 20, color: 'grey' }} />
                        {
                            etha ?
                                etha.map((i, index) => <Picker.Item style={{ fontSize: windowHeight * 0.02, fontFamily: "Roboto" }} label={i.ethnicities} value={i.id} key={index} />) : null
                        }
                    </Picker>
                </View>
            </View>
        </View>

    )
}

const styles = StyleSheet.create({

    textBox: {
        backgroundColor: "white",
        marginTop: windowHeight * 0.02,
        color: "black",
        width: "100%",
        height: windowHeight * 0.07,
        borderRadius: 5,
        fontSize: windowHeight * 0.02,
        paddingHorizontal: 20
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
        width: '35%',
    },
    activeGender: {
        backgroundColor: "#00B8FE",
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 20,
        marginRight: 10,
        paddingHorizontal: 10,
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
        paddingRight: 10,
        marginTop: '5%',
        paddingLeft: 2,
        overflow: 'hidden'
    },
    main: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: '100%'
    },
})
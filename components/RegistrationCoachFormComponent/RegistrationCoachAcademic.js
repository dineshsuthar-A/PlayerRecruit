
import { StyleSheet, StatusBar, ImageBackground, ScrollView, ToastAndroid, Text, Dimensions, View, Image, TouchableOpacity, TextInput } from 'react-native'
import React, { useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import dataapis from "../../apicalls/dataapis";
import { Picker } from '@react-native-picker/picker';
const windowHeight = Dimensions.get("window").height;
var validator = require('validator');
const windowWidth = Dimensions.get("window").width;
import { Feather } from '@expo/vector-icons';


export default function RegistrationCoachAcademic(props) {

    const [statedata, setstatedata] = useState();
    const [colleges, setcolleges] = useState([]);
    const [data, setdata] = useState([]);
    const getdata = () => {
        dataapis.getStateData().then((response) => {
            setstatedata(response.data.states);
        }).catch((err) => {
            ToastAndroid.show("Some error occured, not able to reach server.", ToastAndroid.SHORT);
        });
        dataapis.getcolleges().then((response) => {
            setcolleges(response.data.colleges);
            setdata(response.data.colleges);
        }).catch((err) => {
            console.log(err);
        });
    }
    const filter = (t) => {
        props.setdata({
            ...props.data,
            "college_name": undefined
        });
        const d = colleges.filter((i) => {
            return i.college_name.toUpperCase().indexOf(t.toString().toUpperCase()) > -1;;
        });
        setdata(d);
    }
    const [texref, settexref] = useState(false);
    useFocusEffect(React.useCallback(() => {
        getdata();
    }, []));
    return (
        <View style={{ width: windowWidth }}>
            <View style={{ paddingHorizontal: '9%', marginTop: windowHeight * 0.04 }}>
                <View>
                    <TextInput value={props?.data?.college_name?.college_name} onChangeText={(t) => filter(t)} onSubmitEditing={() => settexref(false)} onFocus={() => settexref(true)} selectionColor={"#004467"} placeholder='School/College name' placeholderTextColor='grey' style={{
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
                        keyboardShouldPersistTaps="always" style={{ display: texref ? "flex" : "none", backgroundColor: 'white', width: '100%', position: 'absolute', top: windowHeight * 0.085, zIndex: 2, maxHeight: windowHeight * 0.5, }}>
                        {data ?
                            data.map((i, index) => (
                                <TouchableOpacity key={index} onPress={() => {
                                    props.setdata({
                                        ...props.data,
                                        "college_name": i
                                    });
                                    settexref(false);
                                }} style={{ borderTopWidth: 0.2, width: '100%', padding: windowHeight * 0.02, borderColor: 'grey', flexDirection: 'row', alignItems: "center", justifyContent: 'space-between' }}>
                                    <Text style={{ fontWeight: 'bold' }}>{i.college_name}</Text>

                                    <Feather name="arrow-up-left" size={windowHeight * 0.02} color="grey" />
                                </TouchableOpacity>))
                            : null
                        }
                    </ScrollView>
                </View>

                <View style={{ width: "100%", borderRadius: 5, overflow: "hidden", backgroundColor: "white", height: windowHeight * 0.07, alignItems: 'center', marginTop: windowHeight * 0.02, paddingLeft: 2 }}>
                    <Picker style={styles.pickerbox} selectedValue={props.data.college_state} onValueChange={(itemValue, itemIndex) => props.setdata({
                        ...props.data,
                        "college_state": itemValue
                    })} >
                        <Picker.Item label="State" style={{ fontSize: windowHeight * 0.02, marginLeft: 10, color: 'grey' }} value={null} />
                        {statedata ?
                            statedata.map((i, index) => <Picker.Item style={{ fontSize: windowHeight * 0.02, fontFamily: "Roboto" }} label={i.statename} value={i.id} key={index} />)
                            : null
                        }
                    </Picker>
                </View>
                <View style={{ display: "flex", flexDirection: 'row', justifyContent: "center", alignContent: "center", marginTop: windowHeight * 0.02, width: '100%' }}>
                    <TextInput selectionColor={"#004467"} value={props.data.universityemail} onChangeText={(t) => props.setdata({
                        ...props.data,
                        "universityemail": t
                    })} placeholder='University Email' placeholderTextColor="grey" style={styles.textBoxMail} />
                    <View style={{ backgroundColor: "white", justifyContent: "center", width: '10%', height: windowHeight * 0.07, borderBottomRightRadius: 5, borderTopRightRadius: 5 }}>
                        <Image source={require("../../assets/checkIcon.png")} style={{ width: 20, height: 20 }} />
                    </View>
                </View>
            </View>
        </View>

    )
}

const styles = StyleSheet.create({
    textbox: { backgroundColor: 'white', width: '100%', height: windowHeight * 0.07, borderRadius: 5, paddingLeft: 20, fontSize: windowHeight * 0.02, marginTop: windowHeight * 0.02 },
    textBoxMail: { backgroundColor: 'white', width: '90%', height: windowHeight * 0.07, borderBottomLeftRadius: 5, paddingLeft: 20, borderTopLeftRadius: 5, fontSize: windowHeight * 0.02, marginBottom: windowHeight * 0.02 },

    pickerbox: {
        backgroundColor: 'white',
        width: '100%',
        borderRadius: 20,
    }
})
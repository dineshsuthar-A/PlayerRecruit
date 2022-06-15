import { StyleSheet, StatusBar, ImageBackground, ScrollView, ToastAndroid, Text, Dimensions, Platform, View, KeyboardAvoidingView, SafeAreaView, Image, TouchableOpacity, TextInput } from 'react-native'
import { Picker } from '@react-native-picker/picker';
import React, { useState, useEffect } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import dataapis from '../../apicalls/dataapis';
const windowHeight = Dimensions.get('window').height;
const windowWidht = Dimensions.get('window').width;
export default function RegistrationStudentSchool(props) {


    const [GPADATA, setGPADATA] = useState();
    const yearrs = ['1960', '1961', '1962', '1963', '1964', '1965', '1966', '1967', '1968', '1969', '1970', '1971', '1972', '1973', '1974', '1975', '1976', '1977', '1978', '1979', '1980', '1981', '1982', '1983', '1984', '1985', '1986', '1987', '1988', '1989', '1990', '1991', '1992', '1993', '1994', '1995', '1996', '1997', '1998', '1999', '2000', '2001', '2002', '2003', '2004', '2005', '2006', '2007', '2008', '2009', '2010', '2011', '2012', '2013', '2014', '2015', '2016', '2017', '2018', '2019', '2020', '2021', '2022', '2023', '2024', '2025', '2026', '2027', '2028', '2029', '2030', '2031', '2032', '2033', '2034', '2035', '2036', '2037', '2038', '2039', '2040', '2041', '2042', '2043', '2044', '2045', '2046', '2047', '2048', '2049', '2050'];

    const getdata = () => {
        dataapis.getgpadata().then((response) => {
            setGPADATA(response.data.gpa);
        }).catch((err) => {
            ToastAndroid.show("Some error occured,Try again.", ToastAndroid.SHORT);
        });

    }
    useFocusEffect(React.useCallback(() => {
        getdata();
    }, []));
    return (

        <View style={{
            width: windowWidht,
            height: '100%',
            paddingTop: '1%',
            paddingHorizontal: '2%'
        }}>
            <Text style={{ color: "white", fontWeight: "bold", fontSize: 16, fontFamily: "Roboto" }}>Which type of school do you attend?</Text>
            <View style={{ display: "flex", flexDirection: "row", marginTop: 10 }}>
                <TouchableOpacity onPress={() => props.setdata({
                    ...props.data,
                    "school": "Highschool"
                })} style={props.data.school != "Highschool" ? styles.gender : styles.activeGender}><Image source={require("../../assets/schoolblack.png")} /><Text > Highschool</Text></TouchableOpacity>
                <TouchableOpacity onPress={() => props.setdata({
                    ...props.data,
                    "school": "College"
                })} style={props.data.school != "College" ? styles.gender : styles.activeGender}><Image source={require("../../assets/schoolblack.png")} /><Text> College</Text></TouchableOpacity>
            </View>
            <TextInput value={props.data.schoolname} selectionColor={"#004467"} onChangeText={(t) => props.setdata({
                ...props.data,
                "schoolname": t
            })} placeholder='School/College name' placeholderTextColor='grey' style={{
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
            <View style={styles.pickerOuter}>
                <Picker
                    style={styles.pickerbox} selectedValue={props.data.scholastic_year} onValueChange={(itemValue, itemIndex) => props.setdata({
                        ...props.data,
                        "scholastic_year": itemValue
                    })}>

                    <Picker.Item label="Scholastic year" style={{ fontSize: windowHeight * 0.019, marginLeft: 20, color: 'grey' }} value={null} />
                    {
                        yearrs ?
                            yearrs.map((i, index) => <Picker.Item style={{ fontSize: windowHeight * 0.02, fontFamily: "Roboto" }} label={i} value={i} key={index} />) : null
                    }
                </Picker>
            </View>
            <View style={{ width: "100%", borderRadius: 5, overflow: "hidden", backgroundColor: "white", height: windowHeight * 0.07, alignItems: 'center', marginTop: windowHeight * 0.02, paddingLeft: 2 }}>
                <Picker style={styles.pickerbox} selectedValue={props.data.gpa} onValueChange={(itemValue, itemIndex) => props.setdata({
                    ...props.data,
                    "gpa": itemValue
                })} >
                    <Picker.Item label="GPA" style={{ fontSize: windowHeight * 0.019, marginLeft: 20, color: 'grey' }} value={null} />

                    {GPADATA ?
                        GPADATA.map((i, index) => <Picker.Item style={{ fontSize: windowHeight * 0.02, fontFamily: "Roboto" }} key={index} value={i.id} label={i.gpa.toString()} />)
                        : null
                    }
                </Picker>
            </View>
            <TextInput value={props.data.sat} selectionColor={"#004467"} onChangeText={(t) => props.setdata({
                ...props.data,
                "sat": t
            })} keyboardType="numeric" placeholderTextColor='grey' placeholder='SAT' style={styles.textBox} />
            <TextInput value={props.data.act} selectionColor={"#004467"} onChangeText={(t) => props.setdata({
                ...props.data,
                "act": t
            })} keyboardType="numeric" placeholderTextColor='grey' placeholder='ACT' style={styles.textBox} />
        </View>
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
    pickerbox: {
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
        backgroundColor: 'white',
        width: '100%',
        borderRadius: 20,
    },
    pickerOuter: {
        width: "100%",
        borderRadius: 5,
        backgroundColor: "white",
        alignItems: 'center',
        marginTop: '5%',
        paddingLeft: 2
    },
})
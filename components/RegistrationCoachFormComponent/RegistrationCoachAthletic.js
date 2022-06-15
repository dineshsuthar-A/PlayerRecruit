
import { StyleSheet, ToastAndroid, Text, Dimensions, View, Image, TouchableOpacity, TextInput } from 'react-native'
import { Picker } from '@react-native-picker/picker';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useFocusEffect } from '@react-navigation/native';
const dataapis = require("../../apicalls/dataapis");
const windowwidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
export default function RegistrationCoachAthletic(props) {

    const [sportsData, setSportsData] = useState();
    const [divisionData, setDivisionData] = useState();


    const getData = () => {
        dataapis.getsportsdata().then((response) => {
            setSportsData(response.data.sports);
        }).catch((error) => {
            console.log(error);
            ToastAndroid.show("Some error occured.", ToastAndroid.SHORT);
        });

        dataapis.getdivisiondata().then((response) => {
            setDivisionData(response.data.divisions);
        }).catch((error) => {
            console.log(error);
            ToastAndroid.show("Some error occured.", ToastAndroid.SHORT);
        });

    }
    useFocusEffect(React.useCallback(() => {
        getData();
    }, []));
    return (

        <View style={{ width: windowwidth }}>
            <View style={{ paddingHorizontal: '9%' }}>
                <Text style={styles.text}>What sport do you coach?</Text>
                <View style={styles.pickerOuterhand}>
                    <Picker style={styles.pickerbox} selectedValue={props.data.sport} onValueChange={(itemValue, itemIndex) => {
                        props.setdata({
                            ...props.data,
                            "sport": itemValue
                        });
                    }}>
                        <Picker.Item style={{ color: "grey", fontWeight: windowHeight * 0.02, fontFamily: "Roboto" }} label="Select sports" value={null} />
                        {sportsData ?
                            sportsData.map((i, index) => <Picker.Item style={{ fontSize: windowHeight * 0.02, fontFamily: "Roboto" }} label={i.sportsname} value={i.id} key={index} />)
                            : null
                        }
                    </Picker>
                </View>
                <Text style={styles.text}>What’s your team name?</Text>
                <TextInput selectionColor={"#004467"} style={styles.textbox} value={props.data.team_name} onChangeText={(t) => props.setdata({
                    ...props.data,
                    "team_name": t
                })} />
                <Text style={styles.text}>Do you coach men’s or women’s?</Text>
                <View style={{ display: "flex", flexDirection: "row", marginTop: "2%", marginBottom: "7%" }}>
                    <TouchableOpacity onPress={() => props.setdata({
                        ...props.data,
                        "player_gender": "Male"
                    })} style={props.data.player_gender == "Male" ? styles.activetab : styles.tab}><Image source={require("../../assets/maleblack.png")} /><Text >Male</Text></TouchableOpacity>
                    <TouchableOpacity onPress={() => props.setdata({
                        ...props.data,
                        "player_gender": "Female"
                    })} style={props.data.player_gender == "Female" ? styles.activetab : styles.tab}><Image source={require("../../assets/femaleblack.png")} /><Text>Female</Text></TouchableOpacity>
                </View>
                <Text style={styles.text}>What division/league is your team in?</Text>
                <View style={styles.pickerOuterhand}>
                    <Picker style={styles.pickerbox} selectedValue={props.data.division} onValueChange={(itemValue, itemIndex) => {
                        props.setdata({
                            ...props.data,
                            "division": itemValue
                        });
                    }}>
                        <Picker.Item style={{ color: "grey", fontWeight: windowHeight * 0.02, fontFamily: "Roboto" }} value={null} />
                        {divisionData ?
                            divisionData.map((i, index) => <Picker.Item style={{ fontSize: windowHeight * 0.02, fontFamily: "Roboto" }} label={i.divisions} value={i.id} key={index} />)
                            : null
                        }
                    </Picker>
                </View>
                <Text style={styles.text}>What’s your job title?</Text>
                <TextInput selectionColor={"#004467"} style={styles.textbox} onChangeText={(t) => props.setdata({
                    ...props.data,
                    "jobtitle": t
                })} />
            </View>
        </View>

    )
}

const styles = StyleSheet.create({
    text: { color: "white", fontSize: windowHeight * 0.02, fontWeight: '700' },
    tab: {
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
    activetab: {
        backgroundColor: "#00B8FE",
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 20,
        padding: 5,
        paddingHorizontal: 10,
        marginRight: 10
    },
    textbox: { backgroundColor: 'white', width: '100%', height: windowHeight * 0.07, borderRadius: 5, paddingLeft: 20, marginTop: windowHeight * 0.01, marginBottom: windowHeight * 0.025, },
    pickerOuterhand: { marginTop: windowHeight * 0.01, marginBottom: windowHeight * 0.025, width: "100%", borderRadius: 5, overflow: "hidden", backgroundColor: "white", height: windowHeight * 0.07, paddingLeft: 1, marginTop: windowHeight * 0.01 },

    pickerbox: {
        backgroundColor: 'white',
        width: "100%",
    },
})
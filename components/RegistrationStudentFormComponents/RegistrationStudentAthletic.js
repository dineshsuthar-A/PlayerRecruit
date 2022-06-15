import { StyleSheet, ToastAndroid, StatusBar, ImageBackground, ScrollView, Text, Dimensions, Platform, View, KeyboardAvoidingView, SafeAreaView, Image, TouchableOpacity, TextInput } from 'react-native'
import { Picker } from '@react-native-picker/picker';
import React, { useState, useEffect } from 'react';
import { AntDesign } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
const dataapis = require("../../apicalls/dataapis");
const windowwidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get("window").height;

export default function RegistrationStudentAthletic(props) {
    const [rank, setRank] = useState();
    const [sppick, setsppick] = useState();
    const [positiondata, setPositionData] = useState();
    const [sportsData, setSportsData] = useState();
    const [sportsIndex, setSportsIndex] = useState();




    const addSport = (itemValue, itemIndex) => {
        if (sppick != null && itemValue != null) {
            const arr = props.data.sports;
            const obj = { "sport": sportsData[sportsIndex - 1], "rank": positiondata[itemIndex - 1] };
            arr.push(obj);
            props.setdata({
                ...props.data,
                "sports": arr
            });
            setsppick(null);
            setRank(null);
        }
        else {
            setRank(itemValue);
        }
    }

    const deleteValue = (ind) => {
        props.data.sports.splice(ind, 1);
        props.setdata({
            ...props.data,
            "sports": props.data.sports
        })
    }

    const getdata = () => {
        dataapis.getpositiondata().then((response) => {
            setPositionData(response.data.position);
        }).catch((err) => {
            ToastAndroid.show("Some error occured.", ToastAndroid.SHORT);
        });
        dataapis.getsportsdata().then((response) => {
            setSportsData(response.data.sports);
        }).catch((error) => {
            ToastAndroid.show("Some error occured.", ToastAndroid.SHORT);
        });
    }

    useFocusEffect(React.useCallback(() => {
        getdata();
    }, []));

    return (

        <View style={{
            width: windowwidth,
            height: '100%',
            paddingHorizontal: '2%',
            paddingTop: '0.5%'
        }}>
            <Text style={styles.TextLine}>What sport do you play?</Text>
            <View style={styles.inputBoxes}>
                <View style={styles.pickerOutersport}>
                    <Picker style={styles.pickerbox} selectedValue={sppick} onValueChange={(itemValue, itemIndex) => {
                        setSportsIndex(itemIndex);
                        setsppick(itemValue);
                    }}>
                        <Picker.Item style={{ color: "grey", fontWeight: windowHeight * 0.02, fontFamily: "Roboto" }} label="Select sports" value={null} />
                        {sportsData ?
                            sportsData.map((i, index) => <Picker.Item style={{ fontSize: windowHeight * 0.02, fontFamily: "Roboto" }} label={i.sportsname} value={i.id} key={index} />)
                            : null
                        }
                    </Picker>
                </View>
                <View style={styles.pickerOuter}>
                    <Picker style={styles.pickerbox} selectedValue={rank} onValueChange={(itemValue, itemIndex) => addSport(itemValue, itemIndex)}>
                        <Picker.Item style={{ fontSize: windowHeight * 0.02, fontFamily: "Roboto", color: 'grey' }} label="Pos" value={null} />
                        {positiondata ?
                            positiondata.map((i, index) => <Picker.Item style={{ fontSize: windowHeight * 0.02, fontFamily: "Roboto" }} label={i.position} value={i.id} key={index} />)
                            : null
                        }
                    </Picker>
                </View>
            </View>
            <ScrollView style={styles.listItemssport} contentContainerStyle={{ flexGrow: 1 }}>
                {
                    props.data.sports?.map((i, index) =>
                        <View style={styles.rowItem} key={index}>
                            <Text style={styles.rowItemTextsport}>{i.sport.sportsname}</Text>
                            <Text style={styles.rowItemText}>{i.rank.position}</Text>
                            <TouchableOpacity onPress={() => deleteValue(index)}><AntDesign name="closecircle" size={18} color="#00B8FE" style={{ backgroundColor: 'white', borderRadius: 200 }} /></TouchableOpacity>
                        </View>)
                }
            </ScrollView>

            <Text style={styles.TextLine}>What’s your height?</Text>
            <View style={styles.inputBoxes}>
                <TextInput selectionColor={"#004467"} keyboardType='numeric' value={props.data.height} style={styles.textBox} onChangeText={(t) => props.setdata({
                    ...props.data,
                    "height": t
                })} />
                <View style={styles.unit}>
                    <Text >CM</Text>
                </View>
            </View>
            <Text style={styles.TextLine}>What’s your weight?</Text>
            <View style={styles.inputBoxes}>
                <TextInput selectionColor={"#004467"} keyboardType='numeric' style={styles.textBox} value={props.data.weight} onChangeText={(t) => props.setdata({
                    ...props.data,
                    "weight": t
                })} />
                <View style={styles.unit}>
                    <Text>KG</Text>
                </View>
            </View>
            <Text style={styles.TextLine}>What’s your wingspan?</Text>
            <View style={styles.inputBoxes}>
                <TextInput selectionColor={"#004467"} keyboardType='number-pad' value={props.data.wingspan} style={styles.textBox} onChangeText={(t) => props.setdata({
                    ...props.data,
                    "wingspan": t
                })} />
                <View style={styles.unit}>
                    <Text>CM</Text>
                </View>
            </View>
            <Text style={styles.TextLine}>Which hand is dominant?</Text>
            <View style={styles.inputBoxes}>
                <View style={styles.pickerOuterhand}>
                    <Picker style={styles.pickerbox} selectedValue={props.data.hand} onValueChange={(itemValue, itemIndex) => props.setdata({
                        ...props.data,
                        "hand": itemValue
                    })
                    }>
                        <Picker.Item style={{ fontSize: windowHeight * 0.02, fontFamily: "Roboto" }} label="Right" value={"Right"} />
                        <Picker.Item style={{ fontSize: windowHeight * 0.02, fontFamily: "Roboto" }} label="Left" value={"Left"} />
                        <Picker.Item style={{ fontSize: windowHeight * 0.02, fontFamily: "Roboto" }} label="Both" value={"Both"} />
                    </Picker>
                </View>
            </View>


        </View>

    )
}

const styles = StyleSheet.create({
    rowItem: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: windowHeight * 0.005,
        marginBottom: 5,
        flex: 1
    },
    listItemssport: {
        height: windowHeight * 0.07,
        width: "100%",
        overflow: "scroll",
        paddingRight: 10,
    },
    rowItemText: {
        color: "white",
        fontWeight: '500'
    },
    rowItemTextsport: {
        color: "white",
        fontWeight: "500",
        width: 90
    },
    inputBoxes: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: windowHeight * 0.015
    },
    pickerbox: {
        backgroundColor: 'white',
        width: "100%",
    },
    pickerOuter: { width: "34%", borderRadius: 5, overflow: "hidden", backgroundColor: "white", height: windowHeight * 0.07, marginTop: windowHeight * 0.01, paddingLeft: 2 },
    pickerOuterhand: { width: "100%", borderRadius: 5, overflow: "hidden", backgroundColor: "white", height: windowHeight * 0.07, marginTop: windowHeight * 0.01, paddingLeft: 2 },
    pickerOutersport: { width: "62%", borderRadius: 5, overflow: "hidden", backgroundColor: "white", height: windowHeight * 0.07, marginTop: windowHeight * 0.01, paddingLeft: 2 },
    TextLine: {
        color: "white",
        fontSize: windowHeight * 0.023,
        fontWeight: "bold"
    },
    unit: { width: "26%", borderRadius: 5, overflow: "hidden", backgroundColor: "white", height: windowHeight * 0.07, marginTop: windowHeight * 0.01, justifyContent: 'center', alignItems: 'center' },
    textBox: {
        backgroundColor: "white",
        color: "black",
        width: "70%",
        height: windowHeight * 0.07,
        borderRadius: 5,
        paddingLeft: 20,
        marginTop: windowHeight * 0.01,
        fontSize: windowHeight * 0.02
    },
})
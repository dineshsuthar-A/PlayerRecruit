import { StyleSheet, ToastAndroid, StatusBar, ImageBackground, ScrollView, Text, Dimensions, Platform, View, KeyboardAvoidingView, SafeAreaView, Image, TouchableOpacity, TextInput } from 'react-native'
import { Picker } from '@react-native-picker/picker';
import React, { useState, useEffect } from 'react';
import { AntDesign } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
const dataapis = require("../apicalls/dataapis");

const windowHeight = Dimensions.get("window").height;

export default function RegistrationStudentAthletic({ route, navigation }) {
    const [rank, setRank] = useState();
    const [weightunit, setweightunit] = useState(1);
    const [heighunit, setheighunit] = useState(1);
    const [wspanunit, setwspanunit] = useState(1);
    const [sports, setSports] = useState([]);
    const [height, setHeight] = useState();
    const [wingSpan, setwingSpan] = useState();
    const [weight, setweight] = useState();
    const [hand, setHand] = useState("Right");
    const [sppick, setsppick] = useState();
    const [lengthunitData, setlengthunitData] = useState();
    const [weighunitData, setweighunitData] = useState();
    const [positiondata, setPositionData] = useState();
    const [sportsData, setSportsData] = useState();
    const [sportsIndex, setSportsIndex] = useState();


    const onNext = () => {
        if (!(weight && hand && sports.length > 0 && height && wingSpan)) {
            ToastAndroid.show("Fill all the details", ToastAndroid.SHORT);
        } else {
            const a = route.params;
            a.weight = weight;
            a.hand = hand;
            a.sports = sports;
            a.wingspan = wingSpan;
            a.wingspanunit = wspanunit;
            a.weightunit = weightunit;
            a.heightunit = heighunit;
            a.height = height;
            console.log(a);
            navigation.navigate("RegistrationStudentFinal", a);
        }
    }

    const addSport = (itemValue, itemIndex) => {
        if (sppick != null && itemValue != null) {
            const arr = sports;
            const obj = { "sport": sportsData[sportsIndex - 1], "rank": positiondata[itemIndex - 1] };
            arr.push(obj);
            setSports(arr);
            setsppick(null);
            setRank(null);
        }
        else {
            setRank(itemValue);
        }
    }

    const deleteValue = (ind) => {
        sports.splice(ind, 1);
        setSports([...sports]);
    }

    const getdata = () => {
        dataapis.getpositiondata().then((response) => {
            setPositionData(response.data.position);
        }).catch((err) => {
            ToastAndroid.show("Some error occured.", ToastAndroid.SHORT);
        });
        dataapis.getweightunitdata().then((response) => {
            setweighunitData(response.data.units);
        }).catch((err) => {
            ToastAndroid.show("Some error occured.", ToastAndroid.SHORT);
        });
        dataapis.getheightdata().then((response) => {
            setlengthunitData(response.data.units);
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
        <ImageBackground source={require('../assets/bg.png')} style={{ backgroundColor: "#004467", width: "100%", height: "100%" }}>
            <ScrollView contentContainerStyle={{ flexGrow: 1 }} style={styles.fullView} showsVerticalScrollIndicator={false}  >
                <StatusBar barStyle="light-content" backgroundColor="#004467" />
                <View style={{ display: 'flex', width: '100%', height: '100%' }}>
                    <View style={styles.main}>
                        <Text style={styles.TextLine}>What sport do you play?</Text>
                        <View style={styles.inputBoxes}>
                            <View style={styles.pickerOutersport}>
                                <Picker style={styles.pickerbox} selectedValue={sppick} onValueChange={(itemValue, itemIndex) => {
                                    setSportsIndex(itemIndex);
                                    setsppick(itemValue);
                                }}>
                                    <Picker.Item style={{ color: "grey", fontWeight: 14.5, fontFamily: "Roboto" }} label="Select sports" value={null} />
                                    {sportsData ?
                                        sportsData.map((i, index) => <Picker.Item style={{ fontSize: windowHeight * 0.02, fontFamily: "Roboto" }} label={i.sportsname} value={i.id} key={index} />)
                                        : null
                                    }
                                </Picker>
                            </View>
                            <View style={styles.pickerOuter}>
                                <Picker style={styles.pickerbox} selectedValue={rank} onValueChange={(itemValue, itemIndex) => addSport(itemValue, itemIndex)}>
                                    <Picker.Item style={{ fontSize: windowHeight * 0.02, fontFamily: "Roboto" }} label="Pos" value={null} />
                                    {positiondata ?
                                        positiondata.map((i, index) => <Picker.Item style={{ fontSize: windowHeight * 0.02, fontFamily: "Roboto" }} label={i.position} value={i.id} key={index} />)
                                        : null
                                    }
                                </Picker>
                            </View>
                        </View>
                        <ScrollView style={styles.listItemssport} contentContainerStyle={{ flexGrow: 1 }}>
                            {
                                sports.map((i, index) =>
                                    <View style={styles.rowItem} key={index}>
                                        <Text style={styles.rowItemTextsport}>{i.sport.sportsname}</Text>
                                        <Text style={styles.rowItemText}>{i.rank.position} Position</Text>
                                        <TouchableOpacity onPress={() => deleteValue(index)}><AntDesign name="closecircle" size={18} color="#00B8FE" style={{ backgroundColor: 'white', borderRadius: 200 }} /></TouchableOpacity>
                                    </View>)
                            }
                        </ScrollView>

                        <Text style={styles.TextLine}>What’s your height?</Text>
                        <View style={styles.inputBoxes}>
                            <TextInput style={styles.textBox} onChangeText={(t) => setHeight(t)} />
                            <View style={styles.pickerOuter}>
                                <Picker style={styles.pickerbox} selectedValue={heighunit} onValueChange={(itemValue, itemIndex) => setheighunit(itemValue)}>
                                    {lengthunitData ?
                                        lengthunitData.map((i, index) => <Picker.Item style={{ fontSize: windowHeight * 0.02, fontFamily: "Roboto" }} label={i.unit} value={i.id} key={index} />)
                                        : null
                                    }
                                </Picker>
                            </View>
                        </View>
                        <Text style={styles.TextLine}>What’s your weight?</Text>
                        <View style={styles.inputBoxes}>
                            <TextInput style={styles.textBox} onChangeText={(t) => setweight(t)} />
                            <View style={styles.pickerOuter}>
                                <Picker style={styles.pickerbox} selectedValue={weightunit} onValueChange={(itemValue, itemIndex) => setweightunit(itemValue)}>
                                    {weighunitData ?
                                        weighunitData.map((i, index) => <Picker.Item style={{ fontSize: windowHeight * 0.02, fontFamily: "Roboto" }} label={i.units} value={i.id} key={index} />)
                                        : null
                                    }
                                </Picker>
                            </View>
                        </View>
                        <Text style={styles.TextLine}>What’s your wingspan?</Text>
                        <View style={styles.inputBoxes}>
                            <TextInput style={styles.textBox} onChangeText={(t) => setwingSpan(t)} />
                            <View style={styles.pickerOuter}>
                                <Picker style={styles.pickerbox} selectedValue={wspanunit} onValueChange={(itemValue, itemIndex) => setwspanunit(itemValue)}>
                                    {lengthunitData ?
                                        lengthunitData.map((i, index) => <Picker.Item style={{ fontSize: windowHeight * 0.02, fontFamily: "Roboto" }} label={i.unit} value={i.id} key={index} />)
                                        : null
                                    }
                                </Picker>
                            </View>
                        </View>
                        <Text style={styles.TextLine}>Which hand is dominant?</Text>
                        <View style={styles.inputBoxes}>
                            <View style={styles.pickerOuterhand}>
                                <Picker style={styles.pickerbox} selectedValue={hand} onValueChange={(itemValue, itemIndex) => setHand(itemValue)}>
                                    <Picker.Item style={{ fontSize: windowHeight * 0.02, fontFamily: "Roboto" }} label="Right" value={"Right"} />
                                    <Picker.Item style={{ fontSize: windowHeight * 0.02, fontFamily: "Roboto" }} label="Left" value={"Left"} />
                                    <Picker.Item style={{ fontSize: windowHeight * 0.02, fontFamily: "Roboto" }} label="Both" value={"Both"} />
                                </Picker>
                            </View>
                        </View>


                    </View>
                    <View style={styles.below}>
                        <View style={{ display: 'flex', flexDirection: 'row' }}>
                            <Text style={styles.activedot}></Text>

                            <Text style={styles.activedot}></Text>

                            <Text style={styles.activedot}></Text>

                            <Text style={styles.dot}></Text>
                        </View>
                        <TouchableOpacity onPress={() => onNext()} style={styles.button}><Text style={{ height: '100%', textAlignVertical: 'center', color: 'white', fontWeight: 'bold', fontSize: windowHeight * 0.02 }}>Next</Text></TouchableOpacity>
                    </View>
                </View>
            </ScrollView >

        </ImageBackground >
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
    pickerOuter: { width: "34%", borderRadius: 5, overflow: "hidden", backgroundColor: "white", height: windowHeight * 0.07, marginTop: windowHeight * 0.01 },
    pickerOuterhand: { width: "100%", borderRadius: 5, overflow: "hidden", backgroundColor: "white", height: windowHeight * 0.07, paddingLeft: 10, marginTop: windowHeight * 0.01 },
    pickerOutersport: { width: "62%", borderRadius: 5, overflow: "hidden", backgroundColor: "white", height: windowHeight * 0.07, paddingLeft: 10, marginTop: windowHeight * 0.01 },
    TextLine: {
        color: "white",
        fontSize: windowHeight * 0.023,
        fontWeight: "bold"
    },
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
        marginTop: windowHeight * 0.02

    },
    textBox: {
        backgroundColor: "white",
        color: "black",
        width: "62%",
        height: windowHeight * 0.07,
        borderRadius: 5,
        paddingLeft: 20,
        padding: 10,
        marginTop: windowHeight * 0.01,
        fontSize: windowHeight * 0.02
    },
    main: {
        paddingHorizontal: '11%',
        flex: 0.60,
        paddingTop: windowHeight * 0.02,
    },
    below: {
        flex: 0.4,
        alignItems: "center",
        paddingHorizontal: '11%',
        justifyContent: "center"
    },
    fullView: {
        width: '100%',
        height: '100%'
    },
})
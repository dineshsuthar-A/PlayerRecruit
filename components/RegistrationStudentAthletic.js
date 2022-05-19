import { StyleSheet, ToastAndroid, StatusBar, ImageBackground, ScrollView, Text, ActivityIndicator, Platform, View, KeyboardAvoidingView, SafeAreaView, Image, TouchableOpacity, TextInput } from 'react-native'
import { Picker } from '@react-native-picker/picker';
import React, { useState, useEffect } from 'react';


export default function RegistrationStudentAthletic({ route, navigation }) {
    const [rank, setRank] = useState();
    const [weightunit, setweightunit] = useState("cm");
    const [heighunit, setheighunit] = useState("Kg");
    const [wspanunit, setwspanunit] = useState("cm");
    const [sports, setSports] = useState([]);
    const [height, setHeight] = useState();
    const [wingSpan, setwingSpan] = useState();
    const [weight, setweight] = useState();
    const [hand, setHand] = useState("Right");
    const [sppick, setsppick] = useState();

    const onNext = () => {
        if (!(weight && hand && sports.length > 0 && height && wingSpan)) {
            ToastAndroid.show("Fill all the details", ToastAndroid.SHORT);
        } else {
            const a = route.params;
            a.weight = weight;
            a.hand = hand;
            a.sports = sports;
            a.wingSpan = wingSpan;
            navigation.navigate("RegistrationStudentFinal", a);
        }
    }
    const addSport = (itemValue) => {
        if (sppick != 0 && itemValue != 0) {
            const arr = sports;
            const obj = { "sport": sppick, "rank": itemValue };
            arr.push(obj);
            setSports(arr);
            setsppick(0);
            setRank(0);
        }
        else {
            setRank(itemValue);
        }
    }
    const deleteValue = (ind) => {
        const arr = sports;
        arr.splice(ind, 1);
        setSports(arr);

    }

    return (
        <ImageBackground source={require('../assets/bg.png')} style={{ backgroundColor: "#004E75", width: "100%", height: "100%" }}>
            <ScrollView contentContainerStyle={{ flexGrow: 1 }} style={styles.fullView} keyboardShouldPersistTaps="handled" contentInsetAdjustmentBehavior='automatic'
                showsVerticalScrollIndicator={false}>
                <KeyboardAvoidingView enabled>
                    <StatusBar barStyle="light-content" backgroundColor="#004E75" />
                    <View style={{ display: 'flex', width: '100%', height: '100%' }}>
                        <View style={styles.main}>
                            <Text style={styles.TextLine}>What sport do you play?</Text>
                            <View style={styles.inputBoxes}>
                                <View style={styles.pickerOutersport}>
                                    <Picker style={styles.pickerbox} selectedValue={sppick} onValueChange={(itemValue, itemIndex) => setsppick(itemValue)}>
                                        <Picker.Item style={{ color: "grey", fontWeight: 14.5, fontFamily: "Roboto" }} label="Select sports" value={0} />
                                        <Picker.Item style={{ fontSize: 14.5, fontFamily: "Roboto" }} label="Basketball" value="Basketball" />
                                        <Picker.Item style={{ fontSize: 14.5, fontFamily: "Roboto" }} label="Cricker" value="Cricker" />
                                        <Picker.Item style={{ fontSize: 14.5, fontFamily: "Roboto" }} label="Football" value="Football" />
                                    </Picker>
                                </View>
                                <View style={styles.pickerOuter}>
                                    <Picker style={styles.pickerbox} selectedValue={rank} onValueChange={(itemValue, itemIndex) => addSport(itemValue)}>
                                        <Picker.Item style={{ fontSize: 14.5, fontFamily: "Roboto" }} label="Pos" value={0} />
                                        <Picker.Item style={{ fontSize: 14.5, fontFamily: "Roboto" }} label="1st" value="1st" />
                                        <Picker.Item style={{ fontSize: 14.5, fontFamily: "Roboto" }} label="2nd" value="2nd" />
                                        <Picker.Item style={{ fontSize: 14.5, fontFamily: "Roboto" }} label="3rd" value="3rd" />
                                    </Picker>
                                </View>
                            </View>
                            <ScrollView style={styles.listItemssport}>
                                {
                                    sports.map((i, index) =>
                                        <TouchableOpacity onPress={() => deleteValue(index)} style={styles.rowItem} key={index}>
                                            <Text style={styles.rowItemTextsport}>{i.sport}</Text>
                                            <Text style={styles.rowItemText}>{i.rank} Position</Text>
                                            <Image style={{ width: 15, height: 15 }} source={require("../assets/editIcon.png")} />
                                        </TouchableOpacity>)
                                }
                            </ScrollView>

                            <Text style={styles.TextLine}>What’s your height?</Text>
                            <View style={styles.inputBoxes}>
                                <TextInput style={styles.textBox} onChangeText={(t) => setHeight(t)} />
                                <View style={styles.pickerOuter}>
                                    <Picker style={styles.pickerbox} selectedValue={heighunit} onValueChange={(itemValue, itemIndex) => setheighunit(itemValue)}>
                                        <Picker.Item style={{ fontSize: 14.5, fontFamily: "Roboto" }} label="cm" value={"cm"} />
                                        <Picker.Item style={{ fontSize: 14.5, fontFamily: "Roboto" }} label="in" value={"in"} />
                                        <Picker.Item style={{ fontSize: 14.5, fontFamily: "Roboto" }} label="m" value={"m"} />
                                    </Picker>
                                </View>
                            </View>
                            <Text style={styles.TextLine}>What’s your weight?</Text>
                            <View style={styles.inputBoxes}>
                                <TextInput style={styles.textBox} onChangeText={(t) => setweight(t)} />
                                <View style={styles.pickerOuter}>
                                    <Picker style={styles.pickerbox} selectedValue={weightunit} onValueChange={(itemValue, itemIndex) => setweightunit(itemValue)}>
                                        <Picker.Item style={{ fontSize: 14.5, fontFamily: "Roboto" }} label="Kg" value={"Kg"} />
                                        <Picker.Item style={{ fontSize: 14.5, fontFamily: "Roboto" }} label="lbs" value={"lbs"} />
                                        <Picker.Item style={{ fontSize: 14.5, fontFamily: "Roboto" }} label="g" value={"g"} />
                                    </Picker>
                                </View>
                            </View>
                            <Text style={styles.TextLine}>What’s your wingspan?</Text>
                            <View style={styles.inputBoxes}>
                                <TextInput style={styles.textBox} onChangeText={(t) => setwingSpan(t)} />
                                <View style={styles.pickerOuter}>
                                    <Picker style={styles.pickerbox} selectedValue={wspanunit} onValueChange={(itemValue, itemIndex) => setwspanunit(itemValue)}>
                                        <Picker.Item style={{ fontSize: 14.5, fontFamily: "Roboto" }} label="cm" value={"cm"} />
                                        <Picker.Item style={{ fontSize: 14.5, fontFamily: "Roboto" }} label="in" value={2} />
                                        <Picker.Item style={{ fontSize: 14.5, fontFamily: "Roboto" }} label="m" value={3} />
                                    </Picker>
                                </View>
                            </View>
                            <Text style={styles.TextLine}>Which hand is dominant?</Text>
                            <View style={styles.inputBoxes}>
                                <View style={styles.pickerOuterhand}>
                                    <Picker style={styles.pickerbox} selectedValue={hand} onValueChange={(itemValue, itemIndex) => setHand(itemValue)}>
                                        <Picker.Item style={{ fontSize: 14.5, fontFamily: "Roboto" }} label="Right" value={"Right"} />
                                        <Picker.Item style={{ fontSize: 14.5, fontFamily: "Roboto" }} label="Left" value={"Left"} />
                                        <Picker.Item style={{ fontSize: 14.5, fontFamily: "Roboto" }} label="Both" value={"Both"} />
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
                            <TouchableOpacity onPress={() => onNext()} style={styles.button}><Text style={{ height: '100%', textAlignVertical: 'center', color: 'white', fontWeight: 'bold' }}>Next</Text></TouchableOpacity>
                        </View>
                    </View>
                </KeyboardAvoidingView >
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
        marginTop: 5,
        marginBottom: 5,
        flex: 1
    },
    listItemssport: {
        height: 30,
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
        marginBottom: "4%"
    },
    pickerbox: {
        backgroundColor: 'white',
        width: "100%",
    },
    pickerOuter: { width: "32%", borderRadius: 5, overflow: "hidden", backgroundColor: "white", height: 50, marginTop: '2%' },
    pickerOuterhand: { width: "100%", borderRadius: 5, overflow: "hidden", backgroundColor: "white", height: 50, paddingLeft: 10, marginTop: '2%' },
    pickerOutersport: { width: "60%", borderRadius: 5, overflow: "hidden", backgroundColor: "white", height: 50, paddingLeft: 10, marginTop: '2%' },
    TextLine: {
        color: "white",
        fontSize: 16,
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
        height: 50,
        borderRadius: 30,
        marginTop: '10%'

    },
    textBox: {
        backgroundColor: "white",
        color: "black",
        width: "60%",
        height: 50,
        borderRadius: 5,
        paddingLeft: 20,
        padding: 10,
        marginTop: '2%'
    },
    main: {
        paddingHorizontal: '11%',
        flex: 0.65,
        paddingTop: '5%'
    },
    below: {
        flex: 0.35,
        alignItems: "center",
        paddingHorizontal: '11%',
    },
    fullView: {
        width: '100%',
        height: '100%'
    },
})
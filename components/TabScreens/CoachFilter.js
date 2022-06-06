import { StyleSheet, Text, View, ImageBackground, TouchableOpacity, ScrollView, Dimensions, LogBox } from 'react-native'
import React, { useState, useEffect } from 'react'
import { TextInput } from 'react-native-gesture-handler'
import { AntDesign } from '@expo/vector-icons';
const windowHeight = Dimensions.get("window").height;
const screenWidth = Dimensions.get("window").width;
import * as SecureStore from 'expo-secure-store';
import axios from 'axios';
import { useFocusEffect } from '@react-navigation/native';
LogBox.ignoreLogs(['Remote debugger']);
export default function CoachFilter() {
    const [states, setstates] = useState([]);
    const [sports, setsports] = useState([]);
    const [readstate, setreadstate] = useState();
    const [readsport, setreadsport] = useState();
    const [positions, setpositions] = useState([]);
    const [readposition, setreadposition] = useState();
    const [minheight, setminheight] = useState();
    const [maxheight, setmaxheight] = useState();
    const [minweight, setminweight] = useState();
    const [maxweight, setmaxweight] = useState();
    const [minage, setminage] = useState();
    const [maxage, setmaxage] = useState();
    const [mingpa, setmingpa] = useState();
    const [maxgpa, setmaxgpa] = useState();
    const [minsat, setminsat] = useState();
    const [maxsat, setmaxsat] = useState();
    const [minact, setminact] = useState();
    const [maxact, setmaxact] = useState();
    const [heightBool, setheightBool] = useState();
    const sportAdd = () => {
        setsports([...sports, readsport]);
        setreadsport("");
    }

    const deletesport = (ind) => {
        sports.splice(ind, 1);
        setsports([...sports]);
    }
    const stateAdd = () => {
        setstates([...states, readstate]);
        setreadstate("");
    }
    const deletestate = (ind) => {
        states.splice(ind, 1);
        setstates([...states]);
    }
    const positionAdd = () => {
        setpositions([...positions, readposition]);
        setreadposition("");
    }
    const deleteposition = (ind) => {
        positions.splice(ind, 1);
        setpositions([...positions]);
    }

    const onSubmit = async () => {
        console.log(1);
        const token = "Bearer " + await SecureStore.getItemAsync("token");
        axios.post("/api/coach/filter", {
            "states": states,
            "sports": sports,
            "positions": positions,
            minheight,
            maxheight,
            minweight,
            maxweight,
            minage,
            maxage,
            mingpa,
            maxgpa,
            minsat,
            maxsat,
            minact,
            maxact
        }, {
            headers: {
                "Authorization": token
            }
        });
    }
    useFocusEffect(React.useCallback(() => {
        setheightBool(true);
    }, []))
    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1 }} style={styles.fullView} keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
            contentInsetAdjustmentBehavior='automatic'>

            <ImageBackground source={require('../../assets/bg.png')} style={{ width: '100%', height: '100%' }}>
                <View style={{ paddingHorizontal: '8%', paddingVertical: '3%' }}>


                    <Text style={styles.text}>Which states would you like to see?</Text>
                    <TextInput value={readstate} onSubmitEditing={() => stateAdd()} placeholder='Add State' onChangeText={(t) => setreadstate(t)} style={styles.textinputstyle} selectionColor='#004467' />

                    <View style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
                        {
                            states ?
                                states.map((i, index) =>
                                    <View key={index} style={{
                                        backgroundColor: "#CBD5DB",
                                        display: "flex",
                                        flexDirection: "row",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        borderRadius: 20,
                                        paddingVertical: 4,
                                        paddingLeft: 10,
                                        marginRight: 10,
                                        paddingRight: 3, marginTop: '2%'
                                    }}>
                                        <Text style={{ fontSize: 12, marginRight: 6 }}>{i}</Text>
                                        <TouchableOpacity onPress={() => deletestate(index)}><AntDesign name="closecircle" size={18} color="grey" /></TouchableOpacity>
                                    </View>
                                ) : null}



                    </View>
                    <Text style={styles.text}>Which sports would you like to see?</Text>
                    <TextInput value={readsport} placeholder='Add Sport' onChangeText={(t) => setreadsport(t)} onSubmitEditing={() => sportAdd()} style={styles.textinputstyle} selectionColor='#004467' />

                    <View style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
                        {
                            sports ?
                                sports.map((i, index) =>
                                    <View key={index} style={{
                                        backgroundColor: "#CBD5DB",
                                        display: "flex",
                                        flexDirection: "row",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        borderRadius: 20,
                                        paddingVertical: 4,
                                        marginTop: '2%',
                                        paddingLeft: 10,
                                        marginRight: 10,
                                        paddingRight: 3
                                    }}>
                                        <Text style={styles.options}>{i}</Text>
                                        <TouchableOpacity onPress={() => deletesport(index)}><AntDesign name="closecircle" size={18} color="grey" /></TouchableOpacity>
                                    </View>) : null
                        }


                    </View>
                    <Text style={styles.text}>Which positions would you like to see?</Text>
                    <TextInput value={readposition} placeholder='Add Position' onChangeText={(t) => setreadposition(t)} onSubmitEditing={() => positionAdd()} style={styles.textinputstyle} selectionColor='#004467' />

                    <View style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
                        {
                            positions ?
                                positions.map((i, index) =>
                                    <View key={index} style={{
                                        backgroundColor: "#CBD5DB",
                                        display: "flex",
                                        flexDirection: "row",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        borderRadius: 20,
                                        paddingVertical: 4,
                                        marginTop: '2%',
                                        paddingLeft: 10,
                                        marginRight: 10,
                                        paddingRight: 3
                                    }}>
                                        <Text style={styles.options}>{i}</Text>
                                        <TouchableOpacity onPress={() => deleteposition(index)}><AntDesign name="closecircle" size={18} color="grey" /></TouchableOpacity>
                                    </View>) : null
                        }


                    </View>
                    <Text style={styles.text}>Which heights would you like to see?</Text>
                    <RangeSlider
                        style={{ flex: 1, marginTop: windowHeight * 0.01, width: '100%' }}
                        min={0}
                        max={300}
                        step={1}
                        onValueChanged={(low, high) => {
                            setminheight(low);
                            setmaxheight(high);
                        }}
                        renderThumb={() => {
                            return (
                                <View style={{
                                    backgroundColor: "white",
                                    height: 14,
                                    width: 14,
                                    borderRadius: 7,
                                    shadowColor: "black",
                                    shadowOffset: { width: 0, height: 2 },
                                    shadowOpacity: 0.1,
                                    shadowRadius: 1.5,
                                    elevation: 4
                                }}></View>
                            )
                        }}
                        renderRail={() => {
                            return (
                                <View style={{
                                    height: 1,
                                    width: '100%',
                                    backgroundColor: "grey"
                                }}></View>
                            )
                        }}
                        renderRailSelected={() => {
                            return (
                                <View style={{ backgroundColor: "white", height: 2, width: '100%' }}></View>
                            )
                        }}
                        renderLabel={(value) => {
                            return (
                                <Text style={{ color: "white" }}>{value}</Text>
                            )
                        }} />
                    <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={{ color: 'white' }}>{minheight} cm</Text>
                        <Text style={{ color: 'white' }}>{maxheight} cm</Text>
                    </View>
                    <Text style={styles.text}>Which Weights would you like to see?</Text>
                    <RangeSlider
                        style={{ flex: 1, marginTop: windowHeight * 0.01, width: '100%' }}
                        min={0}
                        max={300}
                        step={1}
                        onValueChanged={(low, high) => {
                            setminweight(low);
                            setmaxweight(high);
                        }}
                        renderThumb={() => {
                            return (
                                <View style={{
                                    backgroundColor: "white",
                                    height: 14,
                                    width: 14,
                                    borderRadius: 7,
                                    shadowColor: "black",
                                    shadowOffset: { width: 0, height: 2 },
                                    shadowOpacity: 0.1,
                                    shadowRadius: 1.5,
                                    elevation: 4
                                }}></View>
                            )
                        }}
                        renderRail={() => {
                            return (
                                <View style={{
                                    height: 1,
                                    width: '100%',
                                    backgroundColor: "grey"
                                }}></View>
                            )
                        }}
                        renderRailSelected={() => {
                            return (
                                <View style={{ backgroundColor: "white", height: 2, width: '100%' }}></View>
                            )
                        }}
                        renderLabel={(value) => {
                            return (
                                <Text style={{ color: "white" }}>{value}</Text>
                            )
                        }} />
                    <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={{ color: 'white' }}>{minweight} Kg</Text>
                        <Text style={{ color: 'white' }}>{maxweight} Kg</Text>
                    </View>
                    <Text style={styles.text}>Which ages would you like to see?</Text>
                    <RangeSlider
                        style={{ flex: 1, marginTop: windowHeight * 0.01, width: '100%' }}
                        min={0}
                        max={100}
                        step={1}
                        onValueChanged={(low, high) => {
                            setminage(low);
                            setmaxage(high);
                        }}
                        renderThumb={() => {
                            return (
                                <View style={{
                                    backgroundColor: "white",
                                    height: 14,
                                    width: 14,
                                    borderRadius: 7,
                                    shadowColor: "black",
                                    shadowOffset: { width: 0, height: 2 },
                                    shadowOpacity: 0.1,
                                    shadowRadius: 1.5,
                                    elevation: 4
                                }}></View>
                            )
                        }}
                        renderRail={() => {
                            return (
                                <View style={{
                                    height: 1,
                                    width: '100%',
                                    backgroundColor: "grey"
                                }}></View>
                            )
                        }}
                        renderRailSelected={() => {
                            return (
                                <View style={{ backgroundColor: "white", height: 2, width: '100%' }}></View>
                            )
                        }}
                        renderLabel={(value) => {
                            return (
                                <Text style={{ color: "white" }}>{value}</Text>
                            )
                        }} />
                    <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={{ color: 'white' }}>{minage} </Text>
                        <Text style={{ color: 'white' }}>{maxage} </Text>
                    </View>
                    <Text style={styles.text}>Which scholastic years would you like to see?</Text>

                    <Text style={styles.text}>Which GPAs would you like to see?</Text>
                    <RangeSlider
                        style={{ flex: 1, marginTop: windowHeight * 0.01, width: '100%' }}
                        min={0}
                        max={4}
                        step={0.1}
                        onValueChanged={(low, high) => {
                            setmingpa(low.toFixed(1));
                            setmaxgpa(high.toFixed(1));
                        }}
                        renderThumb={() => {
                            return (
                                <View style={{
                                    backgroundColor: "white",
                                    height: 14,
                                    width: 14,
                                    borderRadius: 7,
                                    shadowColor: "black",
                                    shadowOffset: { width: 0, height: 2 },
                                    shadowOpacity: 0.1,
                                    shadowRadius: 1.5,
                                    elevation: 4
                                }}></View>
                            )
                        }}
                        renderRail={() => {
                            return (
                                <View style={{
                                    height: 1,
                                    width: '100%',
                                    backgroundColor: "grey"
                                }}></View>
                            )
                        }}
                        renderRailSelected={() => {
                            return (
                                <View style={{ backgroundColor: "white", height: 2, width: '100%' }}></View>
                            )
                        }}
                        renderLabel={(value) => {
                            return (
                                <Text style={{ color: "white" }}>{value.toFixed(1)}</Text>
                            )
                        }} />
                    <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={{ color: 'white' }}>{mingpa}</Text>
                        <Text style={{ color: 'white' }}>{maxgpa}</Text>
                    </View>
                    <Text style={styles.text}>Which SATs would you like to see?</Text>
                    <RangeSlider
                        style={{ flex: 1, marginTop: windowHeight * 0.01, width: '100%' }}
                        min={0}
                        max={300}
                        step={1}
                        onValueChanged={(low, high) => {
                            setminsat(low);
                            setmaxsat(high);
                        }}
                        renderThumb={() => {
                            return (
                                <View style={{
                                    backgroundColor: "white",
                                    height: 14,
                                    width: 14,
                                    borderRadius: 7,
                                    shadowColor: "black",
                                    shadowOffset: { width: 0, height: 2 },
                                    shadowOpacity: 0.1,
                                    shadowRadius: 1.5,
                                    elevation: 4
                                }}></View>
                            )
                        }}
                        renderRail={() => {
                            return (
                                <View style={{
                                    height: 1,
                                    width: '100%',
                                    backgroundColor: "grey"
                                }}></View>
                            )
                        }}
                        renderRailSelected={() => {
                            return (
                                <View style={{ backgroundColor: "white", height: 2, width: '100%' }}></View>
                            )
                        }}
                        renderLabel={(value) => {
                            return (
                                <Text style={{ color: "white" }}>{value}</Text>
                            )
                        }} />
                    <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={{ color: 'white' }}>{minsat}</Text>
                        <Text style={{ color: 'white' }}>{maxsat}</Text>
                    </View>
                    <Text style={styles.text}>Which ACTs would you like to see?</Text>
                    <RangeSlider
                        style={{ flex: 1, marginTop: windowHeight * 0.01, width: '100%' }}
                        min={0}
                        max={300}
                        step={1}
                        onValueChanged={(low, high) => {
                            setminact(low);
                            setmaxact(high);
                        }}
                        renderThumb={() => {
                            return (
                                <View style={{
                                    backgroundColor: "white",
                                    height: 14,
                                    width: 14,
                                    borderRadius: 7,
                                    shadowColor: "black",
                                    shadowOffset: { width: 0, height: 2 },
                                    shadowOpacity: 0.1,
                                    shadowRadius: 1.5,
                                    elevation: 4
                                }}></View>
                            )
                        }}
                        renderRail={() => {
                            return (
                                <View style={{
                                    height: 1,
                                    width: '100%',
                                    backgroundColor: "grey"
                                }}></View>
                            )
                        }}
                        renderRailSelected={() => {
                            return (
                                <View style={{ backgroundColor: "white", height: 2, width: '100%' }}></View>
                            )
                        }}
                        renderLabel={(value) => {
                            return (
                                <Text style={{ color: "white" }}>{value}</Text>
                            )
                        }} />
                    <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={{ color: 'white' }}>{minact}</Text>
                        <Text style={{ color: 'white' }}>{maxact}</Text>
                    </View>
                </View>

                <View style={{ alignItems: 'center', width: '100%', height: '100%', paddingHorizontal: '8%', marginBottom: '10%' }}>
                    <TouchableOpacity onPress={() => onSubmit()} style={{ backgroundColor: '#00B8FE', width: '100%', height: windowHeight * 0.07, borderRadius: windowHeight * 0.05, justifyContent: 'center', alignItems: 'center' }}><Text style={{ color: 'white', fontWeight: '500', fontSize: windowHeight * 0.02 }} >Save</Text></TouchableOpacity>
                </View>
            </ImageBackground>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    text: { color: 'white', fontSize: windowHeight * 0.02, fontWeight: '600', marginTop: '6%' },
    textinputstyle: { width: '100%', backgroundColor: 'white', height: windowHeight * 0.07, borderRadius: 5, paddingLeft: windowHeight * 0.016, marginTop: '2%' },
    options: { fontSize: windowHeight * 0.016, marginRight: 6 }
})
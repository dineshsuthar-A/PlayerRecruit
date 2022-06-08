import { StyleSheet, Text, View, ImageBackground, TouchableOpacity, ScrollView, Dimensions, ToastAndroid } from 'react-native'
import React, { useState, useEffect } from 'react'
import { TextInput } from 'react-native-gesture-handler'
import { AntDesign } from '@expo/vector-icons';
const windowHeight = Dimensions.get("window").height;
const screenWidth = Dimensions.get("window").width;
import { Picker } from '@react-native-picker/picker';
import * as SecureStore from 'expo-secure-store';
import axios from 'axios';
import RangeSlider from 'rn-range-slider'
import { useFocusEffect } from '@react-navigation/native';
export default function CoachFilter({ navigation }) {
    const yearrs = ['1960', '1961', '1962', '1963', '1964', '1965', '1966', '1967', '1968', '1969', '1970', '1971', '1972', '1973', '1974', '1975', '1976', '1977', '1978', '1979', '1980', '1981', '1982', '1983', '1984', '1985', '1986', '1987', '1988', '1989', '1990', '1991', '1992', '1993', '1994', '1995', '1996', '1997', '1998', '1999', '2000', '2001', '2002', '2003', '2004', '2005', '2006', '2007', '2008', '2009', '2010', '2011', '2012', '2013', '2014', '2015', '2016', '2017', '2018', '2019', '2020', '2021', '2022', '2023', '2024', '2025', '2026', '2027', '2028', '2029', '2030', '2031', '2032', '2033', '2034', '2035', '2036', '2037', '2038', '2039', '2040', '2041', '2042', '2043', '2044', '2045', '2046', '2047', '2048', '2049', '2050'];
    var date = new Date();
    const [states, setstates] = useState([]);
    const [sports, setsports] = useState([]);
    const [readstate, setreadstate] = useState();
    const [readsport, setreadsport] = useState();
    const [positions, setpositions] = useState([]);
    const [readposition, setreadposition] = useState();
    const [minheight, setminheight] = useState(0);
    const [maxheight, setmaxheight] = useState(300);
    const [minweight, setminweight] = useState(0);
    const [maxweight, setmaxweight] = useState(300);
    const [minage, setminage] = useState(0);
    const [maxage, setmaxage] = useState(100);
    const [mingpa, setmingpa] = useState(0);
    const [maxgpa, setmaxgpa] = useState(4);
    const [minsat, setminsat] = useState(0);
    const [maxsat, setmaxsat] = useState(300);
    const [minact, setminact] = useState(0);
    const [maxact, setmaxact] = useState(300);
    const [year, setyear] = useState(date.getFullYear().toString());
    const [yeardata, setyeardata] = useState([]);
    const sportAdd = () => {
        setsports([...sports, readsport.trim()]);
        setreadsport("");
    }
    const addyear = (y) => {
        setyeardata([...yeardata, y])
    }
    const removeYear = (ind) => {
        yeardata.splice(ind, 1);
        setsports([...yeardata]);
    }
    const deletesport = (ind) => {
        sports.splice(ind, 1);
        setsports([...sports]);
    }
    const stateAdd = () => {
        setstates([...states, readstate.trim()]);
        setreadstate("");
    }
    const deletestate = (ind) => {
        states.splice(ind, 1);
        setstates([...states]);
    }
    const positionAdd = () => {
        setpositions([...positions, readposition.trim()]);
        setreadposition("");
    }
    const deleteposition = (ind) => {
        positions.splice(ind, 1);
        setpositions([...positions]);
    }

    const onSubmit = async () => {
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
            "mingpa": parseFloat(mingpa),
            "maxgpa": parseFloat(maxgpa),
            minsat,
            maxsat,
            minact,
            maxact,
            "years": yeardata
        }, {
            headers: {
                "Authorization": token
            }
        }).then((response) => {
            navigation.navigate("Swiping");
        }).catch((err) => {
            console.log(err.response.data);
        });
    }

    const getData = async () => {
        const token = "Bearer " + await SecureStore.getItemAsync("token");
        axios.get("/api/coach/filter", {
            headers: {
                "Authorization": token
            }
        }).then((response) => {
            console.log(response.data.data);
            if (response.data.data != 1) {
                const data = response.data.data;
                setstates(response.data.data.states);
                setsports(response.data.data.sports);
                setpositions(response.data.data.positions);
                setyeardata(response.data.data.years);
                setminact(response.data.data.min_act);
                setmaxact(parseInt(data.max_act));
                setminage(parseInt(data.min_age));
                setmaxage(parseInt(data.max_age));
                setmingpa(parseFloat(data.min_gpa));
                setmaxgpa(parseFloat(data.max_gpa));
                setminsat(parseInt(data.min_sat));
                setmaxsat(parseInt(data.max_sat));
                setminweight(parseInt(data.min_weight));
                setmaxweight(parseInt(data.max_weight));
                setminheight(parseInt(data.min_height));
                setmaxheight(parseInt(data.max_height));
            }
        }).catch((err) => {
        })
    }
    useFocusEffect(React.useCallback(() => {
        getData();
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
                        low={parseInt(minheight)}
                        high={parseInt(maxheight)}
                        onValueChanged={(low, high) => {
                            setminheight(low);
                            setmaxheight(high);
                        }}
                        renderThumb={() => {
                            return (
                                <View style={{
                                    backgroundColor: "white",
                                    height: 20,
                                    width: 20,
                                    borderRadius: 10,
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
                        low={parseInt(minweight)}
                        high={parseInt(maxweight)}
                        onValueChanged={(low, high) => {
                            setminweight(low);
                            setmaxweight(high);
                        }}
                        renderThumb={() => {
                            return (
                                <View style={{
                                    backgroundColor: "white",
                                    height: 20,
                                    width: 20,
                                    borderRadius: 10,
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
                        low={minage}
                        high={maxage}
                        onValueChanged={(low, high) => {
                            setminage(low);
                            setmaxage(high);
                        }}
                        renderThumb={() => {
                            return (
                                <View style={{
                                    backgroundColor: "white",
                                    height: 20,
                                    width: 20,
                                    borderRadius: 10,
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
                    <View style={styles.pickerOuter}>
                        <Picker
                            style={styles.pickerbox} selectedValue={year} onValueChange={(itemValue, itemIndex) => addyear(itemValue)}>
                            {
                                yearrs ?
                                    yearrs.map((i, index) => <Picker.Item style={{ fontSize: windowHeight * 0.02, fontFamily: "Roboto" }} label={i} value={i} key={index} />) : null
                            }
                        </Picker>
                    </View>
                    <View style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>

                        {
                            yeardata ?
                                yeardata.map((i, index) =>
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
                                        <TouchableOpacity onPress={() => removeYear(index)}><AntDesign name="closecircle" size={18} color="grey" /></TouchableOpacity>
                                    </View>
                                ) : null}
                    </View>
                    <Text style={styles.text}>Which GPAs would you like to see?</Text>
                    <RangeSlider
                        style={{ flex: 1, marginTop: windowHeight * 0.01, width: '100%' }}
                        min={0}
                        max={4}
                        low={mingpa}
                        high={maxgpa}
                        step={0.1}
                        onValueChanged={(low, high) => {
                            setmingpa(low.toFixed(1));
                            setmaxgpa(high.toFixed(1));
                        }}
                        renderThumb={() => {
                            return (
                                <View style={{
                                    backgroundColor: "white",
                                    height: 20,
                                    width: 20,
                                    borderRadius: 10,
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
                        low={minsat}
                        high={maxsat}
                        step={1}
                        onValueChanged={(low, high) => {
                            setminsat(low);
                            setmaxsat(high);
                        }}
                        renderThumb={() => {
                            return (
                                <View style={{
                                    backgroundColor: "white",
                                    height: 20,
                                    width: 20,
                                    borderRadius: 10,
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
                        low={minact}
                        high={maxact}
                        step={1}
                        onValueChanged={(low, high) => {
                            setminact(low);
                            setmaxact(high);
                        }}
                        renderThumb={() => {
                            return (
                                <View style={{
                                    backgroundColor: "white",
                                    height: 20,
                                    width: 20,
                                    borderRadius: 10,
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
                    <TouchableOpacity onPress={() => onSubmit()} style={{ backgroundColor: '#00B8FE', width: '100%', height: windowHeight * 0.07, borderRadius: windowHeight * 0.05, justifyContent: 'center', alignItems: 'center', marginTop: '8%' }}><Text style={{ color: 'white', fontWeight: '500', fontSize: windowHeight * 0.02 }} >Save</Text></TouchableOpacity>
                </View>
            </ImageBackground>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    text: { color: 'white', fontSize: windowHeight * 0.02, fontWeight: '600', marginTop: '6%' },
    textinputstyle: { width: '100%', backgroundColor: 'white', height: windowHeight * 0.07, borderRadius: 5, paddingLeft: windowHeight * 0.016, marginTop: '2%' },
    options: { fontSize: windowHeight * 0.016, marginRight: 6 },

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
        paddingHorizontal: 10,
        marginTop: '5%'
    },
})
import { StyleSheet, Text, View, ImageBackground, TouchableOpacity, ScrollView, BackHandler, ToastAndroid } from 'react-native'
import React, { useState, useEffect } from 'react'
import { TextInput } from 'react-native-gesture-handler'
import { AntDesign } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import axios from 'axios';
import * as SecureStore from 'expo-secure-store';


export default function Filter({ navigation }) {
    const [division1, setdivision1] = useState();
    const [division2, setdivision2] = useState();
    const [division3, setdivision3] = useState();
    const [states, setstates] = useState([]);
    const [sports, setsports] = useState([]);
    const [readstate, setreadstate] = useState();
    const [readsport, setreadsport] = useState();
    const [data, setdata] = useState();
    const sportAdd = () => {
        setsports([...sports, readsport.trim()]);
        setreadsport("");
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

    const onSubmit = async () => {
        const divisions = [division1, division2, division3];
        const token = await SecureStore.getItemAsync("token");
        axios.post("api/student/filter", {
            states,
            sports,
            divisions
        }, {
            headers: {
                "Authorization": "Bearer " + token
            }
        }).then((response) => {
            navigation.reset({
                index: 0,
                routes: [{ name: "Swiping" }]
            });
        }).catch((err) => {
            console.log(err.response);
            ToastAndroid.show("error occured.", ToastAndroid.SHORT);
        });
    }

    const getData = async () => {
        const token = "Bearer " + await SecureStore.getItemAsync("token");
        axios.get("api/student/filter", {
            headers: {
                "Authorization": token
            }
        }).then((response) => {
            const division = response.data.data.division?.split(",");
            division?.forEach(element => {
                if (parseInt(element) == 1) {
                    setdivision1(1);
                } else if (parseInt(element) == 2) {
                    setdivision2(2);
                } else if (parseInt(element) == 3) {
                    setdivision3(3);
                }
            });
            setsports(response.data?.data ? response.data.data.sports : []);
            setstates(response.data?.data ? response.data.data.states : []);
        }).catch((err) => {
            console.log(err);
            ToastAndroid.show("error occured.", ToastAndroid.SHORT);
        });
    }

    useFocusEffect(React.useCallback(() => {
        getData();
        const backAction = () => {
            navigation.push("Swiping");
            return true;
        };

        const backHandler = BackHandler.addEventListener(
            "hardwareBackPress",
            backAction
        );

        return () => backHandler.remove();
    }, []))
    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1 }} style={styles.fullView} keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
            contentInsetAdjustmentBehavior='automatic'>

            <ImageBackground source={require('../../assets/bg.png')} style={{ width: '100%', height: '100%' }}>
                <View style={{ paddingHorizontal: '8%', paddingVertical: '3%', flex: 0.8 }}>
                    <Text style={styles.text}>Which divisions/leagues would you
                        like to see?</Text>
                    <View style={{ display: 'flex', flexDirection: 'row', marginTop: '2%' }}>
                        <TouchableOpacity onPress={() => (division1 == 1) ? setdivision1(0) : setdivision1(1)} style={(division1 == 1) ? styles.selecteddivision : styles.division}><Text style={{ color: 'black', fontSize: 13 }}>I</Text></TouchableOpacity>
                        <TouchableOpacity onPress={() => (division2 == 2) ? setdivision2(0) : setdivision2(2)} style={(division2 == 2) ? styles.selecteddivision : styles.division}><Text style={{ color: 'black', fontSize: 10 }}>II</Text></TouchableOpacity>
                        <TouchableOpacity onPress={() => (division3 == 3) ? setdivision3(0) : setdivision3(3)} style={(division3 == 3) ? styles.selecteddivision : styles.division}><Text style={{ color: 'black', fontSize: 10 }}>III</Text></TouchableOpacity>
                    </View>

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
                                        paddingRight: 3,
                                        marginTop: '2%'
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
                                        <Text style={{ fontSize: 12, marginRight: 6 }}>{i}</Text>
                                        <TouchableOpacity onPress={() => deletesport(index)}><AntDesign name="closecircle" size={18} color="grey" /></TouchableOpacity>
                                    </View>) : null
                        }


                    </View>
                </View>

                <View style={{ flex: 0.2, justifyContent: 'center', alignItems: 'center', width: '100%', height: '100%', paddingHorizontal: '8%' }}>
                    <TouchableOpacity onPress={() => onSubmit()} style={{ backgroundColor: '#00B8FE', width: '100%', height: 50, borderRadius: 25, justifyContent: 'center', alignItems: 'center' }}><Text style={{ color: 'white', fontWeight: '500' }}>Save</Text></TouchableOpacity>
                </View>
            </ImageBackground>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    text: { color: 'white', fontSize: 15, fontWeight: '600', marginTop: '4%' },
    textinputstyle: { width: '100%', backgroundColor: 'white', height: 50, borderRadius: 5, paddingLeft: 10, marginTop: '2%' },
    division: {
        backgroundColor: "#CBD5DB",
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 20,
        paddingVertical: 4,
        paddingHorizontal: 15,
        marginRight: 10
    },
    selecteddivision: {
        backgroundColor: "#00B8FE",
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 20,
        paddingVertical: 4,
        paddingHorizontal: 15,
        marginRight: 10
    },
});
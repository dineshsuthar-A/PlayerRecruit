import { StyleSheet, Text, View, TouchableOpacity, Image, Dimensions } from 'react-native'
import React, { useState } from 'react'
import { baseURL } from '../config';
import { useFocusEffect } from '@react-navigation/native';
const windowHeight = Dimensions.get("window").height;
const windowWidth = Dimensions.get("window").width;
import { db } from '../Firebase';
import { collection, addDoc, doc, setDoc, Firestore, serverTimestamp, query, orderBy, onSnapshot, limit, getDoc, where } from 'firebase/firestore';
export default function ChatUserListItem(props) {
    const [length, setlength] = useState();
    const [data, setdata] = useState();
    const [date, setdate] = useState();
    const docid = props.user.registration_id > props?.data?.registration_id ? props?.user?.registration_id + "-" + props?.data?.registration_id : props?.data?.registration_id + "-" + props?.user?.registration_id;
    const d = new Date();
    return (
        <View style={{ paddingVertical: windowHeight * 0.015, marginBottom: 2, backgroundColor: props?.count && props.count > 0 ? '#F9FAFC' : 'white', borderWidth: props?.count && props?.count > 0 ? 1 : null, borderColor: props?.count && props?.count > 0 ? "#EFF2F7" : null, paddingHorizontal: 10, height: 70 }}>
            <View style={{ display: 'flex', flexDirection: 'row' }}>
                <TouchableOpacity onPress={() => props.showprof(props?.data?.registration_id)} style={{ flex: 0.25, justifyContent: 'center', alignItems: 'center', }}>
                    <View style={{ height: windowHeight * 0.07, width: windowHeight * 0.07 }}>
                        <Image source={{ uri: baseURL + "uploads/" + props?.data?.image }} style={{ width: windowHeight * 0.07, height: windowHeight * 0.07, borderRadius: windowHeight * 0.07 }} />
                        {/* <View style={{ padding: 2, backgroundColor: 'white', width: 16, height: 16, borderRadius: 8, position: 'absolute', right: 0, bottom: 0 }}>
                            <Text style={{ width: '100%', height: '100%', borderRadius: 8, backgroundColor: 'green' }}></Text>
                        </View> */}
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => props?.chatid(props?.data)} style={{ flex: 0.75, flexDirection: 'row' }}>
                    <View style={{ flex: 0.7, }}>
                        <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Text style={{ fontSize: windowHeight * 0.022, color: '#7B8793' }}>{props?.data?.firstname} {props?.data?.lastname}</Text>
                        </View>
                        <Text numberOfLines={1} style={{ color: "#7B8793", fontSize: windowHeight * 0.017 }}>{props?.text ? ((props?.data?.sentid == props?.data?.registration_id) ? props?.data?.firstname + ": " + (props?.text) : "Me: " + (props?.text)) : null}</Text>
                    </View>
                    <View style={{ flex: 0.3, justifyContent: 'center', alignItems: 'center' }}>
                        {props?.count && props?.count > 0 ?
                            <View>
                                <Text style={{ color: 'white', backgroundColor: 'green', width: windowHeight * 0.03, height: windowHeight * 0.03, borderRadius: windowHeight * 0.03 / 2, textAlign: 'center', fontWeight: '500', fontSize: windowHeight * 0.016, textAlignVertical: 'center' }}>{props?.count}</Text>
                            </View>
                            :
                            <Text style={{ color: "#7B8793", fontSize: windowHeight * 0.016 }}>{props?.data?.time ? ((props?.data?.time.toLocaleDateString() == d.toLocaleDateString()) ? (((parseInt(props?.data?.time.toLocaleTimeString().split(":")[0]) <= 12) ? (props?.data?.time.toLocaleTimeString().split(":")[0]) : (parseInt(props?.data?.time.toLocaleTimeString().split(":")[0]) % 12)) + ":" + props?.data?.time.toLocaleTimeString().split(":")[1] + ((parseInt(props?.data?.time.toLocaleTimeString().split(":")[0]) < 12) ? " AM" : " PM")) : (props?.data?.time.toLocaleDateString().split("/")[1] + "." + props?.data?.time.toLocaleDateString().split("/")[0] + "." + props?.data?.time.toLocaleDateString().split("/")[2])) : null}</Text>
                        }
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({})
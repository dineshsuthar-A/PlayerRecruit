import { StyleSheet, Text, View, Image, TouchableOpacity, Dimensions } from 'react-native'
import React, { useEffect, useState } from 'react'
import { AntDesign } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import * as SecureStore from 'expo-secure-store';
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import axios from 'axios';
import { useFocusEffect } from '@react-navigation/native';
import { baseURL } from '../../config';
const windowHeight = Dimensions.get("window").height;
const windowWidth = Dimensions.get("window").width;
import { db } from '../../Firebase';
import { collection, addDoc, doc, setDoc, getDocuments, serverTimestamp, query, orderBy, onSnapshot, limit, getDoc, where, FieldPath, documentId, getDocs, QuerySnapshot, Unsubscribe } from 'firebase/firestore';
import ChatUserListItem from '../ChatUserListItem';
import { async } from '@firebase/util';
export default function CoachMessagesList({ navigation }) {
    const [personal, setpersonal] = useState();
    const [people, setpeople] = useState();
    const [chatlist, setchatlist] = useState();
    const [userid, setuserid] = useState();
    const [peopledata, setpeopledata] = useState();
    const personalData = async () => {
        const token = "Bearer " + await SecureStore.getItemAsync("token");
        axios.get("/api/coach/info", {
            headers: {
                "Authorization": token
            }
        }).then((response) => {
            setuserid(response.data.data.registration_id);
            setpersonal(response.data.data);
            getChatList(response.data.data.registration_id);
        }).catch((err) => {
            console.log(err);
            console.log(err.response.data);
        });
    }

    const getChatList = async (id) => {
        const token = "Bearer " + await SecureStore.getItemAsync("token");
        axios.get("/api/coach/matches", {
            headers: {
                "Authorization": token
            }
        }).then((response) => {
            setchatlist(response.data.data);
            const t = response.data.data;
            for (var i = 0; i < t.length; i++) {
                t[i] = { ...t[i], "time": 0 }
            }
            snapshot(id, t);
        }).catch((err) => {
            console.log(err.response.data);
        });
    }
    function GetSortOrder(prop) {
        return function (a, b) {
            if (a[prop] < b[prop]) {
                return 1;
            } else if (a[prop] > b[prop]) {
                return -1;
            }
            return 0;
        }
    }

    const sortTime = (p) => {
        if (p) {
            p.sort(GetSortOrder("time"));
        }
        setpeople(p);
        setpeopledata(p);
    }
    const snapshot = (id, pe) => {
        if (id) {
            const q = query(collection(db, "chat/inbox/" + id));
            if (pe) {
                try {
                    const sub = onSnapshot(q, (querySnapshot) => {
                        var p = pe;
                        querySnapshot.forEach(doc => {
                            for (var i = 0; i < p.length; i++) {
                                if (p[i].registration_id == doc.data().reciever) {
                                    p[i].text = doc.data().lastmessage.text;
                                    p[i].time = doc.data()?.lastmessage?.createdAt?.toDate();
                                    p[i].sentid = doc.data()?.lastmessage?.user?._id;
                                    p[i].count = doc.data()?.count;
                                }
                            }
                        });
                        setpeople(null);
                        sortTime(p);
                    });
                } catch (err) {
                    console.log(err);
                }
            }
        }
    }

    const onsearch = (txt) => {
        const d = peopledata.filter((i) => {
            const name = i.firstname + " " + i.lastname;
            return name.toUpperCase().indexOf(txt.toString().toUpperCase()) > -1;;
        });
        setpeople(d);
    }
    const showprofile = (id) => {
        navigation.navigate("profile", { "id": id })
    }
    const openchat = (i) => {
        navigation.navigate("chat", {
            "userid": personal,
            "receiver": i
        })

    }
    useFocusEffect(React.useCallback(() => {
        personalData();
    }, []));
    return (
        userid ?
            <View style={{ width: '100%', height: '100%' }}>
                <View style={{ paddingHorizontal: '4%', paddingTop: '6%', backgroundColor: 'white', width: '100%', }}>
                    <View style={{ display: 'flex', flexDirection: 'row' }}>
                        <View style={{ flex: 0.2, justifyContent: 'center', alignItems: 'center', }}>
                            <Image source={{ uri: baseURL + "uploads/" + personal?.image }} style={{ width: 70, height: 70, borderRadius: 35 }} />
                            <View style={{ padding: 2, backgroundColor: 'white', width: 16, height: 16, borderRadius: 8, position: 'absolute', right: 0, bottom: 0 }}>
                                <Text style={{ width: '100%', height: '100%', borderRadius: 8, backgroundColor: 'green' }}></Text>
                            </View>
                        </View>
                        <View style={{ flex: 0.7, marginLeft: '5%' }}>
                            <Text style={{ fontSize: 20, color: '#4B5155' }}>{personal?.firstname} {personal?.lastname}</Text>
                            <Text numberOfLines={1} style={{ color: 'grey', fontSize: 13 }}>{personal?.jobtitle}</Text>
                            <View style={{ marginTop: 6, justifyContent: 'center' }}>
                                <Text style={{ color: 'green' }} >Online</Text>
                            </View>

                        </View>
                        <View style={{ flex: 0.1, marginTop: 4 }}>
                            {/* <TouchableOpacity><Text> <AntDesign name="setting" size={24} color="grey" /></Text></TouchableOpacity> */}
                        </View>
                    </View>

                    <View style={{ marginTop: 20, display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Text style={{ color: '#4B5155', fontSize: 18 }}>Active Chats</Text>
                        {/* <TouchableOpacity onPress={() => logout()} style={{ marginTop: 8, marginRight: 6 }}><Entypo name="plus" size={20} color="#4B5155" /></TouchableOpacity> */}
                    </View>

                    <View style={{ marginTop: 20, width: '100%', height: 45, backgroundColor: '#F9FAFC', justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center', paddingHorizontal: '3%', borderRadius: 8, borderColor: '#DBE5ED', borderWidth: 1 }}>
                        <TextInput onChangeText={(t) => onsearch(t)} placeholder='Search people' style={{ width: '100%', flex: 0.9 }} selectionColor="green" />
                        <View style={{ flex: 0.1, justifyContent: 'center', alignItems: 'center' }}>
                            <TouchableOpacity><FontAwesome5 name="search" size={20} color="#AFBBC6" /></TouchableOpacity></View>
                    </View>
                </View>
                <ScrollView style={{ width: '100%', height: '100%', paddingTop: windowHeight * 0.02, paddingHorizontal: windowWidth * 0.02, backgroundColor: 'white' }}>
                    {people ?
                        people.map((i, index) => (
                            <ChatUserListItem key={index} showprof={showprofile} chatid={openchat} data={i} text={(i?.text)} count={i?.count} user={personal} />

                        )
                        ) : null
                    }

                </ScrollView>
            </View>
            : null
    )
}

const styles = StyleSheet.create({})





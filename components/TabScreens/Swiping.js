import { StyleSheet, Text, View, ImageBackground, StatusBar, TouchableOpacity, Image, Dimensions, ActivityIndicator, ToastAndroid } from 'react-native'
import React, { useState, useRef, useEffect } from 'react'
import Swiper from 'react-native-deck-swiper-renewed';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import * as SecureStore from 'expo-secure-store';
import Dialog from "react-native-dialog";
import axios from 'axios';
import CardCoach from '../CardCoach';


const windowHeight = Dimensions.get("window").height;

export default function Swiping({ route, navigation }) {
    const SwipeRef = useRef();
    const [disp, setDisp] = useState(false);
    const [data, setdata] = useState([]);
    const [dialog, setdialog] = useState(false);
    const getdata = async () => {
        await setDisp(true);
        const token = "Bearer " + await SecureStore.getItemAsync("token");
        axios.get("/api/coaches/cards", {
            headers: {
                "Authorization": token
            }
        }).then((response) => {
            setDisp(false);
            setdata(response.data.data);
        }).catch((err) => {
            setDisp(false);
            console.log(err);
        });
    }
    const getswipingData = async () => {
        const token = "Bearer " + await SecureStore.getItemAsync("token");
        axios.get("/api/coaches/cards", {
            headers: {
                "Authorization": token
            }
        }).then((response) => {
            setdata(response.data.data);
            setindex(0);
        }).catch((err) => {
            console.log(err.response.data);
        });

    }
    const swipedleft = async (id) => {
        const token = "Bearer " + await SecureStore.getItemAsync("token");
        axios.post("/api/swipe/left", {
            "id": id
        }, {
            headers: {
                "Authorization": token
            }
        }).then((response) => {
        }).catch((err) => {
            console.log(err);
        });
    }
    const swipedRight = async (id) => {
        const token = "Bearer " + await SecureStore.getItemAsync("token");
        axios.post("/api/swipe/right", {
            "coach_id": id
        }, {
            headers: {
                "Authorization": token
            }
        }).then((response) => {
        }).catch((err) => {
            console.log(err.response.data);
        });
    }
    const swipeTop = async (id) => {
        const token = "Bearer " + await SecureStore.getItemAsync("token");
        axios.post("/api/swipe/neutral", {
            "id": id
        }, {
            headers: {
                "Authorization": token
            }
        }).then((response) => {
        }).catch((err) => {
            console.log(err);
        });
    }
    const Reset = async () => {
        setDisp(true);
        setdialog(false);
        const token = "Bearer " + await SecureStore.getItemAsync("token");
        axios.post("/api/swipe/reset", null, {
            headers: {
                "Authorization": token
            }
        }
        ).then((response) => {

            console.log(response);
            setdata(null);
            getdata();
        }).catch((err) => {
            setDisp(false);
            ToastAndroid.show(err?.response?.data?.error ? err?.response?.data?.error : "Try again", ToastAndroid.SHORT);
            console.log(err.response.data);
        });
    }
    useEffect(() => {
        getdata();
    }, []);
    const jumper = (index) => {
        console.log(index);
        SwipeRef.current.jumpToCardIndex(0);
    }
    return (
        <ImageBackground source={require("../../assets/bg.png")} style={{ width: '100%', height: '100%', display: 'flex' }}>

            <ActivityIndicator size="large" animating={disp} color="#004467" style={{ position: "absolute", top: '50%', left: '45%', zIndex: 10 }} />
            <StatusBar barStyle="light-content" backgroundColor="#004467" />
            <View style={{ flex: 0.85, padding: 20 }}>
                {(data && data.length > 0) ?
                    <Swiper
                        ref={SwipeRef}
                        cards={data}
                        onSwiped={(cardIndex) => { }}
                        onSwipedAll={async (cardIndex) => { setdata(null); await getdata() }}
                        cardIndex={0}
                        stackSize={1}
                        marginTop={-50}
                        onSwipedLeft={(cardData) => swipedleft(data[cardData]?.registration_id)}
                        onSwipedRight={(cardData) => swipedRight(data[cardData]?.registration_id)}
                        onSwipedTop={(cardData) => { swipeTop(data[cardData]?.registration_id) }}
                        overlayLabels={{
                            left: {
                                element: <View>
                                    <Text><MaterialCommunityIcons name="close-circle-outline" size={100} color="red" /></Text>
                                </View>,
                                title: 'Nope',
                                style: {
                                    wrapper: {
                                        flexDirection: 'column',
                                        alignItems: 'flex-end',
                                        justifyContent: 'flex-start',
                                        marginTop: 50,
                                        marginLeft: -30
                                    }
                                }
                            },
                            right: {
                                element: <View>
                                    <Text><AntDesign name="like1" size={100} color="#00B8FE" /></Text>
                                </View>,
                                title: 'Nope',
                                style: {
                                    wrapper: {
                                        flexDirection: 'column',
                                        alignItems: 'flex-start',
                                        justifyContent: 'flex-start',
                                        marginTop: 30,
                                        marginLeft: 30
                                    }
                                }
                            },
                            top: {
                                element: <View>
                                    <AntDesign name="star" size={100} color="#FFDF00" />
                                </View>,
                                title: 'Nope',
                                style: {
                                    wrapper: {
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    }
                                }
                            }
                        }}
                        disableBottomSwipe={true}
                        marginBottom={160}
                        cardHorizontalMargin={40}
                        animateCardOpacity
                        backgroundColor="transparent"
                        renderCard={(cardData) => {

                            return (
                                cardData ?
                                    <CardCoach id={cardData?.registration_id} nav={navigation} collegestate={cardData?.College_State} firstname={cardData?.firstname} lastname={cardData?.lastname} jobtitle={cardData?.jobtitle} team={cardData?.team} college={cardData?.college_name} division={cardData?.divisions} coaches={cardData?.coaching_gender} sport={cardData?.sportsname} state={cardData?.statename} city={cardData?.city} phone={cardData?.phone} bio={cardData?.personal_bio} image={cardData?.image} />
                                    : null
                            )
                        }}>

                    </Swiper> :
                    <View style={{ display: disp ? 'none' : 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100%' }}>
                        <Text style={{ color: 'white', fontWeight: '600', fontSize: windowHeight * 0.024 }}>No more cards present</Text>
                        <TouchableOpacity onPress={() => setdialog(true)} style={{ height: windowHeight * 0.06, borderRadius: 5, marginTop: windowHeight * 0.05, justifyContent: 'center', borderWidth: 1, alignItems: 'center', paddingHorizontal: '5%', flexDirection: 'row', borderColor: 'white', width: '50%' }}>
                            <Text style={{ color: 'white', fontWeight: '600', fontSize: windowHeight * 0.022 }}>RESET </Text>
                            <Ionicons name="md-reload-circle-sharp" size={windowHeight * 0.022} color="white" />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => console.log(navigation.getParent().navigate("Matches"))} style={{ height: windowHeight * 0.06, borderRadius: 5, justifyContent: 'center', borderWidth: 1, alignItems: 'center', paddingHorizontal: '5%', flexDirection: 'row', borderColor: 'white', width: '50%', marginTop: windowHeight * 0.02 }}>
                            <Text style={{ color: 'white', fontWeight: '600', fontSize: windowHeight * 0.022 }}>Go To Matches </Text>
                        </TouchableOpacity>
                        <Dialog.Container visible={dialog}>
                            <Dialog.Title>Reset</Dialog.Title>
                            <Dialog.Description>
                                Are you sure you want to reset all your swipe history?
                            </Dialog.Description>
                            <Dialog.Button label="Cancel" style={{ color: '#00B8FE' }} onPress={() => setdialog(false)} />
                            <Dialog.Button label="Reset" style={{ color: '#00B8FE' }} onPress={() => Reset()} />
                        </Dialog.Container>
                    </View>
                }
            </View>
            <View style={{ flex: 0.2, width: '100%', paddingHorizontal: 40, position: 'absolute', bottom: 0, justifyContent: 'space-around', flexDirection: 'row', alignItems: 'center', paddingBottom: 20 }}>
                <TouchableOpacity onPress={() => disp ? null : SwipeRef?.current?.swipeLeft()}><View style={styles.button}><MaterialCommunityIcons name="close-circle-outline" size={30} color={"red"} /></View></TouchableOpacity>
                <TouchableOpacity onPress={() => disp ? null : SwipeRef?.current?.swipeTop()}><Image source={require('../../assets/football.png')} style={{ height: 50, width: 50 }} /></TouchableOpacity>
                <TouchableOpacity onPress={() => disp ? null : SwipeRef.current?.swipeRight()}><View style={styles.button}><Image source={require("../../assets/path.png")} style={{ width: 35, height: 30 }} /></View></TouchableOpacity>
            </View>


        </ImageBackground >
    )
}

const styles = StyleSheet.create({
    button: { width: windowHeight * 0.07, height: windowHeight * 0.07, backgroundColor: 'white', borderRadius: windowHeight * 0.07 / 2, justifyContent: 'center', alignItems: 'center' },
    like: {
        width: windowHeight * 0.07, height: windowHeight * 0.07, backgroundColor: 'lightblue', borderRadius: windowHeight * 0.07 / 2, justifyContent: 'center', alignItems: 'center', elevation: 2
    },
    wrong: {
        width: windowHeight * 0.07, height: windowHeight * 0.07, backgroundColor: 'red', borderRadius: windowHeight * 0.07 / 2, justifyContent: 'center', alignItems: 'center', animationDuration: '2s', elevation: 2
    }
})
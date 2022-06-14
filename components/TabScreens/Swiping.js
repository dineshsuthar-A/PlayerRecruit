import { StyleSheet, Text, View, ImageBackground, StatusBar, TouchableOpacity, Image, Dimensions, ActivityIndicator } from 'react-native'
import React, { useState, useRef, useEffect } from 'react'
import CardAthelete from '../CardAthelete';
import Swiper from 'react-native-deck-swiper-renewed';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import * as SecureStore from 'expo-secure-store';
import { useFocusEffect } from '@react-navigation/native';
import axios from 'axios';
import CardCoach from '../CardCoach';
const windowHeight = Dimensions.get("window").height;
export default function Swiping({ navigation }) {
    const SwipeRef = useRef();
    const [disp, setDisp] = useState(false);
    const [refreshPage, setRefreshPage] = useState("");
    const [data, setdata] = useState([]);
    const [index, setindex] = useState(0);
    const [action, setaction] = useState();
    const getdata = async () => {
        await setDisp(true);
        const token = "Bearer " + await SecureStore.getItemAsync("token");
        axios.get("/api/coaches/cards", {
            headers: {
                "Authorization": token
            }
        }).then((response) => {
            setDisp(false);
            setdata(response.data.data).forceUpdate();
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
    const getActionStatus = async (id) => {
        const token = "Bearer " + await SecureStore.getItemAsync("token");
        axios.get("/api/swipe/action", {
            params: {
                id
            },
            headers: {
                "Authorization": token
            }
        }).then((response) => {
            setaction(response.data.action);

        }).catch((err) => {
            console.log(err.response.data);
        })
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

                    </Swiper> : <Text style={{ display: disp ? 'none' : 'flex', color: 'white', textAlign: 'center', textAlignVertical: 'center', height: '100%' }}>No more data present</Text>}
            </View>
            <View style={{ flex: 0.2, width: '100%', paddingHorizontal: 40, position: 'absolute', bottom: 0, justifyContent: 'space-around', flexDirection: 'row', alignItems: 'center', paddingBottom: 20 }}>
                <TouchableOpacity onPress={() => disp ? null : SwipeRef?.current?.swipeLeft()}><View style={disp ? styles.button : (action == 0) ? styles.wrong : styles.button}><MaterialCommunityIcons name="close-circle-outline" size={30} color={disp ? "red" : (action == 0) ? "white" : "red"} /></View></TouchableOpacity>
                <TouchableOpacity onPress={() => disp ? null : SwipeRef?.current?.swipeTop()}><Image source={require('../../assets/football.png')} style={{ height: 50, width: 50 }} /></TouchableOpacity>
                <TouchableOpacity onPress={() => disp ? null : SwipeRef.current?.swipeRight()}><View style={disp ? styles.button : (action == 1) ? styles.like : styles.button}><Image source={require("../../assets/path.png")} style={{ width: 35, height: 30 }} /></View></TouchableOpacity>
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
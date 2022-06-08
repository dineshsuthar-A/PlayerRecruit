import { StyleSheet, Text, View, ImageBackground, StatusBar, TouchableOpacity, Image } from 'react-native'
import React, { useState, useRef } from 'react'
import CardAthelete from '../CardAthelete';
import Swiper from 'react-native-deck-swiper-renewed';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import * as SecureStore from 'expo-secure-store';
import { useFocusEffect } from '@react-navigation/native';
import axios from 'axios';
import CardCoach from '../CardCoach';
export default function Swiping() {
    const SwipeRef = useRef();
    const [disp, setDisp] = useState(false);
    const [data, setdata] = useState([]);
    const getdata = async () => {
        const token = "Bearer " + await SecureStore.getItemAsync("token");
        axios.get("/api/students/cards", {
            headers: {
                "Authorization": token
            }
        }).then((Response) => {
            setdata(Response.data?.data);
        }).catch((error) => {
            console.log(error);
        });

    }
    useFocusEffect(React.useCallback(() => {
        getdata();
    }, []))
    return (
        <ImageBackground source={require("../../assets/bg.png")} style={{ width: '100%', height: '100%', display: 'flex' }}>
            <StatusBar barStyle="light-content" backgroundColor="#004467" />

            <View style={{ flex: 0.85, padding: 20 }}>
                {data ? <Swiper
                    ref={SwipeRef}
                    cards={data}
                    onSwiped={(cardIndex) => { console.log(cardIndex) }}
                    onSwipedAll={() => { setDisp(true) }}
                    cardIndex={0}
                    stackSize={1}
                    marginTop={-50}
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
                            <CardAthelete image={cardData?.image} fname={cardData?.firstname} lname={cardData?.lastname} scholasticyear={cardData?.scholastic_year} school={cardData?.school_name} type={cardData?.school_type} state={cardData?.statename} height={cardData?.height + " " + cardData?.heightunit} weight={cardData?.weight + " " + cardData?.units} gpa={cardData?.gpa} phone={cardData?.phone} sport={cardData?.sport} sat={cardData?.sat} act={cardData?.act} gender={cardData?.gender} ethnicity={cardData?.ethnicities} bio={cardData?.personal_bio} />

                        )
                    }}>

                </Swiper> : null}
            </View>
            <View style={{ flex: 0.2, width: '100%', paddingHorizontal: 40, position: 'absolute', bottom: 0, justifyContent: 'space-around', flexDirection: 'row', alignItems: 'center', paddingBottom: 20 }}>
                <TouchableOpacity onPress={() => disp ? null : SwipeRef.current.swipeLeft()}><View style={{ width: 50, height: 50, backgroundColor: 'white', borderRadius: 25, justifyContent: 'center', alignItems: 'center' }}><MaterialCommunityIcons name="close-circle-outline" size={30} color="red" /></View></TouchableOpacity>
                <TouchableOpacity onPress={() => disp ? null : SwipeRef.current.swipeTop()}><Image source={require('../../assets/football.png')} style={{ height: 50, width: 50 }} /></TouchableOpacity>
                <TouchableOpacity onPress={() => disp ? null : SwipeRef.current.swipeRight()}><View style={{ width: 50, height: 50, backgroundColor: 'white', borderRadius: 25, justifyContent: 'center', alignItems: 'center' }}><Image source={require("../../assets/path.png")} style={{ width: 35, height: 30 }} /></View></TouchableOpacity>
            </View>
            <View style={{ display: disp ? 'flex' : 'none', width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ color: 'white', fontWeight: '700', fontSize: 18 }}>No More cards Available</Text>
            </View>


        </ImageBackground >
    )
}

const styles = StyleSheet.create({
})
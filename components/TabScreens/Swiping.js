import { StyleSheet, Text, View, ImageBackground, StatusBar, TouchableOpacity, Image } from 'react-native'
import React, { useState, useRef } from 'react'
import CardAthelete from '../CardAthelete';
import Swiper from 'react-native-deck-swiper-renewed';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
export default function Swiping() {

    const SwipeRef = useRef();
    const [disp, setDisp] = useState(false);
    return (
        <ImageBackground source={require("../../assets/bg.png")} style={{ width: '100%', height: '100%', display: 'flex' }}>
            <StatusBar barStyle="light-content" backgroundColor="#004467" />

            <View style={{ flex: 0.85, padding: 20 }}>
                <Swiper
                    ref={SwipeRef}
                    cards={['DO', 'MORE', 'OF', 'WHAT', 'MAKES', 'YOU', 'HAPPY']}
                    onSwiped={(cardIndex) => { console.log(cardIndex) }}
                    onSwipedAll={() => { setDisp(true) }}
                    cardIndex={0}
                    stackSize={3}
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
                    renderCard={(card) => {
                        return (
                            <CardAthelete />
                        )
                    }}>

                </Swiper>
            </View>
            <View style={{ flex: 0.2, width: '100%', paddingHorizontal: 40, position: 'absolute', bottom: 0, justifyContent: 'space-around', flexDirection: 'row', alignItems: 'center', paddingBottom: 20 }}>
                <TouchableOpacity onPress={() => SwipeRef.current.swipeLeft()}><View style={{ width: 50, height: 50, backgroundColor: 'white', borderRadius: 25, justifyContent: 'center', alignItems: 'center' }}><MaterialCommunityIcons name="close-circle-outline" size={30} color="red" /></View></TouchableOpacity>
                <TouchableOpacity onPress={() => SwipeRef.current.swipeTop()}><Image source={require('../../assets/football.png')} style={{ height: 50, width: 50 }} /></TouchableOpacity>
                <TouchableOpacity onPress={() => SwipeRef.current.swipeRight()}><View style={{ width: 50, height: 50, backgroundColor: 'white', borderRadius: 25, justifyContent: 'center', alignItems: 'center' }}><Image source={require("../../assets/path.png")} style={{ width: 35, height: 30 }} /></View></TouchableOpacity>
            </View>
            <View style={{ display: disp ? 'flex' : 'none', width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ color: 'white', fontWeight: '700', fontSize: 18 }}>No More cards Available</Text>
            </View>


        </ImageBackground >
    )
}

const styles = StyleSheet.create({
})
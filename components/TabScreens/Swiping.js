import { StyleSheet, Text, View, ImageBackground, StatusBar } from 'react-native'
import React, { useRef } from 'react'
import CardStack, { Card } from 'react-native-card-stack-swiper';
import CardAthelete from '../CardAthelete';


export default function Swiping() {
    const swiper = useRef();
    return (


        <ImageBackground source={require("../../assets/bg.png")} style={{ width: '100%', height: '100%' }}>
            <StatusBar barStyle="light-content" backgroundColor="#004467" />

            <View style={{ width: '100%', height: '100%', paddingVertical: '6%', paddingHorizontal: '10%' }}>
                <CardStack style={styles.content} refs={swiper => { this.swiper = swiper }}>
                    <Card style={styles.card}><CardAthelete /></Card>
                    <Card style={styles.card}><CardAthelete /></Card>
                    <Card style={styles.card}><CardAthelete /></Card>
                </CardStack>
            </View>
        </ImageBackground >
    )
}

const styles = StyleSheet.create({
    content: {
        height: '100%',
        width: '100%'
    },
    card: {
        width: '100%',
        height: '100%',
    }
})
import { StyleSheet, Text, View, ImageBackground, StatusBar } from 'react-native'
import React from 'react'
import CardAthelete from '../CardAthelete'

export default function PreviewCard() {
    return (


        <ImageBackground source={require("../../assets/bg.png")} style={{ width: '100%', height: '100%' }}>
            <StatusBar barStyle="light-content" backgroundColor="#004467" />

            <View style={{ width: '100%', height: '100%', paddingVertical: '6%', paddingHorizontal: '10%' }}>
                <CardAthelete />
            </View>
        </ImageBackground>
    )
}

const styles = StyleSheet.create({})
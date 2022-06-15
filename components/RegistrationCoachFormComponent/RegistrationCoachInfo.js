import { StyleSheet, Text, View, Image, Dimensions } from 'react-native'
import React from 'react'
const windowHeight = Dimensions.get("window").height;
const width = Dimensions.get('window').width;
export default function RegistrationCoachInfo() {
    return (

        <View style={{ width: width, paddingHorizontal: '2%', alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{ color: "white", fontSize: windowHeight * 0.025, fontWeight: "700", marginBottom: windowHeight * 0.09 }}>What you're making</Text>
            <Image source={require('../../assets/card.png')}></Image>
            <Text style={{ color: "white", fontSize: windowHeight * 0.025, fontWeight: "700", marginTop: windowHeight * 0.08 }}>Match with a coach and</Text>
            <Text style={{ color: "white", fontSize: windowHeight * 0.025, fontWeight: "700", }}>get their contact information</Text>
        </View>
    )
}

const styles = StyleSheet.create({

})
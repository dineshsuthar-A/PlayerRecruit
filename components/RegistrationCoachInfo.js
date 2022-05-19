import { StyleSheet, Text, View, ImageBackground, Image, TouchableOpacity } from 'react-native'
import React from 'react'

export default function RegistrationCoachInfo({ navigation }) {
    return (
        <ImageBackground source={require('../assets/bg.png')} style={{ backgroundColor: "#004E75", width: "100%", height: "100%" }}>
            <View style={{ display: 'flex', justifyContent: "center", alignItems: 'center', width: '100%', height: '100%', paddingHorizontal: '11%', paddingTop: '10%' }}>
                <View style={{ flex: 0.75, width: '100%', alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={{ color: "white", fontSize: 18, fontWeight: "700", marginBottom: "18%" }}>What you're making</Text>
                    <Image source={require('../assets/card.png')}></Image>
                    <Text style={{ color: "white", fontSize: 18, fontWeight: "700", marginTop: "17%" }}>Connect with student athletes.</Text>

                </View>
                <View style={{ flex: 0.25, width: '100%', justifyContent: 'center', alignItems: 'center' }}>
                    <View style={{ display: 'flex', flexDirection: 'row' }}>
                        <Text style={styles.dot}></Text>
                        <Text style={styles.dot}></Text>
                        <Text style={styles.dot}></Text>
                        <Text style={styles.dot}></Text>
                    </View>
                    <TouchableOpacity onPress={() => navigation.navigate("RegistrationCoachPersonal")} style={styles.button} ><Text style={{ height: '100%', textAlignVertical: 'center', color: 'white', fontWeight: 'bold' }}>Begin</Text></TouchableOpacity>
                </View>
            </View>
        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#00B8FE',
        width: '100%',
        marginTop: "10%",
        alignItems: 'center',
        height: 50,
        borderRadius: 30
    }, activedot: {
        height: 15, width: 15, borderWidth: 1, borderColor: "#CCD4D8", borderRadius: 10, marginRight: 4, backgroundColor: "#CCD4D8"
    },
    dot: { height: 15, width: 15, borderWidth: 1, borderColor: "#CCD4D8", borderRadius: 10, marginRight: 4 }
})
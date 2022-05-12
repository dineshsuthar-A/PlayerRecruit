import { StyleSheet, Text, View, ImageBackground, Image, TouchableOpacity } from 'react-native'
import React from 'react'

export default function SelectStudentTemplate({ navigation }) {
  return (
    <ImageBackground source={require('../assets/bg.png')} style={{ backgroundColor: "#004E75", width: "100%", height: "100%" }}>
      <View style={{ display: 'flex', justifyContent: "center", alignItems: 'center', padding: 30, marginTop: 40 }}>
        <Text style={{ color: "white", fontSize: 18, fontWeight: "700", marginBottom: 50 }}>What you're making</Text>
        <Image source={require('../assets/card.png')}></Image>
        <Text style={{ color: "white", fontSize: 18, fontWeight: "700", marginTop: 30 }}>Match with a coach and</Text>
        <Text style={{ color: "white", fontSize: 18, fontWeight: "700", marginBottom: 20 }}>get their contact information</Text>
        <View style={{ display: 'flex', flexDirection: 'row' }}>
          <Text style={{ height: 20, width: 20, borderWidth: 1, borderColor: "#CCD4D8", borderRadius: 10, marginRight: 4 }}></Text>

          <Text style={{ height: 20, width: 20, borderWidth: 1, borderColor: "#CCD4D8", borderRadius: 10, marginRight: 4 }}></Text>

          <Text style={{ height: 20, width: 20, borderWidth: 1, borderColor: "#CCD4D8", borderRadius: 10, marginRight: 4 }}></Text>

          <Text style={{ height: 20, width: 20, borderWidth: 1, borderColor: "#CCD4D8", borderRadius: 10, marginRight: 4 }}></Text>
        </View>

        <TouchableOpacity onPress={() => navigation.navigate("RegistrationStudentPersonal")} style={styles.button} ><Text style={{ height: '100%', textAlignVertical: 'center', color: 'white', fontWeight: 'bold' }}>Begin</Text></TouchableOpacity>
      </View>
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#00B8FE',
    width: '100%',
    marginTop: 30,
    alignItems: 'center',
    height: 50,
    borderRadius: 30
  }
})
import { StyleSheet, Text, View, ImageBackground, Image, TouchableOpacity, Dimensions } from 'react-native'
import React from 'react'
const windowHeight = Dimensions.get('window').height;
const windowWidht = Dimensions.get("window").width;
export default function RegistrationStudentInfo({ route, navigation }) {
  return (

    <View style={{ width: windowWidht, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ color: "white", fontSize: windowHeight * 0.025, fontWeight: "700", marginBottom: windowHeight * 0.09 }}>What you're making</Text>
      <Image source={require('../../assets/card.png')}></Image>
      <Text style={{ color: "white", fontSize: windowHeight * 0.025, fontWeight: "700", marginTop: windowHeight * 0.08 }}>Match with a coach and</Text>
      <Text style={{ color: "white", fontSize: windowHeight * 0.025, fontWeight: "700", }}>get their contact information</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#00B8FE',
    width: '100%',
    marginTop: windowHeight * 0.06,
    alignItems: 'center',
    height: windowHeight * 0.07,
    borderRadius: windowHeight * 0.05,
    fontSize: windowHeight * 0.02
  }, activedot: {
    height: 15, width: 15, borderWidth: 1, borderColor: "#CCD4D8", borderRadius: 10, marginRight: 4, backgroundColor: "#CCD4D8"
  },
  dot: { height: 15, width: 15, borderWidth: 1, borderColor: "#CCD4D8", borderRadius: 10, marginRight: 4 }
})
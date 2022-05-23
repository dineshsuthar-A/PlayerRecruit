import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { AntDesign } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { TextInput } from 'react-native-gesture-handler';
export default function Message() {
  return (
    <View style={{ paddingHorizontal: '4%', paddingTop: '6%', backgroundColor: 'white', width: '100%', height: '100%' }}>
      <View style={{ display: 'flex', flexDirection: 'row' }}>
        <View style={{ flex: 0.2, justifyContent: 'center', alignItems: 'center', }}>
          <Image source={require("../../assets/image.png")} style={{ width: 70, height: 70, borderRadius: 35 }} />
          <View style={{ padding: 2, backgroundColor: 'white', width: 16, height: 16, borderRadius: 8, position: 'absolute', right: 0, bottom: 0 }}>
            <Text style={{ width: '100%', height: '100%', borderRadius: 8, backgroundColor: 'green' }}></Text>
          </View>
        </View>
        <View style={{ flex: 0.7, marginLeft: '5%' }}>
          <Text style={{ fontSize: 20, color: '#4B5155' }}>George Tarielashvili</Text>
          <Text style={{ color: 'grey', fontSize: 13 }}>Senior UI/UX Designer</Text>
          <View style={{ marginTop: 6, justifyContent: 'center' }}>
            <Text style={{ color: 'green' }} >Online</Text>
          </View>

        </View>
        <View style={{ flex: 0.1, marginTop: 4 }}>
          <TouchableOpacity><Text> <AntDesign name="setting" size={24} color="grey" /></Text></TouchableOpacity>
        </View>
      </View>

      <View style={{ marginTop: 20, display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <Text style={{ color: '#4B5155', fontSize: 18 }}>Active Chats</Text>
        <TouchableOpacity style={{ marginTop: 8, marginRight: 6 }}><Entypo name="plus" size={20} color="#4B5155" /></TouchableOpacity>
      </View>

      <View style={{ marginTop: 20, width: '100%', height: 45, backgroundColor: '#F9FAFC', justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center', paddingHorizontal: '3%', borderRadius: 8, borderColor: '#DBE5ED', borderWidth: 1 }}>
        <TextInput placeholder='Search people' style={{ width: '100%', flex: 0.9 }} selectionColor="green" />
        <View style={{ flex: 0.1, justifyContent: 'center', alignItems: 'center' }}>
          <TouchableOpacity><FontAwesome5 name="search" size={20} color="#AFBBC6" /></TouchableOpacity></View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({})
import { StyleSheet, Text, View, ImageBackground, StatusBar } from 'react-native'
import React, { useState } from 'react'
import CardCoach from '../CardCoach'
import { useFocusEffect } from '@react-navigation/native'

export default function CoachPreviewCard({ route, navigation }) {
    const [data, setData] = useState();
    useFocusEffect(React.useCallback(() => {
        setData(route.params);
    }, []));
    return (
        data ?
            <ImageBackground source={require("../../assets/bg.png")} style={{ width: '100%', height: '100%' }}>
                <StatusBar barStyle="light-content" backgroundColor="#004467" />

                <View style={{ width: '100%', height: '100%', paddingVertical: '6%', paddingHorizontal: '10%' }}>
                    <CardCoach collegestate={data.College_State} firstname={data.firstname} lastname={data.lastname} jobtitle={data.jobtitle} team={data.team} college={data.college_name} division={data.divisions} coaches={data.coaching_gender} sport={data.sportsname} state={data.statename} city={data.city} phone={data.phone} bio={data.personal_bio} image={data.image} />
                </View>
            </ImageBackground>
            : null
    )
}

const styles = StyleSheet.create({})
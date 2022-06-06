import { StyleSheet, Text, View, ImageBackground, StatusBar } from 'react-native'
import React, { useState } from 'react'
import CardAthelete from '../CardAthelete'
import { useFocusEffect } from '@react-navigation/native';

export default function PreviewCard({ route, navigation }) {
    const [data, setData] = useState();
    useFocusEffect(React.useCallback(() => {
        console.log(route.params);
        setData(route.params);
    }, []));

    return (

        data ?
            <ImageBackground source={require("../../assets/bg.png")} style={{ width: '100%', height: '100%' }}>
                <StatusBar barStyle="light-content" backgroundColor="#004467" />

                <View style={{ width: '100%', height: '100%', paddingVertical: '6%', paddingHorizontal: '10%' }}>
                    <CardAthelete image={data.image} fname={data.firstname} lname={data.lastname} scholasticyear={data.scholastic_year} school={data.school_name} type={data.school_type} state={data.statename} height={data.height + " " + data.heightunit} weight={data.weight + " " + data.units} gpa={data.gpa} phone={data.phone} sport={data.sport} sat={data.sat} act={data.act} gender={data.gender} ethnicity={data.ethnicities} bio={data.personal_bio} />
                </View>
            </ImageBackground> : null
    )
}

const styles = StyleSheet.create({})
import React from 'react'
import { View, Text, StyleSheet, Dimensions } from 'react-native' 

const DEVICE_WIDTH = Dimensions.get('window').width

const EventCard = (props) => {

    // console.log(props.payload,"INI PAYLOAD")

    return (
        <View style={styles.container}>
            <Text>{props.payload.index}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        height:120,
        width: 0.9 * DEVICE_WIDTH,
        alignSelf: "center",
        marginTop: 35,
        borderRadius: 10,
        shadowColor: 'black',
        backgroundColor: "#fff",
        shadowOffset: {
            width: 20,
            height: 20
        },
        shadowOpacity: 1
    },
    text: {
        // fontFamily: 'Signika'
    }
})

export default EventCard
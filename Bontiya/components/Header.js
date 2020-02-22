import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
// import Constants from 'expo-constants'


const header = () => {
    return (
        <View style={styles.header}>
            <Text style={styles.logo}>Bontiya</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        height: 50,
        flexDirection: 'column',
        justifyContent:"center",
        // marginTop: Constants.statusBarHeight,
        backgroundColor:'#fff',
    },
    logo: {
        alignSelf:"center",
        // fontFamily: 'Signika',
        fontSize: 32,
        fontWeight: 'bold',
        color: '#444286'
    }
})

export default header
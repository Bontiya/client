import React from 'react'
import { View, Image, StyleSheet, Dimensions } from 'react-native'
import logo from '../assets/logo.png'

const DEVICE_WIDTH = Dimensions.get('window').width
const DEVICE_HEIGHT = Dimensions.get('window').height

const header = () => {
    return (
        <View style={styles.header}>
            <Image style={styles.logo} resizeMode="contain" source={logo} />
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        height: 50,
        flexDirection: 'column',
        justifyContent:"center",
        backgroundColor:'#5676CF',
    },
    logo: {
        alignSelf:"center",
        width: 0.3 * DEVICE_WIDTH,
        height: 0.15 * DEVICE_HEIGHT,
    }
})

export default header
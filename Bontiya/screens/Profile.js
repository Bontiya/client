import React, { useState } from 'react'
import { View, Text, StyleSheet, Image, Dimensions } from 'react-native'
import Header from '../components/Header'
import Star from '../components/Star'

const DEVICE_HEIGHT = Dimensions.get('window').height
const DEVICE_WIDTH = Dimensions.get('window').width

const profile = () => {

    const [ data ] = useState({
        name: 'Username',
        email: 'example@email.com',
        avatar: 'https://img.icons8.com/wired/2x/small-smile.png',
        rating: 3.3
    })

    return (
        <>
            <Header />
            <View style={styles.container}>
                <View style={styles.profileInfo}>
                    <Image style={styles.image} source={{uri: data.avatar}} />
                    <Text style={styles.profileName}>{data.name}</Text>
                    <Text style={{alignSelf: "center",fontSize:18}}>{data.email}</Text>
                </View>
                <View 
                    style={
                        [
                            styles.profileInfo,
                            {
                                marginTop: 0.04 * DEVICE_HEIGHT
                            }
                        ]
                    }
                >
                    <Star payload={data.rating} />
                </View>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    image: {
        width: 0.2 * DEVICE_WIDTH,
        height: 0.1 * DEVICE_HEIGHT,
        borderWidth: 3,
        borderRadius: 99,
        alignSelf: "center",
        marginTop: -0.05 * DEVICE_HEIGHT,
        backgroundColor: '#FFF',
    },
    profileInfo: {
        backgroundColor: '#fff',
        elevation: 3,
        width: 0.9 * DEVICE_WIDTH,
        height: 0.18 * DEVICE_HEIGHT,
        borderRadius: 10,
        alignSelf: "center",
        marginTop: 0.1 * DEVICE_HEIGHT,
    },
    profileName: {
        fontSize: 28,
        fontWeight: "bold",
        alignSelf: "center",
        marginTop: 0.03 * DEVICE_HEIGHT,
    }
})

export default profile
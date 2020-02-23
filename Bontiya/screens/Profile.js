import React, { useState } from 'react'
import { View, Text, StyleSheet, Image, Dimensions, AsyncStorage } from 'react-native'
import { TapGestureHandler } from 'react-native-gesture-handler'
import Header from '../components/Header'
import Star from '../components/Star'
<<<<<<< HEAD
import { useDispatch } from 'react-redux'
import { logout } from '../store/actions/authAction'
=======
>>>>>>> a6f6465661b861a09c1afdf560a9861ab11cdc6f

const DEVICE_HEIGHT = Dimensions.get('window').height
const DEVICE_WIDTH = Dimensions.get('window').width

<<<<<<< HEAD

const profile = () => {

    const dispatch = useDispatch()

=======
const profile = () => {

>>>>>>> a6f6465661b861a09c1afdf560a9861ab11cdc6f
    const [ data ] = useState({
        name: 'Username',
        email: 'example@email.com',
        avatar: 'https://img.icons8.com/wired/2x/small-smile.png',
        rating: 3.3
    })

    const signout = () => {
<<<<<<< HEAD
        dispatch(logout())
=======
        // AsyncStorage.removeItem('')
>>>>>>> a6f6465661b861a09c1afdf560a9861ab11cdc6f
    }

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
                    <Text style={[styles.profileName,{marginTop:10}]}>Rating</Text>
                    <Star payload={data.rating} />
                    <Text style={[styles.profileName,{marginTop: 10,opacity:0.3}]}>{data.rating}</Text>
                </View>
                <TapGestureHandler onHandlerStateChange={signout}>
                    <View style={styles.logoutBtn}>
                        <Text style={[styles.profileName,{marginTop: 0,fontSize: 24,color: '#FFF', fontWeight: 'normal'}]}>Sign Out</Text>
                    </View>
                </TapGestureHandler>
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
    },
    logoutBtn: {
        alignSelf: "center",
        marginTop: 0.22 * DEVICE_HEIGHT,
        width: 0.85 * DEVICE_WIDTH,
        height: 0.08 * DEVICE_HEIGHT,
        borderRadius: 10,
        backgroundColor: '#4A80E3',
        alignItems: "center",
        justifyContent: "center"
    }
})

export default profile
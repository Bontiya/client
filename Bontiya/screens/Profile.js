import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, Image, Dimensions, AsyncStorage } from 'react-native'
import { TapGestureHandler } from 'react-native-gesture-handler'
import Header from '../components/Header'
import Star from '../components/Star'
import { useDispatch } from 'react-redux'
import { logout } from '../store/actions/authAction'

const DEVICE_HEIGHT = Dimensions.get('window').height
const DEVICE_WIDTH = Dimensions.get('window').width


const profile = () => {
    
    const dispatch = useDispatch()

    const [ data ] = useState({
        name: 'Username',
        email: 'example@email.com',
        avatar: 'https://img.icons8.com/wired/2x/small-smile.png',
        rating: 3.3
    })
    const [ name, setName ] = useState('')
    const [ email, setEmail ] =  useState('')



    const quotes = [
        `"Time is money."`,
        `"Lost time is never found again."`,
        `"Time is the most valuable thing a man can spend."`,
        `"Time waits for no one."`,
        `"In such seconds of decision entire futures are made."`,
        `"A man who dares to waste one hour of time has not discovered the value of life."`,
        `"If not now, when?"`,
        `"Always make time for things that make you feel happy to be alive."`,
        `"Time slips away like grains of sand never to return again."`
    ]

    const [ quote, setQuote ] = useState(null)

    useEffect( () => {
        let index = (Math.random() * 8) + 1
        setQuote(quotes[Math.floor(index)])
        nameEmail()
    },[])

    const signout = () => {
        dispatch(logout())
    }

    const nameEmail = async () => {
        setName( await AsyncStorage.getItem('name'))
        setEmail( await AsyncStorage.getItem('email'))
    }

    return (
        <>
            <Header />
            <View style={styles.container}>
                <View style={styles.profileInfo}>
                    <Image style={styles.image} source={{uri: data.avatar}} />
                    <Text style={styles.profileName}>{name}</Text>
                    <Text style={{alignSelf: "center",fontSize:18,color: '#323678'}}>{email}</Text>
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
                    <Text style={[styles.profileName,{marginTop:10}]}>Quote</Text>
                    <Text style={[styles.profileName,{fontSize:16,fontStyle:'italic'}]}>{quote}</Text>
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
        color: '#323678'
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
import React, { useEffect, useState } from 'react'
import { View, Text, Image, StyleSheet, Dimensions } from 'react-native'
import FullStar from '../assets/star-full.png'
import HalfStar from '../assets/star-half.png'
import EmptyStar from '../assets/star-empty.png'

const DEVICE_WIDTH = Dimensions.get('window').width
const DEVICE_HEIGHT = Dimensions.get('window').height

const star = (props) => {

    const [ stars, setStars ] = useState([])

    useEffect( () => {
        let tempStars = []
        let fullStars = props.payload
        let half = fullStars % 1

        if( half ) fullStars - 1
        let empty = 5 - props.payload

        for( let i=0; i<Math.floor(fullStars) ; i++) {
            tempStars.push('FullStar')
        }

        if( half >= 0.29 && half < 1 ) {
            tempStars.push('HalfStar')
        } else if ( half < 0.29 && half !== 0 ) {
            tempStars.push('EmptyStar')
        }
        for( let i=0; i<Math.floor(empty) ; i++) {
            tempStars.push('EmptyStar')
        }

        setStars(tempStars)
    },[])

    if( stars.length < 5 ) {
        return <Text>Loading...</Text>
    }

    return (
        <View style={styles.container}>
            {
                stars.map( star => {
                    if( star == 'FullStar') return <Image style={styles.star} source={FullStar} />
                    else if( star == 'HalfStar') return <Image style={styles.star} source={HalfStar} />
                    else return <Image style={styles.star} source={EmptyStar} />
                })
            }
        </View>
    )
}

const styles = StyleSheet.create({
    star: {
        width: 0.1 * DEVICE_WIDTH,
        height: 0.05 * DEVICE_HEIGHT
    },
    container: {
        flexDirection: 'row',
        alignSelf: "center",
        marginTop: 0.02 * DEVICE_HEIGHT
    }
})

export default star
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
        let half = props.payload % 1
        let empty = 5 - props.payload
        for( let i=0; i<props.payload ; i++) {
            tempStars.push('FullStar')
        }
        if( half > 0.3 && half < 1 ) {
            tempStars.push('HalfStar')
        }
        for( let i=0; i<empty ; i++) {
            tempStars.push('EmptyStar')
        }
        setStars(tempStars)
        console.log(stars)
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
        flexDirection: 'row'
    }
})

export default star
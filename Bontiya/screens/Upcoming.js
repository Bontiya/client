import React, { useEffect, useState } from 'react'
import { View, ScrollView, Text, StyleSheet } from 'react-native'
import EventCard from '../components/EventCard'

const Upcoming = () => {

    const [ upcoming, setUpcoming ] = useState([
        {
            date: new Date().toLocaleString(),
            name: 'Event Name',
            description: 'This is the event description.',
            status: 'Pending',
            members: [
                {avatar: 'https://img.icons8.com/wired/2x/small-smile.png'},
                {avatar: 'https://img.icons8.com/wired/2x/small-smile.png'},
                {avatar: 'https://img.icons8.com/wired/2x/small-smile.png'},
                {avatar: 'https://img.icons8.com/wired/2x/small-smile.png'},
                {avatar: 'https://img.icons8.com/wired/2x/small-smile.png'},
                {avatar: 'https://img.icons8.com/wired/2x/small-smile.png'},
                {avatar: 'https://img.icons8.com/wired/2x/small-smile.png'}
            ]
        },
        {
            date: new Date().toLocaleString(),
            name: 'Event Name',
            description: 'This is the event description.',
            status: 'Pending',
            members: [
                {avatar: 'https://img.icons8.com/wired/2x/small-smile.png'},
                {avatar: 'https://img.icons8.com/wired/2x/small-smile.png'},
                {avatar: 'https://img.icons8.com/wired/2x/small-smile.png'},
                {avatar: 'https://img.icons8.com/wired/2x/small-smile.png'},
                {avatar: 'https://img.icons8.com/wired/2x/small-smile.png'},
            ]
        },
        {
            date: new Date().toLocaleString(),
            name: 'Event Name',
            description: 'This is the event description.',
            status: 'Pending',
            members: [
                {avatar: 'https://img.icons8.com/wired/2x/small-smile.png'},
                {avatar: 'https://img.icons8.com/wired/2x/small-smile.png'},
                {avatar: 'https://img.icons8.com/wired/2x/small-smile.png'},
            ]
        },
        {
            date: new Date().toLocaleString(),
            name: 'Event Name',
            description: 'This is the event description.',
            status: 'Pending',
            members: [
                {avatar: 'https://img.icons8.com/wired/2x/small-smile.png'},
                {avatar: 'https://img.icons8.com/wired/2x/small-smile.png'},
                {avatar: 'https://img.icons8.com/wired/2x/small-smile.png'},
                {avatar: 'https://img.icons8.com/wired/2x/small-smile.png'},
                {avatar: 'https://img.icons8.com/wired/2x/small-smile.png'},
                {avatar: 'https://img.icons8.com/wired/2x/small-smile.png'},
            ]
        },
        {
            date: new Date().toLocaleString(),
            name: 'Event Name',
            description: 'This is the event description.',
            status: 'Pending',
            members: [
                {avatar: 'https://img.icons8.com/wired/2x/small-smile.png'},
                {avatar: 'https://img.icons8.com/wired/2x/small-smile.png'},
            ]
        }
    ])

    if(upcoming.length<1) {
        return (
            <View style={styles.container}>
                <Text>Loading...</Text>
            </View>
        )
    }

    return (
        <ScrollView style={styles.container}> 
            {
                upcoming.map( (event,i) => {
                    return <EventCard key={i} payload={event} />
                })
            }
            <View style={{marginBottom:30}}></View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingBottom: 30
    }
})

export default Upcoming
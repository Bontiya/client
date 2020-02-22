import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import EventCard from '../components/EventCard'

const data = [{
    date: new Date,
    name: 'Event Name',
    description: 'This is the event description.',
    members: ['Member1','Member2','Member3'],
    status: 'Pending'
}]

const Upcoming = () => {

    const [ upcoming, setUpcoming ] = useState([
        {
            date: new Date,
            name: 'Event Name',
            description: 'This is the event description.',
            members: ['Member1','Member2','Member3'],
            status: 'Pending'
        },
        {
            date: new Date,
            name: 'Event Name',
            description: 'This is the event description.',
            members: ['Member1','Member2','Member3'],
            status: 'Pending'
        },
        {
            date: new Date,
            name: 'Event Name',
            description: 'This is the event description.',
            members: ['Member1','Member2','Member3'],
            status: 'Pending'
        },
        {
            date: new Date,
            name: 'Event Name',
            description: 'This is the event description.',
            members: ['Member1','Member2','Member3'],
            status: 'Pending'
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
        <View style={styles.container}> 
            {
                upcoming.map( (event,i) => {
                    return <EventCard key={i} payload={event} />
                })
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
})

export default Upcoming
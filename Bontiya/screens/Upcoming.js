import React, { useEffect, useState } from 'react'
import { View, ScrollView, Text, StyleSheet } from 'react-native'
import EventCard from '../components/EventCard'
import { useSelector } from 'react-redux'

const Upcoming = () => {

    const general = useSelector(state => state.general)

    const [ upcoming, setUpcoming ] = useState([
        {
            date: new Date().toLocaleString(),
            name: 'Event Name',
            description: 'This is the event description.',
            status: 'scheduled',
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
            status: 'scheduled',
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
            status: 'scheduled',
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
            status: 'scheduled',
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
            status: 'scheduled',
            members: [
                {avatar: 'https://img.icons8.com/wired/2x/small-smile.png'},
                {avatar: 'https://img.icons8.com/wired/2x/small-smile.png'},
            ]
        }
    ])

    if(upcoming.length<1) {
        return (
            <View style={[styles.container]}>
                <Text>Loading...</Text>
            </View>
        )
    }

    return (
        <ScrollView style={[styles.container,general.modal ? {backgroundColor: 'rgba(100,100,100,0.5)'} : '']}> 
            {
                upcoming.map( (event,i) => {
                    return <EventCard key={i} screen={'upcoming'} payload={event} />
                })
            }
            <View style={{marginBottom:10}}></View>
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
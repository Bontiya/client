import React from 'react'
import { useSelector } from "react-redux";
import usePastEvent from "../hooks/usePastEvent";
import { View, ScrollView, Text, StyleSheet } from 'react-native'
import EventCard from '../components/EventCard'

const past = () => {
    usePastEvent()
    const { event:eventSelector } = useSelector(state => state)
    const { pastEvents, pastEventsOnload } = eventSelector

    if (pastEventsOnload) {
        return (
            <View style={styles.container}>
                <Text>Loading...</Text>
            </View>
        )
    }

    if(!pastEvents.length) {
        return (
            <View style={styles.container}>
                <Text>Events not yet available</Text>
            </View>
        )
    }

    return (
        <ScrollView style={styles.container}> 
            {
                pastEvents.map( (event,i) => {
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

export default past
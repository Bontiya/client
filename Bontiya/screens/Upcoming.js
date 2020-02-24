import React from 'react'
import { useSelector } from "react-redux";
import useUpcomingEvent from "../hooks/useUpcomingEvent";
import { View, ScrollView, Text, StyleSheet } from 'react-native'
import EventCard from '../components/EventCard'

const Upcoming = () => {
    useUpcomingEvent()
    const { event:eventSelector } = useSelector(state => state)
    const { upcomingEvents, upcomingEventsOnload } = eventSelector

    const general = useSelector( state => state.general )

    if(upcomingEventsOnload) {
        return (
            <View style={[styles.container]}>
                <Text>Loading...</Text>
            </View>
        )
    }
    console.log(upcomingEvents)
    if (!upcomingEvents.length) {
        return (
            <View style={styles.container}>
                <Text>Events not yet available</Text>
            </View>
        )
    }

    return (
        <ScrollView style={[styles.container,general.modal ? {backgroundColor: 'rgba(100,100,100,0.5)'} : '']}> 
            {
                upcomingEvents.map( (event,i) => {
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
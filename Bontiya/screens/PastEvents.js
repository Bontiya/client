import React from 'react'
import { useSelector } from "react-redux";
import usePastEvent from "../hooks/usePastEvent";
import { View, ScrollView, Text, StyleSheet } from 'react-native'
import Loading from "../components/Loading";
import EventCard from '../components/EventCard'

const past = () => {
    usePastEvent()
    const { event:eventSelector } = useSelector(state => state)
    const { pastEvents, pastEventsOnload } = eventSelector

    return (
        <>
            {
                pastEventsOnload 
                ? <Loading />
                : !pastEvents.length
                    ? (
                        <View style={{ 
                            flex: 1, 
                            justifyContent: 'center', 
                            alignItems: 'center',
                        }}>
                            <Text>Hi, you don't have an event!</Text>
                        </View>
                    )
                    : (
                        <ScrollView style={styles.container}> 
                            {
                                pastEvents.map( (event,i) => {
                                    return <EventCard key={i} screen={'past'} payload={event} />
                                })
                            }
                            <View style={{marginBottom:10}}></View>
                        </ScrollView>
                    )
            }
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingBottom: 30
    }
})

export default past
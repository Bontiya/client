import React from 'react'
import { useSelector } from "react-redux";
import usePastEvent from "../hooks/usePastEvent";
import { View, ScrollView, Text, StyleSheet, Image } from 'react-native'
import Loading from "../components/Loading";
import EventCard from '../components/EventCard'
import Calendar from '../assets/upcomingEvent.jpg'

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
                            justifyContent: 'center', backgroundColor: '#FFF',
                            alignItems: 'center',
                        }}>
                            <Image source={Calendar} resizeMode="contain" style={{width:370,height:400}} />
                            <Text style={{fontSize: 24,fontWeight: 'bold',color: '#323678'}}>Hi, you don't have past event!</Text>
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
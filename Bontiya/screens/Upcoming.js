import React, { useEffect, useState } from 'react'
import { useSelector } from "react-redux";
import useUpcomingEvent from "../hooks/useUpcomingEvent";
import { View, ScrollView, Text, StyleSheet } from 'react-native'
import Loading from "../components/Loading";
import EventCard from '../components/EventCard'
import { getAllUser } from '../store/actions/userAction'
import { useDispatch } from 'react-redux'
import AddMemberModal from '../components/AddMemberModal'
import { toggleModal } from '../store/actions/eventAction'
const Upcoming = () => {
    const dispatch = useDispatch()
    const [eventIdTemp, setEventIdTemp] = useState(null)
    useUpcomingEvent()

    useEffect( () => {
        dispatch(getAllUser())
    },[])

    const { event:eventSelector } = useSelector(state => state)
    const { upcomingEvents, upcomingEventsOnload } = eventSelector

    const general = useSelector( state => state.general )

    return (
        <>
        {
            upcomingEventsOnload 
                ? <Loading />
                : !upcomingEvents.length
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
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingBottom: 30
    }
})

export default Upcoming
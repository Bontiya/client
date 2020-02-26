import React, { useEffect, useState, useCallback } from 'react'
import useUpcomingEvent from "../hooks/useUpcomingEvent";
import { View, ScrollView, Text, StyleSheet, RefreshControl } from 'react-native'
import Loading from "../components/Loading";
import EventCard from '../components/EventCard'
import { getAllUser } from '../store/actions/userAction'
import { useDispatch, useSelector } from 'react-redux'
import AddMemberModal from '../components/AddMemberModal'
import { toggleModal } from '../store/actions/eventAction'
import Calendar from '../assets/upcomingEvent.jpg'
import { getUpcomingEvent } from "../store/actions/eventAction";

const Upcoming = () => {
    const dispatch = useDispatch()
    const [eventIdTemp, setEventIdTemp] = useState(null)
    const [members, setMembers] = useState(null)
    useUpcomingEvent()
    
    useEffect( () => {
        dispatch(getAllUser())
    },[])
    
    const { event:eventSelector } = useSelector(state => state)
    const { upcomingEvents, upcomingEventsOnload } = eventSelector
    
    const onRefresh = useCallback(() => {  
        dispatch(getUpcomingEvent())
      }, [upcomingEventsOnload]);
    const general = useSelector( state => state.general )

    const showModalAddMember = (payload,members) => {
        console.log(payload)
        setEventIdTemp(payload)
        setMembers(members)
        dispatch(toggleModal(true))
    }

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
                            <Image source={Calendar} style={{width:370,height:400}} resizeMode="contain" />
                            <Text style={{fontSize: 24,fontWeight: 'bold',color: '#323678'}}>Hi, you don't have an event!</Text>
                            <Text style={{fontSize: 24,fontWeight: 'bold',color: '#323678'}}>Create new event?</Text>
                        </View>
                    )
                    : (
                        <ScrollView
                            style={[styles.container,general.modal ? {backgroundColor: 'rgba(100,100,100,0.5)'} : '']}
                            refreshControl={
                            <RefreshControl refreshing={upcomingEventsOnload} onRefresh={onRefresh} />}> 
                            {
                                upcomingEvents.map( (event,i) => {
                                    return <EventCard key={i} screen={'upcoming'} payload={event}  modalShow={showModalAddMember}  />
                                })
                            }
                            <AddMemberModal eventId={eventIdTemp} members={members} />
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
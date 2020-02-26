import React, { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import usePastEvent from "../hooks/usePastEvent";
import { View, ScrollView, Text, StyleSheet, RefreshControl, Image } from 'react-native'
import Loading from "../components/Loading";
import EventCard from '../components/EventCard'
import Calendar from '../assets/upcomingEvent.jpg'
import { getPastEvent } from "../store/actions/eventAction";

const past = () => {
    usePastEvent()
    const dispatch = useDispatch()
    const { event:eventSelector } = useSelector(state => state)
    const { pastEvents, pastEventsOnload } = eventSelector

    const onRefresh = useCallback(() => {  
        dispatch(getPastEvent())
      }, [pastEventsOnload]);
    const general = useSelector( state => state.general )
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
                        <ScrollView 
                            style={styles.container}
                            refreshControl={
                                <RefreshControl refreshing={pastEventsOnload} onRefresh={onRefresh} />}> 
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
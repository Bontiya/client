import React, { useEffect, useState } from 'react'

// import { View, Text, StyleSheet, Dimensions, Image, TouchableOpacity } from 'react-native'
import { View, Text, StyleSheet, Dimensions, Image, ScrollView, TouchableOpacity } from 'react-native'
import AddMemberModal from '../components/AddMemberModal'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigation } from '@react-navigation/native'

const DEVICE_WIDTH = Dimensions.get('window').width
const DEVICE_HEIGHT = Dimensions.get('window').height

const EventCard = (props) => {

    const dispatch = useDispatch()

    const [ date, setDate ] = useState([])
    const [ seenMembers, setSeenMembers ] = useState([])
    const [ length, setLength ] = useState(null)
    const [ status, setStatus ] =  useState(null)
    const navigation = useNavigation()

    useEffect( () => {
        setDate(new Date(props.payload.time).toLocaleString().split(' '))
        setStatus(props.payload.status)
        if( props.payload.members.length > 4) {
            let temp = [...props.payload.members]
            setSeenMembers(temp.splice(0,4))
            setLength(props.payload.members.length-4)
        } else {
            setSeenMembers(props.payload.members)
        }
    },[])
    // console.log(seenMembers[0].avatar, '=============')
    useEffect( () => {
        // console.log(seenMembers)
    },[seenMembers])

    return (
        <TouchableOpacity
            style={[styles.container]}
            onPress={() => {
                navigation.navigate('Event Detail', { data: props.payload })
            }}
        >
            {/* <AddMemberModal eventId={props.payload._id} /> */}
            <View style={styles.eventInfo}>
                <View style={styles.dateContainer}>
                    <Text 
                        style={
                            [
                                styles.dateStyle,
                                {opacity: 0.6}
                            ]
                        }
                    >
                        {date[0]}
                    </Text>
                    <Text 
                        style={
                            [
                                styles.dateStyle,
                                {
                                    fontSize:20,
                                    fontWeight:'bold'
                                }
                            ]
                        }
                    >
                        {date[2]}
                    </Text>
                    <Text 
                        style={
                            [
                                styles.dateStyle,
                                {
                                    opacity: 0.6
                                }
                            ]
                        }
                    >
                        {date[1]}
                    </Text>
                </View>
                <View style={{marginLeft:10, width: 0.6 * DEVICE_WIDTH}}>
                    <Text 
                        style={
                            [
                                styles.dateStyle,
                                {
                                    fontSize:20,
                                    fontWeight:'bold'
                                }
                            ]
                        }
                    >
                        {props.payload.name}
                    </Text>
                    <Text 
                        style={
                            [
                                styles.dateStyle,
                                {
                                    opacity: 0.6
                                }
                            ]
                        }
                    >
                        {props.payload.description}
                    </Text>
                </View>
                {
                    props.screen === 'upcoming'
                    ? 
                    <TouchableWithoutFeedback
                    style={
                        styles.addBtn
                    }
                    onPress={() => {
                        props.modalShow(props.payload._id,props.payload.members)
                    }}>
                        <Text style={styles.plus}>+</Text>
                    </TouchableWithoutFeedback>
                    : <></>
                }
            </View>
            <View style={styles.membersContainer}>
                <View style={styles.members}>
                    <>
                        {
                            seenMembers.map( ({user},i) => {
                                return <Image key={user._id} style={styles.image} source={{uri: user.avatar}} />
                            })
                        }
                        {
                            length
                            ? <View style={
                                    [
                                        styles.image,
                                        {
                                            backgroundColor:'#F9F1EA',
                                            justifyContent:"center"
                                        }
                                    ]
                                }
                            >
                                <Text style={
                                        [
                                            styles.dateStyle,
                                            {
                                                fontWeight:'bold',
                                                fontSize:18,
                                                alignSelf:"center"
                                            }
                                        ]
                                    }
                                >
                                    {length}
                                </Text>
                              </View>
                            : <Text></Text>
                        }
                    </>
                </View>
                <View style={[styles.status,{
                    backgroundColor: 
                        props.payload.status === 'scheduled' 
                        ? '#FBDCCB' 
                        : '#B9E5EB'
                }]}>
                    <Text style={[styles.dateStyle,{
                        textTransform: "uppercase",
                        alignSelf: "center",
                        fontWeight: 'bold',
                        fontSize: 18,
                    }]}>{props.payload.status}</Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        height:120,
        width: 0.9 * DEVICE_WIDTH,
        alignSelf: "center",
        marginTop: 10,
        borderRadius: 10,
        backgroundColor: "#fff",
        elevation: 3,
    },
    eventInfo: {
        height: 55,
        marginTop: 10,
        flexDirection: 'row',
        width: 0.8 * DEVICE_WIDTH,
        alignSelf: "center",
    },
    dateContainer: {
        flexDirection: 'column',
        width: 50,
        borderRightWidth: 2,
        borderRightColor: 'rgba(0,0,0,0.1)'
    },
    dateStyle: {
        color:'#323678'
    },
    membersContainer: {
        height: 45,
        marginTop: 5,
        flexDirection: 'row',
        width: 0.8 * DEVICE_WIDTH,
        alignSelf: "center",
        justifyContent: "center",
    },
    members: {
        flexDirection: "row",
        width: 0.5 * DEVICE_WIDTH,
        alignItems: "center",
    },
    image: {
        width:30,
        height:30,
        marginHorizontal:5,
        borderRadius: 20
    },
    status: {
        width: 0.25 * DEVICE_WIDTH,
        height: 30,
        alignSelf: "center",
        justifyContent: "center",
        borderRadius: 20,
        marginLeft: 5
    },
    addBtn: {
        paddingVertical: 6,
        paddingHorizontal: 12,
        // marginTop: 0.01 * DEVICE_HEIGHT,
        borderRadius: 99,
        backgroundColor: '#B9E5EB',
        marginTop: -0.005 * DEVICE_HEIGHT,
        elevation: 4,
        right: 0
    },  
    plus : {
        fontSize: 18,
        fontWeight: 'bold',
    }
})

export default EventCard
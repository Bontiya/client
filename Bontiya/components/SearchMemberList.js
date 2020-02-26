import React, { useEffect } from 'react'
import { Dimensions, Image, ToastAndroid } from 'react-native'
import { List } from 'react-native-paper'
import { inviteMember } from '../store/actions/eventAction'
import { useDispatch, useSelector } from 'react-redux'

const DEVICE_WIDTH = Dimensions.get('window').width

const searchMemberList = (props) => {

    const dispatch = useDispatch()

    const event = useSelector( state => state.event )

    const handleInviteMember = () => {
        dispatch(inviteMember({
            userId: props.payload._id,
            eventId: props.eventId,
            members: props.members
        }))
    }

    useEffect( () => {
        if(event.successToast) {
            ToastAndroid.show(`User ${props.payload.name} invited`,ToastAndroid.SHORT)
        }
    }, [event.successToast])

    useEffect( () => {
        if(event.errorToast) {
            ToastAndroid.show(`User ${props.payload.name} already invited`,ToastAndroid.SHORT)
        }
    }, [event.errorToast])

    return (
    <>
        <List.Item 
            style={{width:0.9 * DEVICE_WIDTH, borderBottomWidth: 1, borderBottomColor: 'rgba(100,100,100,0.3)', backgroundColor: '#FCF8FF',alignSelf: "center",}}
            title={props.payload.name}
            description="User"
            left={ () => <Image style={{width: 50, height: 50,borderWidth: 1}} source={{uri: props.payload.avatar}}/> }
            onPress={handleInviteMember}
        />
    </>
    )
}

export default searchMemberList
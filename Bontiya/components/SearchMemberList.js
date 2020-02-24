import React from 'react'
import { Dimensions, Image } from 'react-native'
import { List } from 'react-native-paper'
import { inviteMember } from '../store/actions/eventAction'
import { useDispatch } from 'react-redux'

const DEVICE_WIDTH = Dimensions.get('window').width

const searchMemberList = (props) => {

    const dispatch = useDispatch()

    const inviteMember = () => {
        dispatch(inviteMember({
            userId: props.payload._id,
            eventId: props.eventId
        }))
    }

    return (
    <>
        <List.Item 
            style={{width:0.9 * DEVICE_WIDTH, borderBottomWidth: 1, borderBottomColor: 'rgba(100,100,100,0.3)', backgroundColor: '#FCF8FF',alignSelf: "center",}}
            title={props.payload.name}
            description="User"
            left={ () => <Image style={{width: 50, height: 50,borderWidth: 1}} source={{uri: props.payload.avatar}}/> }
            onPress={inviteMember}
        />
    </>
    )
}

export default searchMemberList
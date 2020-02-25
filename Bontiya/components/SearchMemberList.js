import React from 'react'
import { Dimensions, Image } from 'react-native'
import { List } from 'react-native-paper'
import { inviteMember } from '../store/actions/eventAction'
import { useDispatch } from 'react-redux'

const DEVICE_WIDTH = Dimensions.get('window').width

const searchMemberList = (props) => {

    console.log(props,'INI EVENT ID LAJFKLDJFSD:KFJ:SDJ:FJ:')
    console.log(props.members,"ini members yagn props")

    const dispatch = useDispatch()

    const handleInviteMember = () => {
        dispatch(inviteMember({
            userId: props.payload._id,
            eventId: props.eventId,
            members: props.members
        }))
    }

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
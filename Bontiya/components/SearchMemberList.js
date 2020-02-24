import React from 'react'
import { Dimensions, Image } from 'react-native'
import { List } from 'react-native-paper'

const DEVICE_WIDTH = Dimensions.get('window').width

const searchMemberList = (props) => {
    return (
    <>
        <List.Item 
            style={{width:0.9 * DEVICE_WIDTH, borderBottomWidth: 1, borderBottomColor: 'rgba(100,100,100,0.3)', backgroundColor: '#FCF8FF',alignSelf: "center",}}
            title={props.payload.name}
            description="User"
            left={ () => <Image style={{width: 50, height: 50,borderWidth: 1}} source={{uri: props.payload.avatar}}/> }
        />
    </>
    )
}

export default searchMemberList
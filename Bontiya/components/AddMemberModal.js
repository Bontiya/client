import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, Modal, TouchableHighlight, Dimensions, FlatList, Image } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import { toggleModal } from '../store/actions/eventAction'
import { Searchbar } from 'react-native-paper'
import SearchMemberList from '../components/SearchMemberList'
import AddUser from '../assets/adduser.jpg'

const DEVICE_WIDTH = Dimensions.get('window').width
const DEVICE_HEIGHT = Dimensions.get('window').height

const addMemberModal = (props) => {

    const dispatch = useDispatch()

    const event = useSelector( state => state.event )

    const general = useSelector(state => state.general)
    const user = useSelector(state => state.user)

    const [ keyword, setKeyword ] = useState('')
    const [ temp, setTemp ] =  useState([])

    const filterData = (payload) => {
      if( payload ) setTemp([...user.users].filter( user => user.name.includes(payload)))
      else setTemp([])
    }

    useEffect( () => {
      setKeyword('')
      setTemp([])
    },[event.errorToast])

    useEffect( () => {
      setKeyword('')
      setTemp([])
    },[event.successToast])

    if(!user.users) {
      return (
        <View>
          <Text>Loading users...</Text>
        </View>
      )
    }

    return (
        <Modal
          animationType="slide"
          transparent={true}
          visible={general.modal}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
          }}
          >
          <View style={[styles.modal,{marginTop: 0 * DEVICE_HEIGHT}]}>
            <TouchableHighlight
            style={
              styles.closeButton
            }
            onPress={() => {
              dispatch(toggleModal(false))
            }}>
              <Text style={styles.X}>X</Text>
            </TouchableHighlight>
            <Searchbar
              placeholder="Search"
              onChangeText={query => {setKeyword(query),filterData(query)}}
              value={keyword}
              style={{width: 0.9 * DEVICE_WIDTH,alignSelf: "center"}}
            />
            <FlatList 
              data={temp}
              renderItem={({item}) => <SearchMemberList members={props.members} eventId={props.eventId} payload={item} />}
              keyExtractor={ item => item._id}
              style={{elevation:4}}
            />
            <Image source={AddUser} style={{width:300,height:300,alignSelf:"center",position:"absolute",bottom:50}} />
          </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
  modal: {
    paddingVertical: 0.1 * DEVICE_HEIGHT,
    backgroundColor: '#FFF',
    flex:1
  },
  FormContainer: {
    position: 'absolute',
    borderWidth: 1,
    width: 0.6 * DEVICE_WIDTH,
    alignSelf: 'center',
    marginTop: 0.05 * DEVICE_HEIGHT
  },
  closeButton: {
    position: 'absolute',
    right: 0.03 * DEVICE_WIDTH,
    paddingVertical: 6,
    paddingHorizontal: 12,
    marginTop: 0.01 * DEVICE_HEIGHT,
    borderRadius: 99,
    backgroundColor: '#B9E5EB',
    elevation: 4
  },
  X: {
    fontSize: 18,
    fontWeight: 'bold',
  }
})

export default addMemberModal
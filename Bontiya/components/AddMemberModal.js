import React, { useState } from 'react'
import { View, Text, StyleSheet, Modal, TouchableHighlight, Dimensions, FlatList } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import { toggleModal } from '../store/actions/eventAction'
import { Searchbar } from 'react-native-paper'
import SearchMemberList from '../components/SearchMemberList'

const DEVICE_WIDTH = Dimensions.get('window').width
const DEVICE_HEIGHT = Dimensions.get('window').height

const addMemberModal = () => {

    const general = useSelector(state => state.general)
    const dispatch = useDispatch()

    const [ keyword, setKeyword ] = useState('')
    const [ data ] = useState([
      {id:'1',name:'Richard',avatar:'https://img.icons8.com/wired/2x/small-smile.png'},
      {id:'2',name:'Khonan',avatar:'https://img.icons8.com/wired/2x/small-smile.png'},
      {id:'3',name:'Dedi',avatar:'https://img.icons8.com/wired/2x/small-smile.png'},
      {id:'4',name:'Dzaky',avatar:'https://img.icons8.com/wired/2x/small-smile.png'},
      {id:'5',name:'Ilham',avatar:'https://img.icons8.com/wired/2x/small-smile.png'},
      {id:'6',name:'Michael',avatar:'https://img.icons8.com/wired/2x/small-smile.png'},
      {id:'7',name:'Ilha',avatar:'https://img.icons8.com/wired/2x/small-smile.png'},
      {id:'8',name:'Ilm',avatar:'https://img.icons8.com/wired/2x/small-smile.png'},
      {id:'9',name:'Ilam',avatar:'https://img.icons8.com/wired/2x/small-smile.png'},
      {id:'10',name:'Iham',avatar:'https://img.icons8.com/wired/2x/small-smile.png'},
      {id:'11',name:'lham',avatar:'https://img.icons8.com/wired/2x/small-smile.png'},
      {id:'12',name:'lh\am',avatar:'https://img.icons8.com/wired/2x/small-smile.png'},
      {id:'13',name:'Iam',avatar:'https://img.icons8.com/wired/2x/small-smile.png'},
      {id:'14',name:'Im',avatar:'https://img.icons8.com/wired/2x/small-smile.png'},
      {id:'15',name:'ham',avatar:'https://img.icons8.com/wired/2x/small-smile.png'},
    ])
    const [ temp, setTemp ] =  useState([])

    const filterData = (payload) => {
      console.log(payload)
      if( payload == '') setTemp([])
      setTemp([...data].filter( each => each.name.includes(payload)))
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
              renderItem={({item}) => <SearchMemberList eventId={props.eventId} payload={item} />}
              keyExtractor={ item => item.id}
              style={{elevation:4}}
            />
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
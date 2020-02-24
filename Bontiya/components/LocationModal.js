import React from 'react'
import { View, Text, TextInput, Button, Modal, TouchableOpacity, StyleSheet } from 'react-native'
import { Icon } from 'react-native-elements'

function LocationModal({ visible, setVisible }) {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      >
      <View style={styles.modal}>
        <View style={{height: '100%'}}>
          <Text style={{fontSize: 20, fontWeight: 'bold'}}>Set Location</Text>
          <TextInput
            style={{borderBottomWidth: 2}} 
            placeholder="Search location"
          />

          <TouchableOpacity
            onPress={() => setVisible(false)}
            style={{position: 'absolute', bottom: 0, marginBottom: 10, alignSelf: 'center'}}
            >
            <View style={{width: 40, backgroundColor: 'white', borderRadius: 20, elevation: 5}}>
              <Icon 
                name='close'
                color='#4A80E3'
                type='material-icons'
                size={40}
              />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  modal: {
    width: 320,
    height: 200,
    alignSelf: 'center',
    borderRadius: 10,
    elevation: 10,
    backgroundColor: 'white',
    marginBottom: 20,
    padding: 20,
    marginTop: 5,
    height: '90%'
  }
})

export default LocationModal
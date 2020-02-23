import React from 'react'
import { View, Text, Button, Modal, TouchableOpacity, StyleSheet } from 'react-native'

function LocationModal({ visible, setVisible }) {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      >
      <View style={styles.modal}>
        <View>
          <Text>Hello World!</Text>

          <TouchableOpacity
            onPress={() => setVisible(false)}>
            <Text>Hide Modal</Text>
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
    padding: 10,
    marginTop: 5,
    height: '90%'
  }
})

export default LocationModal
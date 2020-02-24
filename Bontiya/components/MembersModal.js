import React from 'react'
import { View, Text, Image, Modal, TouchableOpacity, StyleSheet } from 'react-native'
import { Icon } from 'react-native-elements'

function MembersModal({visible, setVisible}) {
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
            onPress={() => {
              setVisible(false);
            }}>
            <Text>Hide Modal</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  modal: {
    width: 350,
    height: 500,
    alignSelf: 'center',
    borderRadius: 10,
    elevation: 10,
    backgroundColor: 'white',
    marginBottom: 20,
    padding: 10,
    top: 10
  },
})

export default MembersModal
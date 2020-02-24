import React from 'react'
import { View, Text, Image, Modal, TouchableOpacity, StyleSheet } from 'react-native'
import { Icon } from 'react-native-elements'

function KeyModal({ visible, setVisible, setKey }) {
  const chooseKey = (key) => {
    setKey(key)
    setVisible(false)
  }
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      >
      <View style={styles.modal}>
        <View style={{height: '100%'}}>
          <Text style={{fontSize: 20, fontWeight: 'bold', marginBottom: 20}}>Select key</Text>

          
          <View style={{flexDirection: 'row',justifyContent: 'center', width: '100%'}}>
            <TouchableOpacity
              onPress={() => chooseKey('car')}
            >
              <View style={styles.key_card}>
                <Image style={{width: '100%', height: '100%', resizeMode: 'contain'}} source={require('../assets/car.png')}/>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => chooseKey('motor')}
            >
              <View style={styles.key_card}>
                <Image style={{width: '100%', height: '100%', resizeMode: 'contain'}} source={require('../assets/motor.png')}/>
              </View>
            </TouchableOpacity>
          </View>
          <View style={{flexDirection: 'row',justifyContent: 'center', width: '100%'}}>
            <TouchableOpacity
              onPress={() => chooseKey('watch')}
            >
              <View style={styles.key_card}>
                <Image style={{width: '100%', height: '100%', resizeMode: 'contain'}} source={require('../assets/watch.png')}/>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => chooseKey('shoes')}
            >
              <View style={styles.key_card}>
                <Image style={{width: '100%', height: '100%', resizeMode: 'contain'}} source={require('../assets/shoes.png')}/>
              </View>
            </TouchableOpacity>
          </View>

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
    height: '90%',
  },
  key_card: {
    borderRadius: 10, 
    width: 120, 
    height: 90, 
    elevation: 2, 
    marginBottom: 10,
    marginRight: 10
  }
})

export default KeyModal
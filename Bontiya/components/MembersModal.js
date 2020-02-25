import React from 'react'
import { View, Text, Image, Modal, TouchableOpacity, StyleSheet, ScrollView } from 'react-native'
import { Icon } from 'react-native-elements'
import IconFA from 'react-native-vector-icons/FontAwesome';

function KeyModal({ visible, setVisible, members}) {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      >
      <ScrollView style={styles.modal}>
        <View style={{height: '100%'}}>
          <Text style={{fontSize: 20, fontWeight: 'bold', marginBottom: 10}}>Members</Text>
          {
              members.map((member, i) => {
                return (
                  <>
                  <View style={{padding: 10, width: '100%', flexDirection: 'row', alignItems: 'center'}}>
                    {
                      member.statusKey
                      ? (
                        <IconFA
                          name='circle'
                          color='green'
                          size={10}
                        />
                      )
                      : (
                        <IconFA
                          name='circle'
                          color='red'
                          size={10}
                        />
                      )
                    }
                    <Text style={{marginLeft: 5, marginBottom: 5}} key={i}>{member.user.name}</Text>
                  </View>
                  <View style={{padding: 10, width: '100%', flexDirection: 'row', alignItems: 'center'}}>
                  {
                    member.statusKey
                    ? (
                      <IconFA
                        name='circle'
                        color='green'
                        size={10}
                      />
                    )
                    : (
                      <IconFA
                        name='circle'
                        color='red'
                        size={10}
                      />
                    )
                  }
                  <Text style={{marginLeft: 5, marginBottom: 5}} key={i}>{member.user.name}</Text>
                </View>
                </>
                )
              })
            }
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
      </ScrollView>
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
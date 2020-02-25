import React, { useState } from 'react'
import { 
  View, 
  Text, 
  Button, 
  Modal, 
  StyleSheet, 
  Image, 
  TouchableOpacity, 
  ScrollView } from 'react-native'
import { Icon } from 'react-native-elements'
import SendIntentAndroid from 'react-native-send-intent'
import { useTimer } from 'react-timer-hook'
import { RNCamera } from 'react-native-camera'
import CameraModal from '../components/CameraModal'
import MembersModal from '../components/MembersModal'

function DetailScreen() {
  const [membersModal, setMembersModal] = useState(false)
  const [cameraModal, setCameraModal] = useState(false)
  const {
    seconds,
    minutes,
    hours,
    days,
    start,
    pause,
    resume,
    restart,
  } = useTimer({ 
    expiryTimestamp: new Date().setSeconds(new Date().getSeconds() + 600)
  })

  return (
    <View style={styles.container}>
      <View style={styles.upper}>
        
        <View>
          <Text style={styles.title}>Event Name</Text>
          <View style={styles.upper_detail}>
            <View style={styles.icon_wrapper}>
              <Icon
                name='location'
                type='octicon'
                color='white'
                size={15}
              />
            </View>
            <Text style={styles.upper_text}>February 28, 2020</Text>
          </View>
          <View style={styles.upper_detail}>
            <View style={styles.icon_wrapper}>
              <Icon
                name='calendar'
                type='octicon'
                color='white'
                size={15}
              />
            </View>
            <Text style={styles.upper_text}>Hacktiv8 Indonesia</Text>
          </View>
          <View style={styles.upper_detail}>
            <View style={styles.icon_wrapper}>
              <Icon
                name='alarm'
                type='ion-icons'
                color='white'
                size={15}
              />
            </View>
            <Text style={styles.upper_text}>19.30</Text>
          </View>
        </View>

        <View style={{width: 140, height: 100}}>
          <Image style={{width: '100%', height: '100%', resizeMode: 'contain'}} source={require('../assets/time.png')} />
        </View>

      </View>

      <ScrollView style={styles.lower}>
          <CameraModal
            visible={cameraModal}
            setVisible={setCameraModal}
          />

          <View style={{flexDirection: 'row', alignSelf: 'center'}}>
            <View style={[styles.card, {width: 150, marginRight: 10, padding: 20, justifyContent:'space-between'}]}>
            <Text style={{fontSize: 18, fontWeight: 'bold'}}>Confirm Readiness</Text>
            <TouchableOpacity
              onPress={() => {
                setCameraModal(true)
              }}
            >
              <View style={{width: '100%'}}>
                <Image style={{width: '100%', height: 100,  resizeMode: 'contain'}} source={require('../assets/cam.png')} />
              </View>
            </TouchableOpacity>
            </View>
          
            <View style={[styles.card, {width: 150, padding: 20, justifyContent:'space-between'}]}>
              <Text style={{fontSize: 18, fontWeight: 'bold'}}>Time Estimation</Text>
              <View style={{flexDirection: 'row'}}>
                <View style={{justifyContent: 'center'}}>
                  <Text style={styles.hour}>{hours}</Text>
                  <Text style={{fontSize: 8}}>Hours</Text>
                </View>
                <Text style={styles.hour}> : </Text>
                <View style={{justifyContent: 'center'}}>
                  <Text style={styles.hour}>{minutes}</Text>
                  <Text style={{fontSize: 8}}>Minutes</Text>
                </View>
                <Text style={styles.hour}> : </Text>
                <View style={{justifyContent: 'center'}}>
                  <Text style={styles.hour}>{seconds}</Text>
                  <Text style={{fontSize: 8}}>Seconds</Text>
                </View>
              </View>
              <TouchableOpacity
                style={styles.btn}
                onPress={() => {
                  SendIntentAndroid.addCalendarEvent({
                    title: "Go To The Park",
                    description: "It's fun to play at the park.",
                    startDate: "2020-03-25 10:00",
                    endDate: "2020-03-25 11:00",
                    recurrence: "weekly",
                    location: "The Park",
                  });
                }}
                >
                <Text style={{color: '#fff'}}>Set Alarm</Text>
              </TouchableOpacity>
            </View>

          </View>

        <Text style={{paddingHorizontal: 30, paddingVertical: 10, fontSize: 18, fontWeight: 'bold'}}>Members Location</Text>
        <View style={styles.card}>
          <Image source={require('../assets/map.png')}
            style={{width: '100%', height: '100%', borderRadius: 10}}
          />
        </View>

        <TouchableOpacity
          onPress={() => setMembersModal(true)} 
          style={[styles.card, styles.members]}>
          <MembersModal visible={membersModal} setVisible={setMembersModal} />
          <Text style={{fontSize: 18}}>Members</Text>
          <Text>Nama</Text>
          <Text>Nama</Text>
          <Text>Nama</Text>
          <Text>Nama</Text>
          <Text>Nama</Text>
          <Text>Nama</Text>
          <Text>Nama</Text>
          <Text>Nama</Text>
        </TouchableOpacity>
      </ScrollView>      
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: '#EAEDF2',
    height: '100%',
  },
  title: {
    color: '#343B48',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'white'
  },
  card: {
    width: 300,
    height: 200,
    alignSelf: 'center',
    borderRadius: 10,
    elevation: 10,
    backgroundColor: 'white',
    marginBottom: 20
  },
  
  upper: {
    backgroundColor: '#4A80E3',
    padding: 20,
    borderBottomEndRadius: 20,
    borderBottomStartRadius: 20,
    flexDirection: 'row',
    justifyContent:'space-between',
  },
  upper_detail: {
    flexDirection: 'row'
  },
  upper_text: {
    fontSize: 12,
    color: 15,
    color: 'white'
  },
  icon_wrapper: {
    alignSelf: 'center',
    width: 30
  },
  btn: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: '#4A80E3',
    borderRadius: 5,
    marginBottom:10,
    padding: 15
  },
  lower: {
    paddingTop: 10
  },
  members: {
    padding: 10,
    marginTop: 5
  },
  hour: {
    fontWeight: 'bold',
    fontSize: 15,
    alignSelf: 'center'
  },
  preview: {
    width: '100%',
    height: 400,
    elevation: 10,
    position: 'absolute',
    top: 30,
    alignSelf: 'center'
  },
  capture: {
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    position: 'absolute',
    bottom: 0
  },
})

export default DetailScreen
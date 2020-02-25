import React, { useState, useEffect } from 'react'
import { 
  View, 
  Text, 
  Button, 
  Modal, 
  StyleSheet, 
  Image, 
  TouchableOpacity, 
  ScrollView } from 'react-native'
import { useTimer } from 'react-timer-hook'

function MyTimer({ timeInput, time }) {
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
    expiryTimestamp: new Date().setSeconds(new Date().getSeconds() + timeInput + secDiff())
  })

  function secDiff() {
    let secs = Math.ceil((new Date(time) - new Date()) / 1000)
    return secs
  }

  return (
    <>
    <View style={{flexDirection: 'row'}}>
      <View style={{justifyContent: 'center'}}>
        <Text style={styles.hour}>{days}</Text>
        <Text style={{fontSize: 8}}>Days</Text>
      </View>
      <Text style={styles.hour}> : </Text>
      <View style={{justifyContent: 'center'}}>
        <Text style={styles.hour}>{hours}</Text>
        <Text style={{fontSize: 8}}>Hours</Text>
      </View>
      <Text style={styles.hour}> : </Text>
      <View style={{justifyContent: 'center'}}>
        <Text style={styles.hour}>{minutes}</Text>
        <Text style={{fontSize: 8}}>Minutes</Text>
      </View>
    </View>
<<<<<<< HEAD
=======
    {/* <TouchableOpacity
      style={styles.btn}
      // onPress={() => {
      //   SendIntentAndroid.addCalendarEvent({
      //     title: eventName,
      //     description,
      //     startDate: calendarInput(),
      //     endDate: calendarInput(),
      //     recurrence: "weekly",
      //     location: "The Park",
      //   });
      // }}
      >
      <Text style={{color: '#fff'}}>{calendarInput()}</Text>
    </TouchableOpacity> */}
>>>>>>> separate timer
    </>
  )
}

const styles = StyleSheet.create({
  hour: {
    fontWeight: 'bold',
    fontSize: 15,
    alignSelf: 'center'
  },
  btn: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: '#4A80E3',
    borderRadius: 5,
    marginBottom:10,
    padding: 10
  }
})

export default MyTimer
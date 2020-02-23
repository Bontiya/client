import React, { useState } from 'react'
import { View, Text, Button, StyleSheet, TextInput, TouchableOpacity } from 'react-native'
import { Icon } from 'react-native-elements'
import DateTimePickerModal from "react-native-modal-datetime-picker"

function Form() {
  const [eventName, setEventName] = useState('')
  const [location, setLocation] = useState('')
  const [date, setDate] = useState('')
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isTimePickerVisible, setTimePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };
 
  const handleConfirm = date => {
    console.warn("A date has been picked: ", date);
    hideDatePicker();
  };

  const showTimePicker = () => {
    setTimePickerVisibility(true);
  };

  const hideTimePicker = () => {
    setTimePickerVisibility(false);
  };
 
  const handleConfirmTime = time => {
    console.warn("A time has been picked: ", time);
    hideTimePicker();
  };
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>New Event</Text>
      </View>

      <View style={styles.inner_container}>
        <View style={styles.form_row}>
          <View style={styles.icon_wrapper}>
            <Icon
              name='people'
              type='ion-icon'
              color='blue'
            />
          </View>
          <TextInput
            style={styles.text_input}
            value={eventName}
            placeholder="Event Name"
          />
        </View>
        <View style={styles.form_row}>
          <View style={styles.icon_wrapper}>
            <Icon
              name='location'
              type='octicon'
              color='blue'
            />
          </View>
          <TextInput
            style={styles.text_input}
            value={location}
            placeholder='Location'
          />
        </View>
        <View style={styles.form_row}>
          <View style={styles.icon_wrapper}>
            <Icon
              name='calendar'
              type='octicon'
              color='blue'
            />
          </View>
          <TouchableOpacity
            onPress={showDatePicker} 
            style={[styles.form_row, {flex: 1, borderBottomWidth: 2, borderColor: 'gray', height: 40, marginBottom: 0}]}>
            <DateTimePickerModal
              isVisible={isDatePickerVisible}
              mode="date"
              onConfirm={handleConfirm}
              onCancel={hideDatePicker}
            />
            <Text style={{alignSelf: 'center', paddingHorizontal: 10, color: 'gray'}}>Date</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.form_row}>
          <View style={styles.icon_wrapper}>
            <Icon
              name='calendar'
              type='octicon'
              color='blue'
            />
          </View>
          <TouchableOpacity
            onPress={showTimePicker} 
            style={[styles.form_row, {flex: 1, borderBottomWidth: 2, borderColor: 'gray', height: 40, marginBottom: 0}]}>
            <DateTimePickerModal
              isVisible={isTimePickerVisible}
              mode="time"
              onConfirm={handleConfirmTime}
              onCancel={hideTimePicker}
            />
            <Text style={{alignSelf: 'center', paddingHorizontal: 10, color: 'gray'}}>Time</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.btn}>
          <Text style={{color: '#fff'}}>Create Event</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: '#4A80E3',
    paddingHorizontal: 5,
    height: '100%'
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 15,
    color: 'white'
  },
  icon_wrapper: {
    alignSelf: 'center',
    width: 30
  },
  text_input: {
    flex: 1,
    height: 40, 
    borderColor: 'gray', 
    borderBottomWidth: 2,
    justifyContent: 'center',
    paddingHorizontal: 10
    
  },
  form_row: {
    flexDirection: 'row',
    marginBottom: 10
  },
  btn: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: '#4A80E3',
    borderRadius: 5,
    marginBottom:10,
    padding: 15
  },
  inner_container: {
    backgroundColor: 'white',
    padding: 10,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20, 
    marginBottom: 10,
    height: '100%',
  }
})

export default Form
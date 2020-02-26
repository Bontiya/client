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
import { Icon } from 'react-native-elements'
import SendIntentAndroid from 'react-native-send-intent'
import CameraModal from '../components/CameraModal'
import MembersModal from '../components/MembersModal'
import IconFA from 'react-native-vector-icons/FontAwesome';
import MapsPreview from "../components/maps/MapsPreview";
import { useSelector, useDispatch } from 'react-redux'
import { getTimeEstimation } from '../store/actions/memberAction'
import MyTimer from '../components/Timer'

function DetailScreen(props) {
  const { name: eventName,  description, time, location, members, key } = props.route.params.data
  const [membersModal, setMembersModal] = useState(false)
  const [cameraModal, setCameraModal] = useState(false)
  
  const { _id } = useSelector(state => state.general.isLogged)
  // const { readyToGo } = useSelector(state => state.event)
  const [readyToGo, setReadyToGo] = useState(getMyMember().statusKey)
  const { timeEstimation } = useSelector(state => state.member)
  const dispatch = useDispatch()
  
  useEffect(() => {
    if (!_id) {
      console.log('Please log in')
    }
    let memberObj = members.filter(member => member.user._id === _id)
    if (memberObj[0].statusKey) {
      setReadyToGo(true)
    }
    console.log(getMyLatLong(), getEventLatLong(), timeEstimation, '<<<<<')
    dispatch(getTimeEstimation(getMyLatLong(), getEventLatLong()))
  }, [_id, timeEstimation])

  function dateFormatter() {
    let formattedDate = new Date(time).toLocaleString().split(' ')
    // return formattedDate
    return `${formattedDate[0]} ${formattedDate[2]}, ${formattedDate[1]}`
  }

  function timeFormatter() {
    return new Date(time).toLocaleString().split(' ')[3].slice(0, 5)
  }

  function calendarInput() {
    return `${new Date(time).getFullYear()}-${new Date(time).getMonth() + 1}-${new Date(time).getDate()} ${new Date(time).toLocaleString().split(' ')[3].slice(0, 5)}`
  }

  function getMyMember() {
    let memberObj = members.filter(member => member.user._id === _id)
    if (memberObj[0]) {
      return memberObj[0]
    }
  }

  function getMyLatLong() {
    return `${getMyMember().location.lat},${getMyMember().location.lon}`
  }

  function getEventLatLong() {
    return `${location.lat},${location.lon}`
  }

  return (
    <View style={styles.container}>
      <ScrollView style={styles.lower}>

        <View style={styles.upper}>
          
          <View>
            <Text style={styles.title}>{eventName}</Text>
            <View style={styles.upper_detail}>
              <View style={styles.icon_wrapper}>
                <IconFA
                  name='map-marker'
                  color='white'
                  size={15}
                  style={{alignSelf: 'center'}}
                />
              </View>
              <Text style={styles.upper_text}>{location.name}</Text>
            </View>
            <View style={styles.upper_detail}>
              <View style={[styles.icon_wrapper]}>
                <IconFA
                  name='calendar'
                  color='white'
                  size={15}
                  style={{alignSelf: 'center'}}
                />
              </View>
              <Text style={styles.upper_text}>{dateFormatter()}</Text>
            </View>
            <View style={styles.upper_detail}>
              <View style={[styles.icon_wrapper]}>
                <Icon
                  name='alarm'
                  color='white'
                  size={15}
                />
              </View>
              <Text style={styles.upper_text}>{timeFormatter()}</Text>
            </View>
          </View>

          <View style={{width: 140, height: 100}}>
            <Image style={{width: '100%', height: '100%', resizeMode: 'contain'}} source={require('../assets/time.png')} />
          </View>

        </View>

        <View style={[styles.card, {height: 100, padding: 10}]}>
          <Text style={{fontWeight: 'bold'}}>What's this event about?</Text>
          <Text style={{padding: 10}}>{description}</Text>
          {/* <Text>{timeEstimation}</Text> */}
        </View>
          <CameraModal
            visible={cameraModal}
            setVisible={setCameraModal}
            spell={key}
            member_id={getMyMember()._id}
            setReadyToGo={setReadyToGo}
          />
          <View style={{flexDirection: 'row', alignSelf: 'center'}}>
            <View style={[styles.card, {width: 145, marginRight: 10, padding: 20, justifyContent:'space-between'}]}>
            <Text style={{fontSize: 18, fontWeight: 'bold'}}>{ readyToGo ? 'You are set!' : 'Confirm Readiness'}</Text>
            <TouchableOpacity
              onPress={() => {
                readyToGo ? setCameraModal(false) : setCameraModal(true)
              }}
            >
              <View style={{width: '100%'}}>
                {
                  readyToGo
                  ? <Image style={{width: '100%', height: 100,  resizeMode: 'contain'}} source={require('../assets/ok.png')} />
                  : <Image style={{width: '100%', height: 100,  resizeMode: 'contain'}} source={require('../assets/cam.png')} />
                }
              </View>
            </TouchableOpacity>
            </View>
          
            <View style={[styles.card, {width: 145, padding: 20, justifyContent:'space-between'}]}>
              <Text style={{fontSize: 18, fontWeight: 'bold'}}>Time Estimation</Text>
              {
                timeEstimation
                ? <MyTimer timeInput={timeEstimation} time={time} />
                : <Text>Couldn't determine time estimation</Text>
              }
              <TouchableOpacity
                style={styles.btn}
                onPress={() => {
                  SendIntentAndroid.addCalendarEvent({
                    title: eventName,
                    description,
                    startDate: calendarInput(),
                    endDate: calendarInput(),
                    recurrence: "weekly",
                    location: "The Park",
                  });
                }}
                >
                <Text style={{color: '#fff'}}>Set Reminder</Text>
              </TouchableOpacity>
            </View>

          </View>

        <Text style={{paddingHorizontal: 30, paddingVertical: 10, fontSize: 18, fontWeight: 'bold'}}>Members Location</Text>
        <View style={styles.card}>
          {/*<Image source={require('../assets/map.png')}*/}
          {/*  style={{width: '100%', height: '100%', borderRadius: 10}}*/}
          {/*/>*/}
          <MapsPreview location={location} member={members}/>
        </View>

        <TouchableOpacity
          onPress={() => setMembersModal(true)} 
          style={[styles.card, styles.members, {padding: 15, backgroundColor: '#F5F7FF'}]}>
          <MembersModal visible={membersModal} setVisible={setMembersModal} members={members}/>
          <Text style={{fontSize: 18, fontWeight: 'bold', marginBottom: 5}}>Members</Text>
          <View style={{flexDirection: 'row', height: 150}}>
            <View style={{width: 100, flex: 1}}>
              <Image style={{width: '100%', height: '100%', resizeMode: 'contain'}} source={require('../assets/peoplee.png')} />
            </View>
            <View style={{paddingHorizontal: 15, flex: 1}}>
              <View style={{flexDirection: 'row', marginBottom: 5}}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <IconFA
                    name='circle'
                    color='green'
                    size={10}
                  />
                  <Text style={{fontSize: 10}}>Ready</Text>
                </View>
                <View style={{flexDirection: 'row', alignItems: 'center',  marginLeft: 10}}>
                  <IconFA
                    name='circle'
                    color='red'
                    size={10}
                  />
                  <Text style={{fontSize: 10}}>Not Ready</Text>
                </View>
              </View>
            {
              members.map((member, i) => {
                if (i < 4) {
                  return (
                    <View style={{width: '100%', flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center'}}>
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
                      <Text style={{textAlign: 'right', marginLeft: 5, marginBottom: 5}} key={i}>{member.user.name}</Text>
                    </View>
                  )
                }
                if (i === members.length - 1 && i > 4) {
                  return <Text style={{fontSize: 10, alignSelf: 'flex-end'}}>See {i - 4} more members</Text>
                }
              })
            }
            </View>
          </View>
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
    marginTop: -10
  },
  title: {
    color: '#343B48',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    // color: 'white'
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
    marginBottom: 20
  },
  upper_detail: {
    flexDirection: 'row'
  },
  upper_text: {
    fontSize: 12,
    // color: 15,
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
    padding: 10
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
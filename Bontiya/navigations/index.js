import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { Icon, Badge } from "react-native-elements";
import EventsTopNav from './EventsTopNav'
import LogReg from '../screens/LoginReg'
import Profile from '../screens/Profile'
import Inbox from '../screens/Inbox';
import { getStatusInvitedPending } from "../store/actions/memberAction";
import { getUpcomingEvent, getPastEvent } from "../store/actions/eventAction";
import pushNotif from "../helpers/pushNotif"
import { ISLOGIN } from '../store/actionTypes';

const Tab = createMaterialBottomTabNavigator();

function RootNavigation() {

  const dispatch = useDispatch()
  const { general, member } = useSelector(state => state)

  const { statusInvitedPending } = member

  if (general.isLogged) {
    const { socket, isLogged, socketActive } = general
    if (!socketActive) {
      // socket.on(`${isLogged._id} StatusInvitedPending`, res => {
      //   console.log('================')
      //   pushNotif(`Bontiya`, `hey, someone have invited you!!`)
      //   dispatch(getStatusInvitedPending())
      // })
      // socket.on(`${isLogged._id} updatedStatusEventToDone`, function(msg) {
      //   pushNotif('Bontiya', 'yeay!, your event have done')
      //   dispatch(getPastEvent())
      // })
      // socket.on(`${isLogged._id} myAcceptedEvent`, res => {
      //   console.log(res)
      //   pushNotif('Bontiya', 'yeay!, accepted event success')
      //   dispatch(getUpcomingEvent())
      // })
      // socket.on(`${isLogged._id} StatusInvitedMemberUpdated`, res => {
      //   pushNotif('Bontiya', `yeay!, someone have accepted your event`)
      //   dispatch(getUpcomingEvent())
      // })
      // setTimeout(() => {
      //   dispatch({
      //     type: ISLOGIN,
      //     data: isLogged,
      //     socket: socket
      //   })
      //   dispatch({
      //     type: 'SOCKET_ACTIVE',
      //     data: true
      //   })
      // }, 1000)   
    }
  }
  if (!general.isLogged) {
    return <LogReg />
  } 
  return (
    <Tab.Navigator 
      barStyle={{
        backgroundColor: '#5676CF',
        zIndex: 0,
        elevation: 0
      }}
    >
      <Tab.Screen
        name="Events"
        component={EventsTopNav}
        options={{
          tabBarIcon:() => {
            return ( <Icon name="calendar" type="octicon" color="white" /> )
          }
        }}
      />
      {/* <Tab.Screen name="Add Event" component={AddEvent} /> */}
      <Tab.Screen
        name="Inbox"
        component={Inbox}
        options={{
          tabBarIcon:() => {
            return ( 
              <>
                {
                  statusInvitedPending.length
                    ? (
                      <Badge
                        status="success"
                        value={statusInvitedPending.length}
                        containerStyle={{ position: 'absolute', top: -4, right: -4, zIndex: 99 }}
                      />
                    )
                    : null
                }
                <Icon name="inbox" type="octicon" color="white" /> 
              </>
            )
          }
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile} 
        options={{
          tabBarIcon:() => {
            return ( <Icon name="person" type="octicon" color="white" /> )
          }
        }}
      />
    </Tab.Navigator>
  );
}

export default RootNavigation
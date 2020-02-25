import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { Icon, Badge } from "react-native-elements";
import EventsTopNav from './EventsTopNav'
import LogReg from '../screens/LoginReg'
import Profile from '../screens/Profile'
import Inbox from '../screens/Inbox';
import { getStatusInvitedPending } from "../store/actions/memberAction";
import pushNotif from "../helpers/pushNotif";

const Tab = createMaterialBottomTabNavigator();

function RootNavigation() {

  const dispatch = useDispatch()
  const { general, member } = useSelector(state => state)

  const { statusInvitedPending } = member

  if (general.isLogged) {
    const { socket, isLogged } = general
    socket.on(`${isLogged._id} StatusInvitedPending`, resp => {
      console.log('how many listening')
      pushNotif('Bontiya', 'hey, someone have inited you!!')
      dispatch(getStatusInvitedPending())
    })
  }
  if (!general.isLogged) {
    return <LogReg />
  } 
  return (
    <Tab.Navigator 
      barStyle={{
        backgroundColor: '#5676CF',
        zIndex: 99
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
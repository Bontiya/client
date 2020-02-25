import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import EventsTopNav from './EventsTopNav'
import LogReg from '../screens/LoginReg'
import Profile from '../screens/Profile'
import { useSelector } from 'react-redux';
import Inbox from '../screens/Inbox';
import { getStatusInvitedPending } from "../store/actions/memberAction";


const Tab = createMaterialBottomTabNavigator();

function RootNavigation() {

  const dispatch = useDispatch()
  const general = useSelector(state => state.general)
  
  if (general.isLogged) {
    const { socket, isLogged } = general
    socket.on(`${isLogged._id} StatusInvitedPending`, resp => {
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
      }}
    >
      <Tab.Screen name="Events" component={EventsTopNav} />
      {/* <Tab.Screen name="Add Event" component={AddEvent} /> */}
      <Tab.Screen name="Inbox" component={Inbox} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
}

export default RootNavigation
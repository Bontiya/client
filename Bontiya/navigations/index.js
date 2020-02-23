import React from 'react'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import EventsTopNav from './EventsTopNav'
import LogReg from '../screens/LoginReg'
import { useSelector } from 'react-redux';
import Profile from '../screens/Profile'

const Tab = createMaterialBottomTabNavigator();

function RootNavigation() {
  const general = useSelector(state => state.general)
  if (!general.isLogged) {
    return <LogReg />
  } 
  return (
    <Tab.Navigator 
      barStyle={{
        backgroundColor: '#fff',
      }}
    >
      <Tab.Screen name="Events" component={EventsTopNav} />
      {/* <Tab.Screen name="Add Event" component={AddEvent} /> */}
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
}

export default RootNavigation
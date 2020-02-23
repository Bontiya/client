import React from 'react'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import EventsTopNav from './EventsTopNav'
import Profile from '../screens/Profile'

const Tab = createMaterialBottomTabNavigator();

function RootNavigation() {
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
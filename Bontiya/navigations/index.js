import React from 'react'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import EventsTopNav from './EventsTopNav'
<<<<<<< HEAD
import LogReg from '../screens/LoginReg'
import { useSelector } from 'react-redux';
import Profile from '../screens/Profile'
=======
import Profile from '../screens/Profile'
import LogReg from '../screens/LoginReg'
import { useSelector } from 'react-redux';
>>>>>>> a6f6465661b861a09c1afdf560a9861ab11cdc6f

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
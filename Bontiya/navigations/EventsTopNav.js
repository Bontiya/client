import React from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import PastEvents from '../screens/PastEvents'
import Upcoming from '../screens/Upcoming'
import Header from '../components/Header'
import FormScreen from '../screens/FormScreen'
import EventDetail from '../screens/EventDetail'

const Tab = createMaterialTopTabNavigator();

function EventTopNav() {
  return (
    <>
        <Header />
        <Tab.Navigator
            tabBarOptions={{
                labelStyle: {
                    // fontFamily: 'Signika',
                    fontWeight: 'bold',
                },
                activeTintColor: '#444286',
                indicatorStyle: {
                    width: 180,
                    marginLeft: 12
                }
            }}
        >
            <Tab.Screen name="Upcoming" component={Upcoming} />
            <Tab.Screen name="Past Events" component={PastEvents} />
            <Tab.Screen name="Form" component={FormScreen} />
        </Tab.Navigator>
    </>
  );
}

export default EventTopNav
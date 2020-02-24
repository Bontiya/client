import React from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import PastEvents from '../screens/PastEvents'
import Upcoming from '../screens/Upcoming'
import Header from '../components/Header'

const Tab = createMaterialTopTabNavigator();

function EventTopNav() {
  return (
    <>
        <Header />
        <Tab.Navigator
            tabBarOptions={{
                labelStyle: {
                    fontFamily: 'Signika',
                    fontWeight: 'bold',
                },
                activeTintColor: '#FFF',
                indicatorStyle: {
                    width: 180,
                    marginLeft: 12,
                    backgroundColor: '#FFF'
                },
                style: {
                    elevation: 0,
                    backgroundColor: '#5676CF'
                }
            }}
        >
            <Tab.Screen name="Upcoming" component={Upcoming} />
            <Tab.Screen name="Past Events" component={PastEvents} />
        </Tab.Navigator>
    </>
  );
}

export default EventTopNav
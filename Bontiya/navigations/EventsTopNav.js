import React from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import PastEvents from '../screens/PastEvents'
import Upcoming from '../screens/Upcoming'
import Header from '../components/Header'
import FormScreen from '../screens/FormScreen'
import DetailScreen from '../screens/DetailScreen'
import UpcomingStackScreen from './UpcomingStackScreen'

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
                    marginBottom: 10,
                },
                activeTintColor: '#FFF',
                indicatorStyle: {
                    width: 110,
                    marginLeft: 12,
                    backgroundColor: '#FFF'
                },
                style: {
                    elevation: 0,
                    backgroundColor: '#5676CF',
                    height: 30,
                    justifyContent: 'center',
                }
            }}
        >
            <Tab.Screen name="Upcoming" component={UpcomingStackScreen} />
            <Tab.Screen name="Past Events" component={PastEvents} />
            <Tab.Screen name="Form" component={FormScreen} />
            {/* <Tab.Screen name="Detail" component={DetailScreen} /> */}
        </Tab.Navigator>
    </>
  );
}

export default EventTopNav
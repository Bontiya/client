import React from 'react'
import { View, Text, Image } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack'
import Upcoming from '../screens/Upcoming'
import Detail from '../screens/DetailScreen'

const Stack = createStackNavigator()

function UpcomingStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Upcoming"
        component={Upcoming}
        options={{
          headerTitle: '',
          headerTransparent: true
        }}
      />
      <Stack.Screen
        name="Event Detail"
        component={Detail}
        options={{
          headerStyle: {
            backgroundColor: '#F1ACD6',
          },
          headerTintColor: '#000',
          headerTitleStyle: {
            fontWeight: 'bold',
            color: 'white'
          },
          headerStatusBarHeight: 0
        }}
      />
    </Stack.Navigator> 
  )
}

export default UpcomingStack
import 'react-native-gesture-handler';
import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native'
import store from './store'
import RootNavigation from './navigations/index'
import MapsPage from "./components/maps/MapsPage";
import messaging from '@react-native-firebase/messaging'

const App: () => React$Node = () => {

  useEffect( async () => {
    if (!firebase.messaging().isRegisteredForRemoteNotifications) {
      await firebase.messaging().registerForRemoteNotifications();
    }
  
    messaging().setBackgroundMessageHandler( async remoteMessage => {
      console.log('this is background message', remoteMessage.data)
    })
  
    messaging().onMessage( async remoteMessage => {
      console.log('this is foreground message', remoteMessage.data)
    })
  })

  return (
    <Provider store={store}>
      <NavigationContainer>
        <RootNavigation />
      </NavigationContainer>
    </Provider>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});

export default App;

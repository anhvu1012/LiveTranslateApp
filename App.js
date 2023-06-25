import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import HomeTabNavigator from './navigation/HomeTabNavigator';

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
        <HomeTabNavigator/>
    </GestureHandlerRootView>
  );
};


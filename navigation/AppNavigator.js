import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import StartScreen from '../screens/StartScreen';
import CameraScreen from '../screens/CameraScreen';
import ScannedTextScreen from '../screens/ScannedTextScreen';
import ResultScreen from '../screens/ResultScreen';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
      <Stack.Navigator initialRouteName='Welcome' screenOptions={{
          headerStyle: {height: 100},
          headerTitleStyle:{
          fontSize: 25,
          fontWeight: 'bold',
          }
      }}>
        <Stack.Screen name="Welcome" component={StartScreen} />
        <Stack.Screen name="Camera" component={CameraScreen}/>
        <Stack.Screen name="Scanner" component={ScannedTextScreen} />
        <Stack.Screen name="Result" component={ResultScreen} />
      </Stack.Navigator>
  );
};

export default AppNavigator;

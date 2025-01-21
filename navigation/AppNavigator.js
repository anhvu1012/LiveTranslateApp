import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import StartScreen from '../screens/StartScreen';
import CameraScreen from '../screens/CameraScreen';
import ScannedTextScreen from '../screens/ScannedTextScreen';
import ResultScreen from '../screens/ResultScreen';
import PictureScreen from '../screens/PictureScreen';
import LanguageSelectScreen from '../screens/LanguageSelectScreen';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
      <Stack.Navigator initialRouteName='Welcome' screenOptions={{
          headerStyle: {height: 100},
          headerTitleStyle:{
          fontSize: 20,
          fontFamily: 'Lato-Italic'
          }
      }}>
        <Stack.Screen name="Welcome" component={StartScreen} />
        <Stack.Screen name="Camera" component={CameraScreen}/>
        <Stack.Screen name="Picture Select" component={PictureScreen} />
        <Stack.Screen name="Scanner" component={ScannedTextScreen} />
        <Stack.Group screenOptions={{presentation: 'containedModal'}}>
         <Stack.Screen name="Language Select" component={LanguageSelectScreen} />  
        </Stack.Group>
        
        <Stack.Screen name="Result" component={ResultScreen} />
      </Stack.Navigator>
  );
};

export default AppNavigator;

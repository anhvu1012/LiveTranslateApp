import React, {useState, useEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import {NavigationContainer, DarkTheme, DefaultTheme} from '@react-navigation/native';
import HistoryScreen from '../screens/HistoryScreen';
import FavoritesScreen from '../screens/FavoritesScreen';
import AppNavigator from './AppNavigator';

import { EventRegister } from 'react-native-event-listeners';
import themeContext from '../constants/ThemesContext';
import theme from '../constants/Themes';

const Tab = createBottomTabNavigator();

const HomeTabNavigator = () => {
    const [isDarkMode, setIsDarkMode] = useState(false);

    useEffect(() => {
        let eventListener = EventRegister.addEventListener("changeTheme", (data) => {
            setIsDarkMode(data);
            console.log(data);
        });
        return () => {
            EventRegister.removeEventListener(eventListener);
        }
    })

    return (
        <themeContext.Provider value={isDarkMode === true ? theme.dark : theme.light}>
            <NavigationContainer theme={isDarkMode === true ? DarkTheme : DefaultTheme}>
                <Tab.Navigator
                    screenOptions={({ route }) => ({
                        headerShown: false,
                        tabBarActiveTintColor: '#ff9933',
                        tabBarInactiveTintColor: 'gray',
                        tabBarIcon: ({ focused, color, size }) => {
                        let iconName;
                            
                        if (route.name === 'Home') {
                            iconName = 'ios-home';
                        }else if (route.name === 'History') {
                        iconName = 'time-outline';
                        } else if (route.name === 'Favorites') {
                        iconName = focused ? 'ios-star' : 'ios-star-outline';
                        }
            
                        return <Ionicons name={iconName} size={size} color={color} />;
                    },
                    })}
                >
                    <Tab.Screen name="Home" component={AppNavigator} />
                    <Tab.Screen name="History" component={HistoryScreen} options={{headerShown:true}}/>
                    <Tab.Screen name="Favorites" component={FavoritesScreen} options={{headerShown:true}}/>
                </Tab.Navigator>
            </NavigationContainer>
        </themeContext.Provider>
    );
};

export default HomeTabNavigator;
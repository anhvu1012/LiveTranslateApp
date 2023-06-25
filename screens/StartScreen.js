import React, { useState, useLayoutEffect, useContext } from 'react';
import { View, Text, Button, TouchableOpacity, StyleSheet } from 'react-native';
import { EvilIcons } from '@expo/vector-icons';
import SettingsScreen from '../screens/SettingsScreen';
import { SafeAreaView } from 'react-native-safe-area-context';

import themeContext from '../constants/ThemesContext';

const StartScreen = ({ navigation }) => {
  const {theme} = useContext(themeContext);

  useLayoutEffect(() => {
      navigation.setOptions({
          headerRight: () => (
            <EvilIcons.Button
            name='gear'
            backgroundColor={'white'}
            color={'black'}
            size={30}
            onPress={handleSettingsPress}
          />
          )
      });
    }, [navigation]);

    const [isModalVisible, setModalVisible] = useState(false);

    const handleCameraPress = () => {
        navigation.navigate('Camera');
    };

    const handleSettingsPress = () => {
        setModalVisible(true);
    };

    const closeModal = () => {
        setModalVisible(false);
    };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.text}>Welcome to Live Text Translate!</Text>
      </View>
      <View style={styles.iconContainer}>
        <EvilIcons.Button 
          name='camera' 
          backgroundColor={'white'}
          color={'black'}
          size={80}
          onPress={handleCameraPress}/>
      </View>
      <SettingsScreen  isVisible={isModalVisible} closeModal={closeModal} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },

    textContainer: {

    },

    iconContainer: {
      
    },

    text:{
      fontSize: 24
    },
  });

export default StartScreen;

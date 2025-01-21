import React, { useState, useLayoutEffect, useContext } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { EvilIcons, AntDesign } from '@expo/vector-icons';
import SettingsScreen from '../screens/SettingsScreen';
import { SafeAreaView } from 'react-native-safe-area-context';

const StartScreen = ({ navigation }) => {
  /*
  useLayoutEffect(() => {
      navigation.setOptions({
          headerRight: () => (
            <TouchableOpacity>
              <EvilIcons
              name='gear'
              backgroundColor={'white'}
              color={'black'}
              size={30}
              onPress={handleSettingsPress}
            />
          </TouchableOpacity>
          )
      });
    }, [navigation]);
    */
    const [isModalVisible, setModalVisible] = useState(false);

    const handleCameraPress = () => {
        navigation.navigate('Camera');
    };

    const imagePickerHandle = () => {
      navigation.navigate('Picture Select');
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
      <TouchableOpacity style={styles.iconContainer}>
        <EvilIcons
          name='camera' 
          backgroundColor={'white'}
          color={'black'}
          size={80}
          onPress={handleCameraPress}/>

        <AntDesign
          name='picture' 
          backgroundColor={'white'}
          color={'black'}
          size={50}
          onPress={imagePickerHandle}/>

      </TouchableOpacity>
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
      flexDirection: 'row'
    },

    text:{
      fontSize: 24,
      //fontFamily: 'Lato'
    },
  });

export default StartScreen;

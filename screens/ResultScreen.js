import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const ResultScreen = ({ navigation }) => {
    const handleCameraPress = () => {
        navigation.navigate('Camera');
    };

  return (
    <View style={styles.container}>
      <View style={styles.resultContainer}>
        <Text style={styles.title}>Translated Result</Text>
      </View>
      <Ionicons.Button 
        name='ios-camera-sharp' 
        backgroundColor={'white'}
        color={'black'}
        size={30}
        onPress={handleCameraPress}/>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 20,
    },

    resultContainer: {
      flex: 1,
      backgroundColor: '#99ccff',
      width: '100%',
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 20,
      marginBottom: 10
    },

    title: {
      fontWeight: 'bold',
      fontSize: 16,
    },
  });

export default ResultScreen;

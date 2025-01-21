import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';


const ResultScreen = ({ navigation, route }) => {
  const { result } = route.params;

  const handleCameraPress = () => {
      navigation.navigate('Camera');
  };

  const imagePickerHandle = () => {
    navigation.navigate('Picture Select');
  };

  return (
    <View style={styles.container}>
      <View style={styles.resultContainer}>
        <Text style={styles.title}>Translated Result</Text>
        <ScrollView>
          <Text>{result}</Text>
        </ScrollView>
      </View>
      <Ionicons.Button 
        name='ios-camera-sharp' 
        backgroundColor={'white'}
        color={'black'}
        size={30}
        onPress={handleCameraPress}/>

      <AntDesign
        name='picture' 
        backgroundColor={'white'}
        color={'black'}
        size={30}
        onPress={imagePickerHandle}/>
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

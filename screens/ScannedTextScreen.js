import React, {useState} from 'react';
import { View, Text, StyleSheet, TouchableWithoutFeedback, TouchableOpacity, Keyboard, TextInput } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';

const ScannedTextScreen = ({ navigation, route }) => {
  const { scannedText } = route.params;

  const [selectedOption1, setSelectedOption1] = useState(null);
  const [selectedOption2, setSelectedOption2] = useState(null);

  const option1Items = [
    { label: 'Option 1.1', value: 'option1.1' },
    { label: 'Option 1.2', value: 'option1.2' },
    { label: 'Option 1.3', value: 'option1.3' },
  ];

  const option2Items = [
    { label: 'Option 2.1', value: 'option2.1' },
    { label: 'Option 2.2', value: 'option2.2' },
    { label: 'Option 2.3', value: 'option2.3' },
  ];

  const handleResultPress = () => {
      // Perform capture logic here
      // For example, use CameraService to capture the text
      navigation.navigate('Result');
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <View style={styles.scanContainer}>
          <Text style={styles.title}>Scanned Text</Text>
          <TextInput 
            multiline
            value={scannedText}
            style={styles.textContainer}
            onChangeText={(text) => console.log(text)}
          />
        </View>
        <View style={styles.chooseContainer}>
          <DropDownPicker
            items={option1Items}
            defaultValue={selectedOption1}
            placeholder="Select Option 1"
            containerStyle={styles.dropdownContainer}
            style={styles.dropdown}
            itemStyle={styles.dropdownItem}
            dropDownStyle={styles.dropdownDropdown}
            onChangeItem={(item) => setSelectedOption1(item.value)}
          />

          <DropDownPicker
            items={option2Items}
            defaultValue={selectedOption2}
            placeholder="Select Option 2"
            containerStyle={styles.dropdownContainer}
            style={styles.dropdown}
            itemStyle={styles.dropdownItem}
            dropDownStyle={styles.dropdownDropdown}
            onChangeItem={(item) => setSelectedOption2(item.value)}
          />
        </View>
        <TouchableOpacity style={styles.button} onPress={handleResultPress}>
          <Text style={styles.text}>Translate</Text>
        </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback>
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
    scanContainer: {
      flex: 2,
      backgroundColor: '#99ccff',
      width: '100%',
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 20,
      marginBottom: 10
    },

    textContainer: {
      flex: 1,
      marginTop: 10,
      
    },
    
    chooseContainer: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    dropdownContainer: {
      flex: 1,
      marginRight: 10,
    },
    dropdown: {
      backgroundColor: '#fafafa',
    },
    dropdownItem: {
      justifyContent: 'flex-start',
    },
    dropdownDropdown: {
      backgroundColor: '#fafafa',
    },

    title: {
      fontWeight: 'bold',
      fontSize: 16,
    },

    button: {
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 12,
      paddingHorizontal: 16,
      borderRadius: 30,
      elevation: 3,
      backgroundColor: 'tomato',
    },
    text: {
      fontSize: 16,
      lineHeight: 21,
      fontWeight: 'bold',
      letterSpacing: 0.25,
      color: 'white',
    },
  });

export default ScannedTextScreen;

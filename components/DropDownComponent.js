import React, { useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import AntDesign from '@expo/vector-icons/AntDesign';
import SupportedLanguages from '../constants/SupportedLanguages';

const data = [
{ label: 'English', value: '1' },
{ label: 'German', value: '2' },
{ label: 'Vietnamese', value: '3' },
{ label: 'Chinese', value: '4' },
{ label: 'Spanish', value: '5' },
{ label: 'French', value: '6' },
{ label: 'Italian', value: '7' },
];

const DropdownComponent = props => {
const [value, setValue] = useState(null);

const renderItem = item => {
    return (
    <View style={styles.item}>
        <Text style={styles.textItem}>{item.label}</Text>
        {item.value === value && (
        <AntDesign
            style={styles.icon}
            color="black"
            name="Safety"
            size={20}
        />
        )}
    </View>
    );
};

return (
    <Dropdown
    style={styles.dropdown}
    placeholderStyle={styles.placeholderStyle}
    selectedTextStyle={styles.selectedTextStyle}
    inputSearchStyle={styles.inputSearchStyle}
    iconStyle={styles.iconStyle}
    data={data}
    search
    maxHeight={300}
    labelField="label"
    valueField="value"
   placeholder={props.placeholder}
    searchPlaceholder="Search..."
    value={value}
    onChange={item => {
        setValue(item.value);
    }}
    renderItem={renderItem}
    />
);
};

export default DropdownComponent;

const styles = StyleSheet.create({
  dropdown: {
    margin: 16,
    height: 50,
    width: 165,
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
  },
  icon: {
    marginRight: 5,
  },
  item: {
    padding: 17,
    flexDirection: 'row',
  },
  textItem: {
    flex: 1,
    fontSize: 16,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});
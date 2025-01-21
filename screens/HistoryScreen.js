import React, {useEffect} from 'react';
import { View, FlatList ,StyleSheet, Text } from 'react-native';
import {useDispatch, useSelector } from 'react-redux';
import TranslationResult from '../components/TranslationResult';
import AsyncStorage from '@react-native-async-storage/async-storage';

const HistoryScreen = () => {
  const history = useSelector(state => state.history.items);  
  
  useEffect(() => {
    const saveHistory = async () => {
      try {
        await AsyncStorage.setItem('HISTORY', JSON.stringify(history));
        console.log("Something has been stored");
      } catch (error) {
        console.log(error);
      }
    }

    saveHistory();

  }, [history]);

  return (
    <View style={styles.container}>
      <FlatList
        data={history.slice().reverse()}
        renderItem={itemData => {
          return <TranslationResult itemId={itemData.item.id}/>
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',

  },
});

export default HistoryScreen;

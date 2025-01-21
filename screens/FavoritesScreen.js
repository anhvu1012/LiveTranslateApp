import React from 'react';
import { View, StyleSheet, Text, FlatList} from 'react-native';
import TranslationResult from '../components/TranslationResult';
import { useSelector } from 'react-redux';

const FavoritesScreen = () => {
  const favoriteItems = useSelector(state => state.favoriteItems.items);

  if (favoriteItems.length === 0 ) {
    return <View style={styles.noItemsContainer}>
      <Text style={styles.noItemText}>Nothing to show</Text>
    </View>
  }

  return (
      <View style={styles.container}>
        <FlatList
          data={favoriteItems.slice().reverse()}
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

  noItemsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noItemText: {
    fontFamily: 'Lato-LightItalic',
    letterSpacing: 0.3
  }
});

export default FavoritesScreen;

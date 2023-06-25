import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

const FavoritesScreen = () => {
    return (
        <View style={styles.container}>
            <Text>Favorites</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });

export default FavoritesScreen;

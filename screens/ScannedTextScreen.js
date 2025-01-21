import React, {useState, useEffect, useCallback} from 'react';
import { View, Text, StyleSheet, TouchableWithoutFeedback, KeyboardAvoidingView, TouchableOpacity, Keyboard, TextInput, ActivityIndicator } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import SupportedLanguages from '../constants/SupportedLanguages';
import { useDispatch } from 'react-redux';
import { addHistoryItem, setHistoryItems } from '../data/HistorySlice';
import uuid from 'react-native-uuid';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { setFavoriteItem } from '../data/FavoriteSlice';

const loadData = () => {
  return async dispatch => {
    try {
        const historyString = await AsyncStorage.getItem('HISTORY');
        if (historyString !== null) {
            const history = JSON.parse(historyString);
            dispatch(setHistoryItems({items: history}));
            console.log("There are some history in storage")
        }
        const favoriteItemsString = await AsyncStorage.getItem('FAVORITE');
        if (favoriteItemsString !== null) {
            const favoriteItems = JSON.parse(favoriteItemsString);
            dispatch(setFavoriteItem({items: favoriteItems}));
            console.log("There are some favs in storage")
        }
    } catch(err) {
        console.log(err);
    }
  }
}

const ScannedTextScreen = ({ navigation, route}) => {
  const params = route.params || {};
  const { scannedText } = route.params;

  const dispatch = useDispatch();

  const [currentInput, setCurrentInput] = useState(scannedText);
  const [languageTo, setLanguageTo] = useState("de");
  const [languageFrom, setLanguageFrom] = useState("en");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (params.languageTo) {
      setLanguageTo(params.languageTo);
    }
    if (params.languageFrom) {
      setLanguageFrom(params.languageFrom);
    }
    
  }, [params.languageTo, params.languageFrom]);

  useEffect(() => {
    dispatch(loadData());
  }, [dispatch]);

  const onSubmit = async (text, targetLanguage) => {
    const API_KEY = 'YOUR_API_KEY'; 
    const API_URL = `YOUR_API_URL${API_KEY}`;
  
    const requestBody = {
      q: text,
      target: targetLanguage,
    };
  
    try {
      setIsLoading(true); 
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });
  
      const result = await response.json();
      if (result.data && result.data.translations && result.data.translations.length > 0) {
        const translatedText = result.data.translations[0].translatedText;
        navigation.navigate('Result', { result: translatedText });
        console.log('Translated Text:', translatedText);

        const resultObj = [requestBody.q, translatedText];
        const id = uuid.v4();
        resultObj.id = id;

        // dispatch action, for history
        dispatch(addHistoryItem({ item:  resultObj}));
        
      } else {
        console.error('Translation error:', result.error);
      }
    } catch (error) {
      console.error('Translation error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const changeTextHandler = (enteredText) => {
    setCurrentInput(enteredText);
  };

return (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <View style={styles.languageContainer}>
        <TouchableOpacity style={styles.languageOption} onPress={() => navigation.navigate("Language Select", {title: "Translate from", selected: languageFrom, mode: "from"})}>
          <Text style={styles.languageOptionText}>{SupportedLanguages[languageFrom]}</Text>
        </TouchableOpacity>
        <View style={styles.arrowContainer}>
          <AntDesign name="arrowright" size={24} color='black'/>
        </View>
        <TouchableOpacity style={styles.languageOption} onPress={() => navigation.navigate("Language Select", {title: "Translate to", selected: languageTo, mode: "to"})}>
          <Text style={styles.languageOptionText}>{SupportedLanguages[languageTo]}</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.scanContainer}>
        <Text style={styles.title}>Scanned Text</Text>
        <TextInput 
          multiline
          value={currentInput}
          style={styles.textContainer}
          onChangeText={changeTextHandler}
        />
      </View>

      <TouchableOpacity 
        style={styles.button} 
        onPress={isLoading ? undefined : () => onSubmit(currentInput, languageTo)}
      >
        {
          isLoading ? 
          <ActivityIndicator size={'small'} color='white'/> : 
          <Text style={styles.text}>Translate</Text>
        }
      </TouchableOpacity>

    </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  scanContainer: {
    flex: 1,
    backgroundColor: '#99ccff',
    width: '100%',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginBottom: 32
  },

  textContainer: {
    flex: 1,
    marginTop: 10,
    
  },

  languageContainer: {
    flexDirection: 'row',
    marginVertical: 10
  },
  
  languageOption: {
    flex: 1, 
    alignItems: 'center',
    justifyContent: 'center',

  },
  
  arrowContainer: {
    width: 50,
    alignItems: 'center',
    justifyContent: 'center'
  },
  
  languageOptionText:{
    letterSpacing: 0.3,
    fontSize: 16
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
    marginBottom: 30,
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

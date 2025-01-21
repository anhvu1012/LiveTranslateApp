import React, {useEffect, useState, useCallback} from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import HomeTabNavigator from './navigation/HomeTabNavigator';
import * as SplashScreen from 'expo-splash-screen';
import * as Font from 'expo-font';
import { Provider } from 'react-redux';
import Store from './data/Store';

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [fontIsLoaded, setFontIsLoaded] = useState(false);

  useEffect(() => {
    const prepare = async () => {
      try {
        await Font.loadAsync({
          'Lato-Black': require("./assets/fonts/Lato-Black.ttf"),
          'Lato-BlackItalic': require("./assets/fonts/Lato-BlackItalic.ttf"),
          'Lato-Italic': require("./assets/fonts/Lato-Italic.ttf"),
          'Lato-Bold': require("./assets/fonts/Lato-Bold.ttf"),
          'Lato-BoldItalic': require("./assets/fonts/Lato-BoldItalic.ttf"),
          'Lato-Light': require("./assets/fonts/Lato-Light.ttf"),
          'Lato-LightItalic': require("./assets/fonts/Lato-LightItalic.ttf"),
          'Lato-Regular': require("./assets/fonts/Lato-Regular.ttf"),
          'Lato-Thin': require("./assets/fonts/Lato-Thin.ttf"),
          'Lato-ThinItalic': require("./assets/fonts/Lato-ThinItalic.ttf")
        });
      } catch (error) {
        console.log(error);
      }finally{
        setFontIsLoaded(true);
      }
    };

    prepare();
  }, []);

  const onLayout = useCallback(async () => {
    if (fontIsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontIsLoaded]);

  if (!fontIsLoaded){
    return null;
  }

  return (
    <Provider store={Store}>
      <GestureHandlerRootView onLayout={onLayout} style={{ flex: 1 }}>
          <HomeTabNavigator/>
      </GestureHandlerRootView>
    </Provider>
  );
};


import * as ImagePicker from "expo-image-picker";
import React, { useState} from "react";
import { useNavigation } from "@react-navigation/native";
import { Button, Image, View, Text, ScrollView } from "react-native";

const ImagePickerComponent = ({ onSubmit}) => {
  const [image, setImage] = useState(null);
  const [text, setText] = useState("");
  const navigation = useNavigation();

  const navigateToScannedTextScreen = () => {
    navigation.navigate("Scanner", { scannedText: text });
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      base64: true,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      setText("Loading..");
      const responseData = await onSubmit(result.assets[0].base64);
      setText(responseData.text);
    }
  };

  return (
    <View style={{flex: 1}}>
      <Button title="Pick an image from camera roll" onPress={pickImage} />
      {image && (
        <Image
          source={{ uri: image }}
          style={{ width: 400, height: 300, resizeMode: "contain" }}
        />
      )}
      <ScrollView style={{flex: 1, marginHorizontal: 10, marginTop: 20}}>
        <Text>{text}</Text>
      </ScrollView>
      <Button title="Edit Text" onPress={navigateToScannedTextScreen}/>
    </View>
  );
}
export default ImagePickerComponent;
import React from "react";
import { View, StyleSheet } from "react-native";
import ImagePicker from "../components/ImagePickerComponent";
import callGoogleVisionAsync from "../components/HelperFunction";

const PictureScreen = ({navigation}) => {
  return (
    <View style={styles.container}>
      <ImagePicker onSubmit={callGoogleVisionAsync} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: "white",
    padding: 8,
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default PictureScreen;
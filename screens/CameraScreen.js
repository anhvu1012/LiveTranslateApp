import {React, useState, useEffect, useRef} from 'react';
import { View, Text, TouchableOpacity, Button, StyleSheet, Image } from 'react-native';
import { Camera } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';
import { EvilIcons } from '@expo/vector-icons';

const CameraScreen = ({ navigation }) => {
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [image, setImage] = useState(null);
  const cameraRef = useRef(null);

  useEffect(() => {
    (async () => {
      MediaLibrary.requestPermissionsAsync();
      const cameraStatus = await Camera.requestCameraPermissionsAsync();
      setHasCameraPermission(cameraStatus.status === 'granted');
    }) ();
  }, []);

  if (hasCameraPermission === false) {
    return <Text style={{justifyContent: 'center'}}>No Camera Access</Text>;
  }

  const takePicture = async () => {
      if (cameraRef) {
      try {
        const data = await cameraRef.current.takePictureAsync();
        console.log(data);
        setImage(data.uri);
      } catch (e) {
        console.log(e);
      }
  };
}

  const saveImage = async () => {
    if (image) {
      try{
        await MediaLibrary.createAssetAsync(image);
        alert('Picture saved!')
        navigation.navigate('Picture Select');
        setImage(null);
      } catch(e){
        console.log(e);
      }
    }
  };

  return (
      <View style={styles.container}>
        {!image ? 
        <Camera 
            ref={cameraRef}
            style={styles.camera}
            type={Camera.Constants.Type.back}
            ratio="1:1"
        >

        </Camera>
        : 
        <Image source={{uri: image}} style={styles.camera}/>
        }
      <View style={{alignItems: 'center'}}>
        {image ? 
        <View style={{paddingHorizontal: 20}}>
          <TouchableOpacity style={{flexDirection: 'row', justifyContent: 'space-end'}}>
            <Button
              title='Retake'
              backgroundColor={'white'}
              color={'black'}
              size={50}
              onPress={() => setImage(null)}
            /> 
             <Button
              title='Save'
              backgroundColor={'white'}
              color={'black'}
              size={50}
              onPress={saveImage}
            /> 
            
          </TouchableOpacity>
        </View>
        :
        <TouchableOpacity>
          <EvilIcons
            name='camera' 
            backgroundColor={'white'}
            color={'black'}
            size={50}
            onPress={takePicture}/> 
          </TouchableOpacity>
        }
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',

  },
  
  camera: {
    flex: 1,
  }
    
  });

export default CameraScreen;

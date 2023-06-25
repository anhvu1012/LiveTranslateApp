import {React, useState, useEffect} from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { Camera } from 'expo-camera';
import { EvilIcons } from '@expo/vector-icons';

const CameraScreen = ({ navigation }) => {
    const [hasCameraPermission, setHasCameraPermission] = useState(null);
    const [camera, setCamera] = useState(null);
    const [image, setImage] = useState(null);
    const [scannedText, setScannedText] = useState('');

    useEffect(() => {
        (async() => {
          const cameraStatus = await Camera.requestCameraPermissionsAsync();
          setHasCameraPermission(cameraStatus.status === 'granted');
        })(); 
    }, []);

    const takePicture = async () => {
        if (camera) {
        const photo = await camera.takePictureAsync(null);
        setImage(photo.uri);
        performTextDetection(photo.uri);
        }
    };

    const performTextDetection = async (photoUri) => {
        // Perform text detection using Google Cloud Vision API
        // Replace `YOUR_API_KEY` with your actual API key
        const API_KEY = 'AIzaSyDE5IS1C3jozGNM6Gj_vdR5LgJTCjoXmro';
        const API_URL = `https://vision.googleapis.com/v1/images:annotate?key=${API_KEY}`;
        
        const requestBody = {
            requests: [
              {
                image: {
                  source: {
                    imageUri: photoUri,
                  },
                },
                features: [
                  {
                    type: 'TEXT_DETECTION',
                    maxResults: 1,
                  },
                ],
              },
            ],
        };
      
          try {
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestBody),
            });
      
            const result = await response.json();
            console.log('API response:', result); // Add this line to inspect the response

            if (result.responses && result.responses.length > 0) {
                const scannedText = result.responses[0].fullTextAnnotation.text;
                setScannedText(scannedText);
                navigation.navigate('ScannedText', { scannedText });
            } else {
                console.error('No valid response from API');
            }
        } catch (error) {
            console.error('Text detection error:', error);
        }
        };

    if (hasCameraPermission === false) {
        return <Text>No Camera Access</Text>;
    }

    const handleCapturePress = () => {
        // Perform capture logic here
        // For example, use CameraService to capture the text
        //navigation.navigate('Scanner');
        takePicture();
    };

    return (
        <View style={{flex: 1, alignItems: 'center', backgroundColor: 'white'}}>
            <View style={styles.cameraContainer}>
                <Camera 
                    ref={(ref) => setCamera(ref)}
                    style={styles.fixedRatio}
                    type={Camera.Constants.Type.back}
                    ratio="1:1"
                />
            </View>
            <EvilIcons.Button 
                name='camera' 
                backgroundColor={'white'}
                color={'black'}
                size={50}
                onPress={handleCapturePress}/>        
        </View>
    );
};

const styles = StyleSheet.create({
    cameraContainer: {
        flex: 1,
        flexDirection: 'row',
    },
    
      fixedRatio: {
        flex: 1,
        //aspectRatio: 1,
    }
    
  });

export default CameraScreen;

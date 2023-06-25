import React, {useState, useContext} from 'react';
import { View, Text, Switch, Button, Modal, StyleSheet } from 'react-native';

import { EventRegister } from 'react-native-event-listeners';

const SettingsScreen = ({ isVisible, closeModal }) => {
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [isBigFont, setIsBigFont] = useState(false);

    const handleFontToggle = () => {
        setIsBigFont(!isBigFont);
    };
    
    return (
        <Modal 
            visible={isVisible} 
            animationType="slide"
            transparent={true}
            >
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.title}>Settings</Text>
                </View>
                <View style={styles.middleContainer}>
                    <View style={styles.setting}>
                        <Text style={{fontSize: 18}}>Dark Mode</Text>
                        <Switch
                        value={isDarkMode}
                        onValueChange={(value) => {
                            setIsDarkMode(value);
                             EventRegister.emit("changeTheme", value);
                        }}
                        />
                    </View>

                    <View style={styles.setting}>
                        <Text style={{fontSize: 18}}>Bigger Font</Text>
                        <Switch
                        value={isBigFont}
                        onValueChange={handleFontToggle}
                        />
                    </View>
                </View>
                <View style={styles.bottomContainer}>
                    <Text style={styles.selectedMode}>Selected Mode: {isDarkMode ? 'Dark Mode' : 'Light Mode'}</Text>
                    <Text style={styles.selectedFont}>Selected Font: {isBigFont ? 'Bigger Font' : 'Normal Font'}</Text>
                </View>
                <Button title="Close" onPress={closeModal} />
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    
    container: {
        flex: 1,
        marginHorizontal: 20,
        marginVertical : 250,
        justifyContent: 'space-evenly',
        backgroundColor: '#99ccff',
        borderRadius: 30,
        paddingHorizontal: 20
    },

    header: {
        alignItems: 'center',
        marginBottom: 10,
    },

    middleContainer: {
        justifyContent: 'space-between',
    },

    bottomContainer: {
        justifyContent: 'space-between'
    },

    title: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    setting: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    selectedMode: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    selectedFont: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10
    },
});

export default SettingsScreen;

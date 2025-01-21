import {StyleSheet, View, Text, FlatList} from 'react-native';
import { useEffect, useCallback } from 'react';
import { HeaderButtons, HeaderButton, Item} from 'react-navigation-header-buttons';
import { Ionicons } from '@expo/vector-icons';
import SupportedLanguages from '../constants/SupportedLanguages';
import LanguageItem from '../components/LanguageItem';

const CustomHeaderButton = props => {
    return <HeaderButton
                { ...props}
                IconComponent={Ionicons}
                iconSize={23}
                color='black'
    />
}

export default function LanguageSelectScreen ({navigation, route}) {
    const params = route.params || {};
    const {title, selected} = params;
    useEffect(() => {
        navigation.setOptions({
            headerTitle: title,
            headerRight: () => {
                return <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                    <Item 
                        iconName='close'
                        color='black'
                        onPress={() => navigation.goBack()}
                    />
                </HeaderButtons>
            }
        })
    }, [navigation]);

    const onLanguageSelect = useCallback (itemKey => {
        const dataKey = params.mode === 'to' ? 'languageTo' : 'languageFrom';
        navigation.navigate("Scanner", { [dataKey] : itemKey});
    }, [params, navigation]);

    return (
        <View style={styles.container}>
            <FlatList
                data={Object.keys(SupportedLanguages)}
                renderItem={(itemData) => {
                    const languageKey = itemData.item;
                    const languageStrings = SupportedLanguages[languageKey];
                    return <LanguageItem 
                                onPress={() => onLanguageSelect(languageKey)}
                                text={languageStrings}
                                selected={languageKey === selected}
                            />
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
})
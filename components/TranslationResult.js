import { TouchableOpacity, StyleSheet , View, Text} from "react-native";
import {Ionicons} from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { useCallback } from "react";
import { setFavoriteItem } from "../data/FavoriteSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default TranslationResult = props => {
    const dispatch = useDispatch();

    const {itemId} = props;
    const item = useSelector(state => state.history.items.find(item => item.id === itemId));
    const favoriteItems = useSelector(state => state.favoriteItems.items);

    const isFav = favoriteItems.some(i => i.id === itemId);
    const starIcon = isFav ? "ios-star" : "ios-star-outline";

    const starItem = useCallback(async() => {
        let newFavoriteItems;

        if(isFav){
            newFavoriteItems = favoriteItems.filter(i => i.id !== itemId);
        } else{
            newFavoriteItems = favoriteItems.slice();
            newFavoriteItems.push(item);
        }

        await AsyncStorage.setItem('FAVORITE', JSON.stringify(newFavoriteItems));

        dispatch(setFavoriteItem({items: newFavoriteItems}));
    }, [dispatch, favoriteItems]);

    return <View style={styles.container}>
        <View style={styles.textContainer}>
            <Text 
                numberOfLines={4}
                style={styles.title}>{item[0]}</Text>
            <Text 
                numberOfLines={4}
                style={styles.subTitle}>{item[1]}</Text>
        </View>
        <TouchableOpacity 
            onPress={starItem}
            style={styles.iconContainer}
        >
            <Ionicons name={starIcon} size={24} color='black' />
        </TouchableOpacity>

    </View>
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 10,
        paddingVertical: 20,
        flexDirection: 'row',
        borderBottomColor: 'grey',
        backgroundColor: 'tomato',
        borderWidth: 0.5,
        borderTopWidth: 0,
    },

    textContainer: {
        flex: 1,
        marginRight: 8,
    },

    title: {
        fontFamily: 'Lato-BoldItalic',
        letterSpacing: 0.3,
        // color: 
    },

    subTitle: {
        fontFamily: 'Lato-Italic',
        letterSpacing: 0.3,
        //color: 
    },

    iconContainer: {
        width: 30,
        justifyContent: 'center',
        alignItems: 'center'
    }

});
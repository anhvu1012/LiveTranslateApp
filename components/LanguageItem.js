import { TouchableOpacity, StyleSheet , View, Text} from "react-native";
import {Feather} from "@expo/vector-icons";

export default LanguageItem = props => {

    return <TouchableOpacity 
                style={styles.container}
                onPress={props.onPress}
                >
        <View style={styles.iconContainer}>
            {
                props.selected && 
                <Feather name="check" size={18} color='black'/>
            }
        </View>

        <Text style={styles.text}>{props.text}</Text>
    </TouchableOpacity>
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 10,
        paddingVertical: 15,
        flexDirection: 'row',
        borderBottomColor: 'grey',
        borderBottomWidth: 0.5
    },

    iconContainer: {
        paddingRight: 7,
        alignItems: 'center',
        justifyContent: 'center',
        width: 40,
    },

    text: {
        flex: 1, 
        letterSpacing: 0.3,
    }
});
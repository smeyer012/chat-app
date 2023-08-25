import { useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';

const Screen2 = ({ route, navigation }) => {

    // Accepts state elements as parameters
    const { name } = route.params;
    const { color } = route.params;
    const { colorHex } = route.params;

    useEffect(() => {
        // Controls the text in top title bar
        navigation.setOptions({ title: name + ' (' + color + ' theme)' });
    }, []);

    return (
        <View style={[styles.container, { backgroundColor: colorHex }]}>
            <Text style={styles.text}>Hello {name}</Text>
        </View>
    );

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        fontSize: 38,
        color: '#FFF'
    }
});

export default Screen2;

import { useState } from 'react';
import { ImageBackground, StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements'

const Start = ({ navigation }) => {

    // sets up state elements to be passed to other screens
    const [name, setName] = useState('');
    const [color, setColor] = useState('');
    const [colorHex, setColorHex] = useState('');

    return (
        <View style={styles.container}>
            <ImageBackground source={require('../assets/bg_image.png')} resizeMode="cover" style={styles.image}>
                <View style={styles.box1}>
                    <Text style={styles.titletext}>ChatMeUp</Text>
                </View>
                <View style={styles.box2}>
                    <View style={[styles.innerbox, { backgroundColor: '#FFFFFF' }]}>
                        <View style={[styles.innerbox, { justifyContent: 'space-between' }]}>
                            <View style={styles.inputWrapper}>
                                <Icon type="material-community" name="account-outline" style={styles.inputIcon} color='#B0AEB9' />
                                <TextInput
                                    style={styles.textInput}
                                    value={name}
                                    onChangeText={setName}
                                    placeholder='Your Name'
                                />
                            </View>
                            <View style={styles.colorPicker}>
                                <Text style={styles.colorPickerText}>Choose Background Color:</Text>
                                {/* sets up radio button style elements for color picker */}
                                <View style={styles.colorPickerContainer}>
                                    <TouchableOpacity onPress={() => { setColor('Black'), setColorHex('#090C08') }} style={color == 'Black' ? styles.colorButtonPress : styles.colorButton}>
                                        <View style={[styles.colorButtonInner, { backgroundColor: '#090C08' }]}></View>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => { setColor('Grey'), setColorHex('#474056') }} style={color == 'Grey' ? styles.colorButtonPress : styles.colorButton}>
                                        <View style={[styles.colorButtonInner, { backgroundColor: '#474056' }]}></View>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => { setColor('Blue'), setColorHex('#8A95A5') }} style={color == 'Blue' ? styles.colorButtonPress : styles.colorButton}>
                                        <View style={[styles.colorButtonInner, { backgroundColor: '#8A95A5' }]}></View>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => { setColor('Green'), setColorHex('#B9C6AE') }} style={color == 'Green' ? styles.colorButtonPress : styles.colorButton}>
                                        <View style={[styles.colorButtonInner, { backgroundColor: '#B9C6AE' }]}></View>
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <TouchableOpacity onPress={() => navigation.navigate('Chat', { name: name, color: color, colorHex: colorHex })} style={[styles.startButton]}>
                                <Text style={[styles.startText]}>Start Chatting</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View >
            </ImageBackground >
        </View >
    );

}

// Styles for start screen
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    image: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#D3D3D3'
    },
    // Contains chat app name
    box1: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    titletext: {
        color: 'white',
        fontSize: 45,
        fontWeight: '600',
        color: '#FFFFFF',
        textAlign: 'center',
    },
    // Contains chat app intro form
    box2: {
        height: '44%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    // Creates white box within bottom portion of screen
    innerbox: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '88%',
        height: '88%'
    },
    // Form elements
    inputWrapper: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: 'rgba(117,112,131,0.5)',
    },
    inputIcon: {
        margin: 12
    },
    textInput: {
        fontSize: 16,
        fontWeight: '300',
        color: '#757083',
        width: '100%',
        height: 50,
    },
    colorPicker: {
        alignSelf: 'flex-start'
    },
    colorPickerContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginRight: 45
    },
    colorPickerText: {
        marginBottom: 10
    },
    colorButton: {
        height: 55,
        width: 55,
        borderRadius: 100,
        borderWidth: 2,
        borderColor: "#FFF",
        alignItems: "center",
        justifyContent: "center",
        marginRight: 10
    },
    colorButtonPress: {
        height: 55,
        width: 55,
        borderRadius: 100,
        borderWidth: 2,
        borderColor: "#787284",
        alignItems: "center",
        justifyContent: "center",
        marginRight: 10
    },
    colorButtonInner: {
        height: '100%',
        width: '100%',
        borderRadius: 100,
        borderWidth: 2,
        borderColor: "#FFF",
    },
    startButton: {
        width: '100%',
        backgroundColor: '#757083',
        padding: 20,
        alignItems: "center",
        justifyContent: "center",
    },
    startText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#FFFFFF'
    }
});

export default Start;
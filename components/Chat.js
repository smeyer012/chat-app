import { useState, useEffect } from 'react';
import { StyleSheet, View, Text, KeyboardAvoidingView, Platform } from 'react-native';
import { Bubble, GiftedChat } from "react-native-gifted-chat";

const Chat = ({ route, navigation }) => {

    // Accepts state elements as parameters
    const { name } = route.params;
    const { colorHex } = route.params;

    // Sets up state for Chat feature
    const [messages, setMessages] = useState([]);

    // Creates send callback function 
    const onSend = (newMessages) => {
        setMessages(previousMessages => GiftedChat.append(previousMessages, newMessages))
    }

    const renderBubble = (props) => {
        return <Bubble
            {...props}
            wrapperStyle={{
                right: {
                    backgroundColor: "#000"
                },
                left: {
                    backgroundColor: "#FFF"
                }
            }}
        />
    }

    useEffect(() => {
        setMessages([
            {
                _id: 1,
                text: "Hello developer",
                createdAt: new Date(),
                user: {
                    _id: 2,
                    name: "React Native",
                    avatar: "https://placeimg.com/140/140/any",
                },
            },
            {
                _id: 2,
                text: 'This is a system message',
                createdAt: new Date(),
                system: true,
            },
        ]);
    }, []);

    useEffect(() => {
        // Controls the text in top title bar
        navigation.setOptions({ title: name });
    }, []);

    return (
        <View style={styles.container}>
            <GiftedChat
                messages={messages}
                renderBubble={renderBubble}
                onSend={messages => onSend(messages)}
                user={{
                    _id: 1
                }}
            />
            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} />
        </View>
    )



    // return (
    //     <View style={[styles.container, { backgroundColor: colorHex }]}>
    //         <Text style={styles.text}>Hello {name}</Text>
    //     </View>
    // );

}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    text: {
        fontSize: 38,
        color: '#FFF'
    }
});

export default Chat;

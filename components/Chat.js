import { useState, useEffect } from 'react';
import { StyleSheet, View, Text, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import { Bubble, GiftedChat } from "react-native-gifted-chat";
import { collection, addDoc, onSnapshot, query, where, orderBy } from "firebase/firestore";

const Chat = ({ db, route, navigation }) => {

    // Accepts state elements as parameters
    const { name } = route.params;
    const { colorHex } = route.params;
    const { userID } = route.params;

    // Sets up state for Chat feature
    const [messages, setMessages] = useState([]);

    // Creates send callback function 
    const onSend = (newMessages) => {
        addDoc(collection(db, "messages"), newMessages[0]);
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
        const q = query(collection(db, "messages"), orderBy("createdAt", "desc"))  //setMessages
        const unsubMessagelist = onSnapshot(q, (documentsSnapshot) => {
            let newMSG = [];
            documentsSnapshot.forEach(doc => {
                newMSG.push({ id: doc.id, ...doc.data(), createdAt: new Date(doc.data().createdAt.toMillis()), user: { name: name } })
            });
            setMessages(newMSG);
        });

        // Clean up code
        return () => {
            if (unsubMessagelist) unsubMessagelist();
        }

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
                    _id: userID,
                    name: name
                }}
            />
            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} />
        </View>
    )


}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10
    },
    text: {
        fontSize: 38,
        color: '#FFF'
    }
});

export default Chat;

import { useState, useEffect } from 'react';
import { StyleSheet, View, Text, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import { Bubble, GiftedChat, InputToolbar } from "react-native-gifted-chat";
import { collection, addDoc, onSnapshot, query, where, orderBy } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Chat = ({ db, route, navigation, isConnected }) => {

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

    const renderInputToolbar = (props) => {
        if (isConnected) return <InputToolbar {...props} />;
        else return null;
    }

    let unsubMessagelist;

    useEffect(() => {
        if (isConnected === true) {
            if (unsubMessagelist) unsubMessagelist();
            unsubMessagelist = null;
            const q = query(collection(db, "messages"), orderBy("createdAt", "desc"))  //setMessages
            unsubMessagelist = onSnapshot(q, (documentsSnapshot) => {
                let newMSG = [];
                documentsSnapshot.forEach(doc => {
                    newMSG.push({ id: doc.id, ...doc.data(), createdAt: new Date(doc.data().createdAt.toMillis()), user: { name: name } })
                });
                cacheMessageList(newMSG);
                setMessages(newMSG);
            });
        } else {
            loadCachedList();
        }

        // Clean up code
        return () => {
            if (unsubMessagelist) unsubMessagelist();
        }

    }, [isConnected]);

    const cacheMessageList = async (listsToCache) => {
        try {
            await AsyncStorage.setItem('message_list', JSON.stringify(listsToCache));
        } catch (error) {
            console.log(error.message);
        }
    }

    const loadCachedList = async () => {
        const cachedLists = await AsyncStorage.getItem("message_list") || [];
        setMessages(JSON.parse(cachedLists));
    }


    useEffect(() => {
        // Controls the text in top title bar
        navigation.setOptions({ title: name });
    }, []);

    return (
        <View style={styles.container}>
            <GiftedChat
                messages={messages}
                renderBubble={renderBubble}
                renderInputToolbar={renderInputToolbar}
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

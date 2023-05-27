import React from "react";

import { View, Text, StyleSheet } from "react-native";
import { KeyboardAvoidingView } from "react-native";
import { TextInput } from "react-native";
import { Button } from "react-native";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { storeData, getData, removeData } from "./store";

import Print_message from "./Print_message";

const Chat2 = () => {

    const [currentMessage, setCurrentMessage] = useState('');
    const [messageList, setMessageList] = useState([]);
    const [selectedFriend, setSelectedFriend] = useState('');
    const [username, setUsername] = useState('');

    useEffect(() => {
        const fetchMessages = async () => {
            const friend_wait = await getData('Friend');
            const user_wait = await getData('user_name');
            setUsername(user_wait);
            setSelectedFriend(friend_wait);
            const response = await axios.get(
                'http://20.234.168.103:8080/messages/' + username.toLowerCase() + '/' + selectedFriend.toLowerCase()
            );
            setMessageList(response.data["Success "]);
        };

        fetchMessages();
    }, [selectedFriend]);

    const sendMessage = async () => {
        if (currentMessage !== '') {
            const msg = { "Sender": username.toLowerCase(), "Message": currentMessage };
            await axios.post('http://20.234.168.103:8080/sendMessage', {
                message: currentMessage,
                username: username,
                friendname: selectedFriend,
            });

            setMessageList([...messageList, msg]);
            setCurrentMessage('');
        }
    };

    return (
        <KeyboardAvoidingView
            style={styles.container}
            // behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 15 : 0}
        >
        <View>
            {/* <View style={styles.chatContainer}> */}
                <Text style={styles.blackText}>Chat with {selectedFriend}</Text>
                <Print_message _messageList={messageList} _username={username} />
            {/* </View> */}
            <View style={styles.inputContainer}>
                <TextInput
                    type="text"
                    value={currentMessage}
                    placeholder="Enter your message"
                    style={styles.input}
                    onChangeText={(text) => setCurrentMessage(text)}
                    onSubmitEditing={sendMessage}
                />
                <Button onPress={sendMessage} title="SEND" />
            </View>
            <View style={styles.emptySpace} />
        </View>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-end',
        backgroundColor: '#fff',
    },
    chatContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        backgroundColor: '#fff',
    },
    input: {
        flex: 1,
        height: 40,
        borderWidth: 1,
        borderColor: 'gray',
        marginRight: 10,
        paddingHorizontal: 10,
        color: '#000',
        borderRadius: 20, // Add border radius to make it rounded
    },
    emptySpace: {
        height: 20,
    },
    blackText: {
        color: '#000',
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        padding: 10,
    },
});

export default Chat2;
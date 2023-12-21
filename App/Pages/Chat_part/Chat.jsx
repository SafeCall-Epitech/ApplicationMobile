import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { KeyboardAvoidingView } from "react-native";
import { TextInput } from "react-native";
import { Button } from "react-native";
import { useState, useEffect } from "react";
import axios from "axios";
import { storeData, getData, removeData } from './store';

import Print_message from "./Print_message";

function Chat2() {
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
            try {
                const response = await axios.get(
                    'http://x2024safecall3173801594000.westeurope.cloudapp.azure.com:80/messages/' + username.toLowerCase() + '/' + selectedFriend.toLowerCase()
                );
                setMessageList(response.data["Success "]);
            } catch (error) {
                if (error.response) {
                    console.log(error.response.data);
                    console.log(error.response.status);
                } else {
                    console.log(error);
                }
            }
        };

        fetchMessages();
    }, [selectedFriend]);

    const sendMessage = async () => {
        if (currentMessage !== '') {
            const msg = { "Sender": username.toLowerCase(), "Message": currentMessage };
            console.log(currentMessage);
            console.log(username);
            console.log(selectedFriend);
            await axios.post('http://x2024safecall3173801594000.westeurope.cloudapp.azure.com:80/sendMessage', {
                message: currentMessage,
                username: username.toLowerCase(),
                friendname: selectedFriend,
            });

            setMessageList([...messageList, msg]);
            setCurrentMessage('');
        }
    };

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={'padding'}
            keyboardVerticalOffset={15}
        >
            <View style={styles.header}>
                <Text style={styles.headerTitle}>{selectedFriend}</Text>
            </View>
            <View style={styles.chatContainer}>
                <Print_message _messageList={messageList} _username={username} />
            </View>
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
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-end',
        backgroundColor: '#fff',
    },
    header: {
        height: 110,
        backgroundColor: '#f9f9f9',
        justifyContent: 'flex-end', // Aligner le texte en bas du header
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10, // Ajouter une marge inférieure pour déplacer le titre vers le bas
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
        borderRadius: 20,
    },
    emptySpace: {
        height: 20,
    },
});

export default Chat2;

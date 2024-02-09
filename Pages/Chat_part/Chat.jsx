import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { KeyboardAvoidingView } from "react-native";
import { TextInput } from "react-native";
import { Button } from "react-native";
import { useState, useEffect } from "react";
import axios from "axios";
import { storeData, getData, removeData } from './store';
import io from 'socket.io-client';
import Icon from 'react-native-vector-icons/AntDesign';
import Color from "../../color";
import Print_message from "./Print_message";

function Chat2() {
    const [currentMessage, setCurrentMessage] = useState('');
    const [messageList, setMessageList] = useState([]);
    const [selectedFriend, setSelectedFriend] = useState('');
    const [username, setUsername] = useState('');
    const [numberMessage, setNumberMessage] = useState('');


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
                if (response.data["Success "] == null) {
                    setMessageList([]);
                    setNumberMessage(0)
                } else {
                    setMessageList(response.data["Success "]);
                    setNumberMessage(response.data["Success "].length)
                }

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


    useEffect(() => {
        const fetchMessages = async () => {
            const friend_wait = await getData('Friend');
            const user_wait = await getData('user_name');
            setUsername(user_wait);
            setSelectedFriend(friend_wait);
            try {
                const response = await axios.get('http://x2024safecall3173801594000.westeurope.cloudapp.azure.com:80/messages/' + username.toLowerCase() + '/' + selectedFriend.toLowerCase());
                if (response.data["Success "] == null) {
                        setMessageList([]);
                        setNumberMessage(0)
                } else {
                    if (response.data["Success "].length > numberMessage) {
                        setMessageList(response.data["Success "]);
                        setNumberMessage(response.data["Success "].length)
                    }
                }
            } catch (error) {
                console.error("Error fetching messages:", error);
            }
        };
        const intervalId = setInterval(() => {
            fetchMessages();
        }, 1000);
        return () => clearInterval(intervalId);
    },);

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

            console.log(messageList)
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
                <Icon name="rocket1" size={40} color={Color.dark3} onPress={() => sendMessage()}/>
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
        backgroundColor: Color.dark3,
        justifyContent: 'center', // Aligner le texte en bas du header
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: 'black',
    },
    headerTitle: {
        fontSize: 30,
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
        color: 'black',
    },
    emptySpace: {
        height: 20,
    },
});

export default Chat2;

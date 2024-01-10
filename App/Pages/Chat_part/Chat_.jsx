import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, StyleSheet, KeyboardAvoidingView } from 'react-native';
import axios from 'axios';
import Print_message from './Print_message';
import { storeData, getData, removeData } from './store';
import Icon from 'react-native-vector-icons/AntDesign';

const Stack = createStackNavigator();

function ChatScreen() {
    const [currentMessage, setCurrentMessage] = useState('');
    const [messageList, setMessageList] = useState([]);
    const [selectedFriend, setSelectedFriend] = useState('');
    const [username, setUsername] = useState('');

    useEffect(() => {
        const fetchMessages = async () => {
            const friend_wait = await getData('Friend');
            const user_wait = await getData('user_name');
            setUsername(user_wait);
            console.log(username);
            console.log(friend_wait)
            setSelectedFriend(friend_wait);
            const response = await axios.get(
                'http://20.234.168.103:8080/messages/' + username.toLowerCase() + '/' + selectedFriend.toLowerCase()
            );
            console.log(response.data["Success "]);
            setMessageList(response.data["Success "]);
            console.log(messageList)
        };

        fetchMessages();
    }, [selectedFriend]);

    const sendMessage = async () => {
        if (currentMessage !== '') {
            const msg = { "Sender": username.toLowerCase(), "Message": currentMessage };
            console.log(username)
            await axios.post('http://20.234.168.103:8080/sendMessage', {
                message: currentMessage,
                username: username,
                friendname: selectedFriend,
            });

            setMessageList([...messageList, msg]);
            setCurrentMessage('');
        }
    };

    const test = async () => {
        console.log("BAAACK!!")
    };

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={'padding'}
            keyboardVerticalOffset={15}
        >
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
                <Button onPress={sendMessage} title="Send" />
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
        borderRadius: 20, // Add border radius to make it rounded
    },
    emptySpace: {
        height: 20,
    },
});

export default ChatScreen;
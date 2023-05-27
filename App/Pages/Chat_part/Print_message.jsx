import React, { useRef, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';

export default function Print_message(props) {
    const scrollViewRef = useRef(null);

    useEffect(() => {
        // Scroll to the bottom on initial render and whenever new messages are added
        // scrollToBottom();
    }, [props._messageList]);

    const scrollToBottom = () => {
        scrollViewRef.current.scrollToEnd({ animated: true });
    };

    const usr = props._username.toLowerCase();
    console.log(props._messageList)
    return (
        <View>
        {/* <ScrollView
            ref={scrollViewRef}
            style={styles.container}
            contentContainerStyle={styles.contentContainer}
            onContentSizeChange={scrollToBottom}
            > */}
             {props._messageList.map((msg, index) => (
                         <View
                             key={index}
                             style={
                                     usr === msg["Sender"]
                                         ? props._messageList.length === 1
                                             ? styles.singleMessageMe
                                             : styles.me
                                         : styles.other
                                 }
                             >
                                 <Text style={styles.messageText}>
                                     cc
                        {usr === msg["Sender"] ? 'me' : msg["Sender"]} : {msg["Message"]}
                    </Text>
                </View>
        ))}
        {/* </ScrollView> */}
    </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    contentContainer: {
        flexGrow: 1,
        justifyContent: 'flex-end',
    },
    contentContainer: {
        flexGrow: 1,
        justifyContent: 'flex-end', // Align the messages to the top/left
        paddingLeft: 0, // Add some padding at the bottom
    },
    me: {
        width: 120,
        borderRadius: 10,
        padding: 10,
        marginLeft: 10,
        backgroundColor: 'whitesmoke',
        marginBottom: 10,
    },
    other: {
        width: 120,
        borderRadius: 10,
        padding: 10,
        backgroundColor: 'lightskyblue',
        color: 'whitesmoke',
        marginLeft: "65%",
        marginBottom: 10,
    },
    singleMessageMe: {
        width: 120,
        borderRadius: 10,
        padding: 10,
        marginLeft: 0,
        backgroundColor: 'whitesmoke',
        marginBottom: 10,
        alignSelf: 'flex-start', // Align to the left
    },
    messageText: {
        // Add additional styles if necessary
        //color black
        color: 'black',
    },
    BlackText: {
        color: 'black',
    },
});

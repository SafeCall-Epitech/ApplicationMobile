import React, { useRef, useEffect, useState } from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { storeData, getData, removeData } from './store';

const PrintMessage = (props) => {
    const scrollViewRef = useRef(null);
    const [utc, setUtc] = useState(null);

    useEffect(() => {
        const getUtc = async () => {
            const utcStr = await getData("UTC");
            const utcValue = parseFloat(utcStr);
            console.log("vcurhecb" + utcStr)
            setUtc(utcValue);
        };

        getUtc();
    }, []);

    useEffect(() => {
        scrollToBottom();
    }, [props._messageList]);

    const scrollToBottom = () => {
        scrollViewRef.current.scrollToEnd({ animated: true });
    };

    const usr = props._username.toLowerCase();

    const d = new Date();
    let hour = d.getHours();
    let min = d.getMinutes();

    return (
        <View style={{ flex: 1 }}>
            <ScrollView
                ref={scrollViewRef}
                style={styles.container}
                contentContainerStyle={styles.contentContainer}
                onContentSizeChange={scrollToBottom}
            >
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
                            {usr === msg["Sender"] ? 'me' : msg["Sender"]} : {msg["Message"]}
                        </Text>
                        {msg["Heure"] ? (parseFloat(msg["Heure"].split(":")[0]) + -utc) + ":" + msg["Heure"].split(":")[1] + " 30/11" : hour + ":" + min + " 30/11"}
                    </View>
                ))}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    contentContainer: {
        paddingHorizontal: 400,
        paddingVertical: 16,
        flexGrow: 1,
        justifyContent: 'flex-end', // Align the messages to the top/left
        paddingLeft: 0, // Add some padding at the bottom
    },
    other: {
        width: 120,
        borderRadius: 10,
        padding: 10,
        marginLeft: 10,
        backgroundColor: 'whitesmoke',
        marginBottom: 10,
    },
    messageTime: {
        fontSize: 12,
        color: 'gray',
    },
    me: {
        width: 120,
        borderRadius: 10,
        padding: 10,
        marginLeft: 280,
        backgroundColor: 'lightskyblue',
        color: 'whitesmoke',
        alignSelf: 'flex-start', // Aligner à droite du conteneur
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
    blackText: {
        color: 'black',
    },
});

export default PrintMessage;

import React from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity } from 'react-native';

const InCallPage = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>In Call...</Text>
            
            
            <TouchableOpacity style={styles.muteButton}>
                <Image
                    source={require('../img/symbole-dinterface-de-microphone-muet.png')}
                    style={styles.icon}
                />
            </TouchableOpacity>


            <TouchableOpacity style={styles.endCallButton}>
                <Image
                    source={require('../img/telephone-raccrocher.png')}
                    style={styles.icon}
                />
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000000',
        flexDirection: 'row', // Horizontal layout
        justifyContent: 'space-between', // Spacing between the buttons
        padding: 40,
        alignItems: 'flex-end', // Align items at the bottom
    },
    text: {
        color: 'white',
        fontSize: 30,
        fontWeight: 'bold',
        position: 'absolute',
        top: '25%',
        left: '50%',
    },
    muteButton: {
        backgroundColor: 'gray',
        borderRadius: 30,
        width: 60,
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
    },
    endCallButton: {
        backgroundColor: 'red',
        borderRadius: 30,
        width: 60,
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
    },
    icon: {
        width: 40,
        height: 40,
    },
    endCallText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
    view: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default InCallPage;

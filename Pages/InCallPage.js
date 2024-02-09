import React from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useRoute } from "@react-navigation/native";


const InCallPage = ({ navigation }) => {
    const route = useRoute();
    const guest = route.params?.guest;

    const [sec, setSec] = React.useState(0);
    const [min, setMin] = React.useState(0);
    const [hour, setHour] = React.useState(0);


    React.useEffect(() => {
        const timer = setInterval(() => {
            setSec(sec => sec + 1);
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    React.useEffect(() => {
        if (sec == 60) {
            setSec(0);
            setMin(min => min + 1);
        }
    }, [sec]);

    React.useEffect(() => {
        if (min == 60) {
            setMin(0);
            setHour(hour => hour + 1);
        }
    }, [min]);


        

    return (
        <View style={styles.container}>
            <View style={styles.rowdisplay}>
                
            <View style={styles.toplayercentered}>
            <Text style={styles.text}>In Call with</Text>
            <Text style={styles.text}>{guest}</Text>
            <Text style={styles.text}>{hour}:{min}:{sec}</Text>

            
            </View>
            <View style={styles.botlayercentered}>
            <TouchableOpacity style={styles.muteButton}>
                <Image
                    source={require('../img/symbole-dinterface-de-microphone-muet.png')}
                    style={styles.icon}
                    />
            </TouchableOpacity>


            <TouchableOpacity style={styles.endCallButton} onPress={ () => navigation.navigate('Agenda')} >
                <Image
                    source={require('../img/telephone-raccrocher.png')}
                    style={styles.icon}
                    />
            </TouchableOpacity>
            </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000000',
    },
    text: {
        color: 'white',
        fontSize: 30,
        fontWeight: 'bold',
        justifyContent: 'center',

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
    toplayercentered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

    botlayercentered: {
        flex: 0,
        flexDirection: 'row',
    },
    rowdisplay: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
});

export default InCallPage;

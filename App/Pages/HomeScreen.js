import React from "react";
import { Button, StyleSheet, Text, View, Image } from "react-native";

const HomeScreen = ({navigation}) => {
    return (
        <View>
            <Image style={styles.tinyLogo} source={require('../img/logo.png')} />
            <View style={styles.pageposition}>
                <Button
                    title="parametre"
                    />
                <Button
                    title="my account"
                    />
                <Button
                    color={"red"}
                    title="Disconnect"
                    onPress={() => navigation.navigate('Login')}
                    />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    tinyLogo: {
        resizeMode: 'contain',
        width: '100%',
    },
    pageposition: {
        position: 'absolute',
        top: 350,
        left: 125,
        width: 150,
        height: 150,
        justifyContent: "space-between",
    }
})
    
export default HomeScreen;
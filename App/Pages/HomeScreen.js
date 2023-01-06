import React from "react";
import { Button, StyleSheet, Text, View, Image } from "react-native";
import { useRoute } from "@react-navigation/native";

const HomeScreen = ({navigation}) => {
    const route = useRoute();
    const Profilename = route.params?.username;
    return (
        <View>
            <Image style={styles.tinyLogo} source={require('../img/logo.png')} />
            <View style={styles.pageposition}>
                <Button
                    title="parametre"
                    />
                <Button
                    title="Profil"
                    onPress={() => navigation.navigate('Profil', {name: Profilename})}
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
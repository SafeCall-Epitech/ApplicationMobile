import React, { useState } from "react";
import { Text, View, TextInput, StyleSheet, Image } from "react-native";
import { Button } from "@react-native-material/core";

const Login = ({navigation}) => {

    const [loading, setLoading] = useState(false);

    const [UserName, setUserName] = useState();
    const [Password, setPassword] = useState();
    const Myresponse = null;

    function getlogin(UserName, Password) {
        setLoading(true);
        const Myresponse = fetch('http://20.234.168.103:8080/login/' + UserName + '/' + Password)
        .then((response)=>response.json())
        .then((responseJson) => {
            console.log(responseJson);
            setLoading(false);
            if (responseJson["success"]) {
                navigation.navigate('Home', {username: responseJson["success"]});
            } else {
                alert("Error: Incorrect password or username");
            }
        })
    };

    return (
        <View style={styles.view}>
            <Image style={styles.bg} source={require('../img/bg.jpg')} />
            <Image style={styles.tinyLogo} source={require('../img/logo.png')} />
            <TextInput placeholder="Username" placeholderTextColor="black" style={styles.input} onChangeText={(UserName) => setUserName(UserName)} value={UserName}/>
            <TextInput secureTextEntry={true} placeholder="Password" placeholderTextColor="black" style={styles.input} onChangeText={(Password) => setPassword(Password)} value={Password}/>
            <Button title="login" color="lightgray" style={{marginTop: 20,}} loading={loading} onPress={() => {getlogin(UserName, Password)}}/>
            <Text style={{padding:25}}>No account yet ?
                <Text style={styles.registertext} onPress={() => {navigation.navigate('Register')}}> Register you account</Text>
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    view: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    bg: {
        flex: 1,
        resizeMode: 'cover',
        width: '100%',
        height: '100%',
        position: 'absolute',
        top: 0,
        left: 0,
    },
    tinyLogo: {
        resizeMode: 'contain',
        width: '100%',
    },
    input: {
        width: 250,
        height: 50,
        margin: 20,
        borderBottomWidth: 1,
    },
    registertext: {
        color: 'blue',
        textDecorationLine: "underline",
        fontFamily: "sans-serif",
        fontStyle: "italic",
    }

})

export default Login;
import React, { useState } from "react";
import { Button, Text, TextInput, View, StyleSheet } from "react-native";

const Login = ({navigation}) => {

    const [UserName, setUserName] = useState();
    const [Password, setPassword] = useState();
    const Myresponse = null;

    function getlogin(UserName, Password) {
        const Myresponse = fetch('https://web-server-safecall.herokuapp.com/login/' + UserName + '/' + Password)
        .then((response)=>response.json())
        .then((responseJson) => {
            console.log(responseJson);
            if (responseJson["success"]) {
                navigation.navigate('Home');
            } else {
                alert("Error: Incorrect password or username");
            }
        })
    };

    return (
        <View>
            <TextInput placeholder="Username" onChangeText={(UserName) => setUserName(UserName)} value={UserName}/>
            <TextInput placeholder="Password" onChangeText={(Password) => setPassword(Password)} value={Password}/>
            <Button title="login" onPress={() => {getlogin(UserName, Password)}}/>
            <Text>No account yet ?
                <Text style={styles.registertext} onPress={() => {navigation.navigate('Register')}}> Register you account</Text>
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    registertext: {
        color: 'blue',
        textDecorationLine: "underline"
    }
})

export default Login;
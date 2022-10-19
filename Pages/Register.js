import axios from "axios";
import React, { useState } from "react";
import { Button, Text, TextInput, View, StyleSheet } from "react-native";

const Register = ({navigation}) => {
    const [UserName, setUserName] = useState();
    const [Password, setPassword] = useState();
    const Myresponse = null;

    function register(UserName, Password) {
        axios.post('https://web-server-safecall.herokuapp.com/register/' + UserName + '/' + Password)
        .then(res => {
            console.log(res.data);
            if (res.data["success"]) {
                navigation.navigate('Login');
            } if (res.data["failed"]) {
                alert ("Error: " + res.data["failed"]);
            }
        })
    };

    return (
        <View>
            <TextInput placeholder="Username" onChangeText={(UserName) => setUserName(UserName)} value={UserName}/>
            <TextInput placeholder="Password" onChangeText={(Password) => setPassword(Password)} value={Password}/>
            <Button title="register" onPress={() => {register(UserName, Password)}}/>
            <Text>Already have an account ?
                <Text style={styles.logintext} onPress={() => {navigation.navigate('Login')}}> log into your account</Text>
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    logintext: {
        color: 'blue',
        textDecorationLine: "underline"
    }
})

export default Register;
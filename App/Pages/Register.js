import axios from "axios";
import React, { useState } from "react";
import { Text, View, TextInput, StyleSheet, Image } from "react-native";
import { Button } from "@react-native-material/core";

const Register = ({navigation}) => {

    const [loading, setLoading] = useState(false);
    const [UserName, setUserName] = useState();
    const [Password, setPassword] = useState();
    const [Email, setEmail] = useState();
    const Myresponse = null;

    function register(UserName, Password) {
        setLoading(true);
        axios.post('http://20.234.168.103:8080/register/' + UserName + '/' + Password)
        .then(res => {
            console.log(res.data);
            setLoading(false);
            if (res.data["success"]) {
                navigation.navigate('Login');
            } if (res.data["failed"]) {
                alert ("Error: " + res.data["failed"]);
            }
        })
    };

    return (
        <View style={styles.view}>
            <Image style={styles.bg} source={require('../img/bg.jpg')} />
            <Image style={styles.tinyLogo} source={require('../img/logo.png')} />
            <TextInput placeholder="Username" placeholderTextColor="black" style={styles.input} onChangeText={(UserName) => setUserName(UserName)} value={UserName}/>
            <TextInput placeholder="Email" placeholderTextColor="black" style={styles.input} onChangeText={(Email) => setEmail(Email)} value={Email}/>
            <TextInput secureTextEntry={true} placeholder="Password" placeholderTextColor="black" style={styles.input} onChangeText={(Password) => setPassword(Password)} value={Password}/>
            <Button title="register" color="lightgray" style={{marginTop: 20,}} loading={loading} onPress={() => {register(UserName, Password)}}/>
            <Text style={{padding:25}}>Already have an account ?
                <Text style={styles.logintext} onPress={() => {navigation.navigate('Login')}}> log into your account</Text>
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
    logintext: {
        color: 'blue',
        textDecorationLine: "underline"
    }
})

export default Register;
import axios from "axios";
import React, { useState } from "react";
import { Text, View, StyleSheet, Image } from "react-native";
import { TextInput } from "@react-native-material/core";
import { Button } from "@react-native-material/core";
import Icon from 'react-native-vector-icons/AntDesign';
import IconF from 'react-native-vector-icons/Feather';
import Color from "../color";
const Register = ({navigation}) => {

    const [loading, setLoading] = useState(false);
    const [UserName, setUserName] = useState();
    const [Password, setPassword] = useState();
    const [Email, setEmail] = useState();
    const Myresponse = null;

    // function setUserEmail(UserName, Email) {
    //     console.log("setUserEmail");
    //     axios.post('http://20.234.168.103:8080/profileEmail/' + UserName + '/' + Email)
    //     .then(res => {
    //         console.log(res.data);
    //     })
    // };
        function register(UserName, Password, Email) {
        console.log("register");
        setLoading(true);
        axios.post('http://20.234.168.103:8080/register/' + UserName + '/' + Password + '/' + Email)
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
            <Image style={styles.tinyLogo} source={require('../img/SafeCallBlack.png')} />
            <TextInput
                variant="outlined"
                label="Username"
                leading={props => <Icon name="user" {...props} 
                color={Color.dark3}
                />}
                style={styles.input} onChangeText={(UserName) => setUserName(UserName)} value={UserName}
                color={Color.dark3}
            />
            <TextInput
                variant="outlined"
                label="Email"
                leading={props => <Icon name="mail" {...props} 
                    color={Color.dark3}
                />}
                style={styles.input} onChangeText={(Email) => setEmail(Email)} value={Email} 
                color={Color.dark3}
            />
            <TextInput
                variant="outlined"
                label="Password"
                secureTextEntry={true}
                leading={props => <Icon name="lock" {...props} 
                    color={Color.dark3}
                />}
                style={styles.input} onChangeText={(Password) => setPassword(Password)} value={Password} 
                color={Color.dark3}
            />
            <Button 
            leading={props => <IconF name="send" {...props} />}
            title="register" color={Color.dark2} style={{marginTop: 20, width: 130,}} loading={loading} onPress={() => {register(UserName, Password, Email)}}/>
            <Text style={{padding:25}}>Already have an account ?
                <Text style={styles.logintext} onPress={() => {navigation.navigate('Login')}}> log into your account</Text>
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    view: {
        backgroundColor: Color.light3,
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
        marginTop: -100,
        marginBottom: 100,
        resizeMode: 'contain',
        width: '80%',
        tintColor: Color.dark2,
    },
    input: {
        width: 250,
        height: 50,
        margin: 20,
        borderBottomWidth: 1,
    },
    logintext: {
        color: Color.dark2,
        textDecorationLine: "underline",
        fontWeight: "bold",
        fontFamily: "sans-serif",
        fontStyle: "italic",
    }
})

export default Register;
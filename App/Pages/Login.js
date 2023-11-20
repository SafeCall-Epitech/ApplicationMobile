import React, { useState } from "react";
import { Text, View, StyleSheet, Image } from "react-native";
import { TextInput } from "@react-native-material/core";
import { Button } from "@react-native-material/core";
import Icon from 'react-native-vector-icons/AntDesign';
import Color from "../color";
import axios from "axios";

const Login = ({navigation}) => {

    const [loading, setLoading] = useState(false);

    const [UserName, setUserName] = useState("");
    const [Password, setPassword] = useState("");

    function getlogin(UserName, Password) {
        setLoading(true);
        const form = JSON.stringify({
            Login: UserName,
            Password: Password,
        });
        axios.post('https://20.234.168.103:8080/login', form, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(res => {
            console.log(res.data);
            setLoading(false);
            if (res.data["success"]) {
                navigation.navigate('Home', {name: res.data["success"]});
            }
        }).catch(err => {
            console.log(err);
            setLoading(false);
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
                label="Password"
                autoComplete="password"
                secureTextEntry={true}
                leading={props => <Icon name="lock" {...props} 
                    color={Color.dark3}
                />}
                style={styles.input} onChangeText={(Password) => setPassword(Password)} value={Password} 
                color={Color.dark3}
            />
            {/* <TextInput secureTextEntry={true} placeholder="Password" placeholderTextColor="black" style={styles.input} onChangeText={(Password) => setPassword(Password)} value={Password}/> */}
            <Button 
            leading={props => <Icon name="login" {...props} />}
            title="login" color={Color.dark2} style={{marginTop: 20, width: 250,}} loading={loading} onPress={() => {getlogin(UserName, Password)}}/>
            <Text style={styles.reg}>No account yet ?
                {/* <Text style={styles.registertext} onPress={() => {navigation.navigate('Register')}}> Register your account</Text> */}
            </Text>
            <Button 
            leading={props => <Icon name="key" {...props} />}
            title="Register" color={Color.dark2} style={{marginTop: 20, width: 250,}} onPress={() => {navigation.navigate('Register')}}/>
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
        marginTop: -1,
        marginBottom: 100,
        resizeMode: 'contain',
        width: '80%',
        tintColor: Color.dark2,
    },
    input: {
        width: 300,
        height: 50,
        margin: 20,
        borderBottomWidth: 1,
    },
    registertext: {
        color: Color.dark2,
        textDecorationLine: "underline",
        fontWeight: "bold",
        fontFamily: "sans-serif",
        fontStyle: "italic",
    },
    reg: {
        marginTop: 50,
        color: "black",
    }
})

export default Login;
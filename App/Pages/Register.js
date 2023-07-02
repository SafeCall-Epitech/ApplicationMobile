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

    const haslowercase = (str) => {
        if (!str) {
            return false;
        }
        return (/[a-z]/.test(str));
    }
    const hasuppercase = (str) => {
        if (!str) {
            return false;
        }
        return (/[A-Z]/.test(str));
    }

    const hasnumber = (str) => {
        if (!str) {
            return false;
        }
        return (/[0-9]/.test(str));
    }
    const hasSpecial = (str) => {
        if (!str) {
            return false;
        }
        return (/[!@#$%^&*(),.?":{}|<>]/.test(str));
    }
    const haslength = (str) => {
        if (!str) {
            return false;
        }
        return (str.length >= 8);
    }

    function register(UserName, Password, Email) {
        if (!haslowercase(Password) || !hasuppercase(Password) || !hasnumber(Password) || !hasSpecial(Password) || !haslength(Password)) {
            alert("Password must contain at least 1 lowercase, 1 uppercase, 1 number, 1 special character and be at least 8 characters long");
            return;
        }
        setLoading(true);
        axios.post('http://20.234.168.103:8080/register/' + UserName + '/' + Password + '/' + Email)
        .then(res => {
            console.log(res.data);
            setLoading(false);
            if (res.data["success"]) {
                navigation.navigate('Login');
            }
        }).catch(err => {
            console.log(err);
            setLoading(false);
            alert("Username or Email already taken");
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
            <View style={{alignItems: "flex-start", justifyContent: "center", marginLeft: 45}}>
                <View style={{flexDirection: "row", alignItems: "center", justifyContent: "center"}}>
                    {haslowercase(Password) ? <Icon name="checkcircle" size={15} color="green" style={{}}/> : <Icon name="closecircle" size={15} color="red" style={{}}/>}
                    <Text style={styles.regu}>At least one lowercase letter</Text>
                </View>
                <View style={{flexDirection: "row", alignItems: "center", justifyContent: "center"}}>
                    {hasuppercase(Password) ? <Icon name="checkcircle" size={15} color="green" style={{}}/> : <Icon name="closecircle" size={15} color="red" style={{}}/>}
                    <Text style={styles.regu}>At least one uppercase letter</Text>
                </View>
                <View style={{flexDirection: "row", alignItems: "center", justifyContent: "center"}}>
                    {hasnumber(Password) ? <Icon name="checkcircle" size={15} color="green" style={{}}/> : <Icon name="closecircle" size={15} color="red" style={{}}/>}
                    <Text style={styles.regu}>At least one digit</Text>
                </View>
                <View style={{flexDirection: "row", alignItems: "center", justifyContent: "center"}}>
                    {hasSpecial(Password) ? <Icon name="checkcircle" size={15} color="green" style={{}}/> : <Icon name="closecircle" size={15} color="red" style={{}}/>}
                    <Text style={styles.regu}>At least one special character : (!@#$%^&*)</Text>
                </View>
                <View style={{flexDirection: "row", alignItems: "center", justifyContent: "center"}}>
                    {haslength(Password) ? <Icon name="checkcircle" size={15} color="green" style={{}}/> : <Icon name="closecircle" size={15} color="red" style={{}}/>}
                    <Text style={styles.regu}>At least 8 characters in total</Text>
                </View>
            </View>
            <Button 
            leading={props => <IconF name="send" {...props} />}
            title="register" color={Color.dark2} style={{marginTop: 20, width: 130,}} loading={loading} onPress={() => {register(UserName, Password, Email)}}/>
            <Text style={styles.reg}>Already have an account ?
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
        marginTop: -10,
        // marginBottom: 50,
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
    },
    textverif: {
    
    },
    regu: {
        marginLeft: 10,
        color: "black",
    },
    reg: {
        padding: 30,
        color: "black",
    }
})

export default Register;
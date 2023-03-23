import React from "react";
import { ActivityIndicator, Avatar, Surface } from "@react-native-material/core";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import { useRoute } from "@react-navigation/native";
import Icon from 'react-native-vector-icons/Ionicons';
import IconM from 'react-native-vector-icons/MaterialIcons';
import IconS from 'react-native-vector-icons/EvilIcons';
import axios from "axios";
import Color from "../color";

const FriendCardPending = props => {

    let UserName = props.AccountName;
    let FriendName = props.name;

    const AcceptFriend = async () => {
        axios.post(`http://20.234.168.103:8080/replyFriend/${UserName}/${FriendName}/accept`)
        .then(res => {
            console.log(res.data)
        })
    }
    
    const DenyFriend = async () => {
        axios.post(`http://20.234.168.103:8080/replyFriend/${UserName}/${FriendName}/deny`)
        .then(res => {
            console.log(res.data)
        })
    }


    return (
        <Surface
            elevation={6}
            category="medium"
            style={{ height: 80, marginLeft: 20, marginRight: 20, marginTop: 20, marginBottom: 20}}
            >
            <View style={styles.row}>
                <Avatar
                    size={60}
                    style={{ marginLeft: 10, marginTop: 10, marginBottom: 10}}
                    label={props.name[0]}
                    color={Color.light3}
                />
                <Text style={styles.maintext}>{props.name}</Text>
                <View style={{flex: 1, flexDirection: 'row', justifyContent: 'flex-end'}}>
                    <IconM style={{marginTop: 5, marginLeft: 5, marginRight: 15}} name="check" size={30} color="green" onPress={AcceptFriend}/>
                    <IconM style={{ marginTop: 5, marginLeft: 5, marginRight: 15}} name="close" size={30} color="red" onPress={DenyFriend}/>
                </View>
            </View>
        </Surface>
    );
};

const styles = StyleSheet.create({

    maintext: {
        marginLeft: 10,
        color: Color.dark3,
        fontWeight: 'bold',
        fontSize: 17,

    },
    valtext: {
        fontStyle: 'italic',
        color: Color.dark2,
    },
    mainpage: {
        backgroundColor: Color.light3,
        flex: 1,
    },
    row: {
        flexDirection: 'row',
        // justifyContent: 'center',
        alignItems: 'center',
    },
})
    
export default FriendCardPending;
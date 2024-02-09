import React from "react";
import { ActivityIndicator, Avatar, Surface } from "@react-native-material/core";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';
import IconM from 'react-native-vector-icons/MaterialIcons';
import IconS from 'react-native-vector-icons/EvilIcons';
import axios from "axios";
import Color from "../color";

const FriendCardPending = props => {

    let UserName = props.AccountName;
    let FriendName = props.name;
    let Reason = props.Reason;

    console.log("FriendCardPending: " + UserName + " " + FriendName + " " + Reason)

    const [isVisible, setIsVisible] = React.useState(true);

    // fixed
    const AcceptFriend = async () => {
        console.log("ACCEPTEUUUUU")
        if (FriendName[0] == "?") {
            FriendName = FriendName.substring(1)
        }
        const form = JSON.stringify({
            UserID: UserName,
            Friend: FriendName,
            Subject: Reason,
            Action: "accept",
        });
        console.log("http://x2024safecall3173801594000.westeurope.cloudapp.azure.com:80/replyFriend" + form)
        axios.post(`http://x2024safecall3173801594000.westeurope.cloudapp.azure.com:80/replyFriend`, form, {
            headers: {
            'Content-Type': 'application/json'
            }
        })
        .then(res => {
            console.log(res.data)
            setIsVisible(false)
            alert("You have accepted the request for " + FriendName + "!")
            // navigation.navigate('Home', {name: UserName})
        })
    }

    
    const DenyFriend = async () => {
        if (FriendName[0] == "?") {
            FriendName = FriendName.substring(1)
        }
        const form = JSON.stringify({
            UserID: UserName,
            Friend: FriendName,
            Subject: Reason,
            Action: "reject",
        });
        console.log("http://x2024safecall3173801594000.westeurope.cloudapp.azure.com:80/replyFriend" + form)
        axios.post(`http://x2024safecall3173801594000.westeurope.cloudapp.azure.com:80/replyFriend`, form, {
            headers: {
            'Content-Type': 'application/json'
            }
        })
        .then(res => {
            console.log(res.data)
            setIsVisible(false)
            alert("You refused the request to " + FriendName + "!")
            // navigation.navigate('Home', {name: UserName})
        })
    }


    return (
        <View>
        {isVisible ?
        <Surface
            elevation={6}
            category="medium"
            style={{ height: 80, marginLeft: 20, marginRight: 20, marginTop: 20, marginBottom: 20}}
            >
            <View style={styles.row}>
                <Avatar
                    size={60}
                    style={{ marginLeft: 10, marginTop: 10, marginBottom: 10}}
                    label={FriendName.substring(1)}
                    color={Color.light3}
                    />
                <View style={{flex: 1, flexDirection: 'column', justifyContent: 'flex-end'}}>
                    <Text style={styles.maintext}>{FriendName.substring(1)}</Text>
                    <Text style={[styles.valtext, {marginLeft:10}]}>{Reason}</Text>
                </View>
                <View style={{flex: 1, flexDirection: 'row', justifyContent: 'flex-end'}}>
                    <IconM style={{marginTop: 5, marginLeft: 5, marginRight: 15}} name="check" size={30} color="green" onPress={AcceptFriend}/>
                    <IconM style={{ marginTop: 5, marginLeft: 5, marginRight: 15}} name="close" size={30} color="red" onPress={DenyFriend}/>
                </View>
            </View>
            </Surface>
            :
            null
            } 
        </View>
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
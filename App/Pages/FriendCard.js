import React from "react";
import { ActivityIndicator, Avatar, Surface } from "@react-native-material/core";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import { useRoute } from "@react-navigation/native";
import Icon from 'react-native-vector-icons/Ionicons';
import IconM from 'react-native-vector-icons/MaterialIcons';
import IconS from 'react-native-vector-icons/EvilIcons';
import axios from "axios";
import Color from "../color";

const FriendCard = props => {
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
    
export default FriendCard;
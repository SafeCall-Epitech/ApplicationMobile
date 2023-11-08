import { React, useState } from "react";
import { ActivityIndicator, Avatar, Surface } from "@react-native-material/core";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import { Menu, MenuItem, MenuDivider } from 'react-native-material-menu';
import { useRoute } from "@react-navigation/native";
import Icon from 'react-native-vector-icons/Ionicons';
import IconM from 'react-native-vector-icons/MaterialIcons';
import IconS from 'react-native-vector-icons/EvilIcons';
import axios from "axios";
import Color from "../color";


const DeleteFriend = async (userName, friendName) => {
    if (friendName == null) {
        setVisible(false);
    }
    try {
      const form = JSON.stringify({
        UserID: user,
        Friend: Name,
        Action: "rm",
      });
      await axios.post(`http://x2024safecall3173801594000.westeurope.cloudapp.azure.com:8080/manageFriend`, form, {
        headers: {
          'Content-Type': 'application/json',
        }
      });

    } catch (err) {
      console.error(err);
    }
    console.log(Name);
    setVisible(false);
};

const FriendCard = ({props}) => {
    const [visible, setVisible] = useState(false);

    const showMenu = () => setVisible(true);

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
                <Menu
                    visible={visible}
                    anchor={<Text onPress={showMenu}>Show menu</Text>}
                    onRequestClose={hideMenu}
                >
                    {/* <MenuItem onPress={navigation.navigate('ReportForm', {name: props.name})}>Menu item 1</MenuItem> */}
                    <MenuItem onPress={() => DeleteFriend(UserName, "")}>Report</MenuItem>
                </Menu>
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
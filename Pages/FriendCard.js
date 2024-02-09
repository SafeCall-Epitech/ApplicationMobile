import React from "react";
import { Alert } from "react-native";
import { ActivityIndicator, Avatar, Surface } from "@react-native-material/core";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import { useRoute } from "@react-navigation/native";
import axios from "axios";
import Icon from 'react-native-vector-icons/AntDesign';
import Icon2 from 'react-native-vector-icons/Entypo';
import Color from "../color";
import { Menu, MenuItem, MenuDivider } from 'react-native-material-menu';
import { useState } from "react";

const DelFriend = async (userName, friendName) => {
    axios.get(`http://x2024safecall3173801594000.westeurope.cloudapp.azure.com:80/listFriends/${userName}`)
    .then(async res => {
        if (res.data["fetched"] == null) {
            return;
        } else if (res.data["fetched"].length == 0) {
            return;
        }
        for (var x = 0; x < res.data["fetched"].length; x++) {
            console.log(res.data["fetched"][x])
            if (res.data["fetched"][x]["Id"] == friendName ) {
              try {
                const form = JSON.stringify({
                  UserID: userName,
                  Friend: friendName,
                  Subject: res.data[" "][x]["Subject"],
                  Action: "delete",
                });
                await axios.post(`http://x2024safecall3173801594000.westeurope.cloudapp.azure.com:80/manageFriend`, form, {
                    headers: {
                        'Content-Type': 'application/json',
                      }
                    });
                  } catch (err) {
                    console.error(err);
                  }
                }
          }
    })
}


  

const FriendCard = (props) => {
  const route = useRoute();
  const UserName = route.params?.name;
  const [visible, setVisible] = useState(false);
  const [alertWithInput, setAlertWithInput] = useState(false);
  const [textInputValue, setTextInputValue] = useState('');

  const showMenu = () => setVisible(true);
  const hideMenu = () => setVisible(false);

  const SendMessage = async (friendName) => {
    const response = await axios.get('http://x2024safecall3173801594000.westeurope.cloudapp.azure.com:80/messages/' + UserName.toLowerCase() + "/" + friendName.toLowerCase());
    console.log(`Button clicked for ${props.name}`);
    // alert(`Create discussion with ${props.name}`);
    Alert.alert('New discussion', `Create discussion with ${props.name}`);
  }

  const reportcall = async (friendName) => {
    const form = JSON.stringify({
      username: UserName,
      date: new Date(),
      reported: friendName,
      message: "default report",
    });
    const response = await axios.post(`http://x2024safecall3173801594000.westeurope.cloudapp.azure.com:80/report`, form, {
      headers: {
        'Content-Type': 'application/json'
        }
    })
    .then(res => {
      console.log(res.data);
      alert("Report send");
  })
    console.log(`Button clicked for ${friendName}`);
  }

const showDeleteOrReportConfirmation = (friendName) => {
    Alert.alert(
      'Options',
      `What would you like to do with ${friendName}?`,
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          onPress: () => {
            DelFriend(UserName, friendName);
          },
        },
        {
          text: 'Report',
          onPress: () => {
            console.log(`Reporting friend: ${friendName}`);
            reportcall()
          },
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <Surface
      elevation={6}
      category="medium"
      style={{ height: 80, marginLeft: 20, marginRight: 20, marginTop: 20, marginBottom: 20 }}
    >
      <View style={styles.row}>
        <Avatar
          size={60}
          style={{ marginLeft: 10, marginTop: 10, marginBottom: 10 }}
          label={props.name[0]}
          color={Color.light3}
        />
        <Text style={styles.maintext}>{props.name}</Text>
        <Icon style={styles.alignrightbefore} name="message1" size={30} color="black" onPress={() => SendMessage(props.name)} />
        <Icon2 style={styles.alignright} name="dots-three-vertical" size={20} color="black" onPress={() => showDeleteOrReportConfirmation(props.name)} />
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
  alignright: {
    position: 'absolute',
    right: 0,
    marginRight: 20,
  },
  alignrightbefore: {
    position: 'absolute',
    right: 0,
    marginRight: 50,
  },
})

export default FriendCard;

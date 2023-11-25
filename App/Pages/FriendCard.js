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

const DeleteFriend = async (userName, friendName) => {
  try {
    const form = JSON.stringify({
      UserID: userName,
      Friend: friendName,
      Subject: "Demande d'ami",
      Action: "delete",
    });
    console.log( "DeleteFriend: " + "http://x2024safecall3173801594000.westeurope.cloudapp.azure.com:7070/manageFriend" + form)
    await axios.post(`http://x2024safecall3173801594000.westeurope.cloudapp.azure.com:7070/manageFriend`, form, {
      headers: {
        'Content-Type': 'application/json',
      }
    });

  } catch (err) {
    console.error(err);
  }
  console.log("Delete : " + friendName);
};
  

const FriendCard = props => {
  const route = useRoute();
  const UserName = route.params?.name;
  const [visible, setVisible] = useState(false);

  const showMenu = () => setVisible(true);
  const hideMenu = () => setVisible(false);

  
const showDeleteOrReportConfirmation = (friendName) => {
    Alert.alert(
      'Options',
      `What would you like to do with ${friendName}?`,
      [
        {
          text: 'Cancel',
          // onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'Delete',
          onPress: () => {
            // Call the DeleteFriend function
            DeleteFriend(UserName, friendName);
            console.log(`Deleting friend: ${friendName}`);
          },
        },
        {
          text: 'Report',
          onPress: () => {
            // Add code to report the card here
            // console.log(`Reporting friend: ${friendName}`);
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
})

export default FriendCard;

import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { ActivityIndicator, Avatar, Button, TextInput } from '@react-native-material/core';
import Icon from 'react-native-vector-icons/AntDesign';
import Color from '../color';
import axios from 'axios';

function HandleFriend(UserName, ToAddUser, Fsubject, action) {
  console.log(UserName, ToAddUser, Fsubject, action)
  if (ToAddUser == '') {
    return;
  }
  const form = JSON.stringify({
      UserID: UserName,
      Friend: ToAddUser,
      Subject: Fsubject,
      Action: action,
  });
  axios.post(`http://x2024safecall3173801594000.westeurope.cloudapp.azure.com:80/manageFriend`, form, {
      headers: {
      'Content-Type': 'application/json'
      }
  })
  .then(res => {
      console.log(res.data);
      alert("Friend Added");
  })
}

const ProfileCard = ({ ProfileUser, name, occupation, profileImage, id }) => {

  const [isReasonVisible, setIsReasonVisible] = React.useState(false);
  const [Fsubject, setFsubject] = React.useState('');
  const [isLoaded, setIsLoaded] = React.useState(false);
  const [FriendPendingArray, setFriendPendingArray] = React.useState([]);
  const [FriendArray, setFriendArray] = React.useState([]);
  const [IsAlreadyFriend, setIsAlreadyFriend] = React.useState(false);

  const OnPressModal = () => {
    setIsReasonVisible(false);
    HandleFriend(ProfileUser, id, Fsubject, "add");
    setFsubject('');
  }

  const getFriends = async () => {
    //remove trailing space
    if (ProfileUser[ProfileUser.length - 1] == ' ') {
      ProfileUser = ProfileUser.slice(0, -1);
    }
    if (id[id.length - 1] == ' ') {
      id = id.slice(0, -1);
    }

    axios.get(`http://x2024safecall3173801594000.westeurope.cloudapp.azure.com:80/listFriends/${ProfileUser}`)
    .then(res => {
        if (res.data["fetched"] == null) {
            return;
        } else if (res.data["fetched"].length == 0) {
            return;
        }
        for (var x = 0; x < res.data["fetched"].length; x++) {
          if (res.data["fetched"][x]["Active"] == false) {
            if (res.data["fetched"][x]["Id"] == id) {
              setIsAlreadyFriend(true);
            }
          }
          if (res.data["fetched"][x]["Active"] == true) {
            if (res.data["fetched"][x]["Id"] == id) {
              setIsAlreadyFriend(true);
            }
          }
        }
    })
    .catch(err => {
        console.log(err);
    })
    setIsLoaded(true);
  }

  React.useEffect(() => {
    getFriends();
  }, []);

  return (
    <View>
    { isLoaded ?
    <View>
    { isReasonVisible ?
      <View style={{backgroundColor: 'rgba(0,0,0,0.5)', position: 'absolute', top: -100, bottom: -585, left: 0, right: 0, justifyContent: 'center', zIndex:10}}>
        <View style={{position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center'}}>
          <View style={{backgroundColor: 'white', margin: 20, padding: 20, borderRadius: 10}}>
            {/* <Text style={{fontSize: 20, fontWeight: 'bold', color: 'black'}}>Subject</Text> */}
            {/* <Text style={{fontSize: 15, color: 'black'}}>(He will see the subject)</Text> */}
            {/* <TextInput placeholder='Reason' style={{marginTop: 10, backgroundColor: 'white', color: 'black'}}/> */}
            <TextInput
                variant="outlined"
                label="Subject"
                leading={props => <Icon name="inbox" {...props} 
                color={Color.dark3}
                />}
                style={styles.input} 
                // onChangeText={(UserName) => setUserName(UserName)} value={UserName}
                onChangeText={(Fsubject) => setFsubject(Fsubject)} value={Fsubject}
                color={Color.dark3}
            />
                <Text style={{fontSize: 13, color: 'black', fontStyle: 'italic'}}>Add a contact with a brief message explaining why, for them to decide whether to accept or decline.</Text>

            <Button style={{marginTop: 10}} color={Color.dark2}
            leading={props => <Icon name="adduser" {...props} />}
            title="Add to contacts"
            onPress={() => OnPressModal()}
            
            />
            <Button style={{marginTop: 10}} color={Color.dark2}
            leading={props => <Icon name="close" {...props} />}
            title="Cancel"
            onPress={() => setIsReasonVisible(false)}
            />
          </View>
        </View>
      </View>
      
    : null}
    <View style={styles.cardContainer}>
        <Image source={{ uri: profileImage }} style={styles.profileImage} />
      <View style={styles.textContainer}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.occupation}>@{id}</Text>
        <Text style={styles.occupation}>{occupation}</Text>
        { IsAlreadyFriend ?
        <Button style={{marginTop: 10}} color={Color.dark2}
        leading={props => <Icon name="user" {...props} />}
        title="Already in contacts"
        disabled
        onPress={() => setIsReasonVisible(true)}
        />
        : 
        <Button style={{marginTop: 10}} color={Color.dark2}
        leading={props => <Icon name="adduser" {...props} />}
        title="Add to contacts"
        onPress={() => setIsReasonVisible(true)}
        />}
      </View>
    </View>
    </View>
    : <ActivityIndicator size="large" color={Color.dark2} /> }
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    margin: 10,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 15,
  },
  textContainer: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
  },
  occupation: {
    fontSize: 16,
    color: 'gray',
  },
});

export default ProfileCard;

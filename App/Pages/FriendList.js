import React from "react";
import { ActivityIndicator, Avatar, Surface, } from "@react-native-material/core";
import { StyleSheet, Text, View, ScrollView, TextInput, Alert } from "react-native";
import { useRoute } from "@react-navigation/native";
import Icon from 'react-native-vector-icons/Ionicons';
import IconM from 'react-native-vector-icons/MaterialIcons';
import IconS from 'react-native-vector-icons/EvilIcons';
import IconF from 'react-native-vector-icons/FontAwesome';
import axios from "axios";
import Color from "../color";

import FriendCard from "./FriendCard";
import FriendCardPending from "./FriendCardPending";

const FriendList = ({navigation}) => {

    const route = useRoute();
    const UserName = route.params?.name;
    let FriendsCards = [];
    let PendingFriendsCards = [];
    const [ToAddUser, setToAddUser] = React.useState('');
    const [isLoaded, setIsLoaded] = React.useState(false);
    const [asPending, setasPending] = React.useState(false);

    const [FriendNumber, setFriendNumber] = React.useState(0);
    const [FriendsArray, setFriendsArray] = React.useState([]);
    const [PendingFriendNumber, setPendingFriendNumber] = React.useState(0);
    const [PendingFriendsArray, setPendingFriendsArray] = React.useState([]);

    const getFriends = async () => {
        axios.get(`http://20.234.168.103:8080/listFriends/${UserName}`)
        .then(res => {
            console.log(`http://20.234.168.103:8080/listFriends/${UserName}`)
            console.log(res.data);
            for (var x = 0; x < res.data["fetched"].length; x++) {
                if (res.data["fetched"][x][0] == "?") {
                    //print pending friend
                    console.log("pending friend")
                    console.log(res.data["fetched"][x])
                    //remove ? from name
                    res.data["fetched"][x] = res.data["fetched"][x].substring(1)
                    setPendingFriendsArray(PendingFriendsArray => [...PendingFriendsArray, res.data["fetched"][x]])
                    setPendingFriendNumber(PendingFriendNumber + 1)
                    setasPending(true)
                } else {
                    setFriendsArray(FriendsArray => [...FriendsArray, res.data["fetched"][x]])
                    setFriendNumber(FriendNumber + 1)
                }
            }
        })
        setIsLoaded(true);
    }

    const PendingFriendsListDisplayer = () => {
        for (var x = 0; x <= PendingFriendNumber; x++) {
            if (PendingFriendsArray[x] != undefined) {
                PendingFriendsCards.push(<FriendCardPending key={x} AccountName={UserName} name={PendingFriendsArray[x]}/>)
            }
        }
        return (
            <View>
                {PendingFriendsCards}
            </View>
        )
    }

    const FriendsListDisplayer = () => {

        for (var x = 0; x <= FriendNumber; x++) {
            if (FriendsArray[x] != undefined) {
                FriendsCards.push(<FriendCard key={x} name={FriendsArray[x]}/>)
            }
        }
        return (
            <View>
                {FriendsCards}
            </View>
        )
    }
    
    function HandleFriend(action) {
        if (ToAddUser == '') {
            return;
        }
        axios.post(`http://20.234.168.103:8080/manageFriend/${UserName}/${ToAddUser}/${action}`)
            .then(res => {
                console.log(res.data);
                setToAddUser('')
                alert("Friend Added");
            }
        )

    }

    React.useEffect(() => {
        getFriends();
    }, []);

    
    return (
        <View style={styles.mainpage}>
            <View style={styles.row}>
            <Icon arrow-back style={{alignSelf: 'flex-start', marginTop: 5, marginLeft: 5}} name="arrow-back" size={40} color={Color.light3} onPress={() => navigation.navigate('Home')}/>
            <TextInput style={{alignSelf: 'center', marginTop: 5, marginLeft: 5, marginRight: 5, width: '65%', height: 40, backgroundColor: Color.light3, borderRadius: 10, paddingLeft: 10, paddingRight: 10, color: Color.dark2}} placeholder="Search" placeholderTextColor={Color.dark2} onChangeText={text => setToAddUser(text)} value={ToAddUser}/>
            <IconF friendadd style={{alignSelf: 'flex-start', marginTop: 5, marginLeft: 5}} name="user-plus" size={40} color={Color.light3} onPress={() => HandleFriend("add")}/>
            </View>
            <View style={styles.egg}/>
            {isLoaded ? 
                <ScrollView style={styles.scrollView}>
                    {asPending ? 
                        <View>
                        {/* <Text style={styles.maintext}>Pending ({PendingFriendNumber})</Text> */}
                        {PendingFriendsListDisplayer()}
                        </View>
                        : 
                        null
                    }
                    <Text style={styles.maintext}>Friends</Text>
                    {/* <Text style={styles.maintext}>Friends ({FriendNumber})</Text> */}
                    {FriendsListDisplayer()}
                    </ScrollView>
                    :
                <ActivityIndicator size="large" color={Color.dark2} />
            }
        </View>
    );
};

const styles = StyleSheet.create({
    egg: {
        alignSelf: 'center',
        position: 'absolute',
        marginTop: -50,
        width: 450,
        height: 230,
        backgroundColor: Color.dark2,
        borderTopLeftRadius: 108,
        borderTopRightRadius: 108,
        borderBottomLeftRadius: 95,
        zIndex: -1,
        borderBottomRightRadius: 95,
      },
    maintext: {
        marginLeft: 50,
        marginTop: 20,
        marginBottom: 20,
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
    verified: {
        position: 'absolute',
        marginTop: -70,
        marginLeft: 210,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    scrollView: {
        // backgroundColor: 'pink',
        marginHorizontal: 0,
        marginTop: 135,
      },
})
    
export default FriendList;
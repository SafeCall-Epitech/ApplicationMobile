import React from "react";
import { ActivityIndicator, Avatar, Surface, } from "@react-native-material/core";
import { StyleSheet, Text, View, ScrollView, TextInput, Alert } from "react-native";
import { useRoute } from "@react-navigation/native";
import Icon from 'react-native-vector-icons/AntDesign';
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

    const [FriendsArray, setFriendsArray] = React.useState([]);
    const [PendingFriendsArray, setPendingFriendsArray] = React.useState([]);
    const [Fsubject, setFsubject] = React.useState("Demande d'ami");

    const getFriends = async () => {
        axios.get(`http://x2024safecall3173801594000.westeurope.cloudapp.azure.com:80/listFriends/${UserName}`)
        .then(res => {
            if (res.data["fetched"] == null) {
                return;
            } else if (res.data["fetched"].length == 0) {
                return;
            }
            console.log(res.data["fetched"])
            for (var x = 0; x < res.data["fetched"].length; x++) {
                if (res.data["fetched"][x]["Active"] == true) {
                    setFriendsArray(FriendsArray => [...FriendsArray, res.data["fetched"][x]["Id"]])
                }
                if (res.data["fetched"][x]["Active"] == false && res.data["fetched"][x]["Id"][0] == "?") {
                    setPendingFriendsArray(PendingFriendsArray => [...PendingFriendsArray, res.data["fetched"][x]["Id"]])
                    // setPendingFriendNumber(PendingFriendNumber + 1)
                    setFsubject(res.data["fetched"][x]["Subject"])
                    setasPending(true)
                }
            }
        })
        setIsLoaded(true);
    }

    const PendingFriendsListDisplayer = () => {
        for (var x = 0; x <= PendingFriendsArray.length; x++) {
            if (PendingFriendsArray[x] != undefined) {
                PendingFriendsCards.push(<FriendCardPending key={x} AccountName={UserName} name={PendingFriendsArray[x]} Reason={Fsubject}/>)
            }
        }
        return (
            <View>
                {PendingFriendsCards}
            </View>
        )
    }

    const FriendsListDisplayer = () => {
        console.log(FriendsArray.length)
        for (var x = 0; x <= FriendsArray.length ; x++) {
            if (FriendsArray[x] != undefined) {
                FriendsCards.push(<FriendCard key={x} name={FriendsArray[x]}/>)
            }
        }
        return (
            <View>
                <Text style={styles.maintext}>Contact</Text>
                {FriendsCards}
            </View>
        )
    }

    React.useEffect(() => {
        getFriends();
    }, []);


    return (
        <View style={styles.mainpage}>
            <View style={styles.row}>
            <Icon arrow-back style={{alignSelf: 'flex-start', marginTop: 15, marginLeft: 15}} name="home" size={40} color={Color.light3} onPress={() => navigation.navigate('Home')}/>
            </View>
            <Text style={{alignSelf: 'center', marginTop: 5, top: -40,fontSize: 25, color: Color.light3}}>Contact</Text>
            <View style={styles.egg}/>
            {isLoaded ?
                <ScrollView style={styles.scrollView}>
                    {asPending ?
                        <View>
                            <Text style={styles.maintext}>Pending</Text>
                        {PendingFriendsListDisplayer()}
                        </View>
                        :
                        null
                    }
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
        height: 130,
        backgroundColor: Color.dark3,
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
      },
})

export default FriendList;
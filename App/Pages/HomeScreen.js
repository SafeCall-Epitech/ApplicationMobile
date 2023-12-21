import React from "react";
import { SafeAreaView, Button, StyleSheet, Text, View, Image, Pressable, TouchableHighlight} from "react-native";
import { useRoute } from "@react-navigation/native";
import { Alert } from "react-native";
import { Avatar, Badge, IconButton, TextInput, Snackbar} from "@react-native-material/core";
import Icon from 'react-native-vector-icons/AntDesign';
import Color from "../color";
import axios from "axios";
import AnimatedText from "./AnimatedText";


const HomeScreen = ({navigation}) => {
    const route = useRoute();
    const Profilename = route.params?.name;



    var MessageNotification = 0;
    const hasMessageNotification = () => {
        if (MessageNotification > 0) {
            return true;
        }
        return false;
    }

    const [User, setUser] = React.useState("")
    if (User == "") {
        setUser(Profilename)
    }
    // Search User
    const [SearchUser, setSearchUser] = React.useState('');
    const [visible, setVisible] = React.useState(false);
    const SearchProfile = async () => {
        if  (SearchUser == "") {
            setVisible(true)
            setSearchUser('')
        } else {
        axios.get(`http://x2024safecall3173801594000.westeurope.cloudapp.azure.com:80/profile/${SearchUser}`)
            .then(res => {
                if (res.data["profile"]["Email"] == "") {
                    setVisible(true)
                    setSearchUser('')
                } else {
                    setVisible(false)
                    navigation.navigate('SearchProfil', {name: SearchUser, ProfileUser: User}), setSearchUser('')
                }
            })
        }
    }

    // Friend Notification
    // const [visible2, setVisible2] = React.useState(false);
    // var fnum = 0;
    // const [PendingFriendNumber, setPendingFriendNumber] = React.useState(0);
    // const getFriends = async () => {
    //     axios.get(`http://20.234.168.103:8080/listFriends/${User}`)
    //     .then(res => {
    //         console.log(`http://20.234.168.103:8080/listFriends/${User}`)
    //         console.log(res.data);
    //         if (res.data["fetched"] == "") {
    //             setPendingFriendNumber(0);
    //             return;
    //         }
    //         if (res.data["fetched"][0][0] != "?") {
    //             setPendingFriendNumber(0);
    //         }
    //         for (var x = 0; x < res.data["fetched"].length; x++) {
    //             if (res.data["fetched"][x][0] != "?") {
    //                 fnum--;
    //             }
    //             if (res.data["fetched"][x][0] == "?") {
    //                 fnum++;
    //                 setPendingFriendNumber(fnum);
    //                 // setPendingFriendNumber(res.data["fetched"].length);
    //                 console.log("MENU :" + res.data["fetched"].length);
    //             }
    //         }
    //     })
    //     setVisible2(true);
    // }
    // const hasFriendNotification = () => {
    //     if (PendingFriendNumber > 0) {
    //         return true;
    //     }
    //     return false;
    // }

    React.useEffect(() => {
        const focusHandler = navigation.addListener('focus', () => {
            // getFriends();
        });
        return focusHandler;
    }, [navigation]);

    return (
        <SafeAreaView style={styles.mainpage}>

            <View style={styles.row}>
            <Icon logout style={{alignSelf: 'flex-start', marginTop: 15, marginLeft: 15}} name="arrowleft" size={40} color={Color.light3} onPress={() => navigation.navigate('Login')}/>
            <Icon logout style={{alignSelf: 'flex-start', marginTop: 15, marginRight: 15}} name="user" size={40} color={Color.light3}  onPress={() => navigation.navigate('Profil', {name: User})}/>

            </View >
                <TouchableHighlight onPress={() => navigation.navigate('FeedbackForm')}>
                <Image  style={styles.tinyLogoPicto} source={require('../img/SafeCallBlackPicto.png')} />
                </TouchableHighlight>
            <View style={styles.egg}/>
            {/* <TextInput
            backgroundColor="transparent"
            placeholder="Search"
            variant="outlined"
            color={Color.dark3}
            // onPressIn={() => {SearchProfile()}}
            trailing={props => (
                <IconButton icon={props => <Icon name="search" size={20} color={Color.light} />}
                onPress={() => {SearchProfile()}}
                />
            )}
            style={styles.input}
            onChangeText={(SearchUser) => setSearchUser(SearchUser)}
            value={SearchUser}
            /> */}

            <AnimatedText userName={User}/>

            <View style={styles.sidebyside}>
                <TextInput
                    variant="outlined"
                    label="Add contact"
                    leading={props => <Icon name="adduser" {...props}
                        color={Color.dark3}
                    />}
                    style={styles.input}
                    onChangeText={(SearchUser) => setSearchUser(SearchUser)}
                    value={SearchUser}
                    color={Color.dark3}
                />
                <Pressable style={styles.button}
                    onPress={() => {SearchProfile()}}
                >
                    <Text style={styles.text}> <Icon name="search1" size={25}/> </Text>
                </Pressable>
            </View>

            <View style={styles.undersearchbar}>
                <View style={styles.btnrow}>
                    <View style={{alignItems: 'center'}}>
                        <Icon name="contacts" size={50} color={Color.dark3} onPress={() => navigation.navigate('FriendList', {name: User})}/>
                        {/* {hasFriendNotification ? <Badge style={{position: 'absolute', left: 50, top: -5}} label={PendingFriendNumber} color="red" tintColor={Color.light3}/> : null} */}
                        <Text style={{fontSize: 20, color: Color.dark3, alignSelf: 'center'}}>Contact</Text>
                    </View>
                    <View style={{alignItems: 'center'}}>
                        <Icon name="calendar" size={50} color={Color.dark3} onPress={() => navigation.navigate('Agenda', {name: User})}/>
                        <Text style={{fontSize: 20, color: Color.dark3, alignSelf: 'center'}}>Agenda</Text>
                    </View>
                    {/* <View style={{alignItems: 'center'}}>
                        <Icon name="add-call" size={50} color={Color.dark} onPress={() => navigation.navigate('CallForm', {name: User})}/>
                        <Text style={{fontSize: 20, color: Color.dark, alignSelf: 'center'}}>Add Event</Text>
                    </View> */}
                {/* </View> */}
                {/* <View style={styles.btnrow}> */}
                <View style={{alignItems: 'center'}}>
                        <Icon name="message1" size={50} color={Color.dark3} onPress={() => navigation.navigate('MessageMainPage')}/>
                        {hasMessageNotification ? <Badge style={{position: 'absolute', left: 50, top: -5}} label={MessageNotification} color="red" tintColor={Color.light3}/> : null}
                        <Text style={{fontSize: 20, color: Color.dark3, alignSelf: 'center'}}>Message</Text>
                    </View>
                    {/* <View style={{alignItems: 'center'}}>
                        <Icon name="phone" size={50} color={Color.dark}/>
                        <Text style={{fontSize: 20, color: Color.dark, alignSelf: 'center'}}>Call</Text>
                    </View> */}
                    {/* <View style={{alignItems: 'center'}}>
                        <Icon name="report" size={50} color={Color.dark} onPress={() => navigation.navigate('FeedbackForm', {name: User})}/>
                        <Text style={{fontSize: 15, color: Color.dark, alignSelf: 'space-around'}}>Send Feedback</Text>
                    </View> */}
                </View>
            </View>
            { visible ?
                <Snackbar
                    message="Can't find this user."
                    action={<Button variant="text" title="Close" color={Color.dark2} compact onPress={() => {setVisible(false)}} />}
                    style={{ position: "absolute", start: 16, end: 16, bottom: 16 , backgroundColor: Color.dark3}}
                />
                :
                null
            }
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    tinyLogo: {
        alignSelf: 'center',
        resizeMode: 'contain',
        width: '75%',
        position: 'absolute',
        top: -25,
        tintColor: Color.light3,
    },
    tinyLogoPicto: {
        alignSelf: 'center',
        resizeMode: 'contain',
        width: '11%',
        position: 'absolute',
        top: -145,
        tintColor: Color.light3,
    },
    pageposition: {
        position: 'absolute',
        top: 350,
        left: 125,
        width: 150,
        height: 150,
        justifyContent: "space-between",
    },
    mainpage: {
        backgroundColor: Color.light3,
        flex: 1,
    },
    egg: {
        alignSelf: 'center',
        position: 'absolute',
        marginTop: -50,
        width: 450,
        height: 130,
        zIndex: -1,
        backgroundColor: Color.dark3,
        borderTopLeftRadius: 108,
        borderTopRightRadius: 108,
        borderBottomLeftRadius: 95,
        borderBottomRightRadius: 95,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    input: {
        alignSelf: 'center',
        width: 300,
        height: 50,
        fontSize: 20,
    },
    undersearchbar: {
        marginTop: 50,
        alignSelf: 'center',
        justifyContent: 'space-around',
        width: 300,
        height: 300,
    },
    btnrow: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    sidebyside: {
        marginTop: 350,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 10,
        paddingHorizontal: 10,
        borderTopLeftRadius: 0,
        borderBottomLeftRadius: 0,
        borderRadius: 4,
        elevation: 3,
        top: 2,
        backgroundColor: Color.dark3,
    },
    text: {
        fontSize: 16,
        lineHeight: 35,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: 'white',
    },
})

export default HomeScreen;
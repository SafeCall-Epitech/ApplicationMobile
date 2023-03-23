import React from "react";
import { SafeAreaView, Button, StyleSheet, Text, View, Image, Pressable} from "react-native";
import { useRoute } from "@react-navigation/native";
import { Alert } from "react-native";
import { Avatar, Badge, IconButton, TextInput, Snackbar} from "@react-native-material/core";
import Icon from 'react-native-vector-icons/FontAwesome';
import IconM from 'react-native-vector-icons/MaterialIcons';
import Color from "../color";
import axios from "axios";


const HomeScreen = ({navigation}) => {
    const route = useRoute();
    const Profilename = route.params?.name;

    var FriendNotification = 0;
    const hasFriendNotification = () => {
        if (FriendNotification > 0) {
            return true;
        }
        return false;
    }

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
        axios.get(`http://20.234.168.103:8080/profile/${SearchUser}`)
            .then(res => {
                if (res.data["profile"]["Email"] == "") {
                    setVisible(true)
                    setSearchUser('')
                } else {
                    setVisible(false)
                    navigation.navigate('SearchProfil', {name: SearchUser}), setSearchUser('')
                }
            })
        }
    }
    //

    // React.useEffect(() => navigation.addListener('beforeRemove', (e) => {
    //     e.preventDefault();
    //     Alert.alert(
    //         'Disconnect?',
    //         'Are you sure you want to disconnect?',
    //         [
    //           { text: "Don't leave", style: 'cancel', onPress: () => {} },
    //           { text: 'Leave', style: 'destructive', onPress: () => navigation.dispatch(e.data.action)},
    //         ]
    //       );
    // }), [navigation]);

    return (
        <SafeAreaView style={styles.mainpage}>

            <View style={styles.row}>
            <Icon logout style={{alignSelf: 'flex-start', marginTop: 5, marginLeft: 5}} name="sign-out" size={40} color={Color.light3} onPress={() => navigation.navigate('Login')}/>
            <Pressable style={{alignSelf: 'flex-end'}} onPress={() => navigation.navigate('Profil', {name: User})}>
            <Avatar
            style={{alignSelf: 'flex-end', marginTop: 5, marginRight: 5}}
            label={User[0]}
            // image={{ uri: "https://mui.com/static/images/avatar/1.jpg" }}
            color={Color.light}
            size={50} 
            /></Pressable>

            </View>
                <Image style={styles.tinyLogo} source={require('../img/SafeCallBlack.png')} />
            <View style={styles.egg}/>
            <TextInput
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
            />
            <View style={styles.undersearchbar}>
                <View style={styles.btnrow}>
                    <View style={{alignItems: 'center'}}>
                        <Icon name="user" size={50} color={Color.dark} onPress={() => navigation.navigate('FriendList', {name: User})}/>
                        {hasFriendNotification ? <Badge style={{position: 'absolute', left: 50, top: -5}} label={FriendNotification} color="red" tintColor={Color.light3}/> : null}
                        <Text style={{fontSize: 20, color: Color.dark, alignSelf: 'center'}}>Friend List</Text>
                    </View>
                    <View style={{alignItems: 'center'}}>
                        <Icon name="calendar" size={50} color={Color.dark}/>
                        <Text style={{fontSize: 20, color: Color.dark, alignSelf: 'center'}}>Calendar</Text>
                    </View>
                </View>
                <View style={styles.btnrow}>
                <View style={{alignItems: 'center'}}>
                        <IconM name="message" size={50} color={Color.dark}/>
                        {hasMessageNotification ? <Badge style={{position: 'absolute', left: 50, top: -5}} label={MessageNotification} color="red" tintColor={Color.light3}/> : null}
                        <Text style={{fontSize: 20, color: Color.dark, alignSelf: 'center'}}>Message</Text>
                    </View>
                    {/* <View style={{alignItems: 'center'}}>
                        <Icon name="meh-o" size={50} color={Color.dark}/>
                        <Text style={{fontSize: 20, color: Color.dark, alignSelf: 'center'}}>Coming Soon</Text>
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
        height: 230,
        zIndex: -1,
        backgroundColor: Color.dark2,   
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
        marginTop: 300,
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
})
    
export default HomeScreen;
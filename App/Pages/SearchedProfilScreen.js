import React from "react";
import { ActivityIndicator, Avatar, Button} from "@react-native-material/core";
import { StyleSheet, Text, View } from "react-native";
import { useRoute } from "@react-navigation/native";
import Icon from 'react-native-vector-icons/Ionicons';
import IconM from 'react-native-vector-icons/MaterialIcons';
import axios from "axios";
import Color from "../color";

const SearchedProfileScreen = ({navigation}) => {
    const route = useRoute();
    const ProfileAPI = route.params?.name;
    
    const [User, setUser] = React.useState("")
    if (User == "") {
        setUser(ProfileAPI)
    }

    const [isLoaded, setIsLoaded] = React.useState(true);
    const [FullName, setFullName] = React.useState('none');
    const [Description, setDescription] = React.useState('none');
    const [PhoneNb, setPhoneNb] = React.useState('none');
    const [Email, setEmail] = React.useState('none');
    const [verified, setVerified] = React.useState(false);
    // const [ID, setID] = React.useState('none');
    // const [ProfilePic, setProfilePic] = React.useState('none');

    const getProfile = async () => {
        axios.get(`http://20.234.168.103:8080/profile/${ProfileAPI}`)
        .then(res => {
            console.log(res.data);
            if (res.data["profile"]) {
                setFullName(res.data["profile"]["FullName"]);
                setDescription(res.data["profile"]["Description"]);
                setPhoneNb(res.data["profile"]["PhoneNb"]);
                setEmail(res.data["profile"]["Email"]);
                // setID(res.data["profile"]["ID"]);
                // setProfilePic(res.data["profile"]["ProfilePic"]);
                setIsLoaded(false);
            } if (res.data["failed"]) {
                alert ("Error: " + res.data["failed"]);
            }
        })
    }

    React.useEffect(() => {
        console.log(ProfileAPI);
        getProfile();
    }, []);

    return (
        <View style={styles.mainpage}>
            <Icon arrow-back style={{alignSelf: 'flex-start', marginTop: 5, marginLeft: 5}} name="arrow-back" size={40} color={Color.light3} onPress={() => navigation.navigate('Home')}/>
            <View style={styles.egg}/>
            <Text style={{alignSelf: 'center', marginTop: 5, fontSize: 35, color: Color.light3}}>Search Profil</Text>
            {isLoaded ? <Avatar 
            style={{alignSelf: 'center', marginTop: 30}}
            label=" "
            // image={{ uri: "https://mui.com/static/images/avatar/1.jpg" }}
            color={Color.light}
            size={100} />
            :
            <Avatar 
            style={{alignSelf: 'center', marginTop: 30}}
            label={FullName[0]}
            // image={{ uri: "https://mui.com/static/images/avatar/1.jpg" }}
            color={Color.light}
            size={100} /> }
            <View
                style={{
                    marginTop: 40,
                }}
            >
            {verified ? <IconM name="verified-user" style={styles.verified} size={30} color="green"/> : <></>}
            <Text style={styles.maintext}>
                Username: {isLoaded ? <ActivityIndicator color="#25101c"/> : ( <Text style={styles.valtext}>{FullName}</Text>)} {/*<IconM name="verified-user" size={20} color="green"/>*/}
            </Text>
            <View style={{ borderBottomColor: 'black', borderBottomWidth: StyleSheet.hairlineWidth, margin: 20, }}/>
            <Text style={styles.maintext}>
                ID: {isLoaded ? <ActivityIndicator color="#25101c"/> : ( <Text style={styles.valtext}> @{User}</Text>)}
            </Text>
            <View style={{ borderBottomColor: 'black', borderBottomWidth: StyleSheet.hairlineWidth, margin: 20, }}/>
            <Text style={styles.maintext}>
                Description: {isLoaded ? <ActivityIndicator color="#25101c"/> : ( <Text style={styles.valtext}> {Description}</Text>)}
            </Text>
            <View style={{ borderBottomColor: 'black', borderBottomWidth: StyleSheet.hairlineWidth, margin: 20, }}/>
            <Text style={styles.maintext}>
                Email: {isLoaded ? <ActivityIndicator color="#25101c"/> : ( <Text style={styles.valtext}> {Email}</Text>)}
            </Text>
            <View style={{ borderBottomColor: 'black', borderBottomWidth: StyleSheet.hairlineWidth, margin: 20, }}/>
            <Text style={styles.maintext}>
                Phone number: {isLoaded ? <ActivityIndicator color="#25101c"/> : ( <Text style={styles.valtext}> {PhoneNb[0]}{PhoneNb[1]}********</Text>)}
            </Text>
            </View>
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
        borderBottomRightRadius: 95,
        zIndex: -1,
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
    }
})
    
export default SearchedProfileScreen;
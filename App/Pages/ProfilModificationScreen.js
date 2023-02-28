import React from "react";
import { ActivityIndicator, Avatar } from "@react-native-material/core";
import { StyleSheet, Text, View, Keyboard} from "react-native";
// import { TextInput } from "@react-native-material/core";
import { TextInput } from "react-native";
import { useRoute } from "@react-navigation/native";
import { Button } from "@react-native-material/core";
import Icon from 'react-native-vector-icons/Ionicons';
import IconM from 'react-native-vector-icons/MaterialIcons';
import IconS from 'react-native-vector-icons/EvilIcons';
import IconB from 'react-native-vector-icons/Entypo';
import axios from "axios";
import Color from "../color";

const ProfilScreen = ({navigation}) => {
    const route = useRoute();
    const ProfileAPI = route.params?.name;

    const [isLoaded, setIsLoaded] = React.useState(true);
    const [ID, setID] = React.useState(ProfileAPI);
    const [FullName, setFullName] = React.useState("");
    const [Description, setDescription] = React.useState("");
    const [PhoneNb, setPhoneNb] = React.useState("");
    const [Email, setEmail] = React.useState("");
    const [verified, setVerified] = React.useState(false);
    // const [ID, setID] = React.useState('none');
    // const [ProfilePic, setProfilePic] = React.useState('none');

    const updateProfile = async () => {
        console.log("updateProfile");
        console.log("Fullname: " + FullName);
        console.log("Description: " + Description);
        console.log("PhoneNb: " + PhoneNb);
        console.log("Email: " + Email);
    
        //Name
        axios.post('http://20.234.168.103:8080/profileFullName/' + ProfileAPI + '/' + FullName)
        .then(res => {
            console.log(res.data);
        })
        //Description
        axios.post('http://20.234.168.103:8080/profileDescription/' + ProfileAPI + '/' + Description)
        .then(res => {
            console.log(res.data);
        })
        //PhoneNb
        axios.post('http://20.234.168.103:8080/profilePhoneNB/' + ProfileAPI + '/' + PhoneNb)
        .then(res => {
            console.log(res.data);
        })
        //Email
        axios.post('http://20.234.168.103:8080/profileEmail/' + ProfileAPI + '/' + Email)
        .then(res => {
            console.log(res.data);
        })
    }


    const getProfile = async () => {
        axios.get(`http://20.234.168.103:8080/profile/${ProfileAPI}`)
        .then(res => {
            console.log(res.data);
            if (res.data["profile"]) {
                setFullName(res.data["profile"]["FullName"]);
                setDescription(res.data["profile"]["Description"]);
                setPhoneNb(res.data["profile"]["PhoneNb"]);
                setEmail(res.data["profile"]["Email"]);
                setIsLoaded(false);
            } if (res.data["failed"]) {
                alert ("Error: " + res.data["failed"]);
            }
        })
    }

    React.useEffect(() => {
        console.log("Fullname: " + FullName);
        getProfile();
    }, []);

    return (
        <View style={styles.mainpage}>
            <View style={styles.row}>
            <Icon arrow-back style={{alignSelf: 'flex-start', marginTop: 5, marginLeft: 5}} name="arrow-back" size={40} color={Color.light3} onPress={() => navigation.navigate('Profil')}/>
            </View>
            <View style={styles.egg}/>
            <Text style={{alignSelf: 'center', marginTop: 5, fontSize: 35, color: Color.light3}}>Modify Profil</Text>
            {isLoaded ? <Avatar
            style={{alignSelf: 'center', marginTop: 30}}
            label=" "
            // image={{ uri: "https://mui.com/static/images/avatar/1.jpg" }}
            color={Color.light}
            size={100} />
            :
            <Avatar
            style={{alignSelf: 'center', marginTop: 30}}
            label={ProfileAPI[0]}
            // image={{ uri: "https://mui.com/static/images/avatar/1.jpg" }}
            color={Color.light}
            size={100} /> }
            <View
                style={{
                    marginTop: 40,
                }}
            >
            {verified ? <IconM name="verified-user" style={styles.verified} size={30} color="green"/> : <></>}
            <View style={styles.rowtext}>
            <Text style={styles.maintext}>
                Username:
            </Text>
                <TextInput
                onSubmitEditing={() => {Keyboard.dismiss()}}
                style={styles.input}
                color={Color.dark3}
                onChangeText={setFullName}
                value={FullName}
                // onChangeText={(UserName) => setUserName(UserName)} value={UserName}
                />
            </View>
            <View style={{ borderBottomColor: 'black', borderBottomWidth: StyleSheet.hairlineWidth, margin: 20, }}/>
            <Text style={styles.maintext}>
                ID: {isLoaded ? <ActivityIndicator color="#25101c"/> : ( <Text style={styles.valtext}> @{ProfileAPI}</Text>)}
            </Text>
            
            <View style={{ borderBottomColor: 'black', borderBottomWidth: StyleSheet.hairlineWidth, margin: 20, }}/>
            <View style={styles.rowtext}>
            <Text style={styles.maintext}>
            Description:
            </Text>
                <TextInput
                onSubmitEditing={() => {Keyboard.dismiss()}}
                style={styles.input}
                color={Color.dark3}
                onChangeText={setDescription}
                value={Description}
                // onChangeText={(UserName) => setUserName(UserName)} value={UserName}
                />
            </View>
            <View style={{ borderBottomColor: 'black', borderBottomWidth: StyleSheet.hairlineWidth, margin: 20, }}/>
            <View style={styles.rowtext}>
            <Text style={styles.maintext}>
            Email:
            </Text>
                <TextInput
                onSubmitEditing={() => {Keyboard.dismiss()}}
                style={styles.input}
                color={Color.dark3}
                onChangeText={setEmail}
                value={Email}
                // onChangeText={(UserName) => setUserName(UserName)} value={UserName}
                />
            </View>
            <View style={{ borderBottomColor: 'black', borderBottomWidth: StyleSheet.hairlineWidth, margin: 20, }}/>
            <View style={styles.rowtext}>
            <Text style={styles.maintext}>
            Phone number:
            </Text>
                <TextInput
                onSubmitEditing={() => {Keyboard.dismiss()}}
                style={styles.input}
                color={Color.dark3}
                onChangeText={setPhoneNb}
                value={PhoneNb}
                // onChangeText={(UserName) => setUserName(UserName)} value={UserName}
                />
            </View>
            </View>
            <View style={styles.rowbutton}>
            <Button
                title="Cancel"
                color="red"
                tintColor="white"
                leading={props => <IconB name="cross" {...props} />}
                onPress={() => navigation.navigate('Profil')}
            />
            <Button
            title="Validate"
            color="green"
            tintColor="white"
            leading={props => <IconB name="check" {...props} />}
            onPress={() => {updateProfile(); navigation.navigate('Home')}}
        />
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
    rowtext: {
        flexDirection: 'row',
        // justifyContent: 'space-between',
        alignItems: 'center',
    },
    rowbutton: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    input: {
        fontSize: 17,
        width: '50%',
        height: 40,
        marginLeft: 10,
        marginBottom: -4,
        alignSelf: 'center',
    },
})

export default ProfilScreen;
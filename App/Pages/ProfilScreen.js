import React from "react";
import { ActivityIndicator, Avatar } from "@react-native-material/core";
import { StyleSheet, Text, View, Modal, TextInput, Button, Alert } from "react-native";
import { useRoute } from "@react-navigation/native";
import Icon from 'react-native-vector-icons/Ionicons';
import IconM from 'react-native-vector-icons/MaterialIcons';
import IconS from 'react-native-vector-icons/EvilIcons';
import axios from "axios";
import Color from "../color";
import color from "../color";

const ProfilScreen = ({navigation}) => {
    const route = useRoute();
    const ProfileAPI = route.params?.name;
    
    const [User, setUser] = React.useState("")
    if (User == "") {
        setUser(ProfileAPI)
    }
    
    
    const [isLoaded, setIsLoaded] = React.useState(true);
    const [FullName, setFullName] = React.useState("");
    const [Description, setDescription] = React.useState("");
    const [PhoneNb, setPhoneNb] = React.useState("");
    const [Email, setEmail] = React.useState("");
    const [verified, setVerified] = React.useState(false);
    // const [ID, setID] = React.useState('none');
    // const [ProfilePic, setProfilePic] = React.useState('none');

    const [modalVisible, setModalVisible] = React.useState(false);
    const [oldPassword, setOldPassword] = React.useState("");
    const [newPassword, setNewPassword] = React.useState("");
    const [confirmNewPassword, setConfirmNewPassword] = React.useState("");
    

    const getProfile = async () => {
        axios.get(`http://20.234.168.103:8080/profile/${User}`)
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

    const changePassword = async () => {
        if (newPassword == confirmNewPassword) {

        }
        else {
            alert("New password and confirm new password are not the same");
        }
    }

    React.useEffect(() => {
        getProfile();
    }, []);

    return (
        <View style={styles.mainpage}>
            <View style={styles.row}>
            <Icon arrow-back style={{alignSelf: 'flex-start', marginTop: 5, marginLeft: 5}} name="arrow-back" size={40} color={Color.light3} onPress={() => navigation.navigate('Home')}/>
            <IconS pencil style={{alignSelf: 'flex-start', marginTop: 5, marginLeft: 5}} name="pencil" size={40} color={Color.light3} onPress={() => navigation.navigate('ProfilModification', {name: User})}/>
            </View>
            <View style={styles.egg}/>
            <Text style={{alignSelf: 'center', marginTop: 5, fontSize: 35, color: Color.light3}}>Profil</Text>
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
                Phone number: {isLoaded ? <ActivityIndicator color="#25101c"/> : ( <Text style={styles.valtext}> {PhoneNb}</Text>)}
            </Text>
            </View>            

            
            {/* button */}
            <View style={styles.button}>
                <Button
                    title="Change password"
                    color={Color.dark2}
                    onPress={() => setModalVisible(true)}
                />
            </View>

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                setModalVisible(!modalVisible);
                }}
            >
                <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <TextInput
                        style={styles.input}
                        placeholder="Old password"
                        placeholderTextColor={Color.dark2}
                        onChangeText={text => setOldPassword(text)}
                        value={oldPassword}
                        secureTextEntry={true}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="New password"
                        placeholderTextColor={Color.dark2}
                        onChangeText={text => setNewPassword(text)}
                        value={newPassword}
                        secureTextEntry={true}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Confirm new password"
                        placeholderTextColor={Color.dark2}
                        onChangeText={text => setConfirmNewPassword(text)}
                        value={confirmNewPassword}
                        secureTextEntry={true}
                    />
                    <IconM.Button name="lock" backgroundColor={Color.light3} color={Color.dark2} onPress={() => changePassword()}>
                        Change password
                    </IconM.Button>
                    <IconM.Button name="close" backgroundColor={Color.light3} color={Color.dark2} onPress={() => setModalVisible(!modalVisible)}>
                        Cancel
                    </IconM.Button>
                    </View>
                    </View>
            </Modal>

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
    button: {
        marginTop: 20,
        marginLeft: 50,
        marginRight: 50,
        marginBottom: 20,
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    modalView: {
        margin: 20,
        backgroundColor: Color.light3,
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        width: 200,
        borderColor: Color.dark2,
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center",
    },
    openButton: {
        backgroundColor: "#F194FF",
        borderRadius: 20,
        padding: 10,
        elevation: 2
    },
    textStyle: {
        color: Color.dark2,
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    }
            
})
    
export default ProfilScreen;
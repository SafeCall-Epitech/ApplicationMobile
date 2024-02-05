import React from "react";
import { ActivityIndicator, Avatar } from "@react-native-material/core";
import { StyleSheet, Text, View, Modal, TextInput, Button, Alert } from "react-native";
import { useRoute } from "@react-navigation/native";
import Icon from 'react-native-vector-icons/AntDesign';
import IconM from 'react-native-vector-icons/MaterialIcons';
import axios from "axios";
import Color from "../color";

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
    const [ProfilePic, setProfilePic] = React.useState('https://www.flaticon.com/free-icon/blank-avatar_18601');

    const [modalVisible, setModalVisible] = React.useState(false);
    const [modalVisibleMail, setModalVisibleMail] = React.useState(false);
    const [code, setCode] = React.useState("");
    const [oldPassword, setOldPassword] = React.useState("");
    const [newPassword, setNewPassword] = React.useState("");
    const [confirmNewPassword, setConfirmNewPassword] = React.useState("");
    // const [IsEmailVerified, setIsEmailVerified] = React.useState(false);
    

    const haslowercase = (str) => {
        if (!str) {
            return false;
        }
        return (/[a-z]/.test(str));
    }
    const hasuppercase = (str) => {
        if (!str) {
            return false;
        }
        return (/[A-Z]/.test(str));
    }

    const hasnumber = (str) => {
        if (!str) {
            return false;
        }
        return (/[0-9]/.test(str));
    }
    const hasSpecial = (str) => {
        if (!str) {
            return false;
        }
        return (/[!@#$%^&*(),.?":{}|<>]/.test(str));
    }
    const haslength = (str) => {
        if (!str) {
            return false;
        }
        return (str.length >= 8);
    }

    const setCodeRequest = async (text) => {
        if (text == "") {
            alert("Code is empty");
            return;
        }
        const form = JSON.stringify({
            Login: User,
            Code: text,
        });
        console.log(form);
            axios.post(`http://x2024safecall3173801594000.westeurope.cloudapp.azure.com:80/verifyAccount`, form, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(res => {
                console.log(res.data);
                Alert.alert("INFO", "Email verified");
                setModalVisibleMail(false);
                setVerified(true);
                setCode("");
            }).catch(err => {
                console.log(err);
                setModalVisibleMail(false);
                Alert.alert("INFO", "incorrect code");
                setCode("");
            })
    }

    const getProfile = async () => {
        axios.get(`http://x2024safecall3173801594000.westeurope.cloudapp.azure.com:80/profile/${User}`)
        .then(res => {
            console.log(res.data);
            if (res.data["profile"]) {
                setFullName(res.data["profile"]["FullName"]);
                setDescription(res.data["profile"]["Description"]);
                setPhoneNb(res.data["profile"]["PhoneNb"]);
                setEmail(res.data["profile"]["Email"]);
                setProfilePic(res.data["profile"]["ProfilePic"]);
                setIsLoaded(false);
            } if (res.data["failed"]) {
                alert ("Error: " + res.data["failed"]);
            }
        })
        axios.get(`http://x2024safecall3173801594000.westeurope.cloudapp.azure.com/verify/${User}`)
        .then(res => {
            if (res.data["verified"] == true) {
                setVerified(true);
            } else if (res.data["verified"] == false) {
                setVerified(false);
            }
        })
    }

    //fixed
    const changePassword = async () => {
        if (newPassword == confirmNewPassword) {
            if (oldPassword == "" || newPassword == "") {
                alert("Old password or new password is empty");
                return;
            }

            const form = JSON.stringify({
                UserID: User,
                PasswordOld: oldPassword,
                PasswordNew: newPassword,
            });
            axios.post(`http://x2024safecall3173801594000.westeurope.cloudapp.azure.com:80/editPassword`, form, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(res => {
                console.log(res.data);
                if (res.data["success"]) {
                    alert("Password changed successfully");
                    setModalVisible(false);
                } else if (res.data["failed"]) {
                    alert("Error: " + res.data["failed"]);
                }
            })
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
            <Icon style={{alignSelf: 'flex-start', marginTop: 15, marginLeft: 15}} name="home" size={40} color={Color.light3} onPress={() => navigation.navigate('Home')}/>
            <Icon pencil style={{alignSelf: 'flex-start', marginTop: 15, marginRight: 15}} name="edit" size={40} color={Color.light3} onPress={() => navigation.navigate('ProfilModification', {name: User})}/>
            </View>
            <View style={styles.egg}/>
            <Text style={{alignSelf: 'center', marginTop: 5, top: -40,fontSize: 25, color: Color.light3}}>Profil</Text>
            {isLoaded ? <Avatar 
            style={{alignSelf: 'center', marginTop: 10}}
            // label=" "
            image={{ uri: "https://www.flaticon.com/free-icon/blank-avatar_18601" }}
            color={Color.light2}
            size={120} />
            :
            <Avatar 
            style={{alignSelf: 'center', marginTop: 10}}
            // label={ProfileAPI[0]}
            image={{ uri: ProfilePic }}
            color={Color.light}
            size={120} /> }
            <View
                style={{
                    marginTop: 40,
                }}
            >
            {verified ? <IconM name="verified-user" style={styles.verified} size={30} color="green"/> : <></>}
            <Text style={styles.maintext}>
                Username: {isLoaded ? <ActivityIndicator color="#25101c"/> : ( <Text style={styles.valtext}>{FullName}</Text>)} {/*<IconM name="verified-user" size={20} color="green"/>*/}
            </Text>
            <View style={{ borderBottomColor: 'black', margin: 20, }}/>
            <Text style={styles.maintext}>
                ID: {isLoaded ? <ActivityIndicator color="#25101c"/> : ( <Text style={styles.valtext}> @{User}</Text>)}
            </Text>
            <View style={{ borderBottomColor: 'black', margin: 20, }}/>
            <Text style={styles.maintext}>
                Description: {isLoaded ? <ActivityIndicator color="#25101c"/> : ( <Text style={styles.valtext}> {Description}</Text>)}
            </Text>
            <View style={{ borderBottomColor: 'black', margin: 20, }}/>
            <Text style={styles.maintext}>
                Email: {isLoaded ? <ActivityIndicator color="#25101c"/> : ( <Text style={styles.valtext}> {Email}</Text>)}
            </Text>
            <View style={{ borderBottomColor: 'black', margin: 20, }}/>
            <Text style={styles.maintext}>
                Phone number: {isLoaded ? <ActivityIndicator color="#25101c"/> : ( <Text style={styles.valtext}> {PhoneNb}</Text>)}
            </Text>
            </View>            

            
            {/* button */}

            { verified ? 
                <View style={styles.buttonalone}>
            <Button
                    title="Change password"
                    color={Color.dark2}
                    onPress={() => setModalVisible(true)}
                /> 
                </View>
            : 
                <View style={styles.button}>
                <Button
                    title="Change password"
                    color={Color.dark2}
                    onPress={() => setModalVisible(true)}
                />
                <Button
                    title="Verify email"
                    color={Color.dark2}
                    onPress={() => setModalVisibleMail(true)}
                />
            </View>
                }

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
                    {/*  */}
                    <View style={{alignItems: "flex-start", justifyContent: "center", marginLeft: 45, marginBottom: 30}}>
                <View style={{flexDirection: "row", alignItems: "center", justifyContent: "center"}}>
                    {haslowercase(newPassword) ? <Icon name="checkcircle" size={15} color="green" style={{}}/> : <Icon name="closecircle" size={15} color="red" style={{}}/>}
                    <Text style={styles.regu}>At least one lowercase letter</Text>
                </View>
                <View style={{flexDirection: "row", alignItems: "center", justifyContent: "center"}}>
                    {hasuppercase(newPassword) ? <Icon name="checkcircle" size={15} color="green" style={{}}/> : <Icon name="closecircle" size={15} color="red" style={{}}/>}
                    <Text style={styles.regu}>At least one uppercase letter</Text>
                </View>
                <View style={{flexDirection: "row", alignItems: "center", justifyContent: "center"}}>
                    {hasnumber(newPassword) ? <Icon name="checkcircle" size={15} color="green" style={{}}/> : <Icon name="closecircle" size={15} color="red" style={{}}/>}
                    <Text style={styles.regu}>At least one digit</Text>
                </View>
                <View style={{flexDirection: "row", alignItems: "center", justifyContent: "center"}}>
                    {hasSpecial(newPassword) ? <Icon name="checkcircle" size={15} color="green" style={{}}/> : <Icon name="closecircle" size={15} color="red" style={{}}/>}
                    <Text style={styles.regu}>At least one special character : (!@#$%^&*)</Text>
                </View>
                <View style={{flexDirection: "row", alignItems: "center", justifyContent: "center"}}>
                    {haslength(newPassword) ? <Icon name="checkcircle" size={15} color="green" style={{}}/> : <Icon name="closecircle" size={15} color="red" style={{}}/>}
                    <Text style={styles.regu}>At least 8 characters in total</Text>
                </View>
            </View>
            {/*  */}
                    <Icon.Button name="lock" backgroundColor={Color.light3} color={Color.dark2} onPress={() => changePassword()}>
                        Change password
                    </Icon.Button>
                    <Icon.Button name="close" backgroundColor={Color.light3} color={Color.dark2} onPress={() => setModalVisible(!modalVisible)}>
                        Cancel
                    </Icon.Button>
                    </View>
                    </View>
            </Modal>

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisibleMail}
                onRequestClose={() => {
                    setModalVisibleMail(!modalVisibleMail);
                }
            }>
                <View style={styles.centeredView}>
                <View style={styles.modalView}>

                 
                    <View>
                    <TextInput style={styles.input}
                    placeholder="code"
                    placeholderTextColor={Color.dark2}
                    onChangeText={text => setCode(text)}
                    value={code}
                    />
                    <Icon.Button name="mail" backgroundColor={Color.light3} color={Color.dark2} onPress={() => setCodeRequest(code)}>
                        Send code
                    </Icon.Button>
                    </View>

                    <Icon.Button name="close" backgroundColor={Color.light3} color={Color.dark2} onPress={() => setModalVisibleMail(!modalVisibleMail)}>
                        Cancel
                    </Icon.Button>
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
    buttonalone: {
        marginTop: 20,
        marginLeft: 50,
        marginRight: 50,
        marginBottom: 20,
    },

    button: {
        marginTop: 20,
        marginLeft: 50,
        marginRight: 50,
        marginBottom: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
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
        color: Color.dark3,
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
    },
    regu: {
        marginLeft: 10,
        color: "black",
        marginBottom: 5,
    },
            
})
    
export default ProfilScreen;
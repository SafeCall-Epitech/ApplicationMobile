import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { View, Text, TouchableOpacity, Image, FlatList } from 'react-native';
import { Card, Appbar, Menu, Divider, Provider, Dialog, Portal, Button, TextInput } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { storeData, getData, removeData } from './store';

function DiscList({ onFriendSelect }) {
    const [friendList, setFriendList] = useState([]);
    const [user, setuser] = useState("")
    const [flist, setFlist] = useState([])
    const [lastMessages, setLastMessages] = useState([]);
    const [menuVisible, setMenuVisible] = useState(false);
    const [isDialogVisible, setIsDialogVisible] = useState(false); // Nouvel état pour la visibilité de la popup
    const [textInputValue, setTextInputValue] = useState(''); // Nouvel état pour la valeur du champ de texte
    const navigation = useNavigation();

    useEffect(() => {
        const date = new Date();

        const currentOffsetMinutes = date.getTimezoneOffset();

        const currentDifferenceHours = currentOffsetMinutes / 60;
        console.log("crrehcfbe" + currentDifferenceHours)
        storeData("UTC", currentDifferenceHours);
        const fetchFriendList = async () => {
            try {
                const username = await getData("user_name");
                setuser(username.toLowerCase())
                const response = await axios.get('http://x2024safecall3173801594000.westeurope.cloudapp.azure.com:80/conversations/' + username);
                // const reponset = await axios.get(`http://20.234.168.103:8080/listFriends/` + username)
                if (response.data["Success "] === null) {
                    setFriendList([])
                } else {
                    setFriendList(response.data["Success "]);
                }
                // setFlist(responset.data)
            } catch (error) {
                console.log(error);
            }
        };

        fetchFriendList();
    }, []);

    useEffect(() => {
        console.log("okokokokok")
        console.log(friendList);
    }, [friendList]);

    useEffect(() => {
        console.log(flist);
    }, [flist]);

    const handleFriendClick = async (friendName) => {
        const friend_wait = await getData("user_name");
        const friend = friendName.replace(friend_wait.toLocaleLowerCase(), "");
        storeData("Friend", friend.toLowerCase());
        console.log("cmoi" + friend)
        navigation.navigate('Chat');
    };

    const renderFriendItem = ({ item }) => (
        <TouchableOpacity onPress={() => handleFriendClick(item.toString().replace(user, "").split(":")[0])}>
            <View style={styles.friend}>
                <Image
                    source={{ uri: "https://via.placeholder.com/60" }}
                    style={styles.profileImage}
                />
                <View style={styles.friendInfo}>
                    {console.log(user)}
                    <Text style={styles.friendName}>{item.toString().replace(user, "").split(":")[0]}</Text>
                    <Text style={styles.friendName}>{item.toString().replace(user, "").split(":")[1]}{":"}{item.toString().replace(user, "").split(":")[2]}{":"}{item.toString().replace(user, "").split(":")[3]}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );

    const select_friend = ({ item }) => (
        console.log(item)
    );

    const handleGoBack = () => {
        // Add logic to go back
    };

    const openMenu = () => setMenuVisible(true);
    const closeMenu = () => setMenuVisible(false);

    const openDialog = () => {
        setIsDialogVisible(true);
    };

    const handleSubmit = async () => {
        const response = await axios.get('http://x2024safecall3173801594000.westeurope.cloudapp.azure.com:80/messages/' + user + "/" + textInputValue);
        window.location.reload();
        setIsDialogVisible(false); // Fermez la popup après la soumission
    };

    return (
        <SafeAreaProvider>
            <Provider>
                <View style={styles.container}>
                    <Appbar.Header>
                        <Appbar.BackAction onPress={handleGoBack} />
                        <Appbar.Content title="Conversation" />
                        <Menu
                            visible={menuVisible}
                            onDismiss={closeMenu}
                            anchor={<Appbar.Action icon="dots-vertical" onPress={openMenu} />}
                        >
                            {flist.map((item, index) => (
                                <React.Fragment key={index}>
                                    <Menu.Item onPress={() => { select_friend(item) }} title={item.title} />
                                    {index !== flist.length - 1 && <Divider />}
                                </React.Fragment>
                            ))}
                        </Menu>
                    </Appbar.Header>
                    <FlatList
                        data={friendList}
                        renderItem={renderFriendItem}
                        keyExtractor={(item, index) => {
                            return index.toString().replace(user, "").split(":")[0];
                        }}
                    />
                    <Button mode="contained" onPress={openDialog}>Ouvrir la popup</Button>
                    <Portal>
                        <Dialog visible={isDialogVisible} onDismiss={() => setIsDialogVisible(false)}>
                            <Dialog.Title>Titre de la popup</Dialog.Title>
                            <Dialog.Content>
                                <TextInput
                                    label="Champ de texte"
                                    value={textInputValue}
                                    onChangeText={text => setTextInputValue(text)}
                                />
                            </Dialog.Content>
                            <Dialog.Actions>
                                <Button onPress={handleSubmit}>Envoyer</Button>
                                <Button onPress={() => setIsDialogVisible(false)}>Annuler</Button>
                            </Dialog.Actions>
                        </Dialog>
                    </Portal>
                </View>
            </Provider>
        </SafeAreaProvider >
    );
}

const styles = {
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    friend: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 8,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    profileImage: {
        width: 60,
        height: 60,
        borderRadius: 30,
        marginRight: 12,
    },
    friendInfo: {
        flex: 1,
    },
    friendName: {
        fontWeight: 'bold',
        color: '#000',
        marginBottom: 4,
    },
};

export default DiscList;

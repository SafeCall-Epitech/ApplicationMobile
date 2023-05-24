import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { View, Text, TouchableOpacity, Image, FlatList } from 'react-native';
import { Card, Appbar, Menu, Divider, Provider } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { storeData, getData, removeData } from './store';

function DiscList({ onFriendSelect }) {
    const [friendList, setFriendList] = useState([]);
    const [flist, setFlist] = useState([])
    const [lastMessages, setLastMessages] = useState([]);
    const [menuVisible, setMenuVisible] = useState(false);
    const navigation = useNavigation();

    useEffect(() => {
        const fetchFriendList = async () => {
            try {
                const username = await getData("user_name");
                const response = await axios.get('http://20.234.168.103:8080/conversations/' + username);
                const reponset = await axios.get(`http://20.234.168.103:8080/listFriends/` + username)
                setFriendList(response.data["Success "]);
                setFlist(responset.data)
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
        <TouchableOpacity onPress={() => handleFriendClick(item)}>
            <View style={styles.friend}>
                <Image
                    source={{ uri: "https://via.placeholder.com/60" }}
                    style={styles.profileImage}
                />
                <View style={styles.friendInfo}>
                    <Text style={styles.friendName}>{item.replace(getData("user_name"), "")}</Text>
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

    // Array of menu items

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
                            {/* Render menu items dynamically */}
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
                        keyExtractor={async (item, index) => {
                            const username = await getData("user_name");
                            return index.toString().replace(username, "");
                        }}
                    />
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
        marginBottom: 4,
    },
};

export default DiscList;

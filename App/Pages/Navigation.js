import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "./Login"
import Register from "./Register.js";
import HomeScreen from "./HomeScreen";
import SplashScreen from "./SplashScreen";
import ProfilScreen from "./ProfilScreen";
import SearchedProfilScreen from "./SearchedProfilScreen";
import ProfilModificationScreen from "./ProfilModificationScreen";
import FriendList from "./FriendList";
import Agenda from "./Agenda";
import CallForm from "./CallForm";
import MessageMainPage from "./MessageMainPage";
import DiscList from "./Chat_part/DiscList";
import ChatScreen from "./Chat_part/Chat2";
import "../color"

const Stack = createNativeStackNavigator();

const MyStack = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator
            screenOptions={{
                headerShown: false,
                navigationBarHidden: true,
            }}>
                <Stack.Screen name="SplashScreen" component={SplashScreen}/>
                <Stack.Screen name="Login" component={Login}/>
                <Stack.Screen name="Register" component={Register}/>
                <Stack.Screen name="Home" component={HomeScreen}/>
                <Stack.Screen name="Profil" component={ProfilScreen}/>
                <Stack.Screen name="SearchProfil" component={SearchedProfilScreen}/>
                <Stack.Screen name="ProfilModification" component={ProfilModificationScreen}/>
                <Stack.Screen name="FriendList" component={FriendList}/>
                <Stack.Screen name="Agenda" component={Agenda}/>
                <Stack.Screen name="CallForm" component={CallForm}/>
                <Stack.Screen name="MessageMainPage" component={MessageMainPage}/>
                <Stack.Screen name="DiscList" component={DiscList}/>
                <Stack.Screen name="Chat" component={ChatScreen}/>
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default MyStack;
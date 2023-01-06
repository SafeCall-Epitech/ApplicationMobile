import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "./Login";
import Register from "./Register";
import HomeScreen from "./HomeScreen";
import SplashScreen from "./SplashScreen";
import ProfilScreen from "./ProfilScreen";

const Stack = createNativeStackNavigator();

const MyStack = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator
            screenOptions={{
                headerShown: false
            }}>
                {/* <Stack.Screen name="SplashScreen" component={SplashScreen}/> */}
                <Stack.Screen name="Login" component={Login}/>
                <Stack.Screen name="Register" component={Register}/>
                <Stack.Screen name="Home" component={HomeScreen}/>
                <Stack.Screen name="Profil" component={ProfilScreen}/>
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default MyStack;
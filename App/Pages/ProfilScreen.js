import React from "react";
import { Avatar } from "@react-native-material/core";
import { StyleSheet, Text, View } from "react-native";

const ProfilScreen = ({navigation}) => {
    return (
        <View>
            <View style={styles.egg}/>
            <Text style={{alignSelf: 'center', marginTop: 40, fontSize: 35, color: 'white'}}>Profil</Text>
            <Avatar 
            style={{alignSelf: 'center', marginTop: 30}}
            label="EU"
            // image={{ uri: "https://mui.com/static/images/avatar/1.jpg" }}
            autoColor
            size={100} />
            <View
                style={{
                    marginTop: 40,
                }}
            >
            <Text style={styles.maintext}>
                Username:<Text style={styles.valtext}> exampleusername</Text>
            </Text>
            <View style={{ borderBottomColor: 'black', borderBottomWidth: StyleSheet.hairlineWidth, margin: 30, }}/>
            <Text style={styles.maintext}>
                Email:<Text style={styles.valtext}> exampleemail@mail.com</Text>
            </Text>
            <View style={{ borderBottomColor: 'black', borderBottomWidth: StyleSheet.hairlineWidth, margin: 30, }}/>
            <Text style={styles.maintext}>
                ID:<Text style={styles.valtext}> @idexample58864</Text>
            </Text>
            <View style={{ borderBottomColor: 'black', borderBottomWidth: StyleSheet.hairlineWidth, margin: 30, }}/>
            <Text style={styles.maintext}>
                Phone number:<Text style={styles.valtext}> +33640693124</Text>
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
        backgroundColor: '#dbd7d7',
        borderTopLeftRadius: 108,
        borderTopRightRadius: 108,
        borderBottomLeftRadius: 95,
        borderBottomRightRadius: 95,
      },
    maintext: {
        marginLeft: 50,
        marginTop: 20,
        marginBottom: 20,
        color: 'black',
        fontWeight: 'bold',
        fontSize: 17,
    },
    valtext: {
        fontStyle: 'italic',
        color: '#5D6D7E',
    }
})
    
export default ProfilScreen;
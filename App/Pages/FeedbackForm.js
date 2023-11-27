import React, { useState } from 'react';
import { ActivityIndicator, Avatar, Surface, } from "@react-native-material/core";
import { StyleSheet, Text, View, ScrollView, TextInput, Alert } from "react-native";
import { useRoute } from "@react-navigation/native";
import Icon from 'react-native-vector-icons/Ionicons';
import IconF from 'react-native-vector-icons/FontAwesome';
import axios from "axios";
import Color from "../color";

import { Button } from 'react-native'
import DatePicker from 'react-native-date-picker'

const FeedbackForm = ({navigation}) => {

    
    const route = useRoute();
    const UserName = route.params?.name;
    const [ToAddDescription, setDestDescription] = React.useState('');
    const [date, setDate] = useState(new Date())


    formatDate = (date) => {
        var day = date.getDate();
        var month = date.getMonth() + 1;
        var year = date.getFullYear();
        if (day < 10) {
            day = '0' + day;
        }
        if (month < 10){
            month = '0' + month;
        }
        return day+month+year;
    }

    const SendFeedback = async () => {
        const form = JSON.stringify({
            username: UserName,
            date: formatDate(date),
            message: ToAddDescription,
        });
        console.log(form)
        axios.post(`http://x2024safecall3173801594000.westeurope.cloudapp.azure.com:80/feedback`, form, {
            headers: {
            'Content-Type': 'application/json'
          }
        })
        .then(res => {
            console.log(res.data)
            alert("Feedback sent to the team !")
            navigation.navigate('Home', {name: UserName})
        })
    }

    return (
        <View style={styles.mainpage}>
            <View style={styles.row}>
            <Icon arrow-back style={{alignSelf: 'flex-start', marginTop: 5, marginLeft: 5}} name="arrow-back" size={40} color={Color.light3} onPress={() => navigation.navigate('Home')}/>
            </View>
            <Text style={{alignSelf: 'center', marginTop: 5, fontSize: 35, color: Color.light3}}>Feedback</Text>
            <View style={styles.egg}/>
            <ScrollView style={styles.scrollView}>
                    <View>
                    {<Text style={styles.maintext}>Description :</Text>}
                    <TextInput multiline={true} style={{alignSelf: 'center', marginTop: 5, marginLeft: 5, marginRight: 5, width: '65%', height: 90, backgroundColor: Color.light, borderRadius: 10, paddingLeft: 10, paddingRight: 10, color: Color.dark2, textAlignVertical: 'top'}} placeholder="Description" placeholderTextColor={Color.dark2} onChangeText={text => setDestDescription(text)} value={ToAddDescription}/>
                    </View>
            </ScrollView>
            <View style={styles.btnrow}></View>
            <View style={{alignItems: 'center'}}>
                <IconF name="user" size={50} color={Color.dark} onPress={() => SendFeedback()}/>
                <Text style={{fontSize: 20, color: Color.dark, alignSelf: 'center'}}>Send Feedback</Text>
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
    scrollView: {
        // backgroundColor: 'pink',
        marginHorizontal: 0,
        marginTop: 135,
      },
      btnrow: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    datepicker: {
        alignSelf: 'center',
        marginTop: 5,
        marginLeft: 5,
        marginRight: 5,
        height: 80,
        backgroundColor: Color.light,
        borderRadius: 10,
        paddingLeft: 10,
        paddingRight: 10,
        color: Color.dark2
    }
})
    
export default FeedbackForm;
import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TextInput, Alert } from "react-native";
import { useRoute } from "@react-navigation/native";
import Icon from 'react-native-vector-icons/Ionicons';
import IconF from 'react-native-vector-icons/FontAwesome';
import axios from "axios";
import Color from "../color";

import DatePicker from 'react-native-date-picker'

const CallForm = ({navigation}) => {

    
    const route = useRoute();
    const UserName = route.params?.name;
    const [ToAddUser, setToAddUser] = React.useState('');
    const [ToAddGuest1, setDestGuest1] = React.useState('');
    const [ToAddGuest2, setDestGuest2] = React.useState('');
    const [ToAddObject, setObject] = React.useState('');
    // const [ToAddDate, setDate] = React.useState('');

    const [date, setDate] = useState(new Date())
    const [open, setOpen] = useState(false)

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

    const SendCallForm = async () => {
        const form = JSON.stringify({
            guest1: ToAddGuest1,
            guest2: ToAddGuest2,
            subject: ToAddObject,
            date: formatDate(date),
        });
        console.log(form)
        axios.post(`http://20.234.168.103:8080/addEvent`, form, {
            headers: {
            'Content-Type': 'application/json'
          }
        })
        .then(res => {
            console.log(res.data)
            alert("Call request sent to " + ToAddGuest2 + "!")
            navigation.navigate('FriendList', {name: UserName})
        })
    }

    return (
        <View style={styles.mainpage}>
            <View style={styles.row}>
            <Icon arrow-back style={{alignSelf: 'flex-start', marginTop: 5, marginLeft: 5}} name="arrow-back" size={40} color={Color.light3} onPress={() => navigation.navigate('Home')}/>
            </View>
            <Text style={{alignSelf: 'center', marginTop: 5, fontSize: 35, color: Color.light3}}>Add Event</Text>
            <View style={styles.egg}/>
            <ScrollView style={styles.scrollView}>
                    <View>
                    {<Text style={styles.maintext}>Guest1 :</Text>}
                    <TextInput style={{alignSelf: 'center', marginTop: 5, marginLeft: 5, marginRight: 5, width: '65%', height: 40, backgroundColor: Color.light, borderRadius: 10, paddingLeft: 10, paddingRight: 10, color: Color.dark2}} placeholder="Guest1" placeholderTextColor={Color.dark2} onChangeText={text => setDestGuest1(text)} value={ToAddGuest1}/>
                    </View>
                    {<Text style={styles.maintext}>Guest2 :</Text>}
                    <TextInput style={{alignSelf: 'center', marginTop: 5, marginLeft: 5, marginRight: 5, width: '65%', height: 40, backgroundColor: Color.light, borderRadius: 10, paddingLeft: 10, paddingRight: 10, color: Color.dark2}} placeholder="Guest2" placeholderTextColor={Color.dark2} onChangeText={text => setDestGuest2(text)} value={ToAddGuest2}/>
                    <View>
                    {<Text style={styles.maintext}>Object :</Text>}
                    <TextInput style={{alignSelf: 'center', marginTop: 5, marginLeft: 5, marginRight: 5, width: '65%', height: 40, backgroundColor: Color.light, borderRadius: 10, paddingLeft: 10, paddingRight: 10, color: Color.dark2}} placeholder="Object" placeholderTextColor={Color.dark2} onChangeText={text => setObject(text)} value={ToAddObject}/>
                    </View>
                    <View>
                    {<Text style={styles.maintext}>Date of the event :</Text>}
                    <DatePicker date={date} onDateChange={setDate} style={styles.datepicker}
                    androidVariant= 'nativeAndroid' 
                    textColor='black'
                    mode='date'
                    />
                    {/* <TextInput style={{alignSelf: 'center', marginTop: 5, marginLeft: 5, marginRight: 5, width: '65%', height: 40, backgroundColor: Color.light, borderRadius: 10, paddingLeft: 10, paddingRight: 10, color: Color.dark2}} placeholder="Date" placeholderTextColor={Color.dark2} onChangeText={text => setDate(text)} value={ToAddDate}/>     */}
                    </View>
            </ScrollView>
            <View style={styles.btnrow}></View>
            <View style={{alignItems: 'center'}}>
                <IconF name="user" size={50} color={Color.dark} onPress={() => SendCallForm()}/>
                <Text style={{fontSize: 20, color: Color.dark, alignSelf: 'center'}}>Send Call Request</Text>
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
    
export default CallForm;
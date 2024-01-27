import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, Alert } from "react-native";
import { TextInput } from "@react-native-material/core";
import { useRoute } from "@react-navigation/native";
import Icon from 'react-native-vector-icons/AntDesign';
import axios from "axios";
import Color from "../color";

import DatePicker from 'react-native-date-picker'

const CallForm = ({navigation}) => {

    
    const route = useRoute();
    const UserName = route.params?.UserName;
    const [ToAddUser, setToAddUser] = React.useState('');
    const [ToAddGuest1, setDestGuest1] = React.useState('');
    const [ToAddGuest2, setDestGuest2] = React.useState('');
    const [ToAddObject, setObject] = React.useState('');
    // const [ToAddDate, setDate] = React.useState('');

    const [date, setDate] = useState(new Date())
    const [open, setOpen] = useState(false)

    const formatDate = (date) => {
        console.log(date)

        var d = new Date(date);
        var month = '' + (d.getMonth() + 1);
        var day = '' + d.getDate();
        var year = d.getFullYear();
        var hour = '' + d.getHours();
        var minute = '' + d.getMinutes();

        if (month.length < 2)
            month = '0' + month;
        if (day.length < 2)
            day = '0' + day;
        if (hour.length < 2)
            hour = '0' + hour;
        if (minute.length < 2)
            minute = '0' + minute;
        
        return [year, month, day].join('-') + ' ' + [hour, minute].join(':');
    }

    const SendCallForm = async () => {
        if (ToAddGuest2 == '') {
            Alert.alert('Error', 'Please enter a contact')
            return;
        }
        if (ToAddObject == '') {
            Alert.alert('Error', 'Please enter an object')
            return;
        }
        if (date == '') {
            Alert.alert('Error', 'Please enter a date')
            return;
        }

        const form = JSON.stringify({
            Guest1: UserName,
            Guest2: ToAddGuest2,
            Subject: ToAddObject,
            Date: formatDate(date),
        });
        axios.post(`http://x2024safecall3173801594000.westeurope.cloudapp.azure.com:80/addEvent`, form, {
            headers: {
            'Content-Type': 'application/json'
          }
        })
        .then(res => {
            console.log(res.data)
            alert("Call request sent to " + ToAddGuest2 + "!")
            navigation.navigate('Home', {name: UserName})
        })
    }

    return (
        <View style={styles.mainpage}>
            <View style={styles.row}>
            <Icon arrow-back style={{alignSelf: 'flex-start', marginTop: 15, marginLeft: 15}} name="home" size={40} color={Color.light3} onPress={() => navigation.navigate('Home')}/>
            </View>
            <Text style={{alignSelf: 'center', marginTop: 5, fontSize: 35, top: -40, color: Color.light3}}>Add Event</Text>
            <View style={styles.egg}/>
            <ScrollView style={styles.scrollView}>
                    <View style={styles.center}>
                        <TextInput
                            variant="outlined"
                            label="Contact"
                            leading={props => <Icon name="adduser" {...props} 
                            color={Color.dark3}
                            />}
                            style={styles.input}
                            color={Color.dark3}
                            onChangeText={text => setDestGuest2(text)} value={ToAddGuest2}
                            />
                            <TextInput
                            variant="outlined"
                            label="Object"
                            leading={props => <Icon name="tagso" {...props} 
                            color={Color.dark3}
                            />}
                            style={styles.input}
                            color={Color.dark3}
                            onChangeText={text => setObject(text)} value={ToAddObject}
                            />
                        </View>
                    <View>
                    {<Text style={styles.maintext}>Date of the event :</Text>}

                    <DatePicker
                        style={styles.datepicker}
                        date={date}
                        mode="date"
                        placeholder="select date"
                        textColor='black'
                        format="YYYY-MM-DD"
                        minDate="2016-05-01"
                        maxDate="2016-06-01"
                        confirmBtnText="Confirm"
                        cancelBtnText="Cancel"
                        androidVariant='nativeAndroid'
                        customStyles={{
                          dateIcon: {
                            position: 'absolute',
                            left: 0,
                            top: 4,
                            marginLeft: 0,
                          },
                          dateInput: {
                            marginLeft: 36
                          }
                        }}
                        onDateChange={setDate}
                    />
                    <DatePicker
                        style={styles.datepicker}
                        date={date}
                        mode="datetime"
                        placeholder="select date"
                        textColor='black'
                        format="YYYY-MM-DD HH:mm"
                        minDate="2016-05-01"
                        maxDate="2016-06-01"
                        confirmBtnText="Confirm"
                        cancelBtnText="Cancel"
                        androidVariant='nativeAndroid'
                        customStyles={{
                          dateIcon: {
                            position: 'absolute',
                            left: 0,
                            top: 4,
                            marginLeft: 0,
                          },
                          dateInput: {
                            marginLeft: 36
                          }
                        }}
                        onDateChange={setDate}
                    />
                    </View>
            </ScrollView>
            <View style={styles.btnrow}></View>
            <View style={{alignItems: 'center'}}>
                <Icon name="user" size={50} color={Color.dark} onPress={() => SendCallForm()}/>
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
        // backgroundColor: Color.dark2,
        borderRadius: 10,
        paddingLeft: 10,
        paddingRight: 10,
        color: Color.dark2,
    },
    input: {
        width: 350,
        height: 50,
        margin: 20,
        borderBottomWidth: 1,
    },
})
    
export default CallForm;
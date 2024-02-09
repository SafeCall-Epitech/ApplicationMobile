import React from "react";
import { View, Text, Button } from "react-native";
import Color from "../color";
import Icon from 'react-native-vector-icons/AntDesign';
import { StyleSheet } from "react-native";
import { useRoute } from "@react-navigation/native";
import axios from "axios";
import { ScrollView } from "react-native";
import { ActivityIndicator } from "react-native";


const AgendaCard = ({navigation, isRDVConfirmed, RDVDate, RDVGuests, RDVSubject, RDVTime, UserName}) => {

    // split the RDVGuests string into an array
    const RDVGuestsArray = RDVGuests.split("+");
    // remove the UserName from the RDVGuestsArray
    RDVGuestsArray.splice(RDVGuestsArray.indexOf(UserName), 1);
    //the guest is the person who is not the user
    if (RDVGuestsArray[0] == UserName) {
        var guest = RDVGuestsArray[1];
    } else {
        var guest = RDVGuestsArray[0];
    }

    var isrdvsoon = false;
    var today = new Date();
    var RDVDateArray = RDVDate.split(" ");
    var pieceofRDVDateArray = RDVDateArray[0].split("-");

    //if the RDV is today set isrdvsoon to true
    if (pieceofRDVDateArray[0] == today.getFullYear() && pieceofRDVDateArray[1] == today.getMonth() + 1 && pieceofRDVDateArray[2] == today.getDate()) {
        isrdvsoon = true;
    }


    const DEBG = () => {
        navigation.navigate('Webview', {guest: guest, UserName: UserName});
    }
    return (
        <View style={styles2.card}>
            <View style={styles2.cardHeader}>
                <Text style={styles2.cardHeaderText}>{RDVSubject}</Text>
            </View>
            <View style={styles2.cardBody}>
                <View style={{flexDirection: 'row', marginBottom: 10}}>
                    <Text style={styles2.cardBodyTextLeft}>Date: {RDVDate} {RDVTime}</Text>
                    <Text style={styles2.cardBodyTextRight}>With: {guest}</Text>
                </View>
                {/* {isrdvsoon ? <Button title="Call" color="green" onPress={() => navigation.navigate('InCallPage', {guest: guest})}/> : null} */}
                {isrdvsoon ? <Button title="Call" color="green" onPress={() => DEBG()}/> : null}
            </View>
        </View>
    )
}

styles2 = StyleSheet.create({
    card: {
        backgroundColor: Color.dark3,
        margin: 10,
        marginLeft: 10,
        borderRadius: 10,
        padding: 10,
        shadowColor: Color.dark1,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        elevation: 5,
    },
    cardHeader: {
        backgroundColor: Color.dark2,
        borderRadius: 10,
        padding: 10,
        alignItems: 'center',
    },
    cardHeaderText: {
        color: Color.light3,
        fontSize: 20,
        fontWeight: 'bold',
    },
    cardBody: {
        marginTop: 10,
    },
    cardBodyText: {
        color: Color.dark2,
        fontSize: 15,
    },
    cardBodyTextLeft: {
        color: Color.light2,
        fontSize: 15,
        marginRight: 10,
    },
    cardBodyTextRight: {
        color: Color.light2,
        fontSize: 15,
        // place full left
        position: 'absolute',
        left: 0,
        right: 0,
        textAlign: 'right',
        marginRight: 10,
    },
})


const Agenda = ({navigation}) => {

    const route = useRoute();
    const UserName = route.params?.name;

    let AgendaCards = [];
    let PastAgendaCards = [];


    const [isRDVConfirmedArray, setisRDVConfirmedArray] = React.useState([]);
    const [RDVDateArray, setRDVDateArray] = React.useState([]);
    const [RDVTimeArray, setRDVTimeArray] = React.useState([]);
    const [RDVGuestsArray, setRDVGuestsArray] = React.useState([]);
    const [RDVSubjectArray, setRDVSubjectArray] = React.useState([]);

    const [isLoaded, setIsLoaded] = React.useState(false);

    const [isPastEventVisible, setIsPastEventVisible] = React.useState(false);

    const formatDate = (date) => {

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

    const getAgenda = async () => {
        axios.get(`http://x2024safecall3173801594000.westeurope.cloudapp.azure.com:80/listEvent/${UserName}`)
        .then(res => {
            parsedResponse = res.data["Success "];
            if (parsedResponse == null) {
                return;
            }
            parsedResponse.forEach(item => {
                const confirmed = item.Confirmed;
                const date = item.Date;
                const guests = item.Guests;
                const subject = item.Subject;
              
                isRDVConfirmedArray.push(confirmed);
                RDVDateArray.push(date);
                RDVGuestsArray.push(guests);
                RDVSubjectArray.push(subject);
            });
        })
        .finally(() => {
            setIsLoaded(true);
        });
    }

    const AgendaDisplayer = () => {
        for (var x = 0; x <= RDVDateArray.length; x++) {
            if (RDVDateArray[x] != undefined) {
                if (isRDVConfirmedArray[x] == "true") {
                    isRDVConfirmedArray[x] = "Confirmed";
                } else {
                    isRDVConfirmedArray[x] = "Not Confirmed";
                }

                console.log(RDVSubjectArray[x] + " :" + RDVDateArray[x]);

                //if date is today or in the future add it to the agenda
                if (RDVDateArray[x].slice(0, 4) >= new Date().toISOString().slice(0, 4) && RDVDateArray[x].slice(5, 7) >= new Date().toISOString().slice(5, 7) && RDVDateArray[x].slice(8, 10) >= new Date().toISOString().slice(8, 10)) {
                    AgendaCards.push(<AgendaCard key={x} navigation={navigation} isRDVConfirmed={isRDVConfirmedArray[x]} RDVDate={RDVDateArray[x]} RDVGuests={RDVGuestsArray[x]} RDVSubject={RDVSubjectArray[x]} RDVTime={RDVTimeArray[x]} UserName={UserName}/>);
                }
                //if date is in the past add it to the past agenda
                else {
                    PastAgendaCards.push(<AgendaCard key={x} navigation={navigation} isRDVConfirmed={isRDVConfirmedArray[x]} RDVDate={RDVDateArray[x]} RDVGuests={RDVGuestsArray[x]} RDVSubject={RDVSubjectArray[x]} RDVTime={RDVTimeArray[x]} UserName={UserName}/>);
                }

            }
        }
        return (
            <View style={{marginTop: 20}}>
                <Text style={{color: Color.dark3, fontSize: 20, textAlign: 'center'}}>Upcoming Events</Text>
                <View style={{borderBottomColor: Color.dark2, borderBottomWidth: 1, marginTop: 5, marginBottom: 5}}></View>
                { AgendaCards.length > 0 ?
                AgendaCards
                :
                <Text style={{color: Color.dark3, fontSize: 20, textAlign: 'center', fontWeight: 'bold', marginBottom : 40, marginTop : 40,}}>No Upcoming Events</Text>
                }

                <Text style={{color: Color.dark3, fontSize: 20, textAlign: 'center'}}>Past Events  <Icon name="downcircleo" size={20} color={Color.dark3} style={{alignSelf: 'center'}} onPress={() => setIsPastEventVisible(!isPastEventVisible)}/> </Text>
                <View style={{borderBottomColor: Color.dark2, borderBottomWidth: 1, marginTop: 5, marginBottom: 5}}></View>
                {isPastEventVisible ? 
                PastAgendaCards
                : null}
                {/* Separator for past event */}

            </View>
        )
    }

    React.useEffect(() => {
        getAgenda();
    }, []);

    return (
        <View>
            <View style={styles.egg}></View>
            <View style={styles.row}>
                <Icon arrow-back style={{alignSelf: 'flex-start', marginTop: 15, marginLeft: 15}} name="home" size={40} color={Color.light3} onPress={() => navigation.navigate('Home')}/>
                <Icon add-event style={{alignSelf: 'flex-end', marginTop: 15, marginRight: 15}} name="pluscircleo" size={40} color={Color.light3} onPress={() => navigation.navigate('CallForm', { UserName: UserName })} />
            </View>
            <Text style={{alignSelf: 'center', marginTop: 5, top: -40,fontSize: 25, color: Color.light3}}>Agenda</Text>
   
            {isLoaded ? 
                <ScrollView style={styles.scrollView}>
                    {AgendaDisplayer()}
                </ScrollView>
                    :
                <ActivityIndicator size="large" color={Color.dark2} />
            }
        </View>
    )
}

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
        zIndex: 2,
    },
    valtext: {
        fontStyle: 'italic',
        color: Color.dark2,
    },
    mainpage: {
        backgroundColor: Color.light3,
        flex: 1,
    },
    scrollView: {
        // backgroundColor: 'pink',
        marginHorizontal: 0,
        marginTop: -30,
        marginBottom: 110,
        zIndex: -5,
      },
      row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
})

export default Agenda;
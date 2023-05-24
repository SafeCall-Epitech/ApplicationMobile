import React from "react";
import { View, Text } from "react-native";
import Color from "../color";
import Icon from 'react-native-vector-icons/Ionicons';
import { StyleSheet } from "react-native";
import { useRoute } from "@react-navigation/native";
import axios from "axios";
import { ScrollView } from "react-native";
import { ActivityIndicator } from "react-native";


const AgendaCard = ({isRDVConfirmed, RDVDate, RDVGuests, RDVSubject, UserName}) => {

    // format date to be more readable
    var day = RDVDate.substring(0, 2);
    var month = RDVDate.substring(3, 5);
    // year is the last 4 characters
    var year = RDVDate.substring(RDVDate.length - 4);

    // format guests to be more readable
    // guest 1 is everything before &
    var RDVGuest1 = RDVGuests.substring(0, RDVGuests.indexOf('&'));
    // guest 2 is everything after &
    var RDVGuest2 = RDVGuests.substring(RDVGuests.indexOf('&') + 1);



    //if RDVGuest 1 or 2 is the user, replace it with "You"
    if (RDVGuest1 == UserName) {
        RDVGuest1 = "You";
    }
    if (RDVGuest2 == UserName) {
        RDVGuest2 = "You";
    }
    console.log("1 = " + RDVGuest1);
    console.log("2 = " +RDVGuest2);
    var RDVGuests = RDVGuest1 + " & " + RDVGuest2;


    // if rdv is confirmed, display green, else display red
    if (isRDVConfirmed == "Confirmed") {
        styles2.cardHeaderText.color = "#90EE90";
    } else {
        styles2.cardHeaderText.color = "#ffcccb";    
    }

    

    return (
        <View style={styles2.card}>
            <View style={styles2.cardHeader}>
                <Text style={styles2.cardHeaderText}>{isRDVConfirmed}</Text>
            </View>
            <View style={styles2.cardBody}>
                <Text style={styles2.cardBodyText}>Date: {day}/{month}/{year}</Text>
                <Text style={styles2.cardBodyText}>Rendez-vous between {RDVGuests} </Text>
                <Text style={styles2.cardBodyText}>Note: {RDVSubject}</Text>
            </View>
        </View>
    )
}

styles2 = StyleSheet.create({
    card: {
        backgroundColor: Color.light2,
        margin: 10,
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
})


const Agenda = ({navigation}) => {

    const route = useRoute();
    const UserName = route.params?.name;

    let AgendaCards = [];


    const [isRDVConfirmedArray, setisRDVConfirmedArray] = React.useState([]);
    const [RDVDateArray, setRDVDateArray] = React.useState([]);
    const [RDVGuestsArray, setRDVGuestsArray] = React.useState([]);
    const [RDVSubjectArray, setRDVSubjectArray] = React.useState([]);

    const [isLoaded, setIsLoaded] = React.useState(false);

    const getAgenda = async () => {
        axios.get(`http://20.234.168.103:8080/listEvent/${UserName}`)
        .then(res => {
            parsedResponse = res.data["Success "];
            console.log("RESP : "+ parsedResponse);
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
        console.log("AgendaDisplayer");
        for (var x = 0; x <= RDVDateArray.length; x++) {
            console.log("x = " + x);
            if (RDVDateArray[x] != undefined) {
                if (isRDVConfirmedArray[x] == "true") {
                    isRDVConfirmedArray[x] = "Confirmed";
                } else {
                    isRDVConfirmedArray[x] = "Not Confirmed";
                }
                AgendaCards.push(<AgendaCard key={x} isRDVConfirmed={isRDVConfirmedArray[x]} RDVDate={RDVDateArray[x]} RDVGuests={RDVGuestsArray[x]} RDVSubject={RDVSubjectArray[x]} UserName = {UserName}/>)
            }
        }
        return (
            <View>
                {AgendaCards}
            </View>
        )
    }

    React.useEffect(() => {
        getAgenda();
    }, []);

    return (
        <View>
            <View style={styles.egg}></View>
            <Icon arrow-back style={{alignSelf: 'flex-start', marginTop: 5, marginLeft: 5}} name="arrow-back" size={40} color={Color.light3} onPress={() => navigation.navigate('Home')}/>
            <Text style={{alignSelf: 'center', marginTop: 5, fontSize: 35, color: Color.light3}}>Agenda</Text>
        
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
        marginTop: 100,
        marginBottom: 110,
        // zIndex: -5,
      },
})

export default Agenda;
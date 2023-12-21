import React from "react";
import { View, Text, Button } from "react-native";
import Color from "../color";
import Icon from 'react-native-vector-icons/AntDesign';
import { StyleSheet } from "react-native";
import { useRoute } from "@react-navigation/native";
import axios from "axios";
import { ScrollView } from "react-native";
import { ActivityIndicator } from "react-native";
// import Peer from "simple-peer"
import RNSimplePeer from "react-native-simple-peer";
import io from "socket.io-client"


const AgendaCard = ({navigation, isRDVConfirmed, RDVDate, RDVGuests, RDVSubject, UserName}) => {

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


    // if rdv date is only number and 8 characters long, set it to the format "dd/mm/yyyy"
    if (RDVDate.length == 8 && !isNaN(RDVDate)) {
        RDVDate = RDVDate.substring(0, 2) + "/" + RDVDate.substring(2, 4) + "/" + RDVDate.substring(4, 8);
    }
    //if rdv date is only number and less or more than 8 characters long, set it to the format "dd/mm/yyyy"
    else if (RDVDate.length != 8 && !isNaN(RDVDate)) {
        RDVDate = RDVDate.substring(0, 2) + "/" + RDVDate.substring(2, 4) + "/" + RDVDate.substring(4);
    }

    var isrdvsoon = false;
    //get the current date
    var today = new Date();
    //get the rdv date
    var rdvdate = new Date(RDVDate);
    //get today's date in the format "dd/mm/yyyy"
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, "0");
    var yyyy = today.getFullYear();
    today = dd + "/" + mm + "/" + yyyy;

    //if the difference is less than 0, the rdv is in the past
    if (today == RDVDate) {
        isrdvsoon = true;
    }
const DEBG = () => {
    console.log("DEBG");
    navigation.navigate('RNCallLogic', {guest: guest});
    
    
}
    return (
        <View style={styles2.card}>
            <View style={styles2.cardHeader}>
                <Text style={styles2.cardHeaderText}>{RDVSubject}</Text>
            </View>
            <View style={styles2.cardBody}>
                <View style={{flexDirection: 'row', marginBottom: 10}}>
                    <Text style={styles2.cardBodyTextLeft}>Date: {RDVDate}</Text>
                    <Text style={styles2.cardBodyTextRight}>With: {guest}</Text>
                </View>
                {/* {isrdvsoon ? <Button title="Call" color="green" onPress={() => navigation.navigate('InCallPage', {guest: guest})}/> : null} */}
                {isrdvsoon ? <Button title="Call" color="green" onPress={() => DEBG()}/> : null}
            </View>
        </View>
        // <View style={styles2.card}>
        //     <View style={styles2.cardHeader}>
        //         <Text style={styles2.cardHeaderText}>{isRDVConfirmed}</Text>
        //     </View>
        //     <View style={styles2.cardBody}>
        //         <View style={{flexDirection: 'row'}}>
        //             <Text style={styles2.cardBodyTextLeft}>Date: {RDVDate}</Text>
        //             <Text style={styles2.cardBodyTextRight}>With: {RDVGuestsArray[0]}</Text>
        //         </View>
        //         <View style={{borderBottomColor: Color.dark2, borderBottomWidth: 1, marginTop: 5, marginBottom: 5}}></View>
        //         <Text style={{color: Color.dark2, fontSize: 15, textAlign: 'center'}}>Subject</Text>
        //         <Text style={styles2.cardBodyText}>{RDVSubject}</Text>

        //         {isrdvsoon ? <Button title="Call" color="green" onPress={() => navigation.navigate('InCallPage', {guest: guest})}/> : null}
        //     </View>
        // </View>
        
    )
}

styles2 = StyleSheet.create({
    card: {
        backgroundColor: Color.dark3,
        margin: 10,
        marginLeft: 40,
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


    const [isRDVConfirmedArray, setisRDVConfirmedArray] = React.useState([]);
    const [RDVDateArray, setRDVDateArray] = React.useState([]);
    const [RDVGuestsArray, setRDVGuestsArray] = React.useState([]);
    const [RDVSubjectArray, setRDVSubjectArray] = React.useState([]);

    const [isLoaded, setIsLoaded] = React.useState(false);

    const getAgenda = async () => {
        // console.log("getAgenda");
        axios.get(`http://x2024safecall3173801594000.westeurope.cloudapp.azure.com:80/listEvent/${UserName}`)
        .then(res => {
            // console.log(res.data);
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
                AgendaCards.push(<AgendaCard key={x} navigation={navigation} isRDVConfirmed={isRDVConfirmedArray[x]} RDVDate={RDVDateArray[x]} RDVGuests={RDVGuestsArray[x]} RDVSubject={RDVSubjectArray[x]} UserName = {UserName}/>)
            }
        }
        return (
            <View style={{marginTop: 10}}>
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
import React, {useState, useRef, useEffect} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import { ActivityIndicator } from "@react-native-material/core";
import Icon from 'react-native-vector-icons/AntDesign';
import IconF from 'react-native-vector-icons/Feather';
import RNSimplePeer from "react-native-simple-peer";
import { useRoute } from "@react-navigation/native";

import {
	RTCPeerConnection,
	RTCIceCandidate,
	RTCSessionDescription,
	RTCView,
	mediaDevices,
} from 'react-native-webrtc';
import io from 'socket.io-client';
import Color from '../color'


const socket = io.connect('http://10.68.245.175:5000');
// const socket = io.connect('https://x2024safecall3173801594000.westeurope.cloudapp.azure.com:5000/');

const InCallPage = ({navigation}) => {

  const route = useRoute();
  const CallWith = route.params?.guest;
  const Caller = route.params?.UserName;

    const [me, setMe] = useState('');
    const [stream, setStream] = useState();
    const [receivingCall, setReceivingCall] = useState(false);
    const [caller, setCaller] = useState('');
    const [callerSignal, setCallerSignal] = useState();
    const [callAccepted, setCallAccepted] = useState(false);
    const [idToCall, setIdToCall] = useState('');
    const [callEnded, setCallEnded] = useState(false);
    const [userStream, setUserStream] = useState();

    const [micro, setMicro] = useState(true);
    const [wasMicroEnabled, setWasMicroEnabled] = useState(true);
    const [sound, setSound] = useState(true);
    const [cam, setCam] = useState(true);

    const connectionRef = useRef();

    useEffect(() => {
      
        mediaDevices.getUserMedia({video: true, audio: true}).then((stream) => {
          setStream(stream);
          console.log(stream);
          }).catch((err) => {
            console.log(err);
        });

        socket.emit("pseudo", {pseudo: Caller});
        setIdToCall(CallWith);

        socket.on("me", (id) => {
          setMe(id);
        });

        socket.on("callReceived", (data) => {
          console.log("callReceivedèèèèèèèèèèèèèèèèèèèèèèèèèèèèèèèèèèèèèèèèèèèèèèèèè")
          setReceivingCall(true);
          setCaller(data.from);
          setCallerSignal(data.signal);
          answerCall();
        });
        // callUser(CallWith);
    }, []);

    const callUser = (id) => {
      console.log("CALL = " + id);
        const peer = new RNSimplePeer({
            initiator: true,
            webRTC: {
                RTCPeerConnection,
                RTCIceCandidate,
                RTCSessionDescription
            },
            trickle: false,
            stream: stream
        })

        peer.on("signal", (data) => {
            socket.emit("callUser", {
              userToCall: id,
              signalData: data,
              from: me,
            });
        });

        peer.on("stream", (str) => {
          console.log(sound);
          str.getAudioTracks()[0].enabled = sound;
          setUserStream(str);
        });

        socket.on("callEnded", () => {
            endCall();
        });

        socket.on("callAccepted", (signal) => {
            setCallAccepted(true);
            peer.signal(signal);
        });

        connectionRef.current = peer;
    };

    const answerCall = () => {
        setCallAccepted(true);
        const peer = new RNSimplePeer({
            initiator: false,
            webRTC: {
                RTCPeerConnection,
                RTCIceCandidate,
                RTCSessionDescription
            },
            trickle: false,
            stream: stream
        });
        

        peer.on("signal", (data) => {
          console.log("DATA : " + data);
            socket.emit("answerCall", {signal: data, to: caller});
        });

        peer.on("stream", (str) => {
            str.getAudioTracks()[0].enabled = sound;
            setUserStream(str);
          });

        socket.on("callEnded", () => {
            endCall();
        });


        console.log("CIJAUZGYDAZG8DO0AZGD0 : 1" + callerSignal);
        peer.signal(callerSignal);
        console.log("CIJAUZGYDAZG8DO0AZGD0 : 2" + callerSignal);

        connectionRef.current = peer;
    };

    const endCall = () => {
      console.log("endCall function")
      setCallEnded(true);
      setReceivingCall(false);
      setCallAccepted(false);
      if (connectionRef.current && connectionRef.current.srcObject) {
        connectionRef.current.destroy();
      }
    }
  
    const leaveCall = () => {
      console.log("leaveCall function")
      socket.emit("endCall")
      endCall();
      // setCallEnded(true);
      navigation.navigate("Home")
    };

    const muteMicro = () => {
        if (!sound) {
          console.log("UNMUTE")
            // muteSound(); TO FIX
            stream.getAudioTracks()[0].enabled = true;
            setMicro(true);
        } else {
          console.log("MUTE")
            stream.getAudioTracks()[0].enabled = !micro;
            setMicro(!micro);
        }
    };
    
    //TOFIX

    // const muteSound = () => {
    //     if (!sound && wasMicroEnabled) {
    //         stream.getAudioTracks()[0].enabled = true;
    //         if (userVideo.current)
    //             userVideo.current.srcObject.getAudioTracks()[0].enabled = true;
    //         setMicro(true);
    //     } else {
    //         if (userVideo.current)
    //             userVideo.current.srcObject.getAudioTracks()[0].enabled = false;
    //         stream.getAudioTracks()[0].enabled = false;
    //     }
    //     setWasMicroEnabled(micro);
    //     if (sound)
    //         setMicro(false);
    //     setSound(!sound);
    // };

    const cutCam = () => {
        stream.getVideoTracks()[0].enabled = !cam;
        setCam(!cam);
    };

    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'black'  }}>


      <Text style={{color: 'white', fontSize: 30, fontWeight: 'bold', position: 'absolute', top: 0, padding: 10, borderRadius: 5,}}>Calling {idToCall}</Text>
      <Text style={{color: 'white', fontSize: 30, fontWeight: 'bold', position: 'absolute', top: 40, padding: 10, borderRadius: 5,}}>You are {Caller}</Text>



    {/* Cameras */}
      {/* <View style={{ flexDirection: 'row'}}>
          <View style={{ marginRight: 10 }}>
            {stream && !callAccepted ?
              <RTCView
                style={{ width: 762 , height: 762 }}
                streamURL={stream.toURL()}
              />
          : 
          <ActivityIndicator color="#25101c"/> }
          </View>
          <View>
            {callAccepted && !callEnded && userStream ? 
              <RTCView style={{ width: 762, height: 762 }} streamURL={userStream.toURL()} />
              : <ActivityIndicator color="#25101c"/> }
          </View>
        </View> */}


        {/* <Button style={{backgroundColor: 'red',}} title="Call" onPress={() => callUser(idToCall)} /> */}


        {/* <Text style={styles.callwithtext}>{idToCall}</Text>

    { sound ? 
        <TouchableOpacity style={styles.buttongreen} onPress={() => muteMicro()}>
          <IconF style={{alignSelf: 'center'}} name="mic-off" size={40} color={Color.light3} />
          <Text style={(styles.buttonText, {alignSelf: 'center'})}>mute</Text>
        </TouchableOpacity>
        : <TouchableOpacity style={styles.buttonred} onPress={() => muteMicro()}>
        <IconF style={{alignSelf: 'center'}} name="mic" size={40} color={Color.light3} />
        <Text style={(styles.buttonText, {alignSelf: 'center'})}>unmute</Text>
      </TouchableOpacity>}
      <TouchableOpacity style={styles.buttonhang} onPress={() => leaveCall()}>
          <IconF style={{alignSelf: 'center'}} name="phone-off" size={40} color={Color.light3} />
          <Text style={(styles.buttonText, {alignSelf: 'center'})}>leave</Text>
        </TouchableOpacity> */}
        
      </View>
    );
};

const styles = StyleSheet.create({
  callwithtext: {
    position: 'absolute',
    fontSize: 30,
    top: 0,
    // padding: 10,
    borderRadius: 5,
    fontWeight: 'bold',
  },
  buttongreen: {
    position: 'absolute',
    bottom: 16,
    left: 16,
    width: 75,
    height: 75,
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 5,
  },
  buttonred: {
    position: 'absolute',
    bottom: 16,
    left: 16,
    width: 75,
    height: 75,
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 5,
  },
  buttonhang: {
    position: 'absolute',
    bottom: 16,
    right: 16,
    width: 75,
    height: 75,
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default InCallPage;


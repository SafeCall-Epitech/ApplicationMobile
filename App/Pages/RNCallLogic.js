import React, {useState, useRef, useEffect} from 'react';
import {View, Text, TextInput} from 'react-native';
import { Button } from 'react-native-paper';

import RNSimplePeer from "react-native-simple-peer";
import {
	RTCPeerConnection,
	RTCIceCandidate,
	RTCSessionDescription,
	RTCView,
	mediaDevices,
} from 'react-native-webrtc';
import io from 'socket.io-client';


const socket = io.connect('http://192.168.1.28:5000');

const App = () => {
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
          }).catch((err) => {
            console.log(err);
        });

        socket.on("me", (id) => {
          console.log(id);
            setMe(id);
        });

        socket.on("callUser", (data) => {
            setReceivingCall(true);
            setCaller(data.from);
            setCallerSignal(data.signal);
        });
    }, []);

    const callUser = (id) => {
        console.log("CALL");
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
            leaveCall();
        });

        socket.on("callAccepted", (signal) => {
            setCallAccepted(true);
            peer.signal(signal);
        });

        connectionRef.current = peer;
    };

    const answerCall = () => {
        setCallAccepted(true);
        const peer = new Peer({
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
            socket.emit("answerCall", {signal: data, to: caller});
        });

        peer.on("stream", (str) => {
            str.getAudioTracks()[0].enabled = sound;
            setUserStream(str);
          });

        socket.on("callEnded", () => {
            leaveCall();
        });

        peer.signal(callerSignal);
        connectionRef.current = peer;
    };

    const leaveCall = () => {
        setCallEnded(true);
        socket.disconnect();
    //    connectionRef.current.destroy();
    };

    const muteMicro = () => {
        if (!sound) {
            muteSound();
            stream.getAudioTracks()[0].enabled = true;
            setMicro(true);
        } else {
            stream.getAudioTracks()[0].enabled = !micro;
            setMicro(!micro);
        }
    };

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
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <TextInput style={{color: 'black',  borderColor: 'black'}} onChangeText={(id) => setIdToCall(id)} />
        <Text style={{color: 'black'}}> coucou</Text>
        <Button style={{color: 'black', backgroundColor: 'red',}} title="Call" onPress={() => callUser(idToCall)} />
        <Button style={{color: 'black', backgroundColor: 'green',}} title="Call" onPress={() => muteMicro()} />
        
        <View style={{ flexDirection: 'row' }}>
          <View style={{ marginRight: 10 }}>
            {stream && (
              <RTCView
                style={{ width: 100, height: 50 }}
                streamURL={stream.toURL()}
              />
            )}
          </View>
          <View>
            {callAccepted && !callEnded && userStream && (
              <RTCView style={{ width: 100, height: 50 }} streamURL={userStream.toURL()} />
            )}
          </View>
        </View>
        <Text>{ me }</Text>

      </View>
    );
};

export default App;

